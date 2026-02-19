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
- verify homepage HTTP response
- verify the active webpack chunk URL from homepage HTML

## Optional overrides

Use a different systemd service:

```bash
SERVICE_NAME=portfolio ./rebuild-restart-portfolio.sh
```

Use a different site URL:

```bash
SITE_URL=https://www.kevin-mok.com ./rebuild-restart-portfolio.sh
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
