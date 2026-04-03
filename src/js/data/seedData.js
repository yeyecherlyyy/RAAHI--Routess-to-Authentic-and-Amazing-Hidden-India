// RAAHI - Seed Data: Hidden Gems across India
export const CITIES = [
  { id: 'delhi', name: 'Delhi', lat: 28.6139, lng: 77.2090, gems: 4 },
  { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lng: 72.8777, gems: 3 },
  { id: 'jaipur', name: 'Jaipur', lat: 26.9124, lng: 75.7873, gems: 3 },
  { id: 'varanasi', name: 'Varanasi', lat: 25.3176, lng: 83.0064, gems: 2 },
  { id: 'kolkata', name: 'Kolkata', lat: 22.5726, lng: 88.3639, gems: 2 },
  { id: 'bangalore', name: 'Bangalore', lat: 12.9716, lng: 77.5946, gems: 2 },
  { id: 'goa', name: 'Goa', lat: 15.2993, lng: 74.1240, gems: 2 },
  { id: 'udaipur', name: 'Udaipur', lat: 24.5854, lng: 73.7125, gems: 2 },
  { id: 'pondicherry', name: 'Pondicherry', lat: 11.9416, lng: 79.8083, gems: 1 },
  { id: 'hampi', name: 'Hampi', lat: 15.3350, lng: 76.4600, gems: 1 },
];

export const CATEGORIES = [
  { id: 'food', name: 'Food', icon: '🍛', color: '#ff6b35' },
  { id: 'culture', name: 'Culture', icon: '🏛️', color: '#6366f1' },
  { id: 'nature', name: 'Nature', icon: '🌿', color: '#00c896' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#ec4899' },
  { id: 'adventure', name: 'Adventure', icon: '🏔️', color: '#f59e0b' },
  { id: 'spiritual', name: 'Spiritual', icon: '🙏', color: '#8b5cf6' },
  { id: 'art', name: 'Art', icon: '🎨', color: '#06b6d4' },
];

export const HIDDEN_GEMS = [
  {
    id: 'gem-1', name: 'Agrasen Ki Baoli', city: 'delhi', category: 'culture',
    lat: 28.6263, lng: 77.2245,
    description: 'A stunning 14th-century step-well hidden in the heart of Connaught Place. This 60-meter-long monument has 108 steps descending into the depths, creating an otherworldly geometric pattern. Despite being in the busiest part of Delhi, most tourists walk right past it.',
    shortDesc: 'Ancient step-well with mesmerizing geometry hidden near CP',
    rating: 4.7, reviews: 183, submittedBy: 'Ananya S.', verified: true,
    tips: 'Visit early morning for the best photos. The symmetry of the steps looks incredible in golden hour light.',
    bestTime: 'Oct - Mar, Early Morning',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    id: 'gem-2', name: 'Lodhi Art District', city: 'delhi', category: 'art',
    lat: 28.5918, lng: 77.2273,
    description: 'India\'s first open-air art district featuring massive murals by international artists. The entire neighborhood has been transformed into an outdoor gallery with over 50 stunning street art pieces covering building facades.',
    shortDesc: 'India\'s first open-air art district with stunning murals',
    rating: 4.5, reviews: 256, submittedBy: 'Raj M.', verified: true,
    tips: 'Start from Khanna Market end. Each mural has a QR code with artist info.',
    bestTime: 'Year-round, Morning',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
  },
  {
    id: 'gem-3', name: 'Parathe Wali Gali', city: 'delhi', category: 'food',
    lat: 28.6562, lng: 77.2310,
    description: 'A narrow lane in Old Delhi that has been serving parathas since the 1870s. These aren\'t ordinary parathas — try flavors like rabri, papad, kaju, and even banana. The oil-slicked walls and ancient ovens tell stories of six generations.',
    shortDesc: '150-year-old paratha lane with 50+ unique flavors',
    rating: 4.6, reviews: 412, submittedBy: 'Deepak K.', verified: true,
    tips: 'Try the seasonal special parathas. Go hungry — portions are generous!',
    bestTime: 'Year-round, 9 AM - 10 PM',
    gradient: 'linear-gradient(135deg, #ff6b35, #f7971e)'
  },
  {
    id: 'gem-4', name: 'Sunder Nursery', city: 'delhi', category: 'nature',
    lat: 28.5933, lng: 77.2489,
    description: 'A beautifully restored 16th-century heritage garden adjacent to Humayun\'s Tomb. With 300 species of trees, Mughal-era monuments, and manicured lawns — it\'s Delhi\'s best-kept green secret, far less crowded than Lodhi Garden.',
    shortDesc: 'Restored Mughal-era gardens with stunning heritage monuments',
    rating: 4.8, reviews: 134, submittedBy: 'Priya T.', verified: true,
    tips: 'The amphitheater area is perfect for picnics. Don\'t miss the micro-museums inside.',
    bestTime: 'Oct - Mar',
    gradient: 'linear-gradient(135deg, #00c896, #38ef7d)'
  },
  {
    id: 'gem-5', name: 'Khotachiwadi', city: 'mumbai', category: 'culture',
    lat: 19.0160, lng: 72.8268,
    description: 'A tiny 19th-century East Indian Christian village hidden in the concrete jungle of Girgaon. Portuguese-style wooden houses with ornate balconies, stained glass windows, and narrow lanes create a time capsule of old Mumbai.',
    shortDesc: '19th-century heritage village lost in Mumbai\'s urban sprawl',
    rating: 4.4, reviews: 97, submittedBy: 'Maria D.', verified: true,
    tips: 'Speak to the residents — they love sharing stories about the neighborhood\'s history.',
    bestTime: 'Nov - Feb',
    gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)'
  },
  {
    id: 'gem-6', name: 'Sassoon Docks', city: 'mumbai', category: 'art',
    lat: 18.9267, lng: 72.8381,
    description: 'Mumbai\'s oldest dock transformed into a spectacular art installation during the annual art festival. Even outside the festival, the daily fish market at dawn is a raw, unfiltered experience of Mumbai\'s maritime soul.',
    shortDesc: 'Historic docks where art meets Mumbai\'s fishing heritage',
    rating: 4.3, reviews: 145, submittedBy: 'Arjun P.', verified: true,
    tips: 'Visit at 5 AM for the fish market. Art festival happens in November.',
    bestTime: 'Nov (Festival), Dawn for market',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
  },
  {
    id: 'gem-7', name: 'Banganga Tank', city: 'mumbai', category: 'spiritual',
    lat: 19.0786, lng: 72.7946,
    description: 'An ancient water tank and temple complex at Malabar Hill, believed to be where Lord Rama\'s arrow struck the ground creating a tributary of the Ganges. Surrounded by centuries-old temples in one of Mumbai\'s most expensive neighborhoods.',
    shortDesc: 'Sacred 1000-year-old tank in Mumbai\'s poshest locality',
    rating: 4.5, reviews: 112, submittedBy: 'Kavita R.', verified: true,
    tips: 'The annual Banganga Music Festival (Jan) is magical. Visit during sunset.',
    bestTime: 'Jan (Festival), Year-round evenings',
    gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)'
  },
  {
    id: 'gem-8', name: 'Panna Meena Ka Kund', city: 'jaipur', category: 'culture',
    lat: 26.9526, lng: 75.8513,
    description: 'A stunning 16th-century step-well with a mesmerizing criss-cross pattern of stairs creating a geometric masterpiece. Unlike the touristy step-wells, this one is located in a quiet residential area near Amber Fort.',
    shortDesc: 'Geometric step-well masterpiece near Amber Fort',
    rating: 4.6, reviews: 203, submittedBy: 'Vikram S.', verified: true,
    tips: 'Best photographed in morning light. Combine with Amber Fort visit.',
    bestTime: 'Oct - Mar, Morning',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)'
  },
  {
    id: 'gem-9', name: 'Johri Bazaar Lassi Wala', city: 'jaipur', category: 'food',
    lat: 26.9196, lng: 75.8235,
    description: 'A tiny stall in Johri Bazaar serving the thickest, creamiest lassi in earthen pots since 1944. The malai lassi here has a cult following — topped with a thick layer of cream and served in biodegradable kulhads.',
    shortDesc: '80-year-old legendary lassi stall with cult following',
    rating: 4.8, reviews: 567, submittedBy: 'Meera J.', verified: true,
    tips: 'Go early — they often sell out by afternoon. Try the kesar (saffron) special.',
    bestTime: 'Year-round, Morning',
    gradient: 'linear-gradient(135deg, #ff6b35, #fbbf24)'
  },
  {
    id: 'gem-10', name: 'Elahera', city: 'jaipur', category: 'nature',
    lat: 26.8849, lng: 75.8190,
    description: 'A hidden garden complex with ancient water channels and peaceful courtyards away from Jaipur\'s tourist crowds. The intricate water engineering system from the Mughal era still functions, creating mini waterfalls during monsoon.',
    shortDesc: 'Secret Mughal garden with ancient water engineering',
    rating: 4.2, reviews: 56, submittedBy: 'Amit G.', verified: false,
    tips: 'Visit during monsoon to see the water channels in action.',
    bestTime: 'Jul - Sep (Monsoon)',
    gradient: 'linear-gradient(135deg, #00c896, #059669)'
  },
  {
    id: 'gem-11', name: 'Ramnagar Fort', city: 'varanasi', category: 'culture',
    lat: 25.2868, lng: 83.0322,
    description: 'An 18th-century fort on the eastern bank of the Ganges, still owned by the former royal family. The museum inside has vintage cars, royal armor, an astronomical clock, and antique ivory carvings — all mostly empty of tourists.',
    shortDesc: 'Lived-in royal fort with rare museum treasures',
    rating: 4.3, reviews: 89, submittedBy: 'Rohit B.', verified: true,
    tips: 'Visit during Ram Leela festival (Oct) for month-long theatrical performances.',
    bestTime: 'Oct - Mar',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
  },
  {
    id: 'gem-12', name: 'Blue Lassi Shop', city: 'varanasi', category: 'food',
    lat: 25.3108, lng: 83.0116,
    description: 'Tucked in Kachori Gali near Manikarnika Ghat, this 100-year-old shop serves over 80 flavors of lassi in giant clay pots. Try the pomegranate, blueberry, or saffron-pistachio. The walls are covered with reviews from visitors worldwide.',
    shortDesc: '100-year-old lassi legend with 80+ wild flavors',
    rating: 4.7, reviews: 723, submittedBy: 'Neha V.', verified: true,
    tips: 'Try the seasonal fruit lassi. Sit and enjoy — it\'s served in large portions.',
    bestTime: 'Year-round',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
  },
  {
    id: 'gem-13', name: 'Kumartuli', city: 'kolkata', category: 'art',
    lat: 22.5982, lng: 88.3575,
    description: 'The potter\'s quarter where artisans create the magnificent Durga idols for Kolkata\'s famous Durga Puja. Walk through narrow lanes watching craftsmen sculpt, paint, and dress thousands of clay figures in various stages of creation.',
    shortDesc: 'Ancient artisan quarter where gods are sculpted from clay',
    rating: 4.6, reviews: 187, submittedBy: 'Sayan C.', verified: true,
    tips: 'Visit 2-3 months before Durga Puja (Oct) to see peak activity.',
    bestTime: 'Jul - Sep',
    gradient: 'linear-gradient(135deg, #06b6d4, #6366f1)'
  },
  {
    id: 'gem-14', name: 'College Street Coffee House', city: 'kolkata', category: 'food',
    lat: 22.5752, lng: 88.3637,
    description: 'The legendary Indian Coffee House where intellectuals, poets, and revolutionaries have debated since 1942. The same marble tables, ceiling fans, and white-uniformed waiters serve filter coffee and toast to a new generation of students.',
    shortDesc: 'Legendary 80-year-old coffee house of intellectuals',
    rating: 4.5, reviews: 341, submittedBy: 'Anirban M.', verified: true,
    tips: 'Order the mutton cutlet and filter coffee. Sit upstairs for the full atmosphere.',
    bestTime: 'Year-round',
    gradient: 'linear-gradient(135deg, #78350f, #d97706)'
  },
  {
    id: 'gem-15', name: 'Bull Temple', city: 'bangalore', category: 'spiritual',
    lat: 12.9426, lng: 77.5680,
    description: 'A 16th-century Dravidian temple housing a massive monolithic Nandi bull carved from a single granite boulder. Legend says the bull once grew in size and was stopped by a trident-wielding priest. Locals still offer groundnuts as tribute.',
    shortDesc: 'Monolithic granite bull in a 500-year-old temple',
    rating: 4.4, reviews: 156, submittedBy: 'Karthik N.', verified: true,
    tips: 'Visit during the annual Kadalekai Parishe (Groundnut Fair) in November.',
    bestTime: 'Nov (Fair), Year-round',
    gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)'
  },
  {
    id: 'gem-16', name: 'VV Puram Food Street', city: 'bangalore', category: 'food',
    lat: 12.9470, lng: 77.5716,
    description: 'A chaotic, delicious food street that comes alive after sunset. From butter-dripping dosas to crispy churros, Chinese bhel to sweet corn — it\'s where Bangaloreans come for an authentic street food crawl away from fancy restaurants.',
    shortDesc: 'Bangalore\'s secret sunset food street with 50+ stalls',
    rating: 4.6, reviews: 289, submittedBy: 'Lakshmi R.', verified: true,
    tips: 'Start around 6 PM. Must-try: masala dosa at Dosa Corner and the fresh sugarcane juice.',
    bestTime: 'Year-round, Evenings',
    gradient: 'linear-gradient(135deg, #ea580c, #fbbf24)'
  },
  {
    id: 'gem-17', name: 'Three Kings Church', city: 'goa', category: 'culture',
    lat: 15.3838, lng: 73.9108,
    description: 'Perched on a hilltop in Cuelim, this 16th-century church offers the most spectacular panoramic view of the Goan coastline. The legend of three kings who poisoned each other over the territory adds an eerie mystique.',
    shortDesc: 'Haunted hilltop church with Goa\'s best panoramic views',
    rating: 4.3, reviews: 78, submittedBy: 'Fernandez A.', verified: true,
    tips: 'Visit during sunset for breathtaking views. January 6th celebrates the Feast of Three Kings.',
    bestTime: 'Nov - Mar, Sunset',
    gradient: 'linear-gradient(135deg, #dc2626, #f97316)'
  },
  {
    id: 'gem-18', name: 'Divar Island', city: 'goa', category: 'nature',
    lat: 15.5171, lng: 73.8962,
    description: 'A ferry ride from Old Goa takes you to this sleepy, car-free island where Portuguese mansions sit among paddyfields. No tourists, no noise — just birds, old churches, and friendly islanders living a pace of life long forgotten on the mainland.',
    shortDesc: 'Timeless car-free island with Portuguese heritage',
    rating: 4.7, reviews: 62, submittedBy: 'Sonya P.', verified: true,
    tips: 'Rent a bicycle on the island. Visit the Church of Our Lady of Compassion.',
    bestTime: 'Nov - Mar',
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)'
  },
  {
    id: 'gem-19', name: 'Badi Mahal', city: 'udaipur', category: 'culture',
    lat: 24.5760, lng: 73.6885,
    description: 'A secret garden palace within the City Palace complex that most tourists skip. Built at the top level of the palace with a central pool, it\'s essentially a rooftop garden from the 17th century with breathtaking lake views.',
    shortDesc: '17th-century rooftop garden palace with lake views',
    rating: 4.5, reviews: 94, submittedBy: 'Nidhi S.', verified: true,
    tips: 'Buy the full City Palace ticket. Most visitors miss this section at the very top.',
    bestTime: 'Oct - Mar',
    gradient: 'linear-gradient(135deg, #6366f1, #ec4899)'
  },
  {
    id: 'gem-20', name: 'Vintage Car Museum', city: 'udaipur', category: 'culture',
    lat: 24.5685, lng: 73.6990,
    description: 'The royal family\'s private collection of vintage automobiles including a 1934 Rolls-Royce Phantom and a solar-powered rickshaw. Each car has a story — some were used in maharaja weddings, others in tiger hunts.',
    shortDesc: 'Royal vintage cars including Rolls-Royces and solar rickshaws',
    rating: 4.2, reviews: 71, submittedBy: 'Harsh V.', verified: true,
    tips: 'The garden restaurant next door serves great Rajasthani thali.',
    bestTime: 'Year-round',
    gradient: 'linear-gradient(135deg, #1e293b, #475569)'
  },
  {
    id: 'gem-21', name: 'Auroville Matrimandir Gardens', city: 'pondicherry', category: 'spiritual',
    lat: 12.0063, lng: 79.8107,
    description: 'The gardens surrounding Auroville\'s golden Matrimandir are a meditative oasis. Unlike the inner chamber (which requires booking), the gardens are freely accessible and offer stunning views of the golden geodesic sphere.',
    shortDesc: 'Serene gardens around the iconic golden meditation sphere',
    rating: 4.6, reviews: 234, submittedBy: 'Claire L.', verified: true,
    tips: 'Book inner chamber visit at least a day ahead at the Visitors Centre.',
    bestTime: 'Nov - Feb',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
  },
  {
    id: 'gem-22', name: 'Underground Shiva Temple', city: 'hampi', category: 'spiritual',
    lat: 15.3352, lng: 76.4610,
    description: 'A mysterious underground Shiva temple in the Hampi ruins that fills with water during monsoon, with the lingam partially submerged. The architectural feat of building an intentionally water-filled temple remains unexplained by archaeologists.',
    shortDesc: 'Mysterious submerged Shiva temple in Hampi ruins',
    rating: 4.5, reviews: 112, submittedBy: 'Ganesh K.', verified: true,
    tips: 'Visit during monsoon to see the temple flooded as intended.',
    bestTime: 'Jul - Sep (Flooded), Oct - Feb (Dry)',
    gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
  },
];

export const GUIDES = [
  {
    id: 'guide-1', name: 'Arjun Sharma', city: 'delhi', gender: 'male',
    specialties: ['culture', 'food', 'art'], languages: ['Hindi', 'English'],
    rating: 4.8, tours: 234, price: 800, verified: true,
    bio: 'History student at JNU. Born and raised in Old Delhi — I know every lane, every story, every hidden food stall.',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
  },
  {
    id: 'guide-2', name: 'Priya Patel', city: 'mumbai', gender: 'female',
    specialties: ['food', 'culture', 'shopping'], languages: ['Hindi', 'English', 'Marathi'],
    rating: 4.7, tours: 189, price: 1000, verified: true,
    bio: 'Food blogger and teacher. Let me show you the Mumbai that locals eat in — from ₹20 vada pav to hidden Irani cafes.',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)'
  },
  {
    id: 'guide-3', name: 'Vikram Singh', city: 'jaipur', gender: 'male',
    specialties: ['culture', 'adventure', 'spiritual'], languages: ['Hindi', 'English', 'French'],
    rating: 4.9, tours: 312, price: 600, verified: true,
    bio: 'Third-generation Jaipur guide. My family has been showing people the real Pink City since my grandfather\'s time.',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)'
  },
  {
    id: 'guide-4', name: 'Meera Nair', city: 'goa', gender: 'female',
    specialties: ['nature', 'food', 'culture'], languages: ['Hindi', 'English', 'Konkani'],
    rating: 4.6, tours: 156, price: 900, verified: true,
    bio: 'Marine biologist turned travel guide. I\'ll show you the Goa beyond beaches — spice plantations, hidden waterfalls, and village feasts.',
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)'
  },
  {
    id: 'guide-5', name: 'Rahul Das', city: 'kolkata', gender: 'male',
    specialties: ['food', 'art', 'culture'], languages: ['Hindi', 'English', 'Bengali'],
    rating: 4.7, tours: 201, price: 500, verified: true,
    bio: 'College student and street food obsessive. From Kumartuli artisans to Park Street jazz bars, I\'ll show you the soul of Kolkata.',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
  },
  {
    id: 'guide-6', name: 'Lakshmi Iyer', city: 'bangalore', gender: 'female',
    specialties: ['food', 'nature', 'art'], languages: ['Hindi', 'English', 'Kannada', 'Tamil'],
    rating: 4.5, tours: 98, price: 750, verified: true,
    bio: 'Software engineer by day, culture explorer by weekend. I know every hidden café, street art wall, and vintage bookstore in Bangalore.',
    gradient: 'linear-gradient(135deg, #a855f7, #6366f1)'
  },
];

export const SAMPLE_REVIEWS = [
  { user: 'Traveler_UK', rating: 5, text: 'Absolutely magical! Our guide Arjun took us through lanes we would never have found ourselves. The stories behind each place made everything come alive.', date: '2 days ago' },
  { user: 'FoodieExplorer', rating: 5, text: 'The parathas here are unreal. 150 years of tradition and you can taste every bit of it. Thank you RAAHI for this hidden gem!', date: '1 week ago' },
  { user: 'SoloBackpacker', rating: 4, text: 'Found an amazing travel buddy through the community feature. We explored Varanasi together and it was unforgettable.', date: '3 days ago' },
  { user: 'CultureVulture', rating: 5, text: 'Kumartuli was the highlight of my entire India trip. Watching artisans create these magnificent idols — pure art.', date: '5 days ago' },
  { user: 'NatureLover22', rating: 4, text: 'Divar Island in Goa is everything. No cars, no noise, just birds and old Portuguese houses. Perfect escape.', date: '1 week ago' },
];

export const ACHIEVEMENTS = [
  { id: 'explorer', name: 'Explorer', icon: '🧭', desc: 'Visited 5 hidden gems', threshold: 5 },
  { id: 'foodie', name: 'Foodie', icon: '🍛', desc: 'Visited 3 food gems', threshold: 3 },
  { id: 'reviewer', name: 'Storyteller', icon: '✍️', desc: 'Written 5 reviews', threshold: 5 },
  { id: 'buddy', name: 'Travel Buddy', icon: '🤝', desc: 'Traveled with a community member', threshold: 1 },
  { id: 'culture', name: 'Culture Connoisseur', icon: '🏛️', desc: 'Visited 3 culture gems', threshold: 3 },
  { id: 'adventurer', name: 'Adventurer', icon: '🏔️', desc: 'Visited gems in 5 different cities', threshold: 5 },
];
