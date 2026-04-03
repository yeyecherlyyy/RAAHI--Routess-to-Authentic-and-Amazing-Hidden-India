// RAAHI - Shared Components (Warm Editorial Theme)
import { getCurrentUser, logoutUser } from './store.js';

const NAV_LINKS = [
  { href: '/index.html', label: 'Home', id: 'home' },
  { href: '/explore.html', label: 'Explore Map', id: 'explore' },
  { href: '/find-guide.html', label: 'Find Guides', id: 'guide' },
  { href: '/submit-gem.html', label: 'Submit Gem', id: 'submit' },
  { href: '/community.html', label: 'Community', id: 'community' },
];

export function renderNavbar(activeId = '') {
  const user = getCurrentUser();
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'main-navbar';
  nav.innerHTML = `
    <div class="container flex-between">
      <a href="/index.html" class="nav-logo">
        <div class="logo-text">R <span>AA</span> HI</div>
        <div class="logo-sub">ROUTES TO AUTHENTIC & AMAZING HIDDEN INDIA</div>
      </a>
      <div class="nav-links" id="nav-links">
        ${NAV_LINKS.map(l => `<a href="${l.href}" class="${activeId === l.id ? 'active' : ''}">${l.label}</a>`).join('')}
      </div>
      <div class="nav-actions">
        ${user ? `
          <div class="nav-profile" id="nav-profile-btn" title="${user.name}">
            ${user.name.charAt(0).toUpperCase()}
          </div>
          <div id="profile-dropdown" style="display:none;position:absolute;top:64px;right:32px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:8px;box-shadow:var(--shadow-lg);z-index:1001;min-width:180px;">
            <a href="/tourist-profile.html" style="display:block;padding:10px 16px;border-radius:var(--radius-sm);font-size:0.9rem;">👤 My Profile</a>
            <a href="/guide-dashboard.html" style="display:block;padding:10px 16px;border-radius:var(--radius-sm);font-size:0.9rem;">📊 Dashboard</a>
            <hr style="border:none;border-top:1px solid var(--border);margin:4px 0;">
            <a href="#" id="logout-btn" style="display:block;padding:10px 16px;border-radius:var(--radius-sm);font-size:0.9rem;color:var(--primary);">🚪 Logout</a>
          </div>
        ` : `
          <a href="/tourist-login.html" class="nav-signin">Sign In</a>
        `}
        <div class="mobile-menu-btn" id="mobile-menu-btn"><span></span></div>
      </div>
    </div>
  `;
  document.body.prepend(nav);

  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 20); });

  const profileBtn = document.getElementById('nav-profile-btn');
  const dropdown = document.getElementById('profile-dropdown');
  if (profileBtn && dropdown) {
    profileBtn.addEventListener('click', () => { dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'; });
    document.addEventListener('click', (e) => { if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) dropdown.style.display = 'none'; });
  }
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) { logoutBtn.addEventListener('click', (e) => { e.preventDefault(); logoutUser(); window.location.href = '/index.html'; }); }

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinksEl = document.getElementById('nav-links');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinksEl.classList.toggle('mobile-open');
      if (navLinksEl.classList.contains('mobile-open')) {
        Object.assign(navLinksEl.style, { display:'flex', flexDirection:'column', position:'absolute', top:'var(--nav-height)', left:'0', right:'0', background:'var(--bg)', padding:'16px 32px', borderBottom:'1px solid var(--border)', boxShadow:'var(--shadow-md)' });
      } else { navLinksEl.style = ''; }
    });
  }
}

export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>R AA HI</h3>
          <p>Routes to Authentic & Amazing Hidden India. Discover the India that guidebooks miss — powered by locals who love their cities.</p>
        </div>
        <div class="footer-col"><h4>Explore</h4><a href="/explore.html">Explore Map</a><a href="/find-guide.html">Find Guides</a><a href="/community.html">Community</a><a href="/submit-gem.html">Submit a Gem</a></div>
        <div class="footer-col"><h4>Portals</h4><a href="/tourist-login.html">Tourist Login</a><a href="/guide-login.html">Guide Portal</a><a href="/tourist-profile.html">My Profile</a><a href="/guide-dashboard.html">Dashboard</a></div>
        <div class="footer-col"><h4>Company</h4><a href="#">About Us</a><a href="#">Contact</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
      </div>
      <div class="footer-bottom"><p>© 2026 RAAHI. Made with ❤️ for India's Hidden Treasures.</p></div>
    </div>`;
  document.body.appendChild(footer);
}

export function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) { container = document.createElement('div'); container.id = 'toast-container'; container.className = 'toast-container'; document.body.appendChild(container); }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(60px)'; setTimeout(()=>toast.remove(),300); }, 3000);
}

export function renderStars(rating, size = 14) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '';
  const star = (filled) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="${filled ? 'star-filled' : 'star-empty'}"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  for (let i = 0; i < full; i++) html += star(true);
  if (half) html += star(true);
  for (let i = 0; i < empty; i++) html += star(false);
  return `<div class="stars">${html}</div>`;
}

export function getUrlParam(key) { return new URLSearchParams(window.location.search).get(key); }
