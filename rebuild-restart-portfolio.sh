#!/usr/bin/env bash

set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-portfolio}"
SITE_URL="${SITE_URL:-https://kevin-mok.com}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

run_systemctl() {
  if [[ "$(id -u)" -eq 0 ]]; then
    systemctl "$@"
  else
    sudo systemctl "$@"
  fi
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
curl -fsSIL --max-redirs 5 --connect-timeout 10 "$SITE_URL" | sed -n '1,8p'

echo "[6/6] Checking active Next.js chunk response"
tmp_html="$(mktemp)"
trap 'rm -f "$tmp_html"' EXIT

curl -fsSL --connect-timeout 10 "$SITE_URL" -o "$tmp_html"
chunk_path="$(grep -oE '/_next/static/chunks/webpack-[^"]+\.js' "$tmp_html" | head -n 1 || true)"

if [[ -z "$chunk_path" ]]; then
  echo "Could not find a webpack chunk path in homepage HTML at $SITE_URL"
  exit 1
fi

curl -fsSIL --connect-timeout 10 "$SITE_URL$chunk_path" | sed -n '1,8p'

echo "Recovery check passed."
