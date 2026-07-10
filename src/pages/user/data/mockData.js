// =============================================
// VCM Portal - User Dashboard Mock Data
// =============================================

export const mockUser = {
  name: "PREM",
  email: "PREM@vcm.org",
  phone: "+91 98765 43210",
  city: "Vrindavan",
  state: "Uttar Pradesh",
  country: "India",
  memberSince: "2023-01-15",
  membershipId: "VCM-2023-00142",
  avatar: "https://i.pravatar.cc/150?u=anupam@vcm.org",
  devoteeType: "Regular Devotee",
  gotra: "Kashyap",
  deity: "Radha Madan Mohan",
  initiatedName: "Bhakt Prem Das",
  aadhaar: "XXXX-XXXX-4210",
  pan: "ABCDE1234F",
};

// ---------- BOOKINGS ----------
export const mockBookings = [
  {
    id: "BK-001",
    service: "Darshan",
    category: "Special Darshan",
    date: "2026-07-20",
    time: "06:30 AM",
    slot: "Morning Mangal Aarti",
    persons: 2,
    status: "Confirmed",
    amount: 501,
    bookingDate: "2026-07-09",
    refNo: "DAR-20260720-001",
  },
  {
    id: "BK-002",
    service: "Puja",
    category: "Rukmini Haran",
    date: "2026-07-25",
    time: "11:00 AM",
    slot: "Forenoon Puja",
    persons: 1,
    status: "Pending",
    amount: 1100,
    bookingDate: "2026-07-09",
    refNo: "PUJ-20260725-002",
  },
  {
    id: "BK-003",
    service: "Accommodation",
    category: "Deluxe Room",
    date: "2026-08-14",
    time: "12:00 PM",
    slot: "Check-In",
    persons: 4,
    status: "Confirmed",
    amount: 2500,
    bookingDate: "2026-07-01",
    refNo: "ACC-20260814-003",
  },
  {
    id: "BK-004",
    service: "Puja",
    category: "Tulsi Vivah",
    date: "2026-06-10",
    time: "09:00 AM",
    slot: "Morning",
    persons: 2,
    status: "Completed",
    amount: 2100,
    bookingDate: "2026-06-01",
    refNo: "PUJ-20260610-004",
  },
  {
    id: "BK-005",
    service: "Chadhava",
    category: "Panchamrit",
    date: "2026-07-15",
    time: "08:00 AM",
    slot: "Abhishek",
    persons: 1,
    status: "Confirmed",
    amount: 351,
    bookingDate: "2026-07-05",
    refNo: "CHA-20260715-005",
  },
  {
    id: "BK-006",
    service: "Accommodation",
    category: "Standard Room",
    date: "2026-05-20",
    time: "12:00 PM",
    slot: "Check-In",
    persons: 2,
    status: "Cancelled",
    amount: 1500,
    bookingDate: "2026-05-10",
    refNo: "ACC-20260520-006",
  },
];

// ---------- TEMPLE SERVICES ----------
export const darshanSlots = [
  { id: 1, name: "Mangal Aarti", time: "05:30 AM", type: "Free", available: 150, total: 200 },
  { id: 2, name: "Shringar Darshan", time: "07:30 AM", type: "Paid", price: 251, available: 80, total: 100 },
  { id: 3, name: "Rajbhog Darshan", time: "12:00 PM", type: "Free", available: 200, total: 300 },
  { id: 4, name: "Sandhya Aarti", time: "06:00 PM", type: "Free", available: 120, total: 200 },
  { id: 5, name: "Shayan Aarti", time: "08:30 PM", type: "Special", price: 501, available: 30, total: 50 },
];

export const pujaServices = [
  { id: 1, name: "Tulsi Vivah", deity: "Radha Krishna", duration: "1.5 hrs", price: 2100, available: true, description: "Sacred marriage ceremony of Tulsi with Shaligram" },
  { id: 2, name: "Rukmini Haran", deity: "Radha Madan Mohan", duration: "2 hrs", price: 1100, available: true, description: "Special puja reenacting the divine love story" },
  { id: 3, name: "Abhishek Puja", deity: "Radha Govind Dev", duration: "1 hr", price: 551, available: true, description: "Holy bath of the deity with panchamrit" },
  { id: 4, name: "Vishnu Sahasranama", deity: "Lord Vishnu", duration: "45 mins", price: 1001, available: false, description: "Recitation of 1000 names of Lord Vishnu" },
  { id: 5, name: "Navgraha Puja", deity: "Nine Planets", duration: "2 hrs", price: 3100, available: true, description: "Propitiation of all nine planetary deities" },
];

export const chadhavaItems = [
  { id: 1, name: "Panchamrit", description: "Milk, Curd, Honey, Sugar, Ghee", price: 251, icon: "🥛" },
  { id: 2, name: "Tulsi Mala", description: "Sacred basil garland for the deity", price: 151, icon: "🌿" },
  { id: 3, name: "Flower Garland", description: "Fresh lotus and marigold garland", price: 101, icon: "🌸" },
  { id: 4, name: "Prasad Thali", description: "Bhog with 16 delicacies (Shodashopachara)", price: 501, icon: "🍱" },
  { id: 5, name: "Diya & Incense", description: "Ghee diya with dhoop sticks", price: 51, icon: "🪔" },
  { id: 6, name: "Ladoo Bhog", description: "Besan or Bundi ladoo, 1 kg", price: 351, icon: "🟡" },
];

export const accommodationRooms = [
  {
    id: 1,
    name: "Standard Yatri Niwas",
    type: "Standard",
    capacity: 2,
    price: 800,
    amenities: ["AC", "Hot Water", "WiFi", "TV"],
    available: 12,
    rating: 4.2,
    image: "standard",
  },
  {
    id: 2,
    name: "Deluxe Devotee Suite",
    type: "Deluxe",
    capacity: 4,
    price: 1500,
    amenities: ["AC", "Hot Water", "WiFi", "TV", "Mini Fridge", "Balcony"],
    available: 5,
    rating: 4.7,
    image: "deluxe",
  },
  {
    id: 3,
    name: "Dharamshala Dormitory",
    type: "Dormitory",
    capacity: 8,
    price: 300,
    amenities: ["Fan", "Common Bathrooms", "Locker"],
    available: 20,
    rating: 3.8,
    image: "dorm",
  },
  {
    id: 4,
    name: "Premium Ashram Cottage",
    type: "Premium",
    capacity: 6,
    price: 3500,
    amenities: ["AC", "Hot Water", "WiFi", "TV", "Kitchen", "Garden View", "Puja Room"],
    available: 2,
    rating: 4.9,
    image: "premium",
  },
];

export const donationCauses = [
  { id: 1, name: "Govardhan Parvat Parikrama Path", raised: 485000, goal: 1000000, category: "Infrastructure", icon: "⛰️" },
  { id: 2, name: "Free Prasad Distribution", raised: 125000, goal: 300000, category: "Annadana", icon: "🍱" },
  { id: 3, name: "Temple Renovation Fund", raised: 2150000, goal: 5000000, category: "Renovation", icon: "🛕" },
  { id: 4, name: "Vrindavan Cow Shelter (Goshala)", raised: 375000, goal: 500000, category: "Goshala", icon: "🐄" },
  { id: 5, name: "Scholarship for Vedic Students", raised: 89000, goal: 200000, category: "Education", icon: "📚" },
  { id: 6, name: "Lighting & Sound Upgrade", raised: 43000, goal: 150000, category: "Infrastructure", icon: "💡" },
];

export const myDonations = [
  { id: "DON-001", cause: "Free Prasad Distribution", amount: 1001, date: "2026-07-01", mode: "UPI", receipt: "RCP-2026-001", status: "Completed" },
  { id: "DON-002", cause: "Govardhan Parikrama Path", amount: 2100, date: "2026-06-15", mode: "Net Banking", receipt: "RCP-2026-002", status: "Completed" },
  { id: "DON-003", cause: "Vedic Students Scholarship", amount: 500, date: "2026-05-20", mode: "Debit Card", receipt: "RCP-2026-003", status: "Completed" },
];

// ---------- EVENTS ----------
export const events = [
  {
    id: 1,
    title: "Guru Purnima Mahotsav",
    date: "2026-07-18",
    time: "07:00 AM",
    venue: "Main Temple Courtyard",
    category: "Festival",
    description: "Grand celebration of Guru Purnima with special Guru Vandana, bhajans, and prasad distribution.",
    registered: 1240,
    capacity: 2000,
    status: "Open",
    isRegistered: true,
    tags: ["Festival", "Aarti", "Bhajan"],
    image: "guru-purnima",
  },
  {
    id: 2,
    title: "Janmashtami Seva Week",
    date: "2026-08-15",
    time: "12:00 AM",
    venue: "All Temple Premises",
    category: "Festival",
    description: "7-day celebration of Lord Krishna's birth anniversary with midnight celebrations, decoration competitions, and devotional programs.",
    registered: 3450,
    capacity: 5000,
    status: "Open",
    isRegistered: false,
    tags: ["Festival", "Cultural", "Midnight"],
    image: "janmashtami",
  },
  {
    id: 3,
    title: "Volunteer Orientation Program",
    date: "2026-08-20",
    time: "10:00 AM",
    venue: "Conference Hall, Block B",
    category: "Volunteer",
    description: "Onboarding session for new volunteers with training on seva guidelines and temple protocols.",
    registered: 85,
    capacity: 150,
    status: "Open",
    isRegistered: false,
    tags: ["Volunteer", "Training"],
    image: "volunteer",
  },
  {
    id: 4,
    title: "Gita Jayanti Saptah",
    date: "2026-12-05",
    time: "08:00 AM",
    venue: "Radha Kund Premises",
    category: "Spiritual",
    description: "Week-long recitation and discourse of Bhagavad Gita with eminent scholars and saints.",
    registered: 560,
    capacity: 1000,
    status: "Upcoming",
    isRegistered: false,
    tags: ["Spiritual", "Discourse"],
    image: "gita",
  },
  {
    id: 5,
    title: "Radhashtami Utsav",
    date: "2026-09-10",
    time: "05:00 AM",
    venue: "Main Temple",
    category: "Festival",
    description: "Celebration of Srimati Radharani's appearance day with special abhishek and bhajan sandhya.",
    registered: 1800,
    capacity: 3000,
    status: "Open",
    isRegistered: true,
    tags: ["Festival", "Abhishek"],
    image: "radhashtami",
  },
];

// ---------- VOLUNTEER ----------
export const volunteerOpportunities = [
  {
    id: 1,
    role: "Aarti & Puja Assistance",
    department: "Seva Department",
    schedule: "Daily, 5:00 AM - 7:00 AM",
    spots: 5,
    skills: ["Devotion", "Punctuality", "Sanskrit basics"],
    status: "Open",
    urgency: "High",
  },
  {
    id: 2,
    role: "Guest Relations & Yatri Support",
    department: "Hospitality",
    schedule: "Weekends, 8:00 AM - 6:00 PM",
    spots: 12,
    skills: ["Communication", "Hindi/English", "Patience"],
    status: "Open",
    urgency: "Medium",
  },
  {
    id: 3,
    role: "Prasad & Langar Distribution",
    department: "Annadana",
    schedule: "Daily, 11:30 AM - 1:30 PM",
    spots: 20,
    skills: ["Hygiene awareness", "Physical stamina"],
    status: "Open",
    urgency: "High",
  },
  {
    id: 4,
    role: "Digital Media & Photography",
    department: "Communications",
    schedule: "Festivals & Events",
    spots: 3,
    skills: ["Photography", "Video Editing", "Social Media"],
    status: "Open",
    urgency: "Low",
  },
  {
    id: 5,
    role: "Spiritual Library Management",
    department: "Knowledge Centre",
    schedule: "Mon-Fri, 9:00 AM - 5:00 PM",
    spots: 4,
    skills: ["Library skills", "Sanskrit/Hindi literacy"],
    status: "Open",
    urgency: "Medium",
  },
];

export const myVolunteerHistory = [
  { id: 1, role: "Aarti Assistance", event: "Guru Purnima 2025", hours: 8, date: "2025-07-22", status: "Completed", certificate: true },
  { id: 2, role: "Prasad Distribution", event: "Janmashtami 2025", hours: 12, date: "2025-08-15", status: "Completed", certificate: true },
  { id: 3, role: "Guest Relations", event: "Radhashtami 2025", hours: 6, date: "2025-09-10", status: "Completed", certificate: false },
];

// ---------- SPIRITUAL LIBRARY ----------
export const libraryBooks = [
  { id: 1, title: "Bhagavad Gita As It Is", author: "A.C. Bhaktivedanta Swami Prabhupada", category: "Scripture", pages: 924, language: "English", available: true, format: "PDF", rating: 5.0 },
  { id: 2, title: "Srimad Bhagavatam (Canto 1)", author: "A.C. Bhaktivedanta Swami", category: "Scripture", pages: 550, language: "English", available: true, format: "PDF", rating: 4.9 },
  { id: 3, title: "Vrindavan Mahatmya", author: "Rupa Goswami", category: "Devotional", pages: 312, language: "Hindi", available: true, format: "PDF", rating: 4.7 },
  { id: 4, title: "Nectar of Devotion", author: "A.C. Bhaktivedanta Swami", category: "Devotional", pages: 416, language: "English", available: false, format: "PDF", rating: 4.8 },
  { id: 5, title: "Sri Isopanishad", author: "A.C. Bhaktivedanta Swami", category: "Scripture", pages: 168, language: "English", available: true, format: "PDF", rating: 4.6 },
  { id: 6, title: "Krishna Book", author: "A.C. Bhaktivedanta Swami", category: "Devotional", pages: 640, language: "English", available: true, format: "PDF", rating: 4.8 },
  { id: 7, title: "Goswami Charitra", author: "Narahari Chakravarti", category: "Biography", pages: 280, language: "Hindi", available: true, format: "PDF", rating: 4.5 },
  { id: 8, title: "Radha Krishnashtakam", author: "Shankaracharya", category: "Stotra", pages: 48, language: "Sanskrit", available: true, format: "PDF", rating: 4.9 },
];

// ---------- KNOWLEDGE CENTRE ----------
export const knowledgeCentreContent = [
  { id: 1, title: "Understanding the 9 Forms of Bhakti", category: "Philosophy", type: "Article", duration: "8 min read", author: "H.G. Vaishnava Das", date: "2026-07-05", views: 1240 },
  { id: 2, title: "Vrindavan - The Eternal Spiritual Abode", category: "Sacred Places", type: "Video", duration: "22 mins", author: "VCM Content Team", date: "2026-07-01", views: 3400 },
  { id: 3, title: "Daily Sadhana: A Practical Guide", category: "Sadhana", type: "Article", duration: "12 min read", author: "H.H. Radhanath Swami", date: "2026-06-25", views: 5600 },
  { id: 4, title: "Introduction to Vaishnava Etiquette", category: "Lifestyle", type: "Video", duration: "35 mins", author: "VCM Education Wing", date: "2026-06-20", views: 2100 },
  { id: 5, title: "Chanting Hare Krishna: Science & Practice", category: "Chanting", type: "Audio", duration: "18 mins", author: "H.G. Mukunda Das", date: "2026-06-15", views: 4200 },
  { id: 6, title: "The Pastimes of Radha and Krishna in Vrindavan", category: "Lila", type: "Article", duration: "15 min read", author: "H.G. Gopinath Das", date: "2026-06-10", views: 6700 },
];

// ---------- TEMPLE STORE ----------
export const storeProducts = [
  { id: 1, name: "Tulsi Mala (108 beads)", category: "Mala & Accessories", price: 250, rating: 4.8, stock: 50, image: "tulsi-mala", badge: "Bestseller" },
  { id: 2, name: "Radha Krishna Brass Idol", category: "Idols & Statues", price: 1499, rating: 4.9, stock: 8, image: "brass-idol", badge: "Premium" },
  { id: 3, name: "Panchamrit Kit", category: "Puja Essentials", price: 399, rating: 4.5, stock: 30, image: "panchamrit", badge: null },
  { id: 4, name: "Incense Sticks (Vrindavan Dhoop)", category: "Agarbatti & Dhoop", price: 99, rating: 4.6, stock: 100, image: "incense", badge: "New" },
  { id: 5, name: "Srimad Bhagavatam Set (12 Cantos)", category: "Books", price: 3500, rating: 5.0, stock: 15, image: "books", badge: "Popular" },
  { id: 6, name: "Ghee Diya Set (5 pcs)", category: "Puja Essentials", price: 149, rating: 4.3, stock: 200, image: "diya", badge: null },
  { id: 7, name: "Devotional Music CD Box Set", category: "Music", price: 499, rating: 4.7, stock: 25, image: "music", badge: null },
  { id: 8, name: "Vrindavan Prasad (Peda - 500g)", category: "Prasad", price: 199, rating: 4.8, stock: 0, image: "prasad", badge: "Out of Stock" },
];

export const myOrders = [
  { id: "ORD-001", item: "Tulsi Mala (108 beads)", amount: 250, date: "2026-07-02", status: "Delivered", tracking: "VCM-TR-001" },
  { id: "ORD-002", item: "Radha Krishna Brass Idol", amount: 1499, date: "2026-06-20", status: "Delivered", tracking: "VCM-TR-002" },
  { id: "ORD-003", item: "Srimad Bhagavatam Set", amount: 3500, date: "2026-07-08", status: "Shipped", tracking: "VCM-TR-003" },
];

// ---------- NEWS & ANNOUNCEMENTS ----------
export const newsItems = [
  {
    id: 1,
    title: "Janmashtami 2026: Grand Celebrations Planned at VCM",
    summary: "Vrindavan Chandrodaya Mandir is all set to host the grandest Janmashtami celebrations in its history, with a 7-day program scheduled from August 15-21, 2026.",
    category: "Announcement",
    date: "2026-07-08",
    author: "VCM Communications",
    isPinned: true,
    isNew: true,
    image: "news-janmashtami",
  },
  {
    id: 2,
    title: "New Digital Darshan Portal Launched for Devotees",
    summary: "Devotees can now book darshan slots, view live temple webcams, and receive digital prasad through the new VCM Digital Darshan portal.",
    category: "Technology",
    date: "2026-07-05",
    author: "IT Department",
    isPinned: false,
    isNew: true,
    image: "news-digital",
  },
  {
    id: 3,
    title: "Govardhan Parikrama Path Renovation Complete",
    summary: "The sacred Govardhan Parikrama path has been beautifully renovated with new flooring, shade structures, and resting spots for pilgrims.",
    category: "Infrastructure",
    date: "2026-07-01",
    author: "Temple Management",
    isPinned: false,
    isNew: false,
    image: "news-govardhan",
  },
  {
    id: 4,
    title: "VCM Goshala Wins National Cow Protection Award",
    summary: "Our Goshala has been honored with the National Cow Protection Award 2026 by the Ministry of Fisheries, Animal Husbandry and Dairying.",
    category: "Achievement",
    date: "2026-06-25",
    author: "VCM PR Team",
    isPinned: false,
    isNew: false,
    image: "news-goshala",
  },
];

// ---------- NOTIFICATIONS ----------
export const notifications = [
  { id: 1, type: "booking", title: "Darshan Booking Confirmed", message: "Your Special Darshan slot for July 20 at 06:30 AM has been confirmed. Booking ref: DAR-20260720-001", time: "2 hours ago", isRead: false, icon: "🛕" },
  { id: 2, type: "event", title: "Guru Purnima Registration Reminder", message: "The Guru Purnima Mahotsav is in 9 days. You are registered. Please arrive 30 mins early.", time: "5 hours ago", isRead: false, icon: "📅" },
  { id: 3, type: "donation", title: "Donation Receipt Generated", message: "Your donation of ₹1,001 for Prasad Distribution has been received. Receipt #RCP-2026-001 is ready.", time: "1 day ago", isRead: true, icon: "🙏" },
  { id: 4, type: "store", title: "Order Shipped", message: "Your order #ORD-003 (Srimad Bhagavatam Set) has been shipped. Expected delivery: July 12, 2026.", time: "2 days ago", isRead: true, icon: "📦" },
  { id: 5, type: "system", title: "Profile Update Reminder", message: "Complete your devotee profile to access all temple services and receive personalized notifications.", time: "3 days ago", isRead: true, icon: "👤" },
  { id: 6, type: "event", title: "Radhashtami Registration Open", message: "Register now for the Radhashtami Utsav on September 10, 2026. Limited seats available.", time: "5 days ago", isRead: true, icon: "🌸" },
];

// ---------- SUPPORT ----------
export const supportTickets = [
  { id: "TKT-001", subject: "Booking cancellation refund pending", category: "Booking", status: "In Progress", priority: "High", date: "2026-07-08", lastUpdate: "2026-07-09" },
  { id: "TKT-002", subject: "Unable to download prasad receipt", category: "Technical", status: "Resolved", priority: "Low", date: "2026-06-20", lastUpdate: "2026-06-21" },
];

export const faqItems = [
  { q: "How do I cancel a darshan booking?", a: "You can cancel your booking from My Bookings section up to 24 hours before the scheduled time. Refund will be processed within 3-5 business days." },
  { q: "What is the dress code for darshan?", a: "Traditional Indian attire is preferred. Ladies should wear saree or salwar kameez with dupatta. Men should wear kurta-dhoti or pants-shirt. Western wear is acceptable but shorts/sleeveless tops are not allowed." },
  { q: "Can I get prasad delivered at home?", a: "Yes, VCM offers home delivery of prasad through our Temple Store. Shipping is available across India." },
  { q: "How do I get a tax exemption certificate for donations?", a: "All donations to VCM are eligible for 80G tax exemption. Your receipt with the exemption certificate will be emailed automatically after donation confirmation." },
  { q: "Is accommodation available for large groups?", a: "Yes, we have special group booking options. Contact our hospitality desk at hospitality@vcm.org or call 0565-123456." },
];
