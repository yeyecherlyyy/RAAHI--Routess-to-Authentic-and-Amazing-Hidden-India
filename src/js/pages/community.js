import '../../styles/main.css';
import { renderNavbar, renderFooter, renderStars, showToast } from '../shared.js';
import { initStore, getTopGems, getCategoryInfo, getCityName } from '../store.js';
initStore(); renderNavbar('community');

const content = document.getElementById('community-content');
const gradients = ['#2d6b4f', '#c45a3c', '#8b6914', '#5a8a3c', '#3c7a8c', '#7a5a8c'];

const feedPosts = [
  { user: 'Ananya S.', text: 'Just discovered the most amazing step-well in Delhi! Agrasen Ki Baoli is absolutely breathtaking. The geometry is unreal 🤯', time: '2 hours ago', likes: 24, comments: 8, img: '/images/gem-culture.png' },
  { user: 'Marco T.', text: 'Looking for travel buddies for a 3-day Rajasthan trip next week! Planning to explore Jaipur\'s hidden gems. Anyone interested? 🙋‍♂️', time: '5 hours ago', likes: 18, comments: 12 },
  { user: 'Priya P.', text: 'Completed my 10th tour as a guide today! ❤️ Thank you RAAHI for connecting me with amazing travelers from all over the world.', time: '1 day ago', likes: 45, comments: 15 },
  { user: 'FoodieExplorer', text: 'The Blue Lassi Shop in Varanasi legit changed my life. 80 flavors of lassi, each one better than the last. 🤤', time: '1 day ago', likes: 67, comments: 23, img: '/images/gem-food.png' },
  { user: 'SoloBackpacker', text: 'Divar Island in Goa — no cars, no tourists, just pure peace. Found it through RAAHI 😍', time: '2 days ago', likes: 89, comments: 31, img: '/images/gem-nature.png' },
  { user: 'CultureSeeker', text: 'The hidden art galleries in Kala Ghoda, Mumbai are absolutely stunning. Local artists creating masterpieces that rival any global gallery.', time: '3 days ago', likes: 34, comments: 9 },
];

const buddyProfiles = [
  { name: 'Riya M.', city: 'Mumbai', dest: 'Jaipur', dates: 'Apr 10-13', interests: ['Culture', 'Food'], bio: 'Solo traveller, photographer. Love exploring old cities.', color: '#2d6b4f' },
  { name: 'Alex K.', city: 'Delhi', dest: 'Varanasi', dates: 'Apr 8-11', interests: ['Spiritual', 'Food'], bio: 'Foodie & meditation enthusiast. Looking for a travel partner.', color: '#c45a3c' },
  { name: 'Neha V.', city: 'Bangalore', dest: 'Goa', dates: 'Apr 15-18', interests: ['Nature', 'Adventure'], bio: 'Adventure junkie. Trekking, cliff walks, hidden beaches!', color: '#5a8a3c' },
  { name: 'Sam D.', city: 'Kolkata', dest: 'Udaipur', dates: 'Apr 20-24', interests: ['Culture', 'Art'], bio: 'Art historian. Looking for someone to explore Rajasthani art with.', color: '#3c7a8c' },
  { name: 'Kavya R.', city: 'Chennai', dest: 'Hampi', dates: 'Apr 12-15', interests: ['Culture', 'Adventure'], bio: 'History nerd. Want to explore every ruin in Hampi!', color: '#7a5a8c' },
  { name: 'Rohan B.', city: 'Pune', dest: 'Pondicherry', dates: 'Apr 18-22', interests: ['Food', 'Nature'], bio: 'French cuisine + Tamil heritage. Best of both worlds.', color: '#8b6914' },
];

const influencerReviews = [
  { name: 'TravelWithSaanvi', followers: '234K', text: 'RAAHI completely changed how I travel in India. Found hidden gems I\'d never discover on Google!', rating: 5 },
  { name: 'BackpackingBharath', followers: '189K', text: 'The local guides on RAAHI are incredible. Real people who know the pulse of their cities.', rating: 5 },
  { name: 'FoodTrailsIndia', followers: '156K', text: 'Every foodie NEEDS this app. The food gems on RAAHI are next level. Authentic, local, unforgettable.', rating: 5 },
];

let activeTab = 'feed';

function render() {
  content.innerHTML = `
    <div class="section-header animate-in"><p class="label">RAAHI COMMUNITY</p><h1>Connect, Share, <span class="text-accent">Explore Together</span></h1><p>Join 10,000+ travellers sharing discoveries, finding buddies, and building the ultimate hidden gem map.</p></div>

    <div class="tabs">
      <div class="tab ${activeTab === 'feed' ? 'active' : ''}" data-tab="feed">Activity Feed</div>
      <div class="tab ${activeTab === 'buddies' ? 'active' : ''}" data-tab="buddies">Travel Buddies</div>
      <div class="tab ${activeTab === 'influencer' ? 'active' : ''}" data-tab="influencer">Influencer Reviews</div>
    </div>

    <div id="tab-content"></div>`;

  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => { activeTab = t.dataset.tab; render(); }));

  const tc = document.getElementById('tab-content');

  if (activeTab === 'feed') {
    tc.innerHTML = `
      <div class="grid-2" style="gap:32px;grid-template-columns:1.5fr 1fr;">
        <div>
          <div class="card" style="padding:20px;margin-bottom:20px;">
            <textarea class="form-input" placeholder="Share your latest discovery or experience..." rows="3" id="post-input"></textarea>
            <div style="display:flex;justify-content:space-between;margin-top:12px;align-items:center;">
              <div style="display:flex;gap:8px;"><button class="btn btn-ghost btn-sm">📷 Photo</button><button class="btn btn-ghost btn-sm">📍 Tag Place</button></div>
              <button class="btn btn-primary btn-sm" id="post-btn">Post</button>
            </div>
          </div>
          ${feedPosts.map((p, i) => `
            <div class="card feed-card" style="margin-bottom:12px;">
              <div class="feed-avatar" style="background:${gradients[i % gradients.length]};">${p.user.charAt(0)}</div>
              <div class="feed-content">
                <div style="display:flex;justify-content:space-between;"><span class="feed-name">${p.user}</span><span class="feed-time">${p.time}</span></div>
                <p class="feed-text">${p.text}</p>
                ${p.img ? `<img src="${p.img}" alt="Post image" style="height:140px;border-radius:var(--radius-md);margin-top:10px;object-fit:cover;">` : ''}
                <div class="feed-actions"><span class="feed-action">❤️ ${p.likes}</span><span class="feed-action">💬 ${p.comments}</span><span class="feed-action">🔗 Share</span></div>
              </div>
            </div>`).join('')}
        </div>
        <div>
          <div class="card" style="padding:24px;margin-bottom:24px;">
            <h4 style="margin-bottom:16px;">🔥 Trending Gems</h4>
            ${getTopGems(4).map((gem, i) => `
              <a href="/gem-detail.html?id=${gem.id}" style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-light);text-decoration:none;">
                <span style="font-weight:700;color:var(--primary);font-size:1.1rem;">#${i + 1}</span>
                <div><div style="font-weight:600;font-size:0.9rem;color:var(--text);">${gem.name}</div><div style="font-size:0.8rem;color:var(--text-muted);">📍 ${getCityName(gem.city)} · ★ ${gem.rating}</div></div>
              </a>`).join('')}
          </div>
          <div class="card" style="padding:24px;">
            <h4 style="margin-bottom:16px;">🤝 Quick Match</h4>
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:16px;">Find someone travelling to the same destination!</p>
            <select class="form-input" style="margin-bottom:12px;" id="buddy-dest"><option value="">Where are you going?</option><option>Jaipur</option><option>Varanasi</option><option>Goa</option><option>Udaipur</option><option>Hampi</option><option>Pondicherry</option></select>
            <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;" id="match-btn">Find Buddies</button>
          </div>
        </div>
      </div>`;
    document.getElementById('post-btn')?.addEventListener('click', () => { const i = document.getElementById('post-input'); if (i.value.trim()) { i.value = ''; showToast('Post shared! 🎉'); } });
    document.getElementById('match-btn')?.addEventListener('click', () => { const d = document.getElementById('buddy-dest').value; if (d) { activeTab = 'buddies'; render(); } });

  } else if (activeTab === 'buddies') {
    tc.innerHTML = `
      <div style="margin-bottom:24px;">
        <div class="card" style="padding:24px;background:var(--bg-warm);margin-bottom:24px;">
          <h3 style="margin-bottom:12px;">🧳 Post Your Travel Plan</h3>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:16px;">Share where you're going to find like-minded companions</p>
          <div class="form-row" style="margin-bottom:16px;">
            <div class="form-group" style="margin-bottom:0;"><label class="form-label">FROM</label><input class="form-input" placeholder="Your city"></div>
            <div class="form-group" style="margin-bottom:0;"><label class="form-label">TO</label><input class="form-input" placeholder="Destination"></div>
          </div>
          <div class="form-row" style="margin-bottom:16px;">
            <div class="form-group" style="margin-bottom:0;"><label class="form-label">DATES</label><input class="form-input" type="date"></div>
            <div class="form-group" style="margin-bottom:0;"><label class="form-label">INTERESTS</label>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">${['Food', 'Culture', 'Nature', 'Adventure', 'Spiritual', 'Art'].map(i => `<button class="filter-chip" onclick="this.classList.toggle('active')" style="font-size:0.8rem;padding:4px 12px;">${i}</button>`).join('')}</div>
            </div>
          </div>
          <button class="btn btn-primary" style="width:100%;justify-content:center;">📢 Post My Trip</button>
        </div>
      </div>
      <h3 style="margin-bottom:16px;">Travellers Looking for Buddies</h3>
      <div class="grid-2">
        ${buddyProfiles.map(b => `
          <div class="card" style="padding:24px;">
            <div style="display:flex;gap:14px;align-items:center;margin-bottom:14px;">
              <div style="width:52px;height:52px;border-radius:50%;background:${b.color};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.2rem;flex-shrink:0;">${b.name.charAt(0)}</div>
              <div>
                <div style="font-weight:600;font-size:1.05rem;">${b.name}</div>
                <div style="font-size:0.85rem;color:var(--secondary);">📍 ${b.city} → ${b.dest}</div>
                <div style="font-size:0.8rem;color:var(--text-muted);">📅 ${b.dates}</div>
              </div>
            </div>
            <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:12px;">${b.bio}</p>
            <div style="display:flex;gap:4px;margin-bottom:16px;">${b.interests.map(i => `<span class="badge badge-top">${i}</span>`).join('')}</div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-primary btn-sm" style="flex:1;justify-content:center;">Connect</button>
              <button class="btn btn-outline btn-sm" style="flex:1;justify-content:center;">Message</button>
            </div>
          </div>`).join('')}
      </div>`;

  } else if (activeTab === 'influencer') {
    tc.innerHTML = `
      <div class="grid-3" style="margin-top:8px;">
        ${influencerReviews.map((r, i) => `
          <div class="card" style="padding:28px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
              <div style="width:48px;height:48px;border-radius:50%;background:${gradients[i]};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">${r.name.charAt(0)}</div>
              <div>
                <div style="font-weight:600;">@${r.name}</div>
                <div style="font-size:0.8rem;color:var(--text-muted);">${r.followers} followers</div>
              </div>
            </div>
            <p style="font-size:0.95rem;color:var(--text-secondary);line-height:1.6;margin-bottom:14px;font-style:italic;">"${r.text}"</p>
            ${renderStars(r.rating)}
          </div>`).join('')}
      </div>
      <div class="card" style="padding:40px;text-align:center;margin-top:32px;background:var(--bg-warm);">
        <h3>Are you an influencer?</h3>
        <p style="color:var(--text-secondary);margin:12px auto 24px;max-width:400px;">Partner with RAAHI to discover and share India's best hidden gems with your audience.</p>
        <button class="btn btn-primary btn-lg">Apply for Influencer Program</button>
      </div>`;
  }
}
render();
renderFooter();
