import '../../styles/main.css';
import { renderNavbar, renderFooter } from '../shared.js';
import { initStore, getCurrentUser } from '../store.js';
initStore(); renderNavbar('');

const content = document.getElementById('dashboard-content');
const user = getCurrentUser();

if (!user) {
  content.innerHTML = '<div style="text-align:center;padding:100px 0;"><h2>Please sign in first</h2><p style="color:var(--text-secondary);margin:16px 0;">Access your guide dashboard after signing in.</p><a href="/guide-login.html" class="btn btn-primary">Guide Login →</a></div>';
} else {
  const bookings = [
    { tourist:'Amit K.',city:'Delhi',date:'2026-04-05',status:'pending',amount:2000,type:'Food Tour' },
    { tourist:'Sarah L.',city:'Delhi',date:'2026-04-03',status:'confirmed',amount:2500,type:'Culture Walk' },
    { tourist:'Ravi M.',city:'Delhi',date:'2026-03-28',status:'completed',amount:2000,type:'Heritage Tour' },
  ];

  content.innerHTML = `
    <div class="section-header animate-in"><p class="label">GUIDE DASHBOARD</p></div>
    <div class="flex-between animate-in" style="margin-bottom:32px;">
      <div><h1>Welcome back, ${user.name}</h1><p style="color:var(--text-secondary);">Manage your tours and bookings</p></div>
      <span class="badge ${user.verified?'badge-verified':'badge-new'}">${user.verified?'✓ Verified':'⏳ Verification Pending'}</span>
    </div>

    <div class="grid-4 animate-in animate-delay-1" style="margin-bottom:40px;">
      <div class="stat-card"><h3 style="color:var(--primary);">₹6,500</h3><p>Total Earnings</p></div>
      <div class="stat-card"><h3 style="color:var(--secondary);">3</h3><p>Total Bookings</p></div>
      <div class="stat-card"><h3 style="color:var(--primary);">${user.rating || 4.7}</h3><p>Average Rating</p></div>
      <div class="stat-card"><h3 style="color:var(--secondary);">${user.tours || 12}</h3><p>Tours Completed</p></div>
    </div>

    <div class="tabs"><div class="tab active" data-tab="bookings">Bookings</div><div class="tab" data-tab="performance">Performance</div></div>

    <div>
      ${bookings.map(b => `
        <div class="card" style="padding:20px;margin-bottom:12px;display:flex;align-items:center;gap:20px;">
          <div style="width:44px;height:44px;border-radius:50%;background:var(--secondary);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">${b.tourist.charAt(0)}</div>
          <div style="flex:1;">
            <div style="font-weight:600;">${b.tourist}</div>
            <div style="font-size:0.85rem;color:var(--text-secondary);">${b.type} · 📍 ${b.city} · 📅 ${b.date}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-serif);color:var(--primary);">₹${b.amount}</div>
            <span class="badge ${b.status==='confirmed'?'badge-verified':b.status==='completed'?'badge-top':'badge-new'}">${b.status}</span>
          </div>
          ${b.status==='pending'?`<div style="display:flex;gap:8px;"><button class="btn btn-primary btn-sm">Accept</button><button class="btn btn-outline btn-sm">Decline</button></div>`:''}
        </div>
      `).join('')}
    </div>
  `;
}
renderFooter();
