import '../../styles/main.css';
import { showToast } from '../shared.js';
import { initStore, registerUser, loginUser } from '../store.js';
initStore();
let isLogin = true;
const form = document.getElementById('auth-form');

function render() {
  if (isLogin) {
    form.innerHTML = `
      <h2>Welcome Back</h2>
      <p class="subtitle">Login to continue your exploration</p>
      <div class="form-group"><label class="form-label">EMAIL</label><input class="form-input" id="email" type="email" placeholder="your@email.com"></div>
      <div class="form-group"><label class="form-label">PASSWORD</label><input class="form-input" id="password" type="password" placeholder="Enter password"></div>
      <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;" id="submit-btn">Sign In →</button>
      <div class="auth-toggle">Don't have an account? <a href="#" id="toggle-btn">Sign Up</a></div>`;
  } else {
    form.innerHTML = `
      <h2>Join RAAHI</h2>
      <p class="subtitle">Create your explorer profile</p>
      <div class="form-row"><div class="form-group"><label class="form-label">FULL NAME</label><input class="form-input" id="name" placeholder="Your name"></div>
        <div class="form-group"><label class="form-label">PHONE</label><input class="form-input" id="phone" placeholder="+91 98765..."></div></div>
      <div class="form-group"><label class="form-label">EMAIL</label><input class="form-input" id="email" type="email" placeholder="your@email.com"></div>
      <div class="form-group"><label class="form-label">PASSWORD</label><input class="form-input" id="password" type="password" placeholder="Create password"></div>
      <div class="form-group"><label class="form-label">YOUR INTERESTS</label>
        <div class="interest-grid">
          <div class="interest-chip" data-int="food">🍛 Food</div><div class="interest-chip" data-int="culture">🏛️ Culture</div><div class="interest-chip" data-int="nature">🌿 Nature</div>
          <div class="interest-chip" data-int="shopping">🛍️ Shopping</div><div class="interest-chip" data-int="adventure">🏔️ Adventure</div><div class="interest-chip" data-int="spiritual">🙏 Spiritual</div>
        </div></div>
      <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;" id="submit-btn">Create Account →</button>
      <div class="auth-toggle">Already have an account? <a href="#" id="toggle-btn">Sign In</a></div>`;
    document.querySelectorAll('.interest-chip').forEach(c => c.addEventListener('click', () => c.classList.toggle('selected')));
  }
  document.getElementById('toggle-btn').addEventListener('click', e => { e.preventDefault(); isLogin = !isLogin; render(); });
  document.getElementById('submit-btn').addEventListener('click', () => {
    if (isLogin) {
      const email = document.getElementById('email').value, password = document.getElementById('password').value;
      if (!email || !password) return showToast('Please fill all fields','error');
      const user = loginUser(email, password);
      if (user) { showToast(`Welcome back, ${user.name}!`); setTimeout(()=>window.location.href='/tourist-profile.html',1000); }
      else { registerUser({name:email.split('@')[0],email,password,phone:'',interests:[],role:'tourist'}); showToast('Account created!'); setTimeout(()=>window.location.href='/tourist-profile.html',1000); }
    } else {
      const name=document.getElementById('name').value,email=document.getElementById('email').value,password=document.getElementById('password').value;
      const phone=document.getElementById('phone')?.value||'';
      const interests=[...document.querySelectorAll('.interest-chip.selected')].map(c=>c.dataset.int);
      if (!name||!email||!password) return showToast('Please fill required fields','error');
      registerUser({name,email,password,phone,interests,role:'tourist'});
      showToast('Welcome to RAAHI! 🎉');
      setTimeout(()=>window.location.href='/tourist-profile.html',1000);
    }
  });
}
render();
