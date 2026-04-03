import '../../styles/main.css';
import { renderNavbar, renderFooter, renderStars, getUrlParam } from '../shared.js';
import { initStore, searchGuides, getCities, getCategories, getCityName, getCategoryInfo } from '../store.js';
initStore(); renderNavbar('guide');

const cityFilter = document.getElementById('city-filter');
const genderFilter = document.getElementById('gender-filter');
const langFilter = document.getElementById('lang-filter');
getCities().forEach(c => { const o = document.createElement('option'); o.value = c.id; o.textContent = c.name; cityFilter.appendChild(o); });

const initCity = getUrlParam('city');
if (initCity) cityFilter.value = initCity;

const guideEmojis = ['👳','👩‍🏫','🧔','👩‍🎨','🧑‍🍳','👨‍🎓'];

function render() {
  const guides = searchGuides(cityFilter.value, genderFilter.value, '');
  const grid = document.getElementById('guides-grid');
  grid.innerHTML = guides.length ? guides.map((g, i) => `
    <div class="card guide-card animate-in" style="animation-delay:${i*0.05}s;">
      <div class="guide-header">
        <div class="guide-avatar" style="background:var(--bg-warm);font-size:2rem;">${guideEmojis[i % guideEmojis.length]}</div>
        <div>
          <div class="guide-name">${g.name}</div>
          <div class="guide-city">📍 <span style="color:var(--secondary);">${getCityName(g.city)}</span></div>
        </div>
      </div>
      <div class="guide-verified">
        ${g.verified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
        <span style="font-size:0.85rem;color:var(--secondary);">★ ${g.rating} · ${g.tours} trips</span>
      </div>
      <p class="guide-bio">${g.bio}</p>
      <div class="guide-specialties">${g.specialties.map(s => {
        const cat = getCategoryInfo(s);
        return `<span class="chip" style="padding:4px 12px;font-size:0.8rem;">${cat?.name || s}</span>`;
      }).join('')}</div>
      <div class="guide-langs">Speaks: ${g.languages.join(' · ')}</div>
      <div class="guide-footer">
        <div class="guide-price">From <strong>₹${g.price}</strong>/day</div>
        <a href="/booking.html?guideId=${g.id}" class="btn btn-primary btn-sm">Book Now</a>
      </div>
    </div>`).join('') : '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">No guides found.</div>';
}

[cityFilter, genderFilter, langFilter].forEach(f => f.addEventListener('change', render));
render();
renderFooter();
