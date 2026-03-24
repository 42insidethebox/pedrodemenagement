# Stripe Products — TonSiteWeb

**Account:** `acct_1SOelQKAnSCZ5xnz` · tonsiteweb sandbox
**Mode:** TEST (all `livemode: false`) — run `scripts/stripe-live-setup.sh` to duplicate in live
**Currency:** CHF
**Webhook:** `https://tonsiteweb.ch/api/stripe-webhook`

---

## Products & Prices

| Plan key | Product name | Price ID | Amount | Currency | Billing | Stripe mode | Lookup key | `.env` var | Live? |
|---|---|---|---|---|---|---|---|---|---|
| `essential500` | Site internet 500 CHF | `price_1TEaLUKAnSCZ5xnzbHJCzxV3` | **500** | CHF | one-time | payment | `essential500` | `PRICE_ESSENTIAL_500` | ❌ test |
| `essential999` | Essential 999 | `price_1SP2CoKAnSCZ5xnzNFJ5NTso` | **999** | CHF | one-time | payment | `essential999` | `PRICE_ESSENTIAL_999` · `PRICE_ESSENTIAL` | ❌ test |
| `essential1249` | essential1249 | `price_1SP2IvKAnSCZ5xnztKkbI2wN` | **1 249** | CHF | one-time | payment | `essential1249` | `PRICE_ESSENTIAL_1249` · `PRICE_ADVANCED` | ❌ test |
| `essential1500` | essential1500 | `price_1SP2LbKAnSCZ5xnzt28r5Fxp` | **1 500** | CHF | one-time | payment | `essential1500` | `PRICE_ESSENTIAL_1500` | ❌ test |
| `care79` | Care 79 Plan | `price_1SP1y7KAnSCZ5xnz0wL2dr6z` | **79** | CHF | monthly | subscription | `care79` | `PRICE_CARE_79` | ❌ test |
| `care149` | Care 149 Plan | `price_1SQ8TtKAnSCZ5xnz6Uuup7Ie` | **149** | CHF | monthly | subscription | `care149` | `PRICE_CARE_149` | ❌ test |
| `care249` | Care 249 Plan | `price_1TEaLoKAnSCZ5xnzIMA4Vkcu` | **249** | CHF | monthly | subscription | `care249` | `PRICE_CARE_249` | ❌ test |

---

## Webhook

| ID | URL | Events | Mode | Status |
|---|---|---|---|---|
| `we_1SOfMRKAnSCZ5xnzLq3dVBDP` | `https://tonsiteweb.ch/api/stripe-webhook` | `checkout.session.completed` · `invoice.paid` · `customer.subscription.created` · `customer.subscription.deleted` · `payment_intent.payment_failed` | test | ✅ enabled |

---

## .env mapping (test)

```env
STRIPE_SECRET_KEY=sk_test_51SOelQK...
STRIPE_PUBLISHABLE_KEY=pk_test_51SOelQK...
STRIPE_WEBHOOK_SECRET=whsec_f537...

PRICE_ESSENTIAL=price_1SP2CoKAnSCZ5xnzNFJ5NTso
PRICE_ADVANCED=price_1SP2IvKAnSCZ5xnztKkbI2wN
PRICE_CARE_79=price_1SP1y7KAnSCZ5xnz0wL2dr6z
PRICE_CARE_149=price_1SQ8TtKAnSCZ5xnz6Uuup7Ie
PRICE_CARE_249=price_1TEaLoKAnSCZ5xnzIMA4Vkcu
PRICE_ESSENTIAL_999=price_1SP2CoKAnSCZ5xnzNFJ5NTso
PRICE_ESSENTIAL_1249=price_1SP2IvKAnSCZ5xnztKkbI2wN
PRICE_ESSENTIAL_1500=price_1SP2LbKAnSCZ5xnzt28r5Fxp
PRICE_ESSENTIAL_500=price_1TEaLUKAnSCZ5xnzbHJCzxV3
```

---

## Go live checklist

- [ ] Get `sk_live_51SOelQK...` from [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
- [ ] `export STRIPE_LIVE_KEY=sk_live_... && bash scripts/stripe-live-setup.sh`
- [ ] Paste output into `.env` (replaces all STRIPE_* and PRICE_* vars)
- [ ] Push `.env` to Vercel: `vercel env pull` / update in Vercel dashboard
- [ ] Redeploy: `vercel --prod`
- [ ] Rename Stripe account "tonsiteweb sandbox" → "TonSiteWeb": [https://dashboard.stripe.com/settings/business](https://dashboard.stripe.com/settings/business)
