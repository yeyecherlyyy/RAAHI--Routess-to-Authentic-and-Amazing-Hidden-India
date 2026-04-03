// RAAHI - LocalStorage Data Store
import { HIDDEN_GEMS, GUIDES, SAMPLE_REVIEWS, ACHIEVEMENTS, CITIES, CATEGORIES } from './data/seedData.js';

const KEYS = {
  gems: 'raahi_gems',
  guides: 'raahi_guides',
  users: 'raahi_users',
  currentUser: 'raahi_current_user',
  bookings: 'raahi_bookings',
  reviews: 'raahi_reviews',
  seeded: 'raahi_seeded',
};

function get(key) {
  try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
}
function set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

export function initStore() {
  if (!get(KEYS.seeded)) {
    set(KEYS.gems, HIDDEN_GEMS);
    set(KEYS.guides, GUIDES);
    set(KEYS.reviews, SAMPLE_REVIEWS);
    set(KEYS.users, []);
    set(KEYS.bookings, []);
    set(KEYS.seeded, true);
  }
}

// ----- Gems -----
export function getAllGems() { return get(KEYS.gems) || []; }
export function getGemById(id) { return getAllGems().find(g => g.id === id); }
export function getGemsByCity(cityId) { return getAllGems().filter(g => g.city === cityId); }
export function getGemsByCategory(cat) { return getAllGems().filter(g => g.category === cat); }
export function getTopGems(n = 6) { return getAllGems().sort((a,b) => b.rating - a.rating).slice(0, n); }
export function searchGems(query, cityId, category) {
  let gems = getAllGems();
  if (query) { const q = query.toLowerCase(); gems = gems.filter(g => g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.city.toLowerCase().includes(q)); }
  if (cityId) gems = gems.filter(g => g.city === cityId);
  if (category) gems = gems.filter(g => g.category === category);
  return gems;
}
export function addGem(gem) {
  const gems = getAllGems();
  gem.id = 'gem-' + (gems.length + 1);
  gem.rating = 0; gem.reviews = 0; gem.verified = false;
  gem.submittedBy = getCurrentUser()?.name || 'Anonymous';
  gems.push(gem);
  set(KEYS.gems, gems);
  return gem;
}

// ----- Guides -----
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
export function addGuide(guide) {
  const guides = getAllGuides();
  guide.id = 'guide-' + (guides.length + 1);
  guide.rating = 0; guide.tours = 0; guide.verified = false;
  guides.push(guide);
  set(KEYS.guides, guides);
  return guide;
}

// ----- Users -----
export function getCurrentUser() { return get(KEYS.currentUser); }
export function setCurrentUser(user) { set(KEYS.currentUser, user); }
export function logoutUser() { localStorage.removeItem(KEYS.currentUser); }
export function registerUser(user) {
  const users = get(KEYS.users) || [];
  user.id = 'user-' + (users.length + 1);
  user.points = 0; user.badges = []; user.visited = []; user.joinDate = new Date().toISOString();
  users.push(user);
  set(KEYS.users, users);
  setCurrentUser(user);
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
export function addBooking(booking) {
  const bookings = getBookings();
  booking.id = 'booking-' + (bookings.length + 1);
  booking.status = 'pending';
  booking.date = new Date().toISOString();
  bookings.push(booking);
  set(KEYS.bookings, bookings);
  return booking;
}
export function updateBookingStatus(id, status) {
  const bookings = getBookings();
  const b = bookings.find(x => x.id === id);
  if (b) { b.status = status; set(KEYS.bookings, bookings); }
}

// ----- Reviews -----
export function getReviews() { return get(KEYS.reviews) || []; }
export function addReview(review) {
  const reviews = getReviews();
  review.date = 'Just now';
  reviews.unshift(review);
  set(KEYS.reviews, reviews);
}

// ----- Helpers -----
export function getCities() { return CITIES; }
export function getCategories() { return CATEGORIES; }
export function getAchievements() { return ACHIEVEMENTS; }
export function getCityName(id) { return CITIES.find(c => c.id === id)?.name || id; }
export function getCategoryInfo(id) { return CATEGORIES.find(c => c.id === id); }
