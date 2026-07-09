import { useState, useMemo } from "react";
import { FaDownload, FaFilter, FaClipboardList, FaGlobe } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import SearchBox from "../../components/common/SearchBox";
import Pagination from "../../components/common/Pagination";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { mockAuditLogs, auditModules, auditSeverities } from "../../data/mockAuditLogs";

const PAGE_SIZE = 6;
const severityBadge = { Info: "Active", Warning: "Pending", Critical: "Rejected" };

const AuditLogs = () => {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return mockAuditLogs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.activity.toLowerCase().includes(search.toLowerCase()) ||
        log.ip.includes(search);
      const matchesModule = moduleFilter === "All" || log.module === moduleFilter;
      const matchesSeverity = severityFilter === "All" || log.severity === severityFilter;
      return matchesSearch && matchesModule && matchesSeverity;
    });
  }, [search, moduleFilter, severityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetAndSet = (setter) => (val) => { setter(val); setCurrentPage(1); };

  const columns = [
    { key: "date", label: "Date & Time" },
    {
      key: "user",
      label: "User",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-800">{row.user}</p>
          <p className="text-xs text-slate-400">{row.role}</p>
        </div>
      ),
    },
    { key: "activity", label: "Activity" },
    { key: "module", label: "Module", render: (row) => <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{row.module}</span> },
    { key: "ip", label: "IP Address", render: (row) => <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono"><FaGlobe className="text-slate-300" />{row.ip}</span> },
    { key: "severity", label: "Severity", render: (row) => <Badge status={severityBadge[row.severity]}>{row.severity}</Badge> },
  ];

  const handleExport = () => {
    const headers = ["Date", "User", "Role", "Activity", "Module", "IP Address", "Severity"];
    const rows = filtered.map((l) => [l.date, l.user, l.role, l.activity, l.module, l.ip, l.severity]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vcm_audit_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Audit Logs" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Audit Logs"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Audit Logs</h2>
          <p className="text-slate-500 text-sm mt-1">Track all system and user activity across the portal.</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft"
        >
          <FaDownload className="text-xs" /> Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center"><FaClipboardList className="text-slate-500" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{mockAuditLogs.length}</p><p className="text-xs text-slate-500">Total Log Entries</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center"><FaClipboardList className="text-amber-500" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{mockAuditLogs.filter((l) => l.severity === "Warning").length}</p><p className="text-xs text-slate-500">Warnings</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center"><FaClipboardList className="text-red-500" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{mockAuditLogs.filter((l) => l.severity === "Critical").length}</p><p className="text-xs text-slate-500">Critical Events</p></div>
        </Card>
      </div>

      <Card noPadding>
        <div className="flex flex-col lg:flex-row gap-3 p-6 border-b border-slate-100">
          <SearchBox value={search} onChange={resetAndSet(setSearch)} placeholder="Search user, activity, or IP..." className="flex-1" />
          <div className="flex items-center gap-2">
            <FaFilter className="text-slate-400 text-xs flex-shrink-0" />
            <select value={moduleFilter} onChange={(e) => resetAndSet(setModuleFilter)(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 cursor-pointer">
              {auditModules.map((m) => <option key={m}>{m}</option>)}
            </select>
            <select value={severityFilter} onChange={(e) => resetAndSet(setSeverityFilter)(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 cursor-pointer">
              {auditSeverities.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <Table columns={columns} data={paginated} emptyMessage="No log entries match your filters" />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </Card>
    </DashboardLayout>
  );
};

export default AuditLogs;