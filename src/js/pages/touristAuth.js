import '../../styles/main.css';
import { showToast } from '../shared.js';
import { initStore, registerUser, loginUser, setCurrentUser } from '../store.js';
import { firebaseSignUp, firebaseSignIn } from '../firebase.js';

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
      <div id="loading" style="display:none;text-align:center;margin-top:12px;color:var(--text-muted);">Signing in...</div>
      <div class="auth-toggle">Don't have an account? <a href="#" id="toggle-btn">Sign Up</a></div>`;
  } else {
    form.innerHTML = `
      <h2>Join RAAHI</h2>
      <p class="subtitle">Create your explorer profile</p>
      <div class="form-row"><div class="form-group"><label class="form-label">FULL NAME</label><input class="form-input" id="name" placeholder="Your name"></div>
        <div class="form-group"><label class="form-label">PHONE</label><input class="form-input" id="phone" placeholder="+91 98765..."></div></div>
      <div class="form-group"><label class="form-label">EMAIL</label><input class="form-input" id="email" type="email" placeholder="your@email.com"></div>
      <div class="form-group"><label class="form-label">PASSWORD</label><input class="form-input" id="password" type="password" placeholder="Create password (min 6 chars)"></div>
      <div class="form-group"><label class="form-label">YOUR INTERESTS</label>
        <div class="interest-grid">
          <div class="interest-chip" data-int="food">🍛 Food</div><div class="interest-chip" data-int="culture">🏛️ Culture</div><div class="interest-chip" data-int="nature">🌿 Nature</div>
          <div class="interest-chip" data-int="shopping">🛍️ Shopping</div><div class="interest-chip" data-int="adventure">🏔️ Adventure</div><div class="interest-chip" data-int="spiritual">🙏 Spiritual</div>
        </div></div>
      <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;" id="submit-btn">Create Account →</button>
      <div id="loading" style="display:none;text-align:center;margin-top:12px;color:var(--text-muted);">Creating account...</div>
      <div class="auth-toggle">Already have an account? <a href="#" id="toggle-btn">Sign In</a></div>`;
    document.querySelectorAll('.interest-chip').forEach(c => c.addEventListener('click', () => c.classList.toggle('selected')));
  }

  document.getElementById('toggle-btn').addEventListener('click', e => { e.preventDefault(); isLogin = !isLogin; render(); });
  document.getElementById('submit-btn').addEventListener('click', handleAuth);
}

async function handleAuth() {
  const btn = document.getElementById('submit-btn');
  const loading = document.getElementById('loading');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) return showToast('Please fill all fields', 'error');
  if (password.length < 6) return showToast('Password must be at least 6 characters', 'error');

  btn.disabled = true;
  btn.style.opacity = '0.6';
  loading.style.display = 'block';

  try {
    if (isLogin) {
      // Try Firebase Auth first
      const fbUser = await firebaseSignIn(email, password);
      // Check localStorage for profile data
      let user = loginUser(email, password);
      if (!user) {
        user = { id: fbUser.uid, name: email.split('@')[0], email, role: 'tourist', firebaseUid: fbUser.uid };
        setCurrentUser(user);
      }
      showToast(`Welcome back, ${user.name}! 🎉`);
      setTimeout(() => window.location.href = '/tourist-profile.html', 1000);
    } else {
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone')?.value || '';
      const interests = [...document.querySelectorAll('.interest-chip.selected')].map(c => c.dataset.int);
      if (!name) return showToast('Please enter your name', 'error');

      // Create Firebase Auth account
      const fbUser = await firebaseSignUp(email, password);
      // Save profile locally + Firestore
      await registerUser({ name, email, password, phone, interests, role: 'tourist', firebaseUid: fbUser.uid });
      showToast('Welcome to RAAHI! 🎉');
      setTimeout(() => window.location.href = '/tourist-profile.html', 1000);
    }
  } catch (err) {
    btn.disabled = false;
    btn.style.opacity = '1';
    loading.style.display = 'none';

    // User-friendly error messages
    const msg = err.code === 'auth/email-already-in-use' ? 'Email already registered. Try signing in.'
      : err.code === 'auth/invalid-credential' ? 'Invalid email or password.'
      : err.code === 'auth/weak-password' ? 'Password must be at least 6 characters.'
      : err.code === 'auth/invalid-email' ? 'Please enter a valid email.'
      : err.message || 'Something went wrong.';
    showToast(msg, 'error');
  }
}

render();
