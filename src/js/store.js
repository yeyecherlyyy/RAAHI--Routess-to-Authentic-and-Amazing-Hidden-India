// RAAHI - Hybrid Data Store (Firestore + localStorage cache)
import { HIDDEN_GEMS, GUIDES, SAMPLE_REVIEWS, ACHIEVEMENTS, CITIES, CATEGORIES } from './data/seedData.js';
import { db, collection, doc, getDocs, getDoc, addDoc, updateDoc, setDoc, serverTimestamp } from './firebase.js';

const KEYS = {
  gems: 'raahi_gems',
  guides: 'raahi_guides',
  users: 'raahi_users',
  currentUser: 'raahi_current_user',
  bookings: 'raahi_bookings',
  reviews: 'raahi_reviews',
  seeded: 'raahi_seeded',
  firebaseSeeded: 'raahi_firebase_seeded',
};

function get(key) {
  try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
}
function set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

// --- Initialize Store (seed localStorage + Firestore) ---
export async function initStore() {
  // Always seed localStorage for fast reads
  if (!get(KEYS.seeded)) {
    set(KEYS.gems, HIDDEN_GEMS);
    set(KEYS.guides, GUIDES);
    set(KEYS.reviews, SAMPLE_REVIEWS);
    set(KEYS.users, []);
    set(KEYS.bookings, []);
    set(KEYS.seeded, true);
  }

  // Seed Firestore once (background, non-blocking)
  if (!get(KEYS.firebaseSeeded)) {
    seedFirestore().catch(err => console.warn('Firestore seed skipped:', err.message));
  }
}

async function seedFirestore() {
  try {
    const gemsSnap = await getDocs(collection(db, 'gems'));
    if (gemsSnap.empty) {
      // Seed gems
      for (const gem of HIDDEN_GEMS) {
        await setDoc(doc(db, 'gems', gem.id), { ...gem, createdAt: serverTimestamp() });
      }
      // Seed guides
      for (const guide of GUIDES) {
        await setDoc(doc(db, 'guides', guide.id), { ...guide, createdAt: serverTimestamp() });
      }
      // Seed reviews
      for (const review of SAMPLE_REVIEWS) {
        await addDoc(collection(db, 'reviews'), { ...review, createdAt: serverTimestamp() });
      }
      console.log('✅ Firestore seeded with initial data');
    }
    set(KEYS.firebaseSeeded, true);
  } catch (err) {
    console.warn('Firestore seed error:', err.message);
  }
}

// ----- Gems (read from cache, write to both) -----
export function getAllGems() { return get(KEYS.gems) || []; }
export function getGemById(id) { return getAllGems().find(g => g.id === id); }
export function getGemsByCity(cityId) { return getAllGems().filter(g => g.city === cityId); }
export function getGemsByCategory(cat) { return getAllGems().filter(g => g.category === cat); }
export function getTopGems(n = 6) { return getAllGems().sort((a, b) => b.rating - a.rating).slice(0, n); }
export function searchGems(query, cityId, category) {
  let gems = getAllGems();
  if (query) { const q = query.toLowerCase(); gems = gems.filter(g => g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.city.toLowerCase().includes(q)); }
  if (cityId) gems = gems.filter(g => g.city === cityId);
  if (category) gems = gems.filter(g => g.category === category);
  return gems;
}
export async function addGem(gem) {
  const gems = getAllGems();
  gem.id = 'gem-' + Date.now();
  gem.rating = 0; gem.reviews = 0; gem.verified = false;
  gem.submittedBy = getCurrentUser()?.name || 'Anonymous';
  gem.submittedAt = new Date().toISOString();
  gems.push(gem);
  set(KEYS.gems, gems);

  // Sync to Firestore
  try {
    await setDoc(doc(db, 'gems', gem.id), { ...gem, createdAt: serverTimestamp() });
    console.log('✅ Gem saved to Firestore:', gem.name);
  } catch (err) { console.warn('Firestore write skipped:', err.message); }

  return gem;
}

// ----- Guides (read from cache, write to both) -----
export function getAllGuides() { return get(KEYS.guides) || []; }
export function getGuideById(id) { return getAllGuides().find(g => g.id === id); }
export function getGuidesByCity(cityId) { return getAllGuides().filter(g => g.city === cityId); }
export function searchGuides(cityId, gender, specialty) {
  let guides = getAllGuides();
  if (cityId) guides = guides.filter(g => g.city === cityId);
  if (gender) guides = guides.filter(g => g.gender === gender);
  if (specialty) guides = guides.filter(g => g.specialties.includes(specialty));
  return guides;
}
export async function addGuide(guide) {
  const guides = getAllGuides();
  guide.id = 'guide-' + Date.now();
  guide.rating = 0; guide.tours = 0; guide.verified = false;
  guides.push(guide);
  set(KEYS.guides, guides);

  try {
    await setDoc(doc(db, 'guides', guide.id), { ...guide, createdAt: serverTimestamp() });
    console.log('✅ Guide saved to Firestore');
  } catch (err) { console.warn('Firestore write skipped:', err.message); }

  return guide;
}

// ----- Users & Auth -----
export function getCurrentUser() { return get(KEYS.currentUser); }
export function setCurrentUser(user) { set(KEYS.currentUser, user); }
export function logoutUser() { localStorage.removeItem(KEYS.currentUser); }

export async function registerUser(user) {
  const users = get(KEYS.users) || [];
  user.id = 'user-' + Date.now();
  user.points = 0; user.badges = []; user.visited = []; user.joinDate = new Date().toISOString();
  users.push(user);
  set(KEYS.users, users);
  setCurrentUser(user);

  // Save to Firestore
  try {
    await setDoc(doc(db, 'users', user.id), { ...user, password: undefined, createdAt: serverTimestamp() });
  } catch (err) { console.warn('Firestore user save skipped:', err.message); }

  return user;
}

export function loginUser(email, password) {
  const users = get(KEYS.users) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) { setCurrentUser(user); return user; }
  return null;
}

// ----- Bookings -----
export function getBookings() { return get(KEYS.bookings) || []; }
export function getUserBookings(userId) { return getBookings().filter(b => b.userId === userId); }
export function getGuideBookings(guideId) { return getBookings().filter(b => b.guideId === guideId); }
export async function addBooking(booking) {
  const bookings = getBookings();
  booking.id = 'booking-' + Date.now();
  booking.status = 'pending';
  booking.date = new Date().toISOString();
  booking.userId = getCurrentUser()?.id || 'anonymous';
  bookings.push(booking);
  set(KEYS.bookings, bookings);

  try {
    await setDoc(doc(db, 'bookings', booking.id), { ...booking, createdAt: serverTimestamp() });
    console.log('✅ Booking saved to Firestore');
  } catch (err) { console.warn('Firestore booking save skipped:', err.message); }

  return booking;
}
export function updateBookingStatus(id, status) {
  const bookings = getBookings();
  const b = bookings.find(x => x.id === id);
  if (b) { b.status = status; set(KEYS.bookings, bookings); }
  try { updateDoc(doc(db, 'bookings', id), { status }); } catch (err) { /* skip */ }
}

// ----- Reviews -----
export function getReviews() { return get(KEYS.reviews) || []; }
export async function addReview(review) {
  const reviews = getReviews();
  review.date = 'Just now';
  review.id = 'review-' + Date.now();
  reviews.unshift(review);
  set(KEYS.reviews, reviews);

  try {
    await addDoc(collection(db, 'reviews'), { ...review, createdAt: serverTimestamp() });
  } catch (err) { console.warn('Firestore review save skipped:', err.message); }
}

// ----- Helpers -----
export function getCities() { return CITIES; }
export function getCategories() { return CATEGORIES; }
export function getAchievements() { return ACHIEVEMENTS; }
export function getCityName(id) { return CITIES.find(c => c.id === id)?.name || id; }
export function getCategoryInfo(id) { return CATEGORIES.find(c => c.id === id); }
