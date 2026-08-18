#!/usr/bin/env bash
# Run this script LOCALLY (where you have Vercel CLI and SSH access).
# It generates secrets, sets all TDS env vars in Vercel, and prints
# the ready-to-run Server B registration command.
#
# Prerequisites:
#   vercel CLI logged in  (vercel whoami)
#   jq installed          (brew install jq / apt install jq)
#
# Usage:
#   chmod +x scripts/setup-tds-secrets.sh
#   ./scripts/setup-tds-secrets.sh

set -euo pipefail

TEAM_ID="team_VjEoY2Toenh5MNunqEIYdGao"
PROJECT_ID="prj_ukbcxnadHH62h0pAcvsYHAb6wQ3r"
SITE_ID="morbitel_site"
KEY_ID="morbitel_site-v1"

echo "Generating secrets…"
TDS_SHARED_SECRET="$(openssl rand -hex 32)"
TDS_CF_PROXY_TOKEN="$(openssl rand -hex 16)"

echo "Setting Vercel environment variables (Preview + Production)…"

set_var() {
  local name="$1"
  local value="$2"
  local sensitive="${3:-false}"

  printf '%s' "$value" | vercel env add "$name" preview \
    --token "$(vercel whoami --token 2>/dev/null || true)" \
    --scope "$TEAM_ID" --yes 2>/dev/null || true

  printf '%s' "$value" | vercel env add "$name" production \
    --scope "$TEAM_ID" --yes 2>/dev/null || true
}

# Non-secret vars
vercel env add TDS_ENABLED              production <<< "true"          --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_ENABLED              preview    <<< "true"          --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_TARGET_URL           production <<< "https://dzentds.top/d4h9Jb"   --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_TARGET_URL           preview    <<< "https://dzentds.top/d4h9Jb"   --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_ALLOWED_TARGET_HOSTS production <<< "dzentds.top"  --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_ALLOWED_TARGET_HOSTS preview    <<< "dzentds.top"  --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_CORRELATION_PARAM    production <<< "sub_id_6"     --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_CORRELATION_PARAM    preview    <<< "sub_id_6"     --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_DECISION_URL         production <<< "https://api.studiadesi.site/v4/index.php" --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_DECISION_URL         preview    <<< "https://api.studiadesi.site/v4/index.php" --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_KEY_ID               production <<< "$KEY_ID"      --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_KEY_ID               preview    <<< "$KEY_ID"      --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_SITE_ID              production <<< "$SITE_ID"     --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_SITE_ID              preview    <<< "$SITE_ID"     --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_TIMEOUT_MS           production <<< "1200"         --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_TIMEOUT_MS           preview    <<< "1200"         --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_ERROR_FALLBACK       production <<< "target"       --scope "$TEAM_ID" --yes 2>/dev/null || true
vercel env add TDS_ERROR_FALLBACK       preview    <<< "target"       --scope "$TEAM_ID" --yes 2>/dev/null || true

# Secret vars — piped directly, never printed
printf '%s' "$TDS_SHARED_SECRET"  | vercel env add TDS_SHARED_SECRET  production --scope "$TEAM_ID" --yes 2>/dev/null || true
printf '%s' "$TDS_SHARED_SECRET"  | vercel env add TDS_SHARED_SECRET  preview    --scope "$TEAM_ID" --yes 2>/dev/null || true
printf '%s' "$TDS_CF_PROXY_TOKEN" | vercel env add TDS_CF_PROXY_TOKEN production --scope "$TEAM_ID" --yes 2>/dev/null || true
printf '%s' "$TDS_CF_PROXY_TOKEN" | vercel env add TDS_CF_PROXY_TOKEN preview    --scope "$TEAM_ID" --yes 2>/dev/null || true

echo ""
echo "✓ Vercel env vars set."
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "SERVER B — run this via SSH on the server:"
echo "═══════════════════════════════════════════════════════════════"
echo ""
cat <<SERVERB
printf '%s\\n' "\$TDS_SHARED_SECRET_VALUE" | \\
  TDS_TELEMETRY_CONFIG_FILE=/home/dzenmedv/api.studiadesi.site/private/runtime.json \\
  /usr/local/php84/bin/php \\
  /home/dzenmedv/api.studiadesi.site/app/current/bin/add-site.php \\
  ${SITE_ID} ${KEY_ID} --secret-stdin
SERVERB
echo ""
echo "(Replace \$TDS_SHARED_SECRET_VALUE with the value you stored securely.)"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "CLOUDFLARE — morbitel.site Transform Rule:"
echo "═══════════════════════════════════════════════════════════════"
echo "  Rules → Transform Rules → Modify Request Header → New Rule"
echo "  Filter : http.host eq \"morbitel.site\""
echo "  Header : X-TDS-CF-Verified"
echo "  Value  : (the TDS_CF_PROXY_TOKEN you set in Vercel)"
echo "═══════════════════════════════════════════════════════════════"
