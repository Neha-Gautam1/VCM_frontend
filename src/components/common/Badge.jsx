const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive: "bg-slate-100 text-slate-600 border-slate-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
  Draft: "bg-slate-100 text-slate-600 border-slate-200",
  Published: "bg-blue-50 text-blue-700 border-blue-200",
  default: "bg-slate-100 text-slate-600 border-slate-200",
};

const Badge = ({ status, children }) => {
  const style = statusStyles[status] || statusStyles.default;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${style}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
      {children || status}
    </span>
  );
};

export default Badge;