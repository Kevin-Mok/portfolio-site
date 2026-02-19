#!/usr/bin/env bash

set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-portfolio}"
SITE_URL="${SITE_URL:-https://kevin-mok.com}"
READINESS_MAX_ATTEMPTS="${READINESS_MAX_ATTEMPTS:-12}"
READINESS_SLEEP_SECONDS="${READINESS_SLEEP_SECONDS:-5}"
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

echo "[1/6] Building production bundle"
cd "$ROOT_DIR"
npm run build

echo "[2/6] Validating resume PDF generation"
npm run validate-resume-pdfs

echo "[3/6] Restarting service: $SERVICE_NAME"
run_systemctl restart "$SERVICE_NAME"

echo "[4/6] Verifying service is active"
run_systemctl is-active --quiet "$SERVICE_NAME"
echo "Service is active: $SERVICE_NAME"

echo "[5/6] Checking homepage response: $SITE_URL"
wait_for_http_200 "$SITE_URL" "homepage response"

echo "[6/6] Checking active Next.js chunk response"
tmp_html="$(mktemp)"
trap 'rm -f "$tmp_html"' EXIT

chunk_path="$(extract_webpack_chunk_path "$tmp_html" || true)"

if [[ -z "$chunk_path" ]]; then
  echo "Could not find a webpack chunk path in homepage HTML at $SITE_URL"
  exit 1
fi

wait_for_http_200 "$SITE_URL$chunk_path" "webpack chunk response"

echo "Recovery check passed."
