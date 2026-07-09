import {
  FaTachometerAlt, FaUsers, FaBuilding, FaUserShield, FaKey, FaSitemap, FaCity,
  FaPaintBrush, FaNewspaper, FaBullhorn, FaImages, FaBookOpen, FaCheckCircle,
  FaChartBar, FaBell, FaCogs, FaEnvelopeOpenText, FaDatabase, FaClipboardList,
  FaCog, FaUserCircle, FaArrowRight, FaServer, FaClock, FaHdd, FaSignal,
} from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";
import Badge from "../../components/common/Badge";
import { useAuth } from "../../hooks/useAuth";
import { mockDepartments } from "../../data/mockDeparments";
import {
  employeeGrowthData, departmentActivityData, recentActivities, recentLogins, systemHealth,
} from "../../data/mockAnalytics";

export const superAdminMenuItems = [
  { label: "Dashboard", path: "/superadmin/dashboard", icon: FaTachometerAlt, end: true },
  { label: "User Management", path: "/superadmin/users", icon: FaUsers },
  { label: "Department Management", path: "/superadmin/departments", icon: FaBuilding },
  { label: "Role Management", path: "/superadmin/roles", icon: FaUserShield },
  { label: "Permission Management", path: "/superadmin/permissions", icon: FaKey },
  { label: "Organization Chart", path: "/superadmin/org-chart", icon: FaSitemap },
  { label: "Campus Management", path: "/superadmin/campus", icon: FaCity },
  { label: "Homepage CMS", path: "/superadmin/homepage-cms", icon: FaPaintBrush },
  { label: "News Management", path: "/superadmin/news", icon: FaNewspaper },
  { label: "Announcements", path: "/superadmin/announcements", icon: FaBullhorn },
  { label: "Gallery Management", path: "/superadmin/gallery", icon: FaImages },
  { label: "Spiritual Library", path: "/superadmin/library", icon: FaBookOpen },
  { label: "Approvals", path: "/superadmin/approvals", icon: FaCheckCircle },
  { label: "Analytics", path: "/superadmin/analytics", icon: FaChartBar },
  { label: "Notifications", path: "/superadmin/notifications", icon: FaBell },
  { label: "System Configuration", path: "/superadmin/system-config", icon: FaCogs },
  { label: "Email Templates", path: "/superadmin/email-templates", icon: FaEnvelopeOpenText },
  { label: "Backup & Restore", path: "/superadmin/backup-restore", icon: FaDatabase },
  { label: "Audit Logs", path: "/superadmin/audit-logs", icon: FaClipboardList },
  { label: "Settings", path: "/superadmin/settings", icon: FaCog },
  { label: "Profile", path: "/superadmin/profile", icon: FaUserCircle },
];

const quickActions = [
  { label: "Add User", icon: FaUsers, path: "/superadmin/users" },
  { label: "New Announcement", icon: FaBullhorn, path: "/superadmin/announcements" },
  { label: "Publish News", icon: FaNewspaper, path: "/superadmin/news" },
  { label: "Review Approvals", icon: FaCheckCircle, path: "/superadmin/approvals" },
];

const SuperAdminDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Dashboard" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Welcome back, {user?.name?.split(" ")[0]} 👋</h2>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening across VCM today.</p>
        </div>
        <span className="text-xs font-medium text-slate-400 bg-white border border-slate-200 px-4 py-2 rounded-xl">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-6">
        <StatCard icon={FaUsers} label="Total Employees" value="702" trend="+4.2%" color="saffron" />
        <StatCard icon={FaBuilding} label="Departments" value="7" color="maroon" />
        <StatCard icon={FaCheckCircle} label="Pending Requests" value="18" trend="-2.1%" color="amber" />
        <StatCard icon={FaSignal} label="Active Users" value="213" trend="+8.5%" color="emerald" />
        <StatCard icon={FaNewspaper} label="News Published" value="34" color="blue" />
        <StatCard icon={FaBell} label="Events" value="12" color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Employee Growth Chart */}
        <Card title="Employee Growth" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={employeeGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9", fontSize: 13 }} />
              <Line type="monotone" dataKey="employees" stroke="#ff7a12" strokeWidth={3} dot={{ fill: "#ff7a12", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
           {quickActions.map(({ label, icon: Icon, path }) => (
  <a
    key={label}
    href={path}
    className="flex flex-col items-center justify-center text-center gap-2.5 p-4 rounded-xl bg-slate-50 hover:bg-gradient-to-br hover:from-saffron-500 hover:to-maroon-600 hover:text-white group transition-all duration-300"
  >
    <Icon className="text-xl text-saffron-600 group-hover:text-white transition-colors" />
    <span className="text-xs font-semibold text-slate-700 group-hover:text-white transition-colors">
      {label}
    </span>
  </a>
))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activities Table */}
        <Card title="Recent Activities" className="lg:col-span-2" noPadding>
          <div className="divide-y divide-slate-50">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-4 px-6 py-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={`https://i.pravatar.cc/100?u=${a.user}`} className="w-8 h-8 rounded-full object-cover flex-shrink-0" alt={a.user} />
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700 truncate">
                      <span className="font-semibold">{a.user}</span> {a.action}
                    </p>
                    <p className="text-xs text-slate-400">{a.module}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card title="System Health">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-500"><FaServer className="text-emerald-500" /> Uptime</span>
              <span className="text-sm font-semibold text-emerald-600">{systemHealth.uptime}</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-2 text-sm text-slate-500"><FaSignal className="text-blue-500" /> Server Load</span>
                <span className="text-xs font-semibold text-slate-600">{systemHealth.serverLoad}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${systemHealth.serverLoad}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-2 text-sm text-slate-500"><FaHdd className="text-amber-500" /> Storage Used</span>
                <span className="text-xs font-semibold text-slate-600">{systemHealth.storageUsed}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${systemHealth.storageUsed}%` }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-500"><FaClock className="text-purple-500" /> Last Backup</span>
              <span className="text-xs font-semibold text-slate-600">{systemHealth.lastBackup}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Department Summary */}
        <Card title="Department Summary" className="lg:col-span-2" noPadding>
          <div className="divide-y divide-slate-50">
            {mockDepartments.map((d) => (
              <div key={d.id} className="flex items-center justify-between px-6 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{d.name}</p>
                  <p className="text-xs text-slate-400">Head: {d.head}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${d.color}`}>{d.employeeCount} employees</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Logins */}
        <Card title="Recent Logins" noPadding>
          <div className="divide-y divide-slate-50">
            {recentLogins.map((l) => (
              <div key={l.id} className="flex items-center justify-between px-6 py-3.5 gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{l.name}</p>
                  <p className="text-xs text-slate-400 truncate">{l.device} · {l.time}</p>
                </div>
                <Badge status={l.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Department Activity Chart */}
      <Card title="Department Activity Overview" className="mt-6">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={departmentActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="department" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9", fontSize: 13 }} />
            <Bar dataKey="activity" fill="#941b32" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;