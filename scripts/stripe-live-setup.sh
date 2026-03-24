#!/bin/bash
# =============================================================================
# TonSiteWeb — Stripe LIVE MODE setup script
# Run ONCE after you get your sk_live_ key from the Stripe dashboard
#
# Usage:
#   export STRIPE_LIVE_KEY=sk_live_51SOelQK...
#   bash scripts/stripe-live-setup.sh
#
# What this does:
#   1. Creates all products + prices in LIVE mode
#   2. Creates the webhook endpoint pointing to tonsiteweb.ch
#   3. Prints the exact .env block to copy-paste
# =============================================================================

set -e

if [ -z "$STRIPE_LIVE_KEY" ]; then
  echo "❌ Missing STRIPE_LIVE_KEY"
  echo "   Run: export STRIPE_LIVE_KEY=sk_live_51SOelQK..."
  exit 1
fi

SK="$STRIPE_LIVE_KEY"
echo "✅ Using live key: ${SK:0:20}..."
echo ""

# Helper: create product, return ID
create_product() {
  local name="$1"
  local desc="$2"
  stripe products create --api-key="$SK" \
    -d name="$name" \
    -d description="$desc" 2>/dev/null \
    | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['id'])"
}

# Helper: create one-time price, return ID
create_price_once() {
  local prod="$1"
  local amount="$2"  # in centimes (500 CHF = 50000)
  local key="$3"
  stripe prices create --api-key="$SK" \
    -d currency=chf \
    -d unit_amount="$amount" \
    -d product="$prod" \
    -d nickname="$key" \
    -d lookup_key="$key" 2>/dev/null \
    | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['id'])"
}

# Helper: create monthly subscription price, return ID
create_price_monthly() {
  local prod="$1"
  local amount="$2"
  local key="$3"
  stripe prices create --api-key="$SK" \
    -d currency=chf \
    -d unit_amount="$amount" \
    -d "recurring[interval]=month" \
    -d product="$prod" \
    -d nickname="$key" \
    -d lookup_key="$key" 2>/dev/null \
    | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['id'])"
}

echo "📦 Creating products..."

P500=$(create_product "Site internet 500 CHF" "essential500")
P999=$(create_product "Site internet 999 CHF" "essential999")
P1249=$(create_product "Site internet 1249 CHF" "essential1249")
P1500=$(create_product "Site internet 1500 CHF" "essential1500")
PC79=$(create_product "Care 79 — Maintenance mensuelle" "care79")
PC149=$(create_product "Care 149 — Maintenance mensuelle" "care149")
PC249=$(create_product "Care 249 — Maintenance mensuelle" "care249")

echo "✅ Products created."
echo ""
echo "💰 Creating prices..."

PR500=$(create_price_once "$P500" 50000 "essential500")
PR999=$(create_price_once "$P999" 99900 "essential999")
PR1249=$(create_price_once "$P1249" 124900 "essential1249")
PR1500=$(create_price_once "$P1500" 150000 "essential1500")
PR79=$(create_price_monthly "$PC79" 7900 "care79")
PR149=$(create_price_monthly "$PC149" 14900 "care149")
PR249=$(create_price_monthly "$PC249" 24900 "care249")

echo "✅ Prices created."
echo ""

echo "🔗 Creating live webhook endpoint..."

WEBHOOK_RESULT=$(stripe webhook_endpoints create --api-key="$SK" \
  -d url="https://tonsiteweb.ch/api/stripe-webhook" \
  -d description="tonsiteweb-live" \
  -d "enabled_events[]=checkout.session.completed" \
  -d "enabled_events[]=invoice.paid" \
  -d "enabled_events[]=customer.subscription.created" \
  -d "enabled_events[]=customer.subscription.deleted" \
  -d "enabled_events[]=payment_intent.payment_failed" \
  2>/dev/null)

WEBHOOK_ID=$(echo "$WEBHOOK_RESULT" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d['id'])")
WEBHOOK_SECRET=$(echo "$WEBHOOK_RESULT" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('secret','NOT_RETURNED_use_dashboard'))")

echo "✅ Webhook created: $WEBHOOK_ID"
echo ""
echo "============================================================"
echo "✅ COPY THIS INTO YOUR .env (replace the Stripe section):"
echo "============================================================"
echo ""
echo "STRIPE_SECRET_KEY=$STRIPE_LIVE_KEY"
echo "STRIPE_PUBLISHABLE_KEY=pk_live_51SOelQK_REPLACE_WITH_YOUR_LIVE_PUB_KEY"
echo "STRIPE_WEBHOOK_SECRET=$WEBHOOK_SECRET"
echo ""
echo "PRICE_ESSENTIAL=$PR999"
echo "PRICE_ADVANCED=$PR1249"
echo "PRICE_CARE_79=$PR79"
echo "PRICE_CARE_149=$PR149"
echo "PRICE_CARE_249=$PR249"
echo "PRICE_ESSENTIAL_999=$PR999"
echo "PRICE_ESSENTIAL_1249=$PR1249"
echo "PRICE_ESSENTIAL_1500=$PR1500"
echo "PRICE_ESSENTIAL_500=$PR500"
echo ""
echo "============================================================"
echo "⚠️  Also replace STRIPE_PUBLISHABLE_KEY with your live pk_live_ key"
echo "   Get it from: https://dashboard.stripe.com/apikeys"
echo "============================================================"
