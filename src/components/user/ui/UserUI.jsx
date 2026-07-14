// ─── Shared UI primitives for the User Dashboard & Sub-Pages ──────────
// Theme: Deep Navy & Orange-Red Gradients, Glassmorphism, Modern Cards
import React from "react";

// SpiritualCard — Eye-catching card with hover glow
export const SCard = ({ children, className = "", hover = true, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-3xl border border-slate-100/90 shadow-sm
      ${hover ? "hover:shadow-xl hover:border-orange-300/80 transition-all duration-300" : ""}
      ${onClick ? "cursor-pointer active:scale-[0.99]" : ""}
      ${className}`}
  >
    {children}
  </div>
);

// Section header inside a card
export const CardHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-5 pb-4 border-b border-slate-100">
    <div>
      <h3 className="font-display font-extrabold text-slate-800 text-lg tracking-tight">{title}</h3>
      {subtitle && <p className="text-slate-500 text-xs mt-1 font-medium leading-relaxed">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0 ml-4">{action}</div>}
  </div>
);

// Page header (Above cards) — Upgraded to an eye-catching Hero Header Banner
export const PageHeader = ({ title, subtitle, badge, action }) => (
  <div 
    className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8 shadow-md border border-orange-500/15"
    style={{ background: "linear-gradient(135deg, #1e2140 0%, #2e183b 55%, #4a154b 100%)" }}
  >
    {/* Subtle Decorative Lotuses and Glows */}
    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: "#f97316" }} />
    <div className="absolute right-6 bottom-4 text-7xl opacity-10 select-none pointer-events-none hidden md:block">🪷</div>

    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div>
        {badge && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1 rounded-full mb-3 bg-white/10 text-orange-300 border border-white/15 backdrop-blur-md uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            {badge}
          </span>
        )}
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/75 text-xs sm:text-sm mt-2 max-w-xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0 self-start sm:self-center">{action}</div>}
    </div>
  </div>
);

// Stat / KPI widget — Modern card style
export const StatWidget = ({ icon: Icon, iconBg, iconColor, label, value, sub, trend }) => (
  <SCard className="p-5 sm:p-6 relative overflow-hidden group">
    <div className="flex items-start justify-between mb-4">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-110 duration-300"
        style={{ background: iconBg || "rgba(249,115,22,0.12)" }}
      >
        <Icon className="text-2xl" style={{ color: iconColor || "#f97316" }} />
      </div>
      {trend !== undefined && (
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            background: trend >= 0 ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            color: trend >= 0 ? "#16a34a" : "#dc2626",
          }}
        >
          {trend >= 0 ? "+" : ""}{trend}%
        </span>
      )}
    </div>
    <p className="font-display font-black text-2xl sm:text-3xl text-slate-800 tracking-tight">{value}</p>
    <p className="text-slate-600 text-sm font-bold mt-1">{label}</p>
    {sub && <p className="text-slate-400 text-xs mt-1 font-medium">{sub}</p>}
  </SCard>
);

// Status badge with polished pill design
export const StatusBadge = ({ status }) => {
  const map = {
    Confirmed: { bg: "rgba(34,197,94,0.12)", color: "#16a34a", border: "rgba(34,197,94,0.25)" },
    Completed: { bg: "rgba(14,165,233,0.12)", color: "#0284c7", border: "rgba(14,165,233,0.25)" },
    Pending: { bg: "rgba(249,115,22,0.12)", color: "#ea580c", border: "rgba(249,115,22,0.25)" },
    Cancelled: { bg: "rgba(239,68,68,0.12)", color: "#dc2626", border: "rgba(239,68,68,0.25)" },
    Open: { bg: "rgba(34,197,94,0.12)", color: "#16a34a", border: "rgba(34,197,94,0.25)" },
    Upcoming: { bg: "rgba(168,85,247,0.12)", color: "#9333ea", border: "rgba(168,85,247,0.25)" },
    "In Progress": { bg: "rgba(59,130,246,0.12)", color: "#2563eb", border: "rgba(59,130,246,0.25)" },
    Resolved: { bg: "rgba(148,163,184,0.18)", color: "#64748b", border: "rgba(148,163,184,0.3)" },
    Delivered: { bg: "rgba(34,197,94,0.12)", color: "#16a34a", border: "rgba(34,197,94,0.25)" },
    Shipped: { bg: "rgba(59,130,246,0.12)", color: "#2563eb", border: "rgba(59,130,246,0.25)" },
  };
  const s = map[status] || { bg: "rgba(148,163,184,0.18)", color: "#64748b", border: "rgba(148,163,184,0.3)" };
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border shadow-2xs"
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      {status}
    </span>
  );
};

// Primary button — vibrant gradient with subtle glowing shadow
export const PrimaryBtn = ({ children, onClick, className = "", type = "button", disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl
      text-white font-bold text-sm shadow-md
      hover:scale-[1.02] active:scale-95 transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      ${className}`}
    style={{
      background: disabled ? "#94a3b8" : "linear-gradient(135deg, #f97316, #dc2626)",
      boxShadow: disabled ? "none" : "0 6px 20px rgba(249,115,22,0.35)",
    }}
  >
    {children}
  </button>
);

// Secondary / outline button
export const OutlineBtn = ({ children, onClick, className = "", type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl
      border border-slate-200 bg-white text-slate-700 font-bold text-sm
      hover:bg-orange-50/60 hover:text-orange-600 hover:border-orange-200 active:scale-95 transition-all duration-200 shadow-2xs
      ${className}`}
  >
    {children}
  </button>
);

// Empty state
export const EmptyBox = ({ icon = "🙏", title = "Nothing here yet", subtitle }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50/60 rounded-3xl border border-slate-100 p-6">
    <div className="text-5xl mb-4 transform hover:scale-110 transition-transform">{icon}</div>
    <h3 className="font-display font-bold text-slate-800 text-lg">{title}</h3>
    {subtitle && <p className="text-slate-500 text-xs mt-1 max-w-sm font-medium leading-relaxed">{subtitle}</p>}
  </div>
);

// Loading skeleton
export const SkeletonCard = ({ rows = 3 }) => (
  <div className="animate-pulse space-y-3 p-6 bg-white rounded-3xl border border-slate-100">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-4 bg-slate-100 rounded-full" style={{ width: `${85 - i * 15}%` }} />
    ))}
  </div>
);

// Progress bar
export const ProgressBar = ({ value, max }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1.5">
        <span>₹{value.toLocaleString("en-IN")} raised</span>
        <span className="font-bold text-orange-600">{pct}%</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #f97316, #dc2626)" }}
        />
      </div>
      <p className="text-[11px] text-slate-400 mt-1.5 font-medium">Goal: ₹{max.toLocaleString("en-IN")}</p>
    </div>
  );
};

// Input field
export const FormInput = ({ label, id, type = "text", placeholder, value, onChange, required, error }) => (
  <div className="space-y-1.5 text-left">
    {label && (
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-3 rounded-2xl border text-sm text-slate-800 placeholder-slate-400
        bg-slate-50/70 outline-none transition-all duration-200
        focus:ring-2 focus:bg-white focus:border-orange-400
        ${error ? "border-red-300 bg-red-50/30 ring-red-300" : "border-slate-200 hover:border-slate-300"}`}
    />
    {error && <p className="text-xs text-red-500 font-semibold mt-1">{error}</p>}
  </div>
);

// Select field
export const FormSelect = ({ label, id, children, value, onChange, required, error }) => (
  <div className="space-y-1.5 text-left">
    {label && (
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-3 rounded-2xl border text-sm text-slate-800
        bg-slate-50/70 outline-none transition-all duration-200
        focus:ring-2 focus:bg-white focus:border-orange-400
        ${error ? "border-red-300 bg-red-50/30" : "border-slate-200 hover:border-slate-300"}`}
    >
      {children}
    </select>
    {error && <p className="text-xs text-red-500 font-semibold mt-1">{error}</p>}
  </div>
);

// Textarea
export const FormTextarea = ({ label, id, placeholder, value, onChange, rows = 4, required, error }) => (
  <div className="space-y-1.5 text-left">
    {label && (
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
      className={`w-full px-4 py-3 rounded-2xl border text-sm text-slate-800 placeholder-slate-400
        bg-slate-50/70 outline-none transition-all duration-200 resize-none
        focus:ring-2 focus:bg-white focus:border-orange-400
        ${error ? "border-red-300 bg-red-50/30" : "border-slate-200 hover:border-slate-300"}`}
    />
    {error && <p className="text-xs text-red-500 font-semibold mt-1">{error}</p>}
  </div>
);

// Search bar
export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="flex items-center bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-2.5 gap-2.5 transition-all w-full sm:w-72 focus-within:ring-2 focus-within:ring-orange-400/30 focus-within:border-orange-400 focus-within:bg-white">
    <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full font-medium"
    />
  </div>
);

// Tab bar
export const TabBar = ({ tabs, active, onChange }) => (
  <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-200/60 rounded-2xl w-fit">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200"
        style={active === tab.value ? {
          background: "linear-gradient(135deg, #f97316, #dc2626)",
          color: "#fff",
          boxShadow: "0 4px 15px rgba(249,115,22,0.35)",
        } : {
          background: "transparent",
          color: "#64748b",
        }}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// Toast / success message
export const SuccessToast = ({ message, onClose }) => (
  <div
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 text-white px-6 py-4 rounded-3xl shadow-2xl animate-slide-up border border-white/20"
    style={{ background: "linear-gradient(135deg, #1e2140 0%, #311b3e 100%)", boxShadow: "0 12px 35px rgba(0,0,0,0.3)" }}
  >
    <span className="text-xl">🪷</span>
    <p className="text-sm font-bold tracking-wide">{message}</p>
    <button onClick={onClose} className="ml-2 text-white/70 hover:text-white font-bold text-lg">✕</button>
  </div>
);

// Modal wrapper
export const Modal = ({ isOpen, onClose, title, children, maxW = "max-w-lg" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={`relative bg-white rounded-3xl shadow-2xl w-full ${maxW} p-6 sm:p-8 animate-slide-up max-h-[90vh] overflow-y-auto border border-slate-100`}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h3 className="font-display font-extrabold text-slate-800 text-xl tracking-tight">{title}</h3>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};
