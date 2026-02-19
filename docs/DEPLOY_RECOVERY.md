# Deploy Recovery Runbook

Use this when `kevin-mok.com` serves HTML but the UI does not load (for example, stale `/_next/static/*` chunk URLs returning `400`).

## One-command recovery

```bash
./rebuild-restart-portfolio.sh
```

This script will:
- build a fresh production bundle
- validate generated resume PDFs (`npm run validate-resume-pdfs`)
- restart the `portfolio` systemd service
- wait for homepage HTTP `200` with bounded retries
- verify the active webpack chunk URL from homepage HTML also returns HTTP `200` with bounded retries

## Optional overrides

Use a different systemd service:

```bash
SERVICE_NAME=portfolio ./rebuild-restart-portfolio.sh
```

Use a different site URL:

```bash
SITE_URL=https://www.kevin-mok.com ./rebuild-restart-portfolio.sh
```

Tune readiness retry behavior (defaults: 12 attempts, 5 seconds between attempts):

```bash
READINESS_MAX_ATTEMPTS=18 READINESS_SLEEP_SECONDS=5 ./rebuild-restart-portfolio.sh
```

## Manual fallback

If script execution fails, run the core sequence directly:

```bash
npm run build
```

```bash
npm run validate-resume-pdfs
```

```bash
sudo systemctl restart portfolio
```

```bash
curl -I -L --max-redirs 5 --connect-timeout 10 https://kevin-mok.com
```
