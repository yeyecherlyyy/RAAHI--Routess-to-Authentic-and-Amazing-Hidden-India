import '../../styles/main.css';
import { showToast } from '../shared.js';
import { initStore, addGuide, setCurrentUser, getCities, getCategories } from '../store.js';
import { firebaseSignUp } from '../firebase.js';

initStore();
const form = document.getElementById('guide-form');

form.innerHTML = `
  <h2>Register as Guide</h2>
  <p class="subtitle">Share your local knowledge and earn</p>
  <div class="form-row"><div class="form-group"><label class="form-label">FULL NAME</label><input class="form-input" id="name" placeholder="Your name"></div>
    <div class="form-group"><label class="form-label">GENDER</label><select class="form-input" id="gender"><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div></div>
  <div class="form-group"><label class="form-label">EMAIL</label><input class="form-input" id="email" type="email" placeholder="your@email.com"></div>
  <div class="form-group"><label class="form-label">PASSWORD</label><input class="form-input" id="password" type="password" placeholder="Create password (min 6 chars)"></div>
  <div class="form-group"><label class="form-label">CITY</label><select class="form-input" id="city"><option value="">Select city</option>${getCities().map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
  <div class="form-group"><label class="form-label">SPECIALTIES</label>
    <div class="interest-grid">${getCategories().map(c=>`<div class="interest-chip" data-spec="${c.id}">${c.icon} ${c.name}</div>`).join('')}</div></div>
  <div class="form-group"><label class="form-label">LANGUAGES SPOKEN</label><input class="form-input" id="languages" placeholder="e.g. Hindi, English, Tamil"></div>
  <div class="form-row"><div class="form-group"><label class="form-label">PRICE PER DAY (₹)</label><input class="form-input" id="price" type="number" placeholder="2000"></div>
    <div class="form-group"><label class="form-label">ID PROOF</label><div style="border:2px dashed var(--border);border-radius:var(--radius-md);padding:14px;text-align:center;cursor:pointer;" onclick="document.getElementById('id-file').click()">📄 Upload ID<input type="file" id="id-file" style="display:none;"></div></div></div>
  <div class="form-group"><label class="form-label">BIO</label><textarea class="form-input" id="bio" rows="3" placeholder="Tell tourists why you're the best guide..."></textarea></div>
  <button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;" id="submit-btn">Register as Guide →</button>
  <div id="loading" style="display:none;text-align:center;margin-top:12px;color:var(--text-muted);">Creating account...</div>
  <div class="auth-toggle">Already a tourist? <a href="/tourist-login.html">Tourist Login</a></div>`;

document.querySelectorAll('.interest-chip').forEach(c=>c.addEventListener('click',()=>c.classList.toggle('selected')));
document.getElementById('submit-btn').addEventListener('click', async ()=>{
  const btn = document.getElementById('submit-btn');
  const loading = document.getElementById('loading');
  const name=document.getElementById('name').value, email=document.getElementById('email').value;
  const password=document.getElementById('password').value, city=document.getElementById('city').value;
  const bio=document.getElementById('bio').value, price=parseInt(document.getElementById('price').value)||2000;
  const languages=document.getElementById('languages').value.split(',').map(l=>l.trim()).filter(Boolean);
  const specialties=[...document.querySelectorAll('.interest-chip.selected')].map(c=>c.dataset.spec);
  if(!name||!email||!password||!city||!bio||!specialties.length) return showToast('Please fill required fields','error');
  if(password.length<6) return showToast('Password must be at least 6 characters','error');

  btn.disabled = true; btn.style.opacity = '0.6'; loading.style.display = 'block';
  try {
    const fbUser = await firebaseSignUp(email, password);
    const guide = await addGuide({name, email, city, bio, price, languages, specialties, gender: document.getElementById('gender').value, firebaseUid: fbUser.uid});
    setCurrentUser({...guide, role:'guide'});
    showToast('Welcome to RAAHI! Verification pending. 🎉');
    setTimeout(()=>window.location.href='/guide-dashboard.html',1000);
  } catch(err) {
    btn.disabled = false; btn.style.opacity = '1'; loading.style.display = 'none';
    const msg = err.code === 'auth/email-already-in-use' ? 'Email already registered.' : err.message;
    showToast(msg, 'error');
  }
});
