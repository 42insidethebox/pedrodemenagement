#!/bin/bash
# =============================================================================
# TonSiteWeb — Go Live Script
# Run this ONCE after completing Stripe KYC onboarding
#
# Prerequisites:
#   1. stripe login --project-name=tonsiteweb   (opens browser — gets live keys)
#   2. export DB_PASSWORD=your_supabase_db_password
#      (get it from: https://supabase.com/dashboard/project/hnicnupamewtitegifyw/settings/database)
#
# Usage:
#   export DB_PASSWORD=your_password_here
#   bash scripts/go-live.sh
# =============================================================================

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
ok()   { echo -e "${GREEN}✅ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
fail() { echo -e "${RED}❌ $1${NC}"; exit 1; }

echo ""
echo "=================================================="
echo "  TonSiteWeb — Go Live Setup"
echo "=================================================="
echo ""

# ── STEP 1: Check prerequisites ───────────────────────────────────────────────
echo "── Step 1: Checking prerequisites..."

# Check stripe live key is in CLI
LIVE_KEY=$(stripe config --project-name=tonsiteweb --list 2>/dev/null | grep "live_mode_api_key" | awk -F'=' '{print $2}' | tr -d " '")
if [ -z "$LIVE_KEY" ] || [[ "$LIVE_KEY" == *"*"* ]]; then
  fail "No live key found. Run: stripe login --project-name=tonsiteweb"
fi
ok "Stripe live key found"

# Check DB_PASSWORD
if [ -z "$DB_PASSWORD" ]; then
  warn "DB_PASSWORD not set — will skip schema push"
  warn "Set it with: export DB_PASSWORD=your_password"
  warn "Get it from: https://supabase.com/dashboard/project/hnicnupamewtitegifyw/settings/database"
  SKIP_DB=true
else
  SKIP_DB=false
fi

echo ""

# ── STEP 2: Push Supabase schema ──────────────────────────────────────────────
if [ "$SKIP_DB" = false ]; then
  echo "── Step 2: Pushing Supabase schema..."
  DB_URL="postgresql://postgres.hnicnupamewtitegifyw:${DB_PASSWORD}@aws-1-eu-central-2.pooler.supabase.com:6543/postgres"

  supabase db push --db-url "$DB_URL" 2>&1 && ok "Schema pushed to Supabase" || warn "Schema push had errors — check manually"
  echo ""
else
  warn "Skipping DB schema push (no DB_PASSWORD set)"
  echo "  → Manual fallback: Supabase Dashboard → SQL Editor → paste supabase/schema.sql"
  echo ""
fi

# ── STEP 3: Create live Stripe products + prices ──────────────────────────────
echo "── Step 3: Creating live Stripe products & prices..."

create_product() {
  stripe products create --project-name=tonsiteweb --live 2>/dev/null \
    -d name="$1" -d description="$2" \
    | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['id'])"
}
create_price_once() {
  stripe prices create --project-name=tonsiteweb --live 2>/dev/null \
    -d currency=chf -d unit_amount="$2" -d product="$1" -d nickname="$3" -d lookup_key="$3" \
    | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['id'])"
}
create_price_monthly() {
  stripe prices create --project-name=tonsiteweb --live 2>/dev/null \
    -d currency=chf -d unit_amount="$2" -d "recurring[interval]=month" \
    -d product="$1" -d nickname="$3" -d lookup_key="$3" \
    | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['id'])"
}

P500=$(create_product "Site internet 500 CHF"         "essential500")  && echo "  prod: $P500"
P999=$(create_product "Site internet 999 CHF"         "essential999")  && echo "  prod: $P999"
P1249=$(create_product "Site internet 1249 CHF"       "essential1249") && echo "  prod: $P1249"
P1500=$(create_product "Site internet 1500 CHF"       "essential1500") && echo "  prod: $P1500"
PC79=$(create_product "Care 79 — Maintenance mensuelle"   "care79")    && echo "  prod: $PC79"
PC149=$(create_product "Care 149 — Maintenance mensuelle" "care149")   && echo "  prod: $PC149"
PC249=$(create_product "Care 249 — Maintenance mensuelle" "care249")   && echo "  prod: $PC249"

PR500=$(create_price_once    "$P500"   50000  "essential500")  && echo "  price: $PR500"
PR999=$(create_price_once    "$P999"   99900  "essential999")  && echo "  price: $PR999"
PR1249=$(create_price_once   "$P1249"  124900 "essential1249") && echo "  price: $PR1249"
PR1500=$(create_price_once   "$P1500"  150000 "essential1500") && echo "  price: $PR1500"
PR79=$(create_price_monthly  "$PC79"   7900   "care79")        && echo "  price: $PR79"
PR149=$(create_price_monthly "$PC149"  14900  "care149")       && echo "  price: $PR149"
PR249=$(create_price_monthly "$PC249"  24900  "care249")       && echo "  price: $PR249"

ok "Live products & prices created"
echo ""

# ── STEP 4: Delete wrong webhooks, create the 1 correct one ──────────────────
echo "── Step 4: Fixing Stripe webhooks..."

# Delete all existing live webhooks (the 2 wrong ones)
EXISTING=$(stripe webhook_endpoints list --project-name=tonsiteweb --live 2>/dev/null \
  | python3 -c "import sys,json; [print(w['id']) for w in json.loads(sys.stdin.read())['data']]")

for WID in $EXISTING; do
  stripe webhook_endpoints delete "$WID" --project-name=tonsiteweb --live 2>/dev/null \
    && echo "  Deleted: $WID" || true
done

# Create the single correct webhook
WEBHOOK_RESULT=$(stripe webhook_endpoints create --project-name=tonsiteweb --live 2>/dev/null \
  -d url="https://tonsiteweb.ch/api/stripe-webhook" \
  -d description="tonsiteweb-live-main" \
  -d "enabled_events[]=checkout.session.completed" \
  -d "enabled_events[]=invoice.paid" \
  -d "enabled_events[]=customer.subscription.created" \
  -d "enabled_events[]=customer.subscription.deleted" \
  -d "enabled_events[]=payment_intent.payment_failed")

WEBHOOK_ID=$(echo "$WEBHOOK_RESULT" | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['id'])")
WEBHOOK_SECRET=$(echo "$WEBHOOK_RESULT" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('secret',''))")

ok "Webhook created: $WEBHOOK_ID → https://tonsiteweb.ch/api/stripe-webhook"
echo ""

# ── STEP 5: Get live publishable key ─────────────────────────────────────────
LIVE_PUB=$(stripe config --project-name=tonsiteweb --list 2>/dev/null | grep "live_mode_pub_key" | awk -F'=' '{print $2}' | tr -d " '")

# ── STEP 6: Print the .env block to copy-paste ───────────────────────────────
echo "── Step 6: Your new .env values (copy ALL of these):"
echo ""
echo "=================================================="
cat << EOF
STRIPE_SECRET_KEY=$LIVE_KEY
STRIPE_PUBLISHABLE_KEY=${LIVE_PUB:-pk_live_REPLACE_WITH_YOUR_LIVE_PUB_KEY}
STRIPE_WEBHOOK_SECRET=$WEBHOOK_SECRET

PRICE_ESSENTIAL=$PR999
PRICE_ADVANCED=$PR1249
PRICE_CARE_79=$PR79
PRICE_CARE_149=$PR149
PRICE_CARE_249=$PR249
PRICE_ESSENTIAL_999=$PR999
PRICE_ESSENTIAL_1249=$PR1249
PRICE_ESSENTIAL_1500=$PR1500
PRICE_ESSENTIAL_500=$PR500
EOF
echo "=================================================="
echo ""

# ── STEP 7: Push to Vercel ────────────────────────────────────────────────────
echo "── Step 7: Pushing to Vercel..."

push_var() {
  printf '%s' "$2" | vercel env add "$1" production --force 2>/dev/null \
    && echo "  ✅ $1" || echo "  ❌ FAILED $1"
}

push_var "STRIPE_SECRET_KEY"      "$LIVE_KEY"
push_var "STRIPE_PUBLISHABLE_KEY" "${LIVE_PUB}"
push_var "STRIPE_WEBHOOK_SECRET"  "$WEBHOOK_SECRET"
push_var "PRICE_ESSENTIAL"        "$PR999"
push_var "PRICE_ADVANCED"         "$PR1249"
push_var "PRICE_CARE_79"          "$PR79"
push_var "PRICE_CARE_149"         "$PR149"
push_var "PRICE_CARE_249"         "$PR249"
push_var "PRICE_ESSENTIAL_999"    "$PR999"
push_var "PRICE_ESSENTIAL_1249"   "$PR1249"
push_var "PRICE_ESSENTIAL_1500"   "$PR1500"
push_var "PRICE_ESSENTIAL_500"    "$PR500"

echo ""

# ── STEP 8: Redeploy ──────────────────────────────────────────────────────────
echo "── Step 8: Deploying to production..."
vercel --prod 2>&1 | tail -5
echo ""

# ── DONE ─────────────────────────────────────────────────────────────────────
ok "All done! TonSiteWeb is now LIVE."
echo ""
echo "Test payment links:"
echo "  500 CHF:   https://tonsiteweb.ch/api/checkout?plan=essential500&template=classic-clean&tenant=tonsiteweb"
echo "  Custom 1K: https://tonsiteweb.ch/api/checkout?plan=custom&amount=1000&description=Site+premium&tenant=tonsiteweb"
echo ""
echo "Check orders: https://supabase.com/dashboard/project/hnicnupamewtitegifyw/editor"
echo "Check webhook: https://dashboard.stripe.com/webhooks"
