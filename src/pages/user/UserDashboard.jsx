import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, CardHeader, PageHeader, StatWidget, StatusBadge, PrimaryBtn, OutlineBtn
} from "../../components/user/ui/UserUI";
import {
  mockBookings, events, notifications, myDonations, myVolunteerHistory
} from "./data/mockData";
import {
  FaCalendarAlt, FaBell, FaHeart, FaHandsHelping,
  FaArrowRight, FaBookOpen, FaCheckCircle, FaClock, FaRupeeSign,
  FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaUsers
} from "react-icons/fa";
import { GiTempleGate, GiLotusFlower } from "react-icons/gi";

// ─────────────────────────────────────────────────────────────────────
//  Sliding Events Banner
// ─────────────────────────────────────────────────────────────────────
const bannerSlides = [
  {
    id: 1,
    tag: "🎊 Festival",
    title: "Guru Purnima Mahotsav",
    subtitle: "Jul 18 · Main Temple Courtyard",
    desc: "Grand celebration with special Guru Vandana, bhajan sandhya and prasad distribution. 1,240+ devotees registered.",
    cta: "Register Now",
    bg: "linear-gradient(135deg, #c2410c 0%, #92400e 40%, #78350f 100%)",
    accent: "#fbbf24",
    emoji: "🪷",
  },
  {
    id: 2,
    tag: "🎉 Major Festival",
    title: "Janmashtami Seva Week",
    subtitle: "Aug 15–21 · All Temple Premises",
    desc: "7-day celebration of Lord Krishna's birth anniversary. Midnight celebrations, decoration competition & bhajan programs.",
    cta: "Join the Celebration",
    bg: "linear-gradient(135deg, #1d4ed8 0%, #4c1d95 50%, #7c3aed 100%)",
    accent: "#fbbf24",
    emoji: "🎵",
  },
  {
    id: 3,
    tag: "🌸 Appearance Day",
    title: "Radhashtami Utsav",
    subtitle: "Sep 10 · Main Temple",
    desc: "Celebration of Srimati Radharani's appearance day with special abhishek, 108 diyas and bhajan sandhya.",
    cta: "Book Your Slot",
    bg: "linear-gradient(135deg, #be185d 0%, #9d174d 40%, #831843 100%)",
    accent: "#fde68a",
    emoji: "🌸",
  },
  {
    id: 4,
    tag: "📖 Spiritual Program",
    title: "Gita Jayanti Saptah",
    subtitle: "Dec 5–11 · Radha Kund Premises",
    desc: "Week-long recitation and discourse of Bhagavad Gita by eminent scholars and saints from across India.",
    cta: "Learn More",
    bg: "linear-gradient(135deg, #065f46 0%, #064e3b 40%, #022c22 100%)",
    accent: "#fbbf24",
    emoji: "📿",
  },
];

const EventsBanner = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prev = () => goTo((current - 1 + bannerSlides.length) % bannerSlides.length);
  const next = () => goTo((current + 1) % bannerSlides.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % bannerSlides.length);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const slide = bannerSlides[current];

  return (
    <div className="relative overflow-hidden rounded-2xl mb-6" style={{ height: "220px" }}>
      {/* Slides */}
      {bannerSlides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-all duration-500 ease-in-out"
          style={{
            background: s.bg,
            opacity: i === current ? 1 : 0,
            transform: i === current ? "translateX(0)" : i < current ? "translateX(-100%)" : "translateX(100%)",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full opacity-10" style={{ background: s.accent }} />
          <div className="absolute -bottom-16 right-28 w-40 h-40 rounded-full opacity-8" style={{ background: "#fff" }} />
          <div className="absolute top-6 right-8 text-6xl opacity-20 select-none">{s.emoji}</div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-7 py-6">
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit"
              style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
            >
              {s.tag}
            </span>
            <h2 className="font-display font-bold text-white text-2xl sm:text-3xl leading-tight mb-1">
              {s.title}
            </h2>
            <p className="text-white/70 text-sm mb-2 font-medium">{s.subtitle}</p>
            <p className="text-white/60 text-xs mb-5 max-w-md hidden sm:block leading-relaxed">{s.desc}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/user/events")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                style={{ background: s.accent, color: "#1e2140" }}
              >
                {s.cta} <FaArrowRight className="text-xs" />
              </button>
              <button
                onClick={() => navigate("/user/darshan")}
                className="px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
              >
                Book Darshan
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(4px)" }}
      >
        <FaChevronLeft className="text-xs" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(4px)" }}
      >
        <FaChevronRight className="text-xs" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute top-4 right-14 text-xs font-semibold"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        {current + 1} / {bannerSlides.length}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
//  KPI stat config (reference-style colorful icon boxes)
// ─────────────────────────────────────────────────────────────────────
const STAT_COLORS = [
  { iconBg: "rgba(249,115,22,0.12)", iconColor: "#f97316" },   // orange
  { iconBg: "rgba(59,130,246,0.12)", iconColor: "#3b82f6" },   // blue
  { iconBg: "rgba(239,68,68,0.12)",  iconColor: "#ef4444" },   // red
  { iconBg: "rgba(34,197,94,0.12)",  iconColor: "#22c55e" },   // green
];

// ─────────────────────────────────────────────────────────────────────
//  Quick Action button
// ─────────────────────────────────────────────────────────────────────
const QuickAction = ({ icon: Icon, label, path, iconBg, iconColor }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-md transition-all duration-200 active:scale-95 group"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: iconBg }}
      >
        <Icon className="text-xl" style={{ color: iconColor }} />
      </div>
      <span className="text-xs font-semibold text-slate-600 text-center leading-tight">{label}</span>
    </button>
  );
};

// ─────────────────────────────────────────────────────────────────────
//  Main Dashboard
// ─────────────────────────────────────────────────────────────────────
const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const upcomingBookings = mockBookings
    .filter((b) => b.status === "Confirmed" && new Date(b.date) >= new Date())
    .slice(0, 3);

  const upcomingEvents = events.filter((e) => e.status === "Open" || e.status === "Upcoming").slice(0, 3);
  const unreadNotifs = notifications.filter((n) => !n.isRead);
  const totalDonated = myDonations.reduce((s, d) => s + d.amount, 0);
  const totalVolunteerHours = myVolunteerHistory.reduce((s, v) => s + v.hours, 0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "🌅 Good Morning";
    if (h < 17) return "☀️ Good Afternoon";
    return "🌙 Good Evening";
  };

  return (
    <UserLayout pageTitle="Dashboard">

      {/* ── Greeting ── */}
      <div className="mb-4">
        <p className="text-sm text-slate-500 font-medium">{greeting()}</p>
        <h2 className="font-display font-bold text-2xl text-slate-800 mt-0.5">
          Jai Sri Radhe, {user?.name?.split(" ")[0] || "Devotee"} 🙏
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* ── Sliding Events Banner ── */}
      <EventsBanner />

      {/* ── KPI Stats (reference style: colorful icon boxes) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget
          icon={FaCalendarAlt}
          iconBg={STAT_COLORS[0].iconBg}
          iconColor={STAT_COLORS[0].iconColor}
          label="Upcoming Bookings"
          value={upcomingBookings.length}
          sub="Active reservations"
          trend={12}
        />
        <StatWidget
          icon={GiTempleGate}
          iconBg={STAT_COLORS[1].iconBg}
          iconColor={STAT_COLORS[1].iconColor}
          label="Events Joined"
          value={events.filter((e) => e.isRegistered).length}
          sub="Registered events"
        />
        <StatWidget
          icon={FaHeart}
          iconBg={STAT_COLORS[2].iconBg}
          iconColor={STAT_COLORS[2].iconColor}
          label="Total Donated"
          value={`₹${totalDonated.toLocaleString("en-IN")}`}
          sub="Across all causes"
          trend={8}
        />
        <StatWidget
          icon={FaHandsHelping}
          iconBg={STAT_COLORS[3].iconBg}
          iconColor={STAT_COLORS[3].iconColor}
          label="Seva Hours"
          value={totalVolunteerHours}
          sub="Volunteer service"
        />
      </div>

      {/* ── Main Grid ── */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">

        {/* Upcoming Bookings */}
        <SCard className="lg:col-span-2 p-6">
          <CardHeader
            title="Upcoming Bookings"
            subtitle="Your confirmed reservations"
            action={
              <OutlineBtn onClick={() => navigate("/user/bookings")} className="text-xs px-3 py-1.5">
                View All
              </OutlineBtn>
            }
          />
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">No upcoming bookings</div>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0 shadow-sm"
                      style={{ background: "linear-gradient(135deg, #f97316, #dc2626)" }}
                    >
                      {b.service === "Darshan" ? "🛕" : b.service === "Puja" ? "🪔" : b.service === "Accommodation" ? "🏠" : "🎁"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{b.service} — {b.category}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        <FaClock className="inline mr-1" />
                        {new Date(b.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {b.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <StatusBadge status={b.status} />
                    <p className="text-xs text-slate-500 mt-1">₹{b.amount.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SCard>

        {/* Quick Actions */}
        <SCard className="p-6">
          <CardHeader title="Quick Actions" subtitle="Frequently used services" />
          <div className="grid grid-cols-2 gap-3">
            <QuickAction icon={GiTempleGate} label="Book Darshan" path="/user/darshan"
              iconBg="rgba(249,115,22,0.12)" iconColor="#f97316" />
            <QuickAction icon={GiLotusFlower} label="Book Puja"   path="/user/puja"
              iconBg="rgba(168,85,247,0.12)" iconColor="#a855f7" />
            <QuickAction icon={FaHeart}       label="Donate"      path="/user/donations"
              iconBg="rgba(239,68,68,0.12)"  iconColor="#ef4444" />
            <QuickAction icon={FaHandsHelping} label="Volunteer"  path="/user/volunteer"
              iconBg="rgba(34,197,94,0.12)"  iconColor="#22c55e" />
            <QuickAction icon={FaBookOpen}     label="Library"    path="/user/library"
              iconBg="rgba(59,130,246,0.12)" iconColor="#3b82f6" />
            <QuickAction icon={FaCalendarAlt}  label="Events"     path="/user/events"
              iconBg="rgba(245,158,11,0.12)" iconColor="#f59e0b" />
          </div>
        </SCard>
      </div>

      {/* ── Bottom Grid ── */}
      <div className="grid lg:grid-cols-2 gap-5">

        {/* Upcoming Events */}
        <SCard className="p-6">
          <CardHeader
            title="Upcoming Events"
            subtitle="Festivals & programs"
            action={
              <OutlineBtn onClick={() => navigate("/user/events")} className="text-xs px-3 py-1.5">
                Browse
              </OutlineBtn>
            }
          />
          <div className="space-y-3">
            {upcomingEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => navigate("/user/events")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border"
                    style={{ background: "rgba(249,115,22,0.06)", borderColor: "rgba(249,115,22,0.2)" }}
                  >
                    <span className="text-xs font-bold" style={{ color: "#f97316" }}>
                      {new Date(ev.date).toLocaleDateString("en-IN", { day: "2-digit" })}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {new Date(ev.date).toLocaleDateString("en-IN", { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-tight">{ev.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-[10px]" />{ev.venue}
                    </p>
                  </div>
                </div>
                {ev.isRegistered ? (
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}
                  >
                    <FaCheckCircle /> Joined
                  </span>
                ) : (
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 cursor-pointer transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", color: "#fff" }}
                  >
                    Register
                  </span>
                )}
              </div>
            ))}
          </div>
        </SCard>

        {/* Notifications */}
        <SCard className="p-6">
          <CardHeader
            title="Recent Notifications"
            subtitle={`${unreadNotifs.length} unread`}
            action={
              <OutlineBtn onClick={() => navigate("/user/notifications")} className="text-xs px-3 py-1.5">
                View All
              </OutlineBtn>
            }
          />
          <div className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <div
                key={n.id}
                className={`flex gap-3 p-3 rounded-xl transition-colors ${!n.isRead ? "bg-orange-50/60 border border-orange-100" : "hover:bg-slate-50"}`}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{n.icon}</span>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800 truncate">{n.title}</p>
                    {!n.isRead && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "#f97316" }}
                      />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </SCard>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;