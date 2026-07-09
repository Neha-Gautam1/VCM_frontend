const Card = ({ children, className = "", title, action, noPadding = false }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-card border border-slate-100 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          {title && <h3 className="font-display font-semibold text-slate-800">{title}</h3>}
          {action}
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
};

export default Card;