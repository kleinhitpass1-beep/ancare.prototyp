const CART_KEY = "anker_cart_v1";

function loadCart(){
  try{
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartCount(){
  const cart = loadCart();
  return cart.reduce((s, i) => s + (i.qty || 0), 0);
}

function setCartBadge(){
  const el = document.getElementById("cartCount");
  if(el) el.textContent = String(cartCount());
}

function addToCart(item){
  const cart = loadCart();
  const existing = cart.find(x => x.id === item.id);
  if(existing){
    existing.qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }
  saveCart(cart);
  setCartBadge();
}

function moneyEUR(n){
  const fixed = (Math.round(n * 100) / 100).toFixed(2);
  return fixed.replace(".", ",") + " EUR";
}

function renderMiniCart(){
  const wrap = document.getElementById("miniCart");
  const totalEl = document.getElementById("miniCartTotal");
  if(!wrap || !totalEl) return;

  const cart = loadCart();
  if(cart.length === 0){
    wrap.innerHTML = `<p style="margin:0; color:var(--muted); font-size:13.5px">Warenkorb ist noch leer.</p>`;
    totalEl.textContent = moneyEUR(0);
    return;
  }

  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  totalEl.textContent = moneyEUR(total);

  wrap.innerHTML = cart.map(i => `
    <div style="display:flex; justify-content:space-between; gap:12px; padding:10px 0; border-bottom:1px solid var(--line)">
      <div>
        <div style="font-weight:800; font-size:13.5px">${i.name}</div>
        <div style="color:var(--muted); font-size:12.5px; margin-top:4px">${i.note || ""}</div>
      </div>
      <div style="text-align:right">
        <div style="font-family:var(--mono); font-size:12.5px">${i.qty} x ${moneyEUR(i.price)}</div>
      </div>
    </div>
  `).join("");
}

function clearCart(){
  saveCart([]);
  setCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  setCartBadge();
  renderMiniCart();
});
