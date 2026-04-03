import '../../styles/main.css';
import { renderNavbar, renderFooter, renderStars, getUrlParam, showToast } from '../shared.js';
import { initStore, getGemById, getCityName, getCategoryInfo, getGuidesByCity, getReviews } from '../store.js';
initStore(); renderNavbar('explore');

const GEM_IMAGES = {
  culture: '/images/gem-culture.png', food: '/images/gem-food.png', nature: '/images/gem-nature.png',
  shopping: '/images/gem-market.png', adventure: '/images/gem-adventure.png', spiritual: '/images/gem-spiritual.png', art: '/images/gem-culture.png',
};

const content = document.getElementById('gem-content');
const gem = getGemById(getUrlParam('id'));
if (!gem) { content.innerHTML = '<div style="text-align:center;padding:100px 0;"><h2>Gem not found</h2><a href="/explore.html" class="btn btn-primary" style="margin-top:16px;">Explore Map →</a></div>'; }
else {
  const cat = getCategoryInfo(gem.category) || {};
  const cityName = getCityName(gem.city);
  const guides = getGuidesByCity(gem.city);
  const imgSrc = GEM_IMAGES[gem.category] || GEM_IMAGES.culture;
  content.innerHTML = `
    <a href="/explore.html" class="btn btn-ghost" style="margin-bottom:16px;">← Back to Explore</a>
    <div class="grid-2" style="gap:40px;grid-template-columns:1.4fr 0.6fr;">
      <div class="animate-in">
        <div class="card" style="padding:0;margin-bottom:24px;">
          <div style="background:${gem.gradient};height:280px;display:flex;align-items:center;justify-content:center;position:relative;border-radius:var(--radius-lg) var(--radius-lg) 0 0;overflow:hidden;">
            <img src="${imgSrc}" alt="${gem.name}" style="height:220px;object-fit:contain;opacity:0.85;">
            <div style="position:absolute;top:16px;left:16px;display:flex;gap:8px;">
              <span class="badge badge-verified">${cat.icon} ${cat.name || gem.category}</span>
              ${gem.verified ? '<span class="badge badge-top">✓ Verified</span>' : ''}
            </div>
          </div>
        </div>
        <h1 style="margin-bottom:8px;">${gem.name}</h1>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;">
          <span style="color:var(--text-secondary);">📍 ${cityName}</span>
          <span>${renderStars(gem.rating)} <span style="color:var(--text-secondary);font-size:0.9rem;margin-left:4px;">${gem.rating} (${gem.reviews} reviews)</span></span>
        </div>
        <p style="font-size:1.05rem;line-height:1.8;color:var(--text-secondary);margin-bottom:32px;">${gem.description}</p>
        <div class="card" style="padding:24px;background:var(--bg-warm);margin-bottom:32px;">
          <h4>💡 Local Tips</h4>
          <p style="margin-top:8px;color:var(--text-secondary);">${gem.tips}</p>
        </div>
        <p style="font-size:0.9rem;color:var(--text-muted);">Submitted by <strong style="color:var(--secondary);">${gem.submittedBy}</strong></p>
      </div>
      <div>
        <div class="card animate-in animate-delay-1" style="padding:20px;margin-bottom:20px;">
          <h4 style="margin-bottom:12px;">📍 Location</h4>
          <div class="map-container" style="height:200px;margin-bottom:8px;"><div id="detail-map" style="height:100%;width:100%;"></div></div>
        </div>
        <div class="card animate-in animate-delay-2" style="padding:20px;margin-bottom:20px;">
          <h4 style="margin-bottom:12px;">🤝 Guides in ${cityName}</h4>
          ${guides.slice(0,3).map(g => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border-light);">
              <div><div style="font-weight:600;font-size:0.9rem;">${g.name} ${g.verified?'<span style="color:var(--secondary);">✓</span>':''}</div><div style="font-size:0.8rem;color:var(--text-muted);">★ ${g.rating} · ${g.tours} trips</div></div>
              <a href="/booking.html?guideId=${g.id}" class="btn btn-primary btn-sm">Book</a>
            </div>`).join('')}
          <a href="/find-guide.html?city=${gem.city}" class="btn btn-ghost btn-sm" style="width:100%;justify-content:center;margin-top:8px;">View All Guides →</a>
        </div>
        <div class="card animate-in animate-delay-3" style="padding:20px;">
          <h4 style="margin-bottom:12px;">Share This Gem</h4>
          <div style="display:flex;gap:8px;"><button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText(window.location.href);import('../shared.js').then(m=>m.showToast('Link copied!'))">📋 Copy Link</button><button class="btn btn-outline btn-sm">🐦 Tweet</button></div>
        </div>
      </div>
    </div>`;
  setTimeout(() => {
    const map = L.map('detail-map', { zoomControl: false, attributionControl: false }).setView([gem.lat, gem.lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([gem.lat, gem.lng]).addTo(map);
  }, 100);
}
renderFooter();
