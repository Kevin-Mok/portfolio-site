#!/usr/bin/env bash

set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-portfolio}"
SITE_URL="${SITE_URL:-https://kevin-mok.com}"
READINESS_MAX_ATTEMPTS="${READINESS_MAX_ATTEMPTS:-12}"
READINESS_SLEEP_SECONDS="${READINESS_SLEEP_SECONDS:-5}"
AUTO_CALIBRATE_RESUME_LAYOUT="${AUTO_CALIBRATE_RESUME_LAYOUT:-1}"
CALIBRATION_MAX_ITERATIONS="${CALIBRATION_MAX_ITERATIONS:-10}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

run_systemctl() {
  if [[ "$(id -u)" -eq 0 ]]; then
    systemctl "$@"
  else
    sudo systemctl "$@"
  fi
}

wait_for_http_200() {
  local url="$1"
  local label="$2"
  local attempt
  local headers=""

  for attempt in $(seq 1 "$READINESS_MAX_ATTEMPTS"); do
    if headers="$(curl -fsSIL --max-redirs 5 --connect-timeout 10 "$url" 2>&1)"; then
      echo "$headers" | sed -n '1,8p'
      return 0
    fi

    if [[ "$attempt" -lt "$READINESS_MAX_ATTEMPTS" ]]; then
      echo "Attempt $attempt/$READINESS_MAX_ATTEMPTS failed for $label; retrying in ${READINESS_SLEEP_SECONDS}s..."
      sleep "$READINESS_SLEEP_SECONDS"
    fi
  done

  echo "Timed out waiting for HTTP 200 from $label ($url) after $READINESS_MAX_ATTEMPTS attempts."
  if [[ -n "$headers" ]]; then
    echo "$headers" | sed -n '1,12p'
  fi
  return 1
}

extract_webpack_chunk_path() {
  local html_path="$1"
  local attempt
  local chunk_path=""

  for attempt in $(seq 1 "$READINESS_MAX_ATTEMPTS"); do
    if curl -fsSL --connect-timeout 10 "$SITE_URL" -o "$html_path"; then
      chunk_path="$(grep -oE '/_next/static/chunks/webpack-[^"]+\.js' "$html_path" | head -n 1 || true)"
      if [[ -n "$chunk_path" ]]; then
        printf '%s\n' "$chunk_path"
        return 0
      fi
    fi

    if [[ "$attempt" -lt "$READINESS_MAX_ATTEMPTS" ]]; then
      echo "Attempt $attempt/$READINESS_MAX_ATTEMPTS could not read active webpack chunk path; retrying in ${READINESS_SLEEP_SECONDS}s..."
      sleep "$READINESS_SLEEP_SECONDS"
    fi
  done

  return 1
}

is_truthy() {
  case "${1,,}" in
    1|true|yes|y|on) return 0 ;;
    *) return 1 ;;
  esac
}

echo "[1/8] Building production bundle"
cd "$ROOT_DIR"
npm run build

echo "[2/8] Verifying resume layout baseline lock"
if npm run verify:resume-layout; then
  echo "Resume layout baseline verification passed."
else
  if is_truthy "$AUTO_CALIBRATE_RESUME_LAYOUT"; then
    echo "Resume layout verification failed; running auto calibration."
    npm run calibrate:resume-layout -- --skip-build-first --max-iterations "$CALIBRATION_MAX_ITERATIONS"
    echo "Re-running resume layout verification after calibration."
    npm run verify:resume-layout
  else
    echo "Resume layout verification failed and AUTO_CALIBRATE_RESUME_LAYOUT is disabled."
    echo "Set AUTO_CALIBRATE_RESUME_LAYOUT=1 to auto-fix calibration during recovery."
    exit 1
  fi
fi

echo "[3/8] Validating resume PDF generation"
npm run validate-resume-pdfs

echo "[4/8] Restarting service: $SERVICE_NAME"
run_systemctl restart "$SERVICE_NAME"

echo "[5/8] Verifying service is active"
run_systemctl is-active --quiet "$SERVICE_NAME"
echo "Service is active: $SERVICE_NAME"

echo "[6/8] Checking homepage response: $SITE_URL"
wait_for_http_200 "$SITE_URL" "homepage response"

echo "[7/8] Checking active Next.js chunk response"
tmp_html="$(mktemp)"
trap 'rm -f "$tmp_html"' EXIT

chunk_path="$(extract_webpack_chunk_path "$tmp_html" || true)"

if [[ -z "$chunk_path" ]]; then
  echo "Could not find a webpack chunk path in homepage HTML at $SITE_URL"
  exit 1
fi

wait_for_http_200 "$SITE_URL$chunk_path" "webpack chunk response"

echo "[8/8] Recovery checks completed"
echo "Recovery check passed."
