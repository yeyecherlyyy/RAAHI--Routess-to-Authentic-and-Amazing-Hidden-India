// RAAHI - Home Page (with Map, Community, Buddies, Route Customizer)
import '../../styles/main.css';
import { renderNavbar, renderFooter, renderStars } from '../shared.js';
import { initStore, getAllGems, getTopGems, getCities, getCategories, getCategoryInfo, getCityName } from '../store.js';

initStore();
renderNavbar('home');

const GEM_IMAGES = {
  culture: '/images/gem-culture.png',
  food: '/images/gem-food.png',
  nature: '/images/gem-nature.png',
  shopping: '/images/gem-market.png',
  adventure: '/images/gem-adventure.png',
  spiritual: '/images/gem-spiritual.png',
  art: '/images/gem-culture.png',
};

// --- Category Filter ---
const catInfo = Object.fromEntries(getCategories().map(c => [c.id, c]));
const filterBar = document.getElementById('filter-bar');
let activeCategory = '';
filterBar.innerHTML = `<button class="filter-chip active" data-cat="">🌟 All</button>` +
  getCategories().map(c => `<button class="filter-chip" data-cat="${c.id}">${c.icon} ${c.name}</button>`).join('');

filterBar.addEventListener('click', e => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  activeCategory = chip.dataset.cat;
  renderGems();
});

function renderGems() {
  let gems = activeCategory ? getAllGems().filter(g => g.category === activeCategory) : getAllGems();
  gems = gems.sort((a, b) => b.rating - a.rating).slice(0, 6);
  const grid = document.getElementById('top-gems-grid');
  grid.innerHTML = gems.map((gem, i) => {
    const cat = catInfo[gem.category] || {};
    const cityName = getCityName(gem.city);
    const isTop = gem.rating >= 4.5;
    const imgSrc = GEM_IMAGES[gem.category] || GEM_IMAGES.culture;
    return `
    <a href="/gem-detail.html?id=${gem.id}" class="card gem-card animate-in" style="animation-delay:${i * 0.05}s;">
      ${isTop ? '<span class="gem-badge gem-badge-top">⭐ TOP RATED</span>' : '<span class="gem-badge gem-badge-new">✨ NEW</span>'}
      <div class="gem-illustration"><img src="${imgSrc}" alt="${gem.name}" style="height:140px;width:auto;object-fit:contain;"></div>
      <div class="gem-meta">
        <span class="gem-category">${(cat.name || gem.category).toUpperCase()}</span>
        <span class="gem-location">📍 ${cityName}</span>
      </div>
      <h3 class="gem-title">${gem.name}</h3>
      <div class="gem-rating">${renderStars(gem.rating)} <span style="margin-left:4px;">${gem.rating} (${gem.reviews})</span></div>
      <p class="gem-desc">${gem.description}</p>
      <p class="gem-author">By <strong>${gem.submittedBy}</strong>, Local Resident</p>
    </a>`;
  }).join('');
}
renderGems();

// --- Hero Map ---
const map = L.map('hero-map', { zoomControl: true, attributionControl: false }).setView([22.5, 78.9], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);

getAllGems().forEach(gem => {
  const cat = catInfo[gem.category] || { icon: '📍', color: '#c45a3c' };
  const icon = L.divIcon({
    className: 'custom-pin',
    html: `<div style="background:#fff;padding:4px 10px;border-radius:20px;display:flex;align-items:center;gap:4px;font-size:11px;box-shadow:0 2px 8px rgba(0,0,0,0.15);border:1px solid #e5ddd3;white-space:nowrap;font-family:'DM Sans',sans-serif;font-weight:500;cursor:pointer;">${cat.icon} ${gem.name.length > 14 ? gem.name.slice(0, 14) + '…' : gem.name}</div>`,
    iconSize: [0, 0], iconAnchor: [60, 16],
  });
  L.marker([gem.lat, gem.lng], { icon }).addTo(map).bindPopup(`
    <div class="map-popup"><h4>${gem.name}</h4><p>${gem.shortDesc}</p>
    <a href="/gem-detail.html?id=${gem.id}" class="btn btn-primary btn-sm" style="font-size:0.8rem;padding:6px 14px;">View Details →</a></div>
  `);
});

// --- Community Feed ---
const feedPosts = [
  { user: 'Ananya S.', text: 'Agrasen Ki Baoli in Delhi is unreal 🤯 The geometry of the steps is otherworldly. A must-visit!', time: '2h ago', likes: 24 },
  { user: 'FoodieExplorer', text: 'Blue Lassi Shop in Varanasi changed my life. 80 flavors! 🤤', time: '5h ago', likes: 67 },
  { user: 'SoloBackpacker', text: 'Divar Island, Goa — no tourists, no cars, just pure peace. Found it on RAAHI!', time: '1d ago', likes: 89 },
];
const feedColors = ['#2d6b4f', '#c45a3c', '#3c7a8c'];
document.getElementById('community-feed').innerHTML = feedPosts.map((p, i) => `
  <div class="card feed-card" style="margin-bottom:12px;">
    <div class="feed-avatar" style="background:${feedColors[i]};">${p.user.charAt(0)}</div>
    <div class="feed-content">
      <div style="display:flex;justify-content:space-between;"><span class="feed-name">${p.user}</span><span class="feed-time">${p.time}</span></div>
      <p class="feed-text">${p.text}</p>
      <div class="feed-actions"><span class="feed-action">❤️ ${p.likes}</span><span class="feed-action">💬 Reply</span></div>
    </div>
  </div>
`).join('');

// --- Travel Buddies ---
const buddies = [
  { name: 'Riya M.', route: 'Mumbai → Jaipur', dates: 'Apr 10-13', interests: ['Culture', 'Food'], color: '#2d6b4f' },
  { name: 'Alex K.', route: 'Delhi → Varanasi', dates: 'Apr 8-11', interests: ['Spiritual', 'Food'], color: '#c45a3c' },
  { name: 'Neha V.', route: 'Bangalore → Goa', dates: 'Apr 15-18', interests: ['Nature', 'Adventure'], color: '#8b6914' },
  { name: 'Sam D.', route: 'Kolkata → Udaipur', dates: 'Apr 20-24', interests: ['Culture', 'Art'], color: '#3c7a8c' },
];
document.getElementById('buddy-list').innerHTML = buddies.map(b => `
  <div class="card" style="padding:16px;margin-bottom:10px;display:flex;align-items:center;gap:14px;">
    <div style="width:44px;height:44px;border-radius:50%;background:${b.color};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;flex-shrink:0;">${b.name.charAt(0)}</div>
    <div style="flex:1;">
      <div style="font-weight:600;font-size:0.95rem;">${b.name}</div>
      <div style="font-size:0.8rem;color:var(--text-muted);">📍 ${b.route} · 📅 ${b.dates}</div>
      <div style="display:flex;gap:4px;margin-top:4px;">${b.interests.map(i => `<span class="badge badge-top" style="font-size:0.7rem;padding:2px 8px;">${i}</span>`).join('')}</div>
    </div>
    <button class="btn btn-outline btn-sm" style="font-size:0.8rem;">Connect</button>
  </div>
`).join('');

// --- Route Customizer interactions ---
document.querySelectorAll('.section .filter-bar .filter-chip').forEach(c => {
  c.addEventListener('click', (e) => {
    if (e.target.closest('#filter-bar')) return; // skip main filter
    const parent = e.target.closest('.filter-bar');
    if (parent) {
      parent.querySelectorAll('.filter-chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
    }
  });
});

// --- AI Route Suggestion ---
document.getElementById('ai-suggest-btn')?.addEventListener('click', () => {
  const prompt = document.getElementById('ai-prompt').value;
  const result = document.getElementById('ai-result');
  if (!prompt.trim()) { result.innerHTML = '<p style="color:var(--primary);">Please describe your travel preferences.</p>'; return; }
  result.innerHTML = '<div style="text-align:center;padding:20px;"><div style="font-size:2rem;animation:float 1.5s ease-in-out infinite;">✨</div><p style="color:var(--text-muted);">Generating your perfect route...</p></div>';
  setTimeout(() => {
    result.innerHTML = `
      <div class="card" style="padding:20px;background:var(--bg-warm);">
        <h4 style="margin-bottom:12px;">🗺️ Your Custom Route</h4>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;gap:12px;align-items:start;">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--secondary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;flex-shrink:0;">1</div>
            <div><strong>Day 1 — Jaipur</strong><br><span style="color:var(--text-secondary);font-size:0.9rem;">Morning: Nahargarh Fort (sunrise view) · Afternoon: Johri Bazaar Lassi Wala · Evening: Patrika Gate at sunset</span></div>
          </div>
          <div style="display:flex;gap:12px;align-items:start;">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--secondary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;flex-shrink:0;">2</div>
            <div><strong>Day 2 — Ajmer & Pushkar</strong><br><span style="color:var(--text-secondary);font-size:0.9rem;">Morning: Purana Bazaar (spice market) · Afternoon: Pushkar Rooftop Chai · Evening: Pushkar Lake aarti</span></div>
          </div>
          <div style="display:flex;gap:12px;align-items:start;">
            <div style="width:28px;height:28px;border-radius:50%;background:var(--secondary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;flex-shrink:0;">3</div>
            <div><strong>Day 3 — Udaipur</strong><br><span style="color:var(--text-secondary);font-size:0.9rem;">Morning: City Palace hidden gardens · Afternoon: Chandpole Art Walk · Evening: Lake Pichola boat ride</span></div>
          </div>
        </div>
        <div style="display:flex;gap:8px;margin-top:16px;">
          <a href="/explore.html" class="btn btn-primary btn-sm">View on Map</a>
          <a href="/find-guide.html" class="btn btn-outline btn-sm">Find Guide for this Route</a>
        </div>
      </div>`;
  }, 2000);
});

// --- Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.animationPlayState = 'running'; observer.unobserve(entry.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-in').forEach(el => { el.style.animationPlayState = 'paused'; observer.observe(el); });

renderFooter();
