import { useState } from "react";
import { FaLightbulb, FaCheck, FaArchive, FaSearch, FaUserSecret, FaUser } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";

const initialSuggestions = [
  {
    id: 1,
    employee: "Priya Sharma",
    anonymous: false,
    suggestion:
      "We should implement a dedicated internal helpdesk ticketing system for IT requests instead of using email. This would help track and prioritize issues more efficiently.",
    date: "2026-07-08",
    status: "Pending",
    category: "Process Improvement",
  },
  {
    id: 2,
    employee: "Anonymous",
    anonymous: true,
    suggestion:
      "Monthly 1:1 meetings between department head and each team member would greatly improve communication and help resolve concerns early.",
    date: "2026-07-06",
    status: "Reviewed",
    category: "Team Culture",
  },
  {
    id: 3,
    employee: "Rahul Gupta",
    anonymous: false,
    suggestion:
      "The server room temperature monitoring should have automated alerts sent to the on-call engineer to prevent hardware failures.",
    date: "2026-07-05",
    status: "Pending",
    category: "Technical",
  },
  {
    id: 4,
    employee: "Ananya Verma",
    anonymous: false,
    suggestion:
      "We should create a knowledge base wiki for common IT solutions and FAQs. It will reduce repetitive support requests significantly.",
    date: "2026-07-03",
    status: "Archived",
    category: "Documentation",
  },
  {
    id: 5,
    employee: "Anonymous",
    anonymous: true,
    suggestion:
      "Please provide ergonomic chairs and standing desk options. The current seating setup leads to back problems for long work sessions.",
    date: "2026-07-01",
    status: "Reviewed",
    category: "Work Environment",
  },
  {
    id: 6,
    employee: "Kiran Patel",
    anonymous: false,
    suggestion:
      "Introduce a peer recognition program where team members can appreciate each other's contributions publicly.",
    date: "2026-06-28",
    status: "Pending",
    category: "Team Culture",
  },
  {
    id: 7,
    employee: "Suresh Nair",
    anonymous: false,
    suggestion:
      "Bi-weekly code review sessions would help junior developers learn faster and improve overall code quality.",
    date: "2026-06-25",
    status: "Reviewed",
    category: "Technical",
  },
  {
    id: 8,
    employee: "Anonymous",
    anonymous: true,
    suggestion:
      "Flexible work-from-home options on Fridays would improve work-life balance and employee morale.",
    date: "2026-06-20",
    status: "Archived",
    category: "Work Policy",
  },
];

const statusColors = {
  Pending: "bg-amber-100 text-amber-700",
  Reviewed: "bg-emerald-100 text-emerald-700",
  Archived: "bg-slate-100 text-slate-500",
};

const categoryColors = {
  "Process Improvement": "bg-blue-100 text-blue-700",
  "Team Culture": "bg-purple-100 text-purple-700",
  Technical: "bg-orange-100 text-orange-700",
  Documentation: "bg-teal-100 text-teal-700",
  "Work Environment": "bg-green-100 text-green-700",
  "Work Policy": "bg-pink-100 text-pink-700",
};

const DeptSuggestions = () => {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleReview = (id) =>
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: "Reviewed" } : s));

  const handleArchive = (id) =>
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: "Archived" } : s));

  const filtered = suggestions.filter(s =>
    (filterStatus === "All" || s.status === filterStatus) &&
    (
      s.suggestion.toLowerCase().includes(search.toLowerCase()) ||
      s.employee.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
    )
  );

  const counts = {
    Pending: suggestions.filter(s => s.status === "Pending").length,
    Reviewed: suggestions.filter(s => s.status === "Reviewed").length,
    Archived: suggestions.filter(s => s.status === "Archived").length,
  };

  return (
    <DashboardLayout
      menuItems={departmentMenuItems}
      pageTitle="Suggestions"
      breadcrumbs={["Department Admin", "Suggestions"]}
    >
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-slate-800">Employee Suggestions</h2>
        <p className="text-slate-500 text-sm mt-1">
          Review and act on suggestions from your department
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={FaLightbulb} label="Pending Review" value={counts.Pending} color="amber" />
        <StatCard icon={FaCheck} label="Reviewed" value={counts.Reviewed} color="emerald" />
        <StatCard icon={FaArchive} label="Archived" value={counts.Archived} color="blue" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search suggestions..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
          />
        </div>
        {["All", "Pending", "Reviewed", "Archived"].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filterStatus === s
                ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {s}
            {s !== "All" && (
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                filterStatus === s ? "bg-white/20" : "bg-slate-100"
              }`}>
                {counts[s] ?? 0}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Suggestion Cards */}
      <div className="space-y-4">
        {filtered.map(item => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border shadow-card hover:shadow-lg transition-all p-5 ${
              item.status === "Archived" ? "opacity-70 border-slate-100" : "border-slate-100"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.anonymous ? "bg-slate-100" : "bg-saffron-50"
                }`}
              >
                {item.anonymous ? (
                  <FaUserSecret className="text-slate-400" />
                ) : (
                  <FaUser className="text-saffron-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* Meta Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{item.employee}</span>
                    {item.anonymous && (
                      <span className="text-xs text-slate-400">(Anonymous)</span>
                    )}
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        categoryColors[item.category] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[item.status]}`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Suggestion Text */}
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.suggestion}</p>

                {/* Action Buttons */}
                {item.status === "Pending" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReview(item.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                    >
                      <FaCheck className="text-[10px]" /> Mark Reviewed
                    </button>
                    <button
                      onClick={() => handleArchive(item.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
                    >
                      <FaArchive className="text-[10px]" /> Archive
                    </button>
                  </div>
                )}
                {item.status === "Reviewed" && (
                  <button
                    onClick={() => handleArchive(item.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    <FaArchive className="text-[10px]" /> Archive
                  </button>
                )}
                {item.status === "Archived" && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 italic">This suggestion has been archived.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-100">
            <FaLightbulb className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium mb-1">No suggestions found</p>
            <p className="text-slate-400 text-sm">
              {search ? "Try a different search term or clear the filter." : "No suggestions match the selected filter."}
            </p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {filtered.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filtered.length} of {suggestions.length} suggestions</span>
          <span>{counts.Pending} pending action{counts.Pending !== 1 ? "s" : ""}</span>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DeptSuggestions;
