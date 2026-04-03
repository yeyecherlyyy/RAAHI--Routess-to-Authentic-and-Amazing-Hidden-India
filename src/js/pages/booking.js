import '../../styles/main.css';
import { renderNavbar, renderFooter, renderStars, getUrlParam, showToast } from '../shared.js';
import { initStore, getGuideById, getGemsByCity, addBooking, getCurrentUser, getCityName, getCategoryInfo } from '../store.js';
initStore(); renderNavbar('');

const content = document.getElementById('booking-content');
const guideId = getUrlParam('guideId');
const guide = getGuideById(guideId);

const GEM_IMAGES = {
  culture: '/images/gem-culture.png', food: '/images/gem-food.png', nature: '/images/gem-nature.png',
  shopping: '/images/gem-market.png', adventure: '/images/gem-adventure.png', spiritual: '/images/gem-spiritual.png', art: '/images/gem-culture.png',
};

if (!guide) {
  content.innerHTML = '<div style="text-align:center;padding:100px 0;"><h2>Guide not found</h2><p style="color:var(--text-secondary);margin:16px 0;">Please select a guide from Find Guides.</p><a href="/find-guide.html" class="btn btn-primary">Find Guides →</a></div>';
} else {
  const cityGems = getGemsByCity(guide.city);
  let selectedGems = cityGems.slice(0, 3).map(g => g.id);
  let itinerary = [];

  function buildItinerary() {
    const chosen = cityGems.filter(g => selectedGems.includes(g.id));
    itinerary = [];
    const perDay = Math.ceil(chosen.length / 2);
    for (let d = 0; d < Math.ceil(chosen.length / perDay); d++) {
      const dayGems = chosen.slice(d * perDay, (d + 1) * perDay);
      itinerary.push({
        day: d + 1,
        morning: dayGems[0] || null,
        afternoon: dayGems[1] || null,
        evening: dayGems[2] || null,
      });
    }
    if (itinerary.length === 0) itinerary.push({ day: 1, morning: null, afternoon: null, evening: null });
    return itinerary;
  }

  function renderPage() {
    buildItinerary();
    content.innerHTML = `
      <a href="/find-guide.html" class="btn btn-ghost" style="margin-bottom:16px;">← Back to Guides</a>
      <div class="section-header animate-in"><p class="label">BOOK A GUIDE</p><h1>Plan Your Experience</h1></div>
      
      <div class="grid-2" style="gap:40px;grid-template-columns:1.3fr 0.7fr;">
        <div>
          <!-- Trip Details -->
          <div class="card animate-in" style="padding:32px;margin-bottom:20px;">
            <h3 style="margin-bottom:24px;">📋 Trip Details</h3>
            <div class="form-row">
              <div class="form-group"><label class="form-label">TRIP DATE</label><input class="form-input" type="date" id="trip-date"></div>
              <div class="form-group"><label class="form-label">GROUP SIZE</label><select class="form-input"><option>1 person</option><option>2 people</option><option>3-4 people</option><option>5+ people</option></select></div>
            </div>
            <div class="form-group"><label class="form-label">TRIP DURATION</label>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                ${['Half Day', 'Full Day', '2 Days', '3 Days', '1 Week'].map((d, i) => `<button class="filter-chip ${i === 1 ? 'active' : ''}" onclick="this.parentElement.querySelectorAll('.filter-chip').forEach(x=>x.classList.remove('active'));this.classList.add('active');">${d}</button>`).join('')}
              </div></div>
          </div>

          <!-- Select Gems for Itinerary -->
          <div class="card animate-in animate-delay-1" style="padding:32px;margin-bottom:20px;">
            <h3 style="margin-bottom:8px;">🗺️ Customize Your Route</h3>
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:20px;">Select the hidden gems you want to visit. Your guide will create the perfect route.</p>
            <div style="display:flex;flex-direction:column;gap:10px;" id="gem-selector">
              ${cityGems.map(gem => {
                const cat = getCategoryInfo(gem.category) || {};
                const isSelected = selectedGems.includes(gem.id);
                return `<label class="card" style="padding:14px;cursor:pointer;display:flex;align-items:center;gap:14px;border-color:${isSelected ? 'var(--secondary)' : 'var(--border-light)'};background:${isSelected ? 'var(--secondary-light)' : 'var(--surface)'};" data-gem-id="${gem.id}">
                  <input type="checkbox" ${isSelected ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--secondary);">
                  <img src="${GEM_IMAGES[gem.category] || GEM_IMAGES.culture}" style="width:44px;height:44px;border-radius:8px;object-fit:cover;">
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:0.95rem;">${gem.name}</div>
                    <div style="font-size:0.8rem;color:var(--text-muted);">${cat.icon || '📍'} ${cat.name || gem.category} · ★ ${gem.rating}</div>
                  </div>
                </label>`;
              }).join('')}
            </div>
          </div>

          <!-- Generated Itinerary -->
          <div class="card animate-in animate-delay-2" style="padding:32px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
              <h3>📅 Your Itinerary</h3>
              <span class="badge badge-top">Auto-generated</span>
            </div>
            <div id="itinerary-view">
              ${itinerary.map(day => `
                <div style="margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid var(--border-light);">
                  <h4 style="color:var(--secondary);margin-bottom:12px;">Day ${day.day} — ${getCityName(guide.city)}</h4>
                  ${day.morning ? `<div style="display:flex;gap:12px;padding:10px 0;align-items:center;">
                    <div style="width:48px;text-align:center;"><span style="font-size:0.75rem;color:var(--text-muted);display:block;">🌅</span><span style="font-weight:600;font-size:0.8rem;">AM</span></div>
                    <img src="${GEM_IMAGES[day.morning.category] || GEM_IMAGES.culture}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">
                    <div><div style="font-weight:600;font-size:0.9rem;">${day.morning.name}</div><div style="font-size:0.8rem;color:var(--text-muted);">${day.morning.shortDesc}</div></div>
                  </div>` : '<div style="padding:10px;color:var(--text-muted);font-size:0.9rem;">🌅 Morning — Free time / arrival</div>'}
                  ${day.afternoon ? `<div style="display:flex;gap:12px;padding:10px 0;align-items:center;">
                    <div style="width:48px;text-align:center;"><span style="font-size:0.75rem;color:var(--text-muted);display:block;">☀️</span><span style="font-weight:600;font-size:0.8rem;">PM</span></div>
                    <img src="${GEM_IMAGES[day.afternoon.category] || GEM_IMAGES.culture}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">
                    <div><div style="font-weight:600;font-size:0.9rem;">${day.afternoon.name}</div><div style="font-size:0.8rem;color:var(--text-muted);">${day.afternoon.shortDesc}</div></div>
                  </div>` : '<div style="padding:10px;color:var(--text-muted);font-size:0.9rem;">☀️ Afternoon — Explore on your own</div>'}
                  ${day.evening ? `<div style="display:flex;gap:12px;padding:10px 0;align-items:center;">
                    <div style="width:48px;text-align:center;"><span style="font-size:0.75rem;color:var(--text-muted);display:block;">🌙</span><span style="font-weight:600;font-size:0.8rem;">EVE</span></div>
                    <img src="${GEM_IMAGES[day.evening.category] || GEM_IMAGES.culture}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">
                    <div><div style="font-weight:600;font-size:0.9rem;">${day.evening.name}</div><div style="font-size:0.8rem;color:var(--text-muted);">${day.evening.shortDesc}</div></div>
                  </div>` : '<div style="padding:10px;color:var(--text-muted);font-size:0.9rem;">🌙 Evening — Dinner & rest</div>'}
                </div>
              `).join('')}
            </div>
            <div class="form-group" style="margin-top:8px;">
              <label class="form-label">SPECIAL REQUESTS</label>
              <textarea class="form-input" rows="2" placeholder="Any dietary needs, accessibility requirements, or specific requests..."></textarea>
            </div>
          </div>
        </div>

        <!-- Booking Summary Sidebar -->
        <div>
          <div class="booking-summary animate-in animate-delay-2">
            <div style="text-align:center;margin-bottom:20px;">
              <div style="width:64px;height:64px;border-radius:50%;background:var(--bg-warm);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:2rem;">👳</div>
              <h4>${guide.name} ${guide.verified ? '<span style="color:var(--secondary);">✓</span>' : ''}</h4>
              <p style="font-size:0.85rem;color:var(--text-secondary);">📍 ${getCityName(guide.city)}</p>
              <div style="margin:8px auto;">${renderStars(guide.rating)}</div>
            </div>
            <hr style="border:none;border-top:1px solid var(--border);margin:16px 0;">
            <h4 style="margin-bottom:16px;">Booking Summary</h4>
            <div class="booking-row"><span>Guide Fee</span><span>₹${guide.price}</span></div>
            <div class="booking-row"><span>Itinerary (${selectedGems.length} gems)</span><span>Included</span></div>
            <div class="booking-row"><span>Platform Fee</span><span>₹${Math.round(guide.price * 0.1)}</span></div>
            <div class="booking-row"><span>Taxes</span><span>₹${Math.round(guide.price * 0.05)}</span></div>
            <div class="booking-total"><span>Total</span><span style="color:var(--primary);">₹${Math.round(guide.price * 1.15)}</span></div>
            <div style="background:var(--secondary-light);border-radius:var(--radius-md);padding:12px;margin:16px 0;font-size:0.85rem;color:var(--secondary);">💡 Pay 50% now (₹${Math.round(guide.price * 1.15 / 2)}) to confirm. Rest after the tour.</div>
            <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:8px;" id="confirm-btn">Confirm Booking</button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:12px;">Free cancellation up to 24 hours before</p>
          </div>
        </div>
      </div>`;

    // Gem selection checkbox handlers
    document.querySelectorAll('#gem-selector label').forEach(label => {
      const checkbox = label.querySelector('input[type="checkbox"]');
      label.addEventListener('click', (e) => {
        if (e.target === checkbox) return;
        checkbox.checked = !checkbox.checked;
        const gemId = label.dataset.gemId;
        if (checkbox.checked) { if (!selectedGems.includes(gemId)) selectedGems.push(gemId); }
        else { selectedGems = selectedGems.filter(id => id !== gemId); }
        renderPage();
      });
      checkbox.addEventListener('change', () => {
        const gemId = label.dataset.gemId;
        if (checkbox.checked) { if (!selectedGems.includes(gemId)) selectedGems.push(gemId); }
        else { selectedGems = selectedGems.filter(id => id !== gemId); }
        renderPage();
      });
    });

    // Confirm booking
    document.getElementById('confirm-btn')?.addEventListener('click', () => {
      addBooking({ guideId: guide.id, guideName: guide.name, amount: Math.round(guide.price * 1.15), gems: selectedGems, itinerary });
      content.innerHTML = `
        <div style="text-align:center;padding:80px 0;">
          <div style="font-size:4rem;margin-bottom:20px;">🎉</div>
          <h1>Booking <span class="text-accent">Confirmed!</span></h1>
          <p style="color:var(--text-secondary);margin:16px auto 8px;max-width:500px;">Your trip with <strong>${guide.name}</strong> has been booked with a custom itinerary of ${selectedGems.length} hidden gems.</p>
          <div class="card" style="max-width:500px;margin:32px auto;padding:24px;text-align:left;">
            <div class="booking-row"><span>Guide</span><span>${guide.name}</span></div>
            <div class="booking-row"><span>City</span><span>${getCityName(guide.city)}</span></div>
            <div class="booking-row"><span>Hidden Gems</span><span>${selectedGems.length} selected</span></div>
            <div class="booking-row"><span>Amount Paid (50%)</span><span style="color:var(--primary);font-weight:700;">₹${Math.round(guide.price * 1.15 / 2)}</span></div>
            <div class="booking-row"><span>Status</span><span class="badge badge-verified">Confirmed</span></div>
            <hr style="border:none;border-top:1px solid var(--border);margin:16px 0;">
            <h4 style="margin-bottom:12px;">📅 Your Itinerary</h4>
            ${itinerary.map(day => `<div style="margin-bottom:8px;"><strong style="color:var(--secondary);">Day ${day.day}</strong>: ${[day.morning, day.afternoon, day.evening].filter(Boolean).map(g => g.name).join(' → ') || 'Free day'}</div>`).join('')}
          </div>
          <div style="display:flex;gap:16px;justify-content:center;">
            <a href="/explore.html" class="btn btn-primary">Explore More Gems</a>
            <a href="/tourist-profile.html" class="btn btn-outline">My Profile</a>
          </div>
        </div>`;
      showToast('Booking confirmed with custom itinerary! 🎉');
    });
  }
  renderPage();
}
renderFooter();
