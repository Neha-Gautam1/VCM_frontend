import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  FaOm, FaTachometerAlt, FaUserCircle, FaCalendarAlt, FaBell,
  FaHandsHelping, FaBook, FaBrain, FaShoppingBag, FaNewspaper,
  FaCog, FaHeadset, FaSignOutAlt, FaTimes, FaChevronLeft,
  FaChevronRight, FaBars, FaSearch, FaPray, FaHome,
  FaHeart, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import { GiTempleGate, GiLotusFlower, GiCandleLight } from "react-icons/gi";
import { notifications } from "../../../pages/user/data/mockData";

// ─── Palette ─────────────────────────────────────────────────────────
// Sidebar: dark navy  #1e2140 (matches reference exactly)
// Accent:  orange-red gradient (matches welcome banner in reference)
// Active pill: orange gradient, full-width rounded
// Text muted: slate-400

// ─── Nav structure ───────────────────────────────────────────────────
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
    label: "Knowledge",
    items: [
      { label: "Spiritual Library", path: "/user/library",    icon: FaBook },
      { label: "Knowledge Centre",  path: "/user/knowledge",  icon: FaBrain },
    ],
  },
  {
    label: "More",
    items: [
      { label: "Temple Store",   path: "/user/store",         icon: FaShoppingBag },
      { label: "News & Updates", path: "/user/news",          icon: FaNewspaper },
      { label: "Notifications",  path: "/user/notifications", icon: FaBell },
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
  const unread = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => { logout(); navigate("/login"); };

  const toggleGroup = (i) => {
    if (collapsed) return;
    setOpenGroups((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        style={{ backgroundColor: "#1e2140" }}
        className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out
          border-r border-white/5
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "w-[72px]" : "w-72"}`}
      >
        {/* ── Logo ── */}
        <div
          className={`flex items-center justify-between px-4 py-[18px] flex-shrink-0`}
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{ background: "linear-gradient(135deg, #f97316, #dc2626)" }}
            >
              <FaOm className="text-white text-lg" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden leading-tight">
                <p className="font-display font-bold text-white text-sm leading-none">VCM Portal</p>
                <p className="text-slate-400 text-[10px] mt-0.5">Vrindavan Chandrodaya</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex w-7 h-7 items-center justify-center rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/10 transition-colors"
            >
              {collapsed ? <FaChevronRight className="text-xs" /> : <FaChevronLeft className="text-xs" />}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* ── User Mini Card ── */}
        {!collapsed && (
          <div
            className="mx-3 mt-3 mb-1 p-3 rounded-xl flex items-center gap-3 flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <img
              src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              style={{ boxShadow: "0 0 0 2px rgba(249,115,22,0.5)" }}
            />
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">{user?.name?.split(" ")[0] || "Devotee"}</p>
              <p className="text-slate-400 text-[11px] truncate">{user?.email}</p>
            </div>
          </div>
        )}

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-2 py-3">
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.label} className="mb-1">
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(gi)}
                  className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <span>{group.label}</span>
                  {openGroups[gi] ? <FaChevronUp className="text-[8px]" /> : <FaChevronDown className="text-[8px]" />}
                </button>
              )}
              {(collapsed || openGroups[gi]) && (
                <ul className="space-y-0.5">
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
                            background: "linear-gradient(90deg, #f97316, #dc2626)",
                            color: "#fff",
                            borderRadius: "12px",
                          } : {}}
                          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                            ${isActive
                              ? "shadow-md"
                              : "text-slate-400 hover:bg-white/8 hover:text-slate-100"
                            }
                            ${collapsed ? "justify-center" : ""}`}
                        >
                          <Icon className="text-base flex-shrink-0" />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                          {!collapsed && item.label === "Notifications" && unread > 0 && (
                            <span
                              className="ml-auto w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
                              style={{ background: "#ef4444" }}
                            >
                              {unread}
                            </span>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* ── Logout ── */}
        <div className="p-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/15 hover:text-red-400 transition-colors ${collapsed ? "justify-center" : ""}`}
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
  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors flex-shrink-0"
          >
            <FaBars />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-slate-400 text-base hidden sm:block">🛕</span>
            <h1 className="font-display font-bold text-lg text-slate-800 truncate hidden sm:block">{pageTitle}</h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 gap-2 w-60 focus-within:ring-2 focus-within:ring-orange-400/30 focus-within:border-orange-300 transition-all">
            <FaSearch className="text-slate-400 text-xs flex-shrink-0" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search services..."
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
            />
          </div>

          {/* Notifications */}
          <button
            onClick={() => navigate("/user/notifications")}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <FaBell className="text-base" />
            {unread > 0 && (
              <span
                className="absolute top-1 right-1 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                style={{ background: "#ef4444" }}
              >
                {unread}
              </span>
            )}
          </button>

          <div className="w-px h-7 bg-slate-200 hidden sm:block" />

          {/* Avatar */}
          <button
            onClick={() => navigate("/user/profile")}
            className="flex items-center gap-2.5 group"
          >
            <img
              src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover transition-all"
              style={{ boxShadow: "0 0 0 2px #f97316" }}
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-none">{user?.name?.split(" ")[0]}</p>
              <p className="text-[10px] text-orange-500 mt-0.5 font-medium">Devotee</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

// ─── Main Layout ─────────────────────────────────────────────────────
const UserLayout = ({ children, pageTitle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f7fb" }}>
      <UserSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className={`transition-all duration-300 ease-in-out ${collapsed ? "lg:pl-[72px]" : "lg:pl-72"}`}>
        <UserTopBar
          onMenuClick={() => setMobileOpen(true)}
          pageTitle={pageTitle}
          collapsed={collapsed}
        />
        <main className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
