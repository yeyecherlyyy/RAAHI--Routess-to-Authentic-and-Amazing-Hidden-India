import '../../styles/main.css';
import { renderNavbar, renderFooter, showToast } from '../shared.js';
import { initStore, addGem, getCities, getCategories } from '../store.js';
initStore(); renderNavbar('submit');

const steps = ['Location','Details','Photos','Story'];
let currentStep = 0;
let formData = { city: '', lat: null, lng: null, name: '', category: '', shortDesc: '', description: '', tips: '' };
let mapInstance = null;
let marker = null;

function renderStepper() {
  document.getElementById('stepper').innerHTML = steps.map((s, i) => {
    const isActive = i === currentStep;
    const isDone = i < currentStep;
    return `${i > 0 ? `<div class="step-line ${isDone ? 'completed' : ''}"></div>` : ''}
    <div class="step ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}">
      <div class="step-num">${isDone ? '✓' : i + 1}</div>
      <div class="step-label">${s}</div>
    </div>`;
  }).join('');
}

function renderForm() {
  renderStepper();
  const content = document.getElementById('form-content');
  if (currentStep === 0) {
    content.innerHTML = `
      <div class="form-group"><label class="form-label">SELECT CITY</label>
        <select class="form-input" id="city-select"><option value="">Choose a city...</option>${getCities().map(c => `<option value="${c.id}" ${formData.city===c.id?'selected':''}>${c.name}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">PIN THE LOCATION</label>
        <div class="map-container" style="height:280px;position:relative;">
          <div id="submit-map" style="height:100%;width:100%;"></div>
          ${(!formData.lat) ? '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;"><div style="font-size:2rem;">📍</div><p style="color:var(--text-muted);font-size:0.9rem;">Click to drop a pin on the map</p></div>' : ''}
        </div></div>
      <div style="display:flex;justify-content:flex-end;margin-top:24px;"><button class="btn btn-primary" id="next-btn">Continue →</button></div>`;
    setTimeout(() => {
      const cityData = getCities().find(c => c.id === formData.city);
      const center = cityData ? [cityData.lat, cityData.lng] : [22.5, 78.9];
      const zoom = cityData ? 12 : 5;
      mapInstance = L.map('submit-map', { attributionControl: false }).setView(center, zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
      if (formData.lat) marker = L.marker([formData.lat, formData.lng]).addTo(mapInstance);
      mapInstance.on('click', (e) => {
        formData.lat = e.latlng.lat; formData.lng = e.latlng.lng;
        if (marker) mapInstance.removeLayer(marker);
        marker = L.marker([formData.lat, formData.lng]).addTo(mapInstance);
      });
    }, 100);
    document.getElementById('city-select')?.addEventListener('change', (e) => { formData.city = e.target.value; });
  } else if (currentStep === 1) {
    content.innerHTML = `
      <div class="form-group"><label class="form-label">NAME OF THE PLACE</label><input class="form-input" id="gem-name" value="${formData.name}" placeholder="e.g. Purana Bazaar, Ajmer"></div>
      <div class="form-group"><label class="form-label">CATEGORY</label>
        <div class="filter-bar">${getCategories().map(c => `<button class="filter-chip ${formData.category===c.id?'active':''}" data-cat="${c.id}">${c.icon} ${c.name}</button>`).join('')}</div></div>
      <div class="form-group"><label class="form-label">SHORT DESCRIPTION</label><input class="form-input" id="short-desc" value="${formData.shortDesc}" placeholder="One line about this place"></div>
      <div class="form-group"><label class="form-label">FULL DESCRIPTION</label><textarea class="form-input" id="full-desc" rows="4" placeholder="Tell travellers what makes this place special...">${formData.description}</textarea></div>
      <div style="display:flex;justify-content:space-between;margin-top:24px;"><button class="btn btn-outline" id="back-btn">← Back</button><button class="btn btn-primary" id="next-btn">Continue →</button></div>`;
    content.querySelectorAll('.filter-chip').forEach(c => c.addEventListener('click', () => {
      content.querySelectorAll('.filter-chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active'); formData.category = c.dataset.cat;
    }));
  } else if (currentStep === 2) {
    content.innerHTML = `
      <div class="form-group"><label class="form-label">UPLOAD PHOTOS</label>
        <div style="border:2px dashed var(--border);border-radius:var(--radius-lg);padding:48px;text-align:center;cursor:pointer;background:var(--surface);" onclick="document.getElementById('photo-input').click()">
          <div style="font-size:2.5rem;margin-bottom:8px;">📸</div>
          <p style="font-weight:500;">Drop photos here or click to browse</p>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">JPG, PNG up to 10MB each</p>
          <input type="file" id="photo-input" multiple accept="image/*" style="display:none;">
        </div></div>
      <div style="display:flex;justify-content:space-between;margin-top:24px;"><button class="btn btn-outline" id="back-btn">← Back</button><button class="btn btn-primary" id="next-btn">Continue →</button></div>`;
  } else if (currentStep === 3) {
    content.innerHTML = `
      <div class="form-group"><label class="form-label">LOCAL TIPS</label><textarea class="form-input" id="tips" rows="3" placeholder="Best time to visit? What to eat nearby? Any local secrets?">${formData.tips}</textarea></div>
      <div class="card" style="padding:24px;margin:24px 0;background:var(--bg-warm);">
        <h4 style="margin-bottom:12px;">📋 Submission Preview</h4>
        <p><strong>Place:</strong> ${formData.name}</p>
        <p><strong>City:</strong> ${getCities().find(c=>c.id===formData.city)?.name || 'Not set'}</p>
        <p><strong>Category:</strong> ${getCategories().find(c=>c.id===formData.category)?.name || 'Not set'}</p>
        <p><strong>Description:</strong> ${formData.shortDesc}</p>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:24px;"><button class="btn btn-outline" id="back-btn">← Back</button><button class="btn btn-primary btn-lg" id="submit-btn">🎉 Submit Hidden Gem</button></div>`;
    document.getElementById('submit-btn')?.addEventListener('click', () => {
      formData.tips = document.getElementById('tips').value;
      if (!formData.name || !formData.city) return showToast('Please fill required fields','error');
      addGem({...formData, verified: false, rating: 0, reviews: 0, gradient:'linear-gradient(135deg,#c45a3c,#f59e0b)' });
      showToast('Hidden gem submitted! 🎉');
      content.innerHTML = '<div style="text-align:center;padding:60px 0;"><div style="font-size:4rem;margin-bottom:16px;">🎉</div><h2>Thank you!</h2><p style="color:var(--text-secondary);margin:12px 0 24px;">Your hidden gem has been submitted for review.</p><a href="/explore.html" class="btn btn-primary">Explore the Map →</a></div>';
    });
  }

  document.getElementById('next-btn')?.addEventListener('click', () => {
    if (currentStep === 0) { formData.city = document.getElementById('city-select').value; }
    if (currentStep === 1) { formData.name = document.getElementById('gem-name').value; formData.shortDesc = document.getElementById('short-desc').value; formData.description = document.getElementById('full-desc').value; }
    if (currentStep < 3) { currentStep++; renderForm(); }
  });
  document.getElementById('back-btn')?.addEventListener('click', () => { if (currentStep > 0) { currentStep--; renderForm(); } });
}
renderForm();
renderFooter();
