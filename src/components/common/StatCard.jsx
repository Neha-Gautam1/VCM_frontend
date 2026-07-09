const colorMap = {
  saffron: "from-saffron-500 to-saffron-600",
  maroon: "from-maroon-600 to-maroon-700",
  emerald: "from-emerald-500 to-emerald-600",
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  amber: "from-amber-500 to-amber-600",
};

const StatCard = ({ icon: Icon, label, value, trend, color = "saffron" }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center`}>
          <Icon className="text-white text-lg" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-display font-bold text-slate-800">{value}</p>
      <p className="text-slate-500 text-sm mt-1">{label}</p>
    </div>
  );
};

export default StatCard;