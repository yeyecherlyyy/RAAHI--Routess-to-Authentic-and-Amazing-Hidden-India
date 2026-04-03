import '../../styles/main.css';
import { renderNavbar, renderFooter, renderStars } from '../shared.js';
import { initStore, getCurrentUser, getAchievements, getTopGems } from '../store.js';
initStore(); renderNavbar('profile');

const content = document.getElementById('profile-content');
const user = getCurrentUser();

if (!user) {
  content.innerHTML = '<div style="text-align:center;padding:100px 0;"><h2>Please sign in first</h2><p style="color:var(--text-secondary);margin:16px 0;">You need to be signed in to view your profile.</p><a href="/tourist-login.html" class="btn btn-primary">Sign In →</a></div>';
} else {
  const achievements = getAchievements();
  const points = user.points || 150;
  const level = Math.floor(points / 100) + 1;
  const progress = (points % 100);

  content.innerHTML = `
    <div class="section-header animate-in"><p class="label">MY PROFILE</p></div>
    <div class="profile-header animate-in">
      <div class="profile-avatar-lg">${user.name.charAt(0).toUpperCase()}</div>
      <div>
        <h2>${user.name}</h2>
        <p style="color:var(--text-secondary);">📧 ${user.email} ${user.phone ? '· 📱 '+user.phone : ''}</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">Member since ${new Date(user.joinDate || Date.now()).toLocaleDateString('en-IN', {month:'long',year:'numeric'})}</p>
        <div class="profile-stats">
          <div class="profile-stat"><div class="stat-value">3</div><div class="stat-label">Places Visited</div></div>
          <div class="profile-stat"><div class="stat-value">${points}</div><div class="stat-label">Points</div></div>
          <div class="profile-stat"><div class="stat-value">Lvl ${level}</div><div class="stat-label">Explorer</div></div>
        </div>
      </div>
    </div>

    <div style="margin-bottom:32px;" class="animate-in animate-delay-1">
      <h3 style="margin-bottom:12px;">🎯 Level Progress</h3>
      <div style="display:flex;align-items:center;gap:16px;">
        <span style="font-weight:600;color:var(--secondary);">Level ${level}</span>
        <div class="progress-bar" style="flex:1;"><div class="progress-fill" style="width:${progress}%;"></div></div>
        <span style="font-weight:600;color:var(--text-muted);">Level ${level+1}</span>
      </div>
      <p class="form-helper">${100-progress} points to next level</p>
    </div>

    <h3 style="margin-bottom:16px;" class="animate-in animate-delay-2">🏅 Badges & Achievements</h3>
    <div class="grid-3" style="margin-bottom:40px;">
      ${achievements.map((a,i) => {
        const earned = i < 2;
        return `<div class="card" style="padding:24px;text-align:center;${earned?'':'opacity:0.5;'}">
          <div style="font-size:2.5rem;margin-bottom:8px;">${a.icon}</div>
          <h4>${a.name}</h4>
          <p style="font-size:0.8rem;color:var(--text-secondary);">${a.desc}</p>
          ${earned ? '<span class="badge badge-verified" style="margin-top:8px;">✓ Earned</span>' : '<span style="display:inline-block;margin-top:8px;font-size:0.75rem;color:var(--text-muted);">🔒 Locked</span>'}
        </div>`;
      }).join('')}
    </div>

    <h3 style="margin-bottom:16px;">🗺️ Recommended for You</h3>
    <div class="grid-3" style="margin-bottom:40px;">
      ${getTopGems(3).map(gem => `
        <a href="/gem-detail.html?id=${gem.id}" class="card" style="cursor:pointer;">
          <div style="background:${gem.gradient};height:120px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:rgba(255,255,255,0.3);border-radius:var(--radius-lg) var(--radius-lg) 0 0;">📍</div>
          <div class="card-body"><h4 class="card-title">${gem.name}</h4><p class="card-text">${gem.shortDesc}</p></div>
        </a>`).join('')}
    </div>
  `;
}
renderFooter();
