import '../../styles/main.css';
import { renderNavbar, renderStars, getUrlParam } from '../shared.js';
import { initStore, searchGems, getAllGems, getCities, getCategories, getCategoryInfo, getCityName } from '../store.js';
initStore(); renderNavbar('explore');

const GEM_IMAGES = {
  culture: '/images/gem-culture.png', food: '/images/gem-food.png', nature: '/images/gem-nature.png',
  shopping: '/images/gem-market.png', adventure: '/images/gem-adventure.png', spiritual: '/images/gem-spiritual.png', art: '/images/gem-culture.png',
};

const catInfo = Object.fromEntries(getCategories().map(c => [c.id, c]));
let activeCategory = '', activeCity = getUrlParam('city') || '';

// Category pills
const filterBar = document.getElementById('filter-bar');
filterBar.innerHTML = `<button class="filter-chip active" data-cat="">All</button>` +
  getCategories().map(c => `<button class="filter-chip" data-cat="${c.id}">${c.icon} ${c.name}</button>`).join('');
filterBar.addEventListener('click', e => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  activeCategory = chip.dataset.cat;
  render();
});

// Map
const map = L.map('explore-map', { attributionControl: false, zoomControl: true }).setView([22.5, 78.9], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
let markers = L.layerGroup().addTo(map);

function render() {
  const query = document.getElementById('search-input').value;
  let gems = searchGems(query, activeCity, activeCategory);
  gems.sort((a, b) => b.rating - a.rating);

  // List
  const list = document.getElementById('gem-list');
  list.innerHTML = gems.map(gem => {
    const cat = catInfo[gem.category] || {};
    const imgSrc = GEM_IMAGES[gem.category] || GEM_IMAGES.culture;
    return `<a href="/gem-detail.html?id=${gem.id}" class="gem-list-item">
      <div class="gem-icon"><img src="${imgSrc}" alt="${gem.name}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;"></div>
      <div class="gem-info">
        <h4>${gem.name}</h4>
        <div class="gem-loc">📍 ${getCityName(gem.city)}</div>
        <div class="gem-rat">★ ${gem.rating} · ${gem.reviews} reviews</div>
      </div>
    </a>`;
  }).join('') || '<p style="padding:24px;color:var(--text-muted);text-align:center;">No gems found.</p>';

  // Map markers with labeled pins
  markers.clearLayers();
  gems.forEach(gem => {
    const cat = catInfo[gem.category] || { icon: '📍' };
    const icon = L.divIcon({
      className: 'custom-pin',
      html: `<div style="background:#fff;padding:4px 10px;border-radius:20px;display:flex;align-items:center;gap:4px;font-size:11px;box-shadow:0 2px 8px rgba(0,0,0,0.15);border:1px solid #e5ddd3;white-space:nowrap;font-family:'DM Sans',sans-serif;font-weight:500;">${cat.icon} ${gem.name.length > 14 ? gem.name.slice(0, 14) + '…' : gem.name}</div>`,
      iconSize: [0, 0], iconAnchor: [60, 16],
    });
    L.marker([gem.lat, gem.lng], { icon }).addTo(markers).bindPopup(`
      <div class="map-popup"><h4>${gem.name}</h4><p>${gem.shortDesc}</p>
      <a href="/gem-detail.html?id=${gem.id}" class="btn btn-primary btn-sm" style="font-size:0.8rem;padding:6px 12px;">View →</a></div>
    `);
  });

  if (activeCity) {
    const city = getCities().find(c => c.id === activeCity);
    if (city) map.flyTo([city.lat, city.lng], 11, { duration: 1.5 });
  }
}

document.getElementById('search-input').addEventListener('input', render);
render();

// --- Gem Genie (AI-powered vibe search) ---
const genieInput = document.getElementById('genie-input');
const genieBtn = document.getElementById('genie-btn');
const genieResults = document.getElementById('genie-results');

if (genieBtn) {
  genieBtn.addEventListener('click', () => {
    const vibe = genieInput.value.trim();
    if (!vibe) return;
    
    genieResults.style.display = 'block';
    genieResults.innerHTML = '<div style="text-align:center;padding:16px;"><div style="font-size:1.5rem;animation:float 1.5s ease-in-out infinite;">✨</div><p style="font-size:0.85rem;color:var(--text-muted);">Finding gems that match your vibe...</p></div>';
    
    setTimeout(() => {
      // Smart matching based on vibe keywords
      const allGems = getAllGems();
      const vibeWords = vibe.toLowerCase();
      const vibeMap = {
        'food|eat|chai|lassi|street|spice|taste|hungry|delicious|biryani': 'food',
        'peace|quiet|calm|relax|serene|nature|green|garden|lake': 'nature',
        'temple|spiritual|pray|meditation|ashram|ghat|holy': 'spiritual',
        'heritage|history|old|ancient|fort|palace|monument|culture': 'culture',
        'adventure|trek|hike|cliff|mountain|explore|thrill': 'adventure',
        'shop|market|bazaar|buy|craft|art|handloom': 'shopping',
      };
      
      let matchedCategory = '';
      for (const [keywords, cat] of Object.entries(vibeMap)) {
        if (new RegExp(keywords).test(vibeWords)) { matchedCategory = cat; break; }
      }
      
      let matched = matchedCategory ? allGems.filter(g => g.category === matchedCategory) : allGems;
      matched = matched.sort((a, b) => b.rating - a.rating).slice(0, 3);
      
      genieResults.innerHTML = `
        <div style="padding:8px;">
          <h4 style="margin-bottom:12px;font-size:0.95rem;">✨ Gems matching "${vibe}"</h4>
          ${matched.map(gem => {
            const cat = catInfo[gem.category] || {};
            return `<a href="/gem-detail.html?id=${gem.id}" style="display:flex;gap:12px;padding:10px;border-radius:var(--radius-md);transition:var(--transition);text-decoration:none;" onmouseover="this.style.background='var(--surface-hover)'" onmouseout="this.style.background='transparent'">
              <img src="${GEM_IMAGES[gem.category] || GEM_IMAGES.culture}" style="width:48px;height:48px;border-radius:8px;object-fit:cover;">
              <div><div style="font-weight:600;font-size:0.9rem;color:var(--text);">${gem.name}</div><div style="font-size:0.8rem;color:var(--text-muted);">📍 ${getCityName(gem.city)} · ★ ${gem.rating}</div><div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">${gem.shortDesc}</div></div>
            </a>`;
          }).join('')}
          <div style="border-top:1px solid var(--border-light);padding-top:8px;margin-top:8px;text-align:center;">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('search-input').value='${matchedCategory}';document.getElementById('genie-results').style.display='none';">Show all on map</button>
          </div>
        </div>`;
    }, 1500);
  });
}

// Close genie results when clicking outside
document.addEventListener('click', (e) => {
  if (genieResults && !e.target.closest('.vibe-search') && !e.target.closest('#genie-results')) {
    genieResults.style.display = 'none';
  }
});
