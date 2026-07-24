import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import UserLayout from "../../components/user/layout/UserLayout";
import { StatusBadge } from "../../components/user/ui/UserUI";
import { mockBookings, darshanSlots } from "./data/mockData";
import {
  FaArrowRight, FaClock, FaHeart, FaPray, FaHome, FaCalendarAlt
} from "react-icons/fa";
import { GiTempleGate } from "react-icons/gi";

// ─────────────────────────────────────────────────────────────────────
//  Ultra-Minimalist VCM Devotee Dashboard
// ─────────────────────────────────────────────────────────────────────
const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Find the single next active booking to display cleanly
  const activeBookings = mockBookings.filter((b) => b.status === "Confirmed" || b.status === "Pending");
  const nextBooking = activeBookings[0] || null;

  return (
    <UserLayout pageTitle="VCM Temple Dashboard">
      <div className="max-w-6xl mx-auto space-y-6 pb-8 animate-fade-in">

        {/* ── 1. HERO WELCOME & LIVE TEMPLE STATUS BANNER ── */}
        <div 
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 sm:py-10 shadow-lg border border-orange-500/20"
          style={{ background: "linear-gradient(135deg, #1e2140 0%, #311b3e 60%, #4a154b 100%)" }}
        >
          {/* Decorative Lotus Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "#f97316" }} />
          <div className="absolute -bottom-20 right-10 w-60 h-60 rounded-full blur-2xl opacity-15 pointer-events-none" style={{ background: "#fbbf24" }} />
          <div className="absolute right-8 bottom-6 text-8xl opacity-10 select-none pointer-events-none hidden md:block">🪷</div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              {/* Live Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-300 text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Sri Sri Radha Vrindavanchandra · 🛕 Temple Open</span>
              </div>

              {/* Greeting */}
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Jai Sri Radhe, {user?.name?.split(" ")[0] || "Devotee"} 🙏
              </h2>
              <p className="text-white/70 text-sm sm:text-base mt-2 max-w-xl font-normal leading-relaxed">
                Welcome to your sacred Vrindavan Chandrodaya Mandir portal. Book your divine Darshan, perform Chadhava Seva, or reserve Yatri Niwas stay with ease.
              </p>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 flex-shrink-0 pt-2 lg:pt-0">
              <button
                onClick={() => navigate("/user/darshan")}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", color: "#fff", boxShadow: "0 8px 25px rgba(249,115,22,0.4)" }}
              >
                <span>Book Darshan</span>
                <FaArrowRight className="text-xs" />
              </button>
              <button
                onClick={() => navigate("/user/chadhava")}
                className="px-6 py-3.5 rounded-2xl text-sm font-semibold border border-white/25 bg-white/10 hover:bg-white/15 text-white backdrop-blur-sm transition-all"
              >
                Offer Chadhava Seva
              </button>
            </div>
          </div>
        </div>

        {/* ── 2. ESSENTIAL TEMPLE SERVICES (THE ONLY 4 CORE ACTIONS) ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3.5 px-1">
            Core Temple Offerings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Darshan & Aarti */}
            <div
              onClick={() => navigate("/user/darshan")}
              className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-60" />
              <div className="relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <GiTempleGate />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-800 group-hover:text-orange-600 transition-colors">
                  Darshan & Aarti
                </h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
                  Reserve Mangal, Shringar, Rajbhog & Sandhya Darshan slots.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-1.5 text-xs font-bold text-orange-600 mt-6 pt-3 border-t border-slate-50">
                <span>Book Slot</span>
                <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Card 2: Puja & Chadhava */}
            <div
              onClick={() => navigate("/user/puja")}
              className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-60" />
              <div className="relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <FaPray />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-800 group-hover:text-purple-600 transition-colors">
                  Puja & Chadhava
                </h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
                  Perform personalized Tulsi Vivah, Rukmini Haran & Abhishek Puja.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-1.5 text-xs font-bold text-purple-600 mt-6 pt-3 border-t border-slate-50">
                <span>Offer Seva</span>
                <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Card 3: Yatri Niwas Stay */}
            <div
              onClick={() => navigate("/user/accommodation")}
              className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-60" />
              <div className="relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <FaHome />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                  Yatri Niwas Stay
                </h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
                  Book comfortable suites & Dharamshala for your Vrindavan visit.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-1.5 text-xs font-bold text-blue-600 mt-6 pt-3 border-t border-slate-50">
                <span>Book Rooms</span>
                <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Card 4: Divya Seva & Donate */}
            <div
              onClick={() => navigate("/user/donations")}
              className="group cursor-pointer bg-white p-6 rounded-3xl border border-slate-100 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-60" />
              <div className="relative z-10">
                <div className="w-13 h-13 rounded-2xl bg-red-100/80 text-red-600 flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <FaHeart />
                </div>
                <h4 className="font-display font-bold text-lg text-slate-800 group-hover:text-red-600 transition-colors">
                  Divya Seva & Donate
                </h4>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
                  Contribute to Govardhan Parikrama Path, Goshala & Annadana.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-1.5 text-xs font-bold text-red-600 mt-6 pt-3 border-t border-slate-50">
                <span>Contribute Now</span>
                <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
              </div>
            </div>

          </div>
        </div>

        {/* ── 3. CLEAN MINIMALIST BOTTOM PANEL: NEXT BOOKING + LIVE SCHEDULE ── */}
        <div className="grid lg:grid-cols-12 gap-5 pt-2">
          
          {/* Left Column (5 Cols): My Next Sacred Visit */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-orange-500 text-sm" />
                  <h3 className="font-display font-bold text-slate-800 text-base">My Next Sacred Visit</h3>
                </div>
                <button
                  onClick={() => navigate("/user/bookings")}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View All →
                </button>
              </div>

              {nextBooking ? (
                <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {nextBooking.service}
                    </span>
                    <StatusBadge status={nextBooking.status} />
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-base mt-1">
                    {nextBooking.category}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium mt-1.5 flex items-center gap-1.5">
                    <FaClock className="text-orange-500 text-[11px]" />
                    <span>{new Date(nextBooking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span>•</span>
                    <span className="font-bold text-slate-800">{nextBooking.time}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Slot: {nextBooking.slot} · Ref: {nextBooking.refNo}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 px-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <span className="text-3xl block mb-2">🙏</span>
                  <p className="text-slate-700 font-bold text-sm">No upcoming visits reserved</p>
                  <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto font-medium">
                    Reserve your Darshan slot or Puja ahead of your Vrindavan pilgrimage.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate(nextBooking ? "/user/bookings" : "/user/darshan")}
              className="w-full mt-5 py-3 rounded-2xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              {nextBooking ? "Manage My Bookings" : "Book Your First Darshan"}
            </button>
          </div>

          {/* Right Column (7 Cols): Today's VCM Aarti Timings */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">🛕</span>
                  <h3 className="font-display font-bold text-slate-800 text-base">Today's VCM Darshan Schedule</h3>
                </div>
                <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Live Timings
                </span>
              </div>

              {/* Minimal 5-Aarti Row Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {darshanSlots.map((slot) => {
                  const isRajbhog = slot.name.includes("Rajbhog");
                  return (
                    <div
                      key={slot.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                        isRajbhog
                          ? "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-200 shadow-sm"
                          : "bg-slate-50/70 border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                          isRajbhog ? "bg-orange-500 text-white" : "bg-white text-slate-600 shadow-sm border border-slate-100"
                        }`}>
                          {slot.type === "Free" ? "🛕" : "🪔"}
                        </div>
                        <div>
                          <p className={`text-xs font-bold leading-tight ${isRajbhog ? "text-orange-950" : "text-slate-800"}`}>
                            {slot.name}
                          </p>
                          <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{slot.time}</p>
                        </div>
                      </div>
                      <div>
                        {isRajbhog ? (
                          <span className="text-[9px] font-extrabold bg-orange-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Next
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400">
                            {slot.type}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                Vrindavan Chandrodaya Mandir Main Sanctum
              </span>
              <button
                onClick={() => navigate("/user/events")}
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1"
              >
                <span>Explore Upcoming Festivals</span>
                <FaArrowRight className="text-[9px]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </UserLayout>
  );
};

export default UserDashboard;
