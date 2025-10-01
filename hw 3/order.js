// ===== 1) Prices (change these if your rubric specifies different values) =====
const PRICE_DOG   = 3.75;
const PRICE_FRIES = 2.50;
const PRICE_SODA  = 1.75;

// Sales tax (Massachusetts meals tax)
const TAX_RATE = 0.0625;

// ===== Utility: safe integer from prompt (non-negative) =====
function readIntFromPrompt(message) {
  const raw = prompt(message, "0");
  const n = parseInt(raw ?? "0", 10);
  if (isNaN(n) || n < 0) return 0;
  return n;
}

// ===== 3) showMoney(x): return "d.dd" using arithmetic (no toFixed/format) =====
function showMoney(x) {
  const cents = Math.round(x * 100);
  const dollars = Math.floor(cents / 100);
  const rem = cents % 100; // 0..99
  const centsStr = rem < 10 ? "0" + rem : String(rem);
  return dollars + "." + centsStr;
}

// Helper to add $ sign
function money$(x) { return "$" + showMoney(x); }

// ===== 2) Get quantities & 4–7) Compute totals =====
function runOrder() {
  const numDogs  = readIntFromPrompt("How many hotdogs would you like?");
  const numFries = readIntFromPrompt("How many fries would you like?");
  const numSoda  = readIntFromPrompt("How many sodas would you like?");

  const dogsTotal  = numDogs  * PRICE_DOG;
  const friesTotal = numFries * PRICE_FRIES;
  const sodaTotal  = numSoda  * PRICE_SODA;

  const subtotalBefore = dogsTotal + friesTotal + sodaTotal;

  const discount = (subtotalBefore >= 30) ? (subtotalBefore * 0.10) : 0;

  const subtotalAfter = subtotalBefore - discount;

  const tax = subtotalAfter * TAX_RATE;

  const finalTotal = subtotalAfter + tax;

  // ===== 8) Display results on the page =====
  document.getElementById("pDog").textContent   = money$(PRICE_DOG);
  document.getElementById("pFries").textContent = money$(PRICE_FRIES);
  document.getElementById("pSoda").textContent  = money$(PRICE_SODA);

  const tbody = document.querySelector("#orderTable tbody");
  tbody.innerHTML = "";
  const rows = [
    { name: "Hotdogs", qty: numDogs,  total: dogsTotal },
    { name: "Fries",   qty: numFries, total: friesTotal },
    { name: "Sodas",   qty: numSoda,  total: sodaTotal }
  ];
  for (const r of rows) {
    const tr = document.createElement("tr");
    const tdItem = document.createElement("td");
    const tdQty  = document.createElement("td");
    const tdSum  = document.createElement("td");
    tdItem.textContent = r.name;
    tdQty.textContent  = r.qty;
    tdQty.className = "right";
    tdSum.textContent  = money$(r.total);
    tdSum.className = "right money";
    tr.append(tdItem, tdQty, tdSum);
    tbody.appendChild(tr);
  }

  document.getElementById("subtotalBefore").textContent = money$(subtotalBefore);
  document.getElementById("discount").textContent       = money$(discount);
  document.getElementById("subtotalAfter").textContent  = money$(subtotalAfter);
  document.getElementById("tax").textContent            = money$(tax);
  document.getElementById("final").textContent          = money$(finalTotal);
}

// Hook up button and prime the price labels on load
document.getElementById("startBtn").addEventListener("click", runOrder);
document.getElementById("pDog").textContent   = money$(PRICE_DOG);
document.getElementById("pFries").textContent = money$(PRICE_FRIES);
document.getElementById("pSoda").textContent  = money$(PRICE_SODA);
