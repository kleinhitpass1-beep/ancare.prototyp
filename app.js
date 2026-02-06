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
const COMMUNITY_KEY = "anker_community_v1";
const PODCAST_KEY = "anker_podcast_v1";

function loadCommunityPosts(){
  try{
    return JSON.parse(localStorage.getItem(COMMUNITY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCommunityPosts(posts){
  localStorage.setItem(COMMUNITY_KEY, JSON.stringify(posts));
}

function seedCommunityPosts(){
  const existing = loadCommunityPosts();
  if(existing.length > 0) return;

  const now = Date.now();
  const demo = [
    {
      id: "p1",
      author: "Team Anker",
      topic: "rituale",
      title: "Mein Zwei Minuten Reset vor Meetings",
      body: "Kurz riechen, 4 6 Atmung, dann eine klare nächste Aktion. Hilft mir, nicht zu hetzen.",
      likes: 3,
      comments: [{ author: "Maurice", text: "Sehr gut. Genau so simpel muss es sein.", createdAt: now - 20000 }],
      createdAt: now - 86400000
    },
    {
      id: "p2",
      author: "Anonym",
      topic: "schlaf",
      title: "Abendroutine ohne Druck",
      body: "Ich mache nur zwei Dinge: Licht runter und einen ruhigen Moment. Alles andere ist Bonus.",
      likes: 5,
      comments: [],
      createdAt: now - 3600000
    },
    {
      id: "p3",
      author: "Community",
      topic: "fragen",
      title: "Welche Situationen sind für euch am schwierigsten",
      body: "Ich suche konkrete Ideen: morgens, unterwegs, vor Gesprächen. Was triggert euch am meisten",
      likes: 1,
      comments: [],
      createdAt: now - 120000
    }
  ];

  saveCommunityPosts(demo);
}

function loadPodcastEpisodes(){
  try{
    return JSON.parse(localStorage.getItem(PODCAST_KEY) || "[]");
  } catch {
    return [];
  }
}

function savePodcastEpisodes(eps){
  localStorage.setItem(PODCAST_KEY, JSON.stringify(eps));
}

function seedPodcastEpisodes(){
  const existing = loadPodcastEpisodes();
  if(existing.length > 0) return;

  const now = Date.now();
  const demo = [
{
  id: "e1",
  number: "01",
  title: "Der Ankerstick im Detail",
  teaser: "Wir erforschen worum es sich bei dem Produkt Ankerstick handelt.",
  duration: "12 min",
  publishedAt: now - 10 * 86400000,
  description: "Was und wer steckt hinter dieser faszinierenden Idee?",
  audioUrl: "episode01.mp3",
  spotifyUrl: "#",
  appleUrl: "#",
  webUrl: "#"
},
    {
      id: "e2",
      number: "02",
      title: "Unruhe verstehen, ohne sie zu bekämpfen",
      teaser: "Warum Kontrolle oft Druck erzeugt und was besser funktioniert.",
      duration: "12 min",
      publishedAt: now - 6 * 86400000,
      description: "Du bekommst eine ruhige Perspektive und zwei praktische Mikro Impulse, die sich leicht umsetzen lassen.",
      audioUrl: "",
      spotifyUrl: "#",
      appleUrl: "#",
      webUrl: "#"
    },
    {
      id: "e3",
      number: "03",
      title: "Fokus starten: die erste Minute zählt",
      teaser: "Eine kleine Startsequenz für Deep Work und saubere Übergänge.",
      duration: "9 min",
      publishedAt: now - 2 * 86400000,
      description: "Wir bauen eine kurze Startsequenz, die dich in Handlung bringt. Kein Perfektionismus, nur Richtung.",
      audioUrl: "",
      spotifyUrl: "#",
      appleUrl: "#",
      webUrl: "#"
    }
  ];

  savePodcastEpisodes(demo);
}
