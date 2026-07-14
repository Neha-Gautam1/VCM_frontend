import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  FaOm, FaTachometerAlt, FaUserCircle, FaCalendarAlt,
  FaHandsHelping, FaShoppingBag,
  FaCog, FaHeadset, FaSignOutAlt, FaTimes, FaChevronLeft,
  FaChevronRight, FaBars, FaSearch, FaPray, FaHome,
  FaHeart, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import { GiTempleGate, GiLotusFlower, GiCandleLight } from "react-icons/gi";

// ─── Palette & Design System ──────────────────────────────────────────
// Sidebar: dark navy #1e2140 with sleek glassmorphism borders
// Accent: orange-red gradient #f97316 to #dc2626
// Text muted: slate-400
// UI/UX: Modern rounded cards, smooth hover micro-animations

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard",   path: "/user/dashboard",     icon: FaTachometerAlt, end: true },
      { label: "My Profile",  path: "/user/profile",       icon: FaUserCircle },
      { label: "My Bookings", path: "/user/bookings",      icon: FaCalendarAlt },
    ],
  },
  {
    label: "Temple Services",
    items: [
      { label: "Darshan",       path: "/user/darshan",       icon: GiTempleGate },
      { label: "Puja",          path: "/user/puja",          icon: FaPray },
      { label: "Chadhava",      path: "/user/chadhava",      icon: GiLotusFlower },
      { label: "Donations",     path: "/user/donations",     icon: FaHeart },
      { label: "Accommodation", path: "/user/accommodation", icon: FaHome },
    ],
  },
  {
    label: "Participate",
    items: [
      { label: "Events",    path: "/user/events",    icon: GiCandleLight },
      { label: "Volunteer", path: "/user/volunteer", icon: FaHandsHelping },
    ],
  },
  {
    label: "More",
    items: [
      { label: "Support",        path: "/user/support",       icon: FaHeadset },
      { label: "Settings",       path: "/user/settings",      icon: FaCog },
    ],
  },
];

// ─── Sidebar ─────────────────────────────────────────────────────────
const UserSidebar = ({ mobileOpen, setMobileOpen, collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState(NAV_GROUPS.map(() => true));

  const handleLogout = () => { logout(); navigate("/login"); };

  const toggleGroup = (i) => {
    if (collapsed) return;
    setOpenGroups((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        style={{ backgroundColor: "#1e2140" }}
        className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out
          border-r border-white/10 shadow-2xl
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "w-[76px]" : "w-72"}`}
      >
        {/* ── Logo Header ── */}
        <div
          className={`flex items-center justify-between px-4 py-4 flex-shrink-0`}
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #f97316, #dc2626)" }}
            >
              <FaOm className="text-white text-lg" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden leading-tight">
                <p className="font-display font-bold text-white text-sm tracking-wide leading-none">VCM PORTAL</p>
                <p className="text-orange-400 font-medium text-[10px] mt-1 tracking-wider uppercase">Vrindavan Mandir</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex w-7 h-7 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              {collapsed ? <FaChevronRight className="text-xs" /> : <FaChevronLeft className="text-xs" />}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* ── User Mini Card ── */}
        {!collapsed && (
          <div
            className="mx-3 mt-3.5 mb-2 p-3 rounded-2xl flex items-center gap-3 flex-shrink-0 transition-all hover:bg-white/10 cursor-pointer"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={() => navigate("/user/profile")}
          >
            <img
              src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`}
              alt={user?.name}
              className="w-10 h-10 rounded-xl object-cover flex-shrink-0 shadow-md"
              style={{ border: "2px solid #f97316" }}
            />
            <div className="overflow-hidden">
              <p className="text-white text-sm font-bold truncate">{user?.name?.split(" ")[0] || "Devotee"}</p>
              <p className="text-slate-400 text-[11px] truncate mt-0.5">{user?.email}</p>
            </div>
          </div>
        )}

        {/* ── Nav List ── */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-2.5 py-3 space-y-3">
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.label}>
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(gi)}
                  className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400/80 hover:text-orange-400 transition-colors"
                >
                  <span>{group.label}</span>
                  {openGroups[gi] ? <FaChevronUp className="text-[8px]" /> : <FaChevronDown className="text-[8px]" />}
                </button>
              )}
              {(collapsed || openGroups[gi]) && (
                <ul className="space-y-1 mt-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.end
                      ? location.pathname === item.path
                      : location.pathname.startsWith(item.path);
                    return (
                      <li key={item.label}>
                        <NavLink
                          to={item.path}
                          end={item.end}
                          onClick={() => setMobileOpen(false)}
                          title={collapsed ? item.label : undefined}
                          style={isActive ? {
                            background: "linear-gradient(135deg, #f97316, #dc2626)",
                            color: "#fff",
                            boxShadow: "0 4px 15px rgba(249,115,22,0.35)",
                          } : {}}
                          className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group
                            ${isActive
                              ? "text-white"
                              : "text-slate-400 hover:bg-white/10 hover:text-white hover:translate-x-1"
                            }
                            ${collapsed ? "justify-center !px-0" : ""}`}
                        >
                          <Icon className={`text-base flex-shrink-0 transition-transform ${!isActive && "group-hover:scale-110 group-hover:text-orange-400"}`} />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* ── Logout Button ── */}
        <div className="p-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex items-center gap-3.5 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-500/15 hover:text-red-400 transition-all duration-200 ${collapsed ? "justify-center !px-0" : ""}`}
          >
            <FaSignOutAlt className="flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

// ─── Top Bar ──────────────────────────────────────────────────────────
const UserTopBar = ({ onMenuClick, pageTitle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQ, setSearchQ] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-700 transition-colors flex-shrink-0 border border-slate-200/60"
          >
            <FaBars />
          </button>
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-orange-500 text-lg hidden sm:block">🛕</span>
            <h1 className="font-display font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight truncate">{pageTitle}</h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3.5 py-2 gap-2.5 w-64 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-400 focus-within:bg-white transition-all">
            <FaSearch className="text-slate-400 text-xs flex-shrink-0" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search temple services..."
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </div>

          {/* Support Link */}
          <button
            onClick={() => navigate("/user/support")}
            title="Help & Support"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-orange-50 text-slate-600 hover:text-orange-600 transition-all border border-transparent hover:border-orange-200"
          >
            <FaHeadset className="text-base" />
          </button>

          <div className="w-px h-7 bg-slate-200 hidden sm:block" />

          {/* Avatar Profile Button */}
          <button
            onClick={() => navigate("/user/profile")}
            className="flex items-center gap-3 p-1 sm:pr-3 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
          >
            <img
              src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover transition-transform group-hover:scale-105 shadow-sm"
              style={{ border: "2px solid #f97316" }}
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-none group-hover:text-orange-600 transition-colors">
                {user?.name?.split(" ")[0] || "Devotee"}
              </p>
              <p className="text-[10px] text-orange-500 mt-0.5 font-semibold uppercase tracking-wider">Vrindavan Seva</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

// ─── Main Layout Wrapper ─────────────────────────────────────────────
const UserLayout = ({ children, pageTitle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <div className="min-h-screen text-slate-800" style={{ backgroundColor: "#f8fafc" }}>
      <UserSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className={`transition-all duration-300 ease-in-out ${collapsed ? "lg:pl-[76px]" : "lg:pl-72"}`}>
        <UserTopBar
          onMenuClick={() => setMobileOpen(true)}
          pageTitle={pageTitle}
        />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
