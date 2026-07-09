// ─── Shared UI primitives for the User Dashboard ──────────────────────
// Theme: navy sidebar, orange-red accent, white cards, #f5f7fb bg

// SpiritualCard
export const SCard = ({ children, className = "", hover = true }) => (
  <div
    className={`bg-white rounded-2xl border border-slate-100 shadow-sm
      ${hover ? "hover:shadow-md hover:border-slate-200 transition-all duration-200" : ""}
      ${className}`}
  >
    {children}
  </div>
);

// Section header inside a card
export const CardHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-5 pb-4 border-b border-slate-50">
    <div>
      <h3 className="font-display font-semibold text-slate-800 text-base">{title}</h3>
      {subtitle && <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// Page header (above cards)
export const PageHeader = ({ title, subtitle, badge, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div>
      {badge && (
        <span
          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2"
          style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}
        >
          {badge}
        </span>
      )}
      <h2 className="font-display font-bold text-2xl text-slate-800 leading-tight">{title}</h2>
      {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

// Stat / KPI widget — matches reference style: white card, colored icon box, number, label
export const StatWidget = ({ icon: Icon, iconBg, iconColor, label, value, sub, trend }) => (
  <SCard className="p-5">
    <div className="flex items-start justify-between mb-4">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg || "rgba(249,115,22,0.12)" }}
      >
        <Icon className="text-xl" style={{ color: iconColor || "#f97316" }} />
      </div>
      {trend !== undefined && (
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: trend >= 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            color: trend >= 0 ? "#16a34a" : "#dc2626",
          }}
        >
          {trend >= 0 ? "+" : ""}{trend}%
        </span>
      )}
    </div>
    <p className="font-display font-bold text-2xl text-slate-800">{value}</p>
    <p className="text-slate-600 text-sm font-medium mt-0.5">{label}</p>
    {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
  </SCard>
);

// Status badge
export const StatusBadge = ({ status }) => {
  const map = {
    Confirmed: { bg: "rgba(34,197,94,0.1)", color: "#16a34a", border: "rgba(34,197,94,0.2)" },
    Completed: { bg: "rgba(14,165,233,0.1)", color: "#0284c7", border: "rgba(14,165,233,0.2)" },
    Pending: { bg: "rgba(249,115,22,0.1)", color: "#ea580c", border: "rgba(249,115,22,0.2)" },
    Cancelled: { bg: "rgba(239,68,68,0.1)", color: "#dc2626", border: "rgba(239,68,68,0.2)" },
    Open: { bg: "rgba(34,197,94,0.1)", color: "#16a34a", border: "rgba(34,197,94,0.2)" },
    Upcoming: { bg: "rgba(168,85,247,0.1)", color: "#9333ea", border: "rgba(168,85,247,0.2)" },
    "In Progress": { bg: "rgba(59,130,246,0.1)", color: "#2563eb", border: "rgba(59,130,246,0.2)" },
    Resolved: { bg: "rgba(148,163,184,0.15)", color: "#64748b", border: "rgba(148,163,184,0.3)" },
    Delivered: { bg: "rgba(34,197,94,0.1)", color: "#16a34a", border: "rgba(34,197,94,0.2)" },
    Shipped: { bg: "rgba(59,130,246,0.1)", color: "#2563eb", border: "rgba(59,130,246,0.2)" },
  };
  const s = map[status] || { bg: "rgba(148,163,184,0.15)", color: "#64748b", border: "rgba(148,163,184,0.3)" };
  return (
    <span
      className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border"
      style={{ background: s.bg, color: s.color, borderColor: s.border }}
    >
      {status}
    </span>
  );
};

// Primary button — orange gradient
export const PrimaryBtn = ({ children, onClick, className = "", type = "button", disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
      text-white font-semibold text-sm
      active:scale-95 transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}`}
    style={{ background: disabled ? "#94a3b8" : "linear-gradient(135deg, #f97316, #dc2626)", boxShadow: disabled ? "none" : "0 4px 15px rgba(249,115,22,0.35)" }}
  >
    {children}
  </button>
);

// Secondary / outline button
export const OutlineBtn = ({ children, onClick, className = "", type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
      border border-slate-200 text-slate-600 font-semibold text-sm
      hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all duration-200
      ${className}`}
  >
    {children}
  </button>
);

// Empty state
export const EmptyBox = ({ icon = "🙏", title = "Nothing here yet", subtitle }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="font-display font-semibold text-slate-700 text-lg">{title}</h3>
    {subtitle && <p className="text-slate-400 text-sm mt-1 max-w-xs">{subtitle}</p>}
  </div>
);

// Loading skeleton
export const SkeletonCard = ({ rows = 3 }) => (
  <div className="animate-pulse space-y-3 p-5">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-4 bg-slate-100 rounded-full" style={{ width: `${85 - i * 15}%` }} />
    ))}
  </div>
);

// Progress bar
export const ProgressBar = ({ value, max }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-slate-500 mb-1">
        <span>₹{value.toLocaleString("en-IN")} raised</span>
        <span className="font-semibold" style={{ color: "#f97316" }}>{pct}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #f97316, #dc2626)" }}
        />
      </div>
      <p className="text-xs text-slate-400 mt-1">Goal: ₹{max.toLocaleString("en-IN")}</p>
    </div>
  );
};

// Input field
export const FormInput = ({ label, id, type = "text", placeholder, value, onChange, required, error }) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
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
      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400
        bg-slate-50 outline-none transition-all duration-200
        focus:ring-2 focus:bg-white
        ${error ? "border-red-300 bg-red-50/30" : "border-slate-200 hover:border-slate-300"}`}
      style={{ "--tw-ring-color": "rgba(249,115,22,0.3)" }}
      onFocus={(e) => { if (!error) e.target.style.borderColor = "#f97316"; }}
      onBlur={(e) => { if (!error) e.target.style.borderColor = ""; }}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// Select field
export const FormSelect = ({ label, id, children, value, onChange, required, error }) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800
        bg-slate-50 outline-none transition-all duration-200
        ${error ? "border-red-300" : "border-slate-200 hover:border-slate-300"}`}
    >
      {children}
    </select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// Textarea
export const FormTextarea = ({ label, id, placeholder, value, onChange, rows = 4, required, error }) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
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
      className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400
        bg-slate-50 outline-none transition-all duration-200 resize-none
        ${error ? "border-red-300" : "border-slate-200 hover:border-slate-300"}`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// Search bar
export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 gap-2 transition-all w-full sm:w-72"
    style={{ outline: "none" }}
    onFocus={(e) => e.currentTarget.style.borderColor = "#f97316"}
    onBlur={(e) => e.currentTarget.style.borderColor = ""}
  >
    <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
    />
  </div>
);

// Tab bar
export const TabBar = ({ tabs, active, onChange }) => (
  <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
        style={active === tab.value ? {
          background: "linear-gradient(135deg, #f97316, #dc2626)",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(249,115,22,0.3)",
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
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 text-white px-5 py-3 rounded-2xl shadow-xl animate-slide-up"
    style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", boxShadow: "0 8px 30px rgba(249,115,22,0.4)" }}
  >
    <span>✅</span>
    <p className="text-sm font-medium">{message}</p>
    <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">✕</button>
  </div>
);

// Modal wrapper
export const Modal = ({ isOpen, onClose, title, children, maxW = "max-w-lg" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxW} p-6 animate-slide-up max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-slate-800 text-lg">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};
