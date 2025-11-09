#!/bin/zsh
# ================================================================
# 🧠 tonsiteweb.ch - Full backend health & CRUD test
# ================================================================
# Usage: ./test_orders.sh
# Requires: curl, jq, pbcopy, date
# ================================================================

BASE_URL="https://www.tonsiteweb.ch"
REPORT_FILE="/tmp/orders_test_report_$(date +%s).log"
TMP_ID=""

echo "🧪 Running full Tonsiteweb backend test..." > $REPORT_FILE
echo "🔗 Target: $BASE_URL" >> $REPORT_FILE
echo "⏰ Started at: $(date)" >> $REPORT_FILE
echo "-------------------------------------------------------------" >> $REPORT_FILE

# 1️⃣ HEALTH CHECK
echo "🌡️ Checking /api/health..." >> $REPORT_FILE
curl -s "$BASE_URL/api/health" | jq '.' >> $REPORT_FILE 2>/dev/null || echo "❌ Failed health check" >> $REPORT_FILE

# 2️⃣ CREATE ORDER
echo "\n🧾 Creating test order..." >> $REPORT_FILE
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/backend/orders" \
  -H "Content-Type: application/json" \
  -d '{"customer_id":"test-customer-123","total":99.99,"status":"draft"}')
echo $CREATE_RESPONSE | jq '.' >> $REPORT_FILE 2>/dev/null

# extract id (assuming JSON: { "order": { "id": ... } })
TMP_ID=$(echo $CREATE_RESPONSE | jq -r '.order.id // empty')

if [ -z "$TMP_ID" ]; then
  echo "❌ Could not create order" >> $REPORT_FILE
else
  echo "✅ Created order ID: $TMP_ID" >> $REPORT_FILE
fi

# 3️⃣ FETCH ORDER
if [ -n "$TMP_ID" ]; then
  echo "\n🔍 Fetching order..." >> $REPORT_FILE
  curl -s "$BASE_URL/api/backend/orders/$TMP_ID" | jq '.' >> $REPORT_FILE 2>/dev/null

  # 4️⃣ UPDATE ORDER
  echo "\n✏️ Updating order..." >> $REPORT_FILE
  curl -s -X PUT "$BASE_URL/api/backend/orders/$TMP_ID" \
    -H "Content-Type: application/json" \
    -d '{"status":"paid","total":149.90}' | jq '.' >> $REPORT_FILE 2>/dev/null

  # 5️⃣ DELETE ORDER
  echo "\n🗑️ Deleting order..." >> $REPORT_FILE
  curl -s -X DELETE "$BASE_URL/api/backend/orders/$TMP_ID" | jq '.' >> $REPORT_FILE 2>/dev/null
fi

echo "\n-------------------------------------------------------------" >> $REPORT_FILE
echo "✅ Test completed at: $(date)" >> $REPORT_FILE
echo "📄 Report saved at: $REPORT_FILE" >> $REPORT_FILE

# Copy to clipboard
cat $REPORT_FILE | pbcopy
echo "📋 Report copied to clipboard!"
