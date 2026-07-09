import {
  FaTachometerAlt, FaUsers, FaBullhorn, FaNewspaper, FaFileAlt,
  FaCalendarAlt, FaLightbulb, FaChartBar, FaChartPie, FaGraduationCap,
  FaFolderOpen, FaIdCard, FaArrowUp, FaArrowDown, FaPlus,
  FaEye, FaBell, FaCheckCircle, FaClipboardList, FaUpload
} from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../hooks/useAuth";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

export const departmentMenuItems = [
  { label: "Dashboard", path: "/department/dashboard", icon: FaTachometerAlt, end: true },
  { label: "Team Overview", path: "/department/team", icon: FaUsers },
  { label: "Statistics", path: "/department/statistics", icon: FaChartBar },
  { label: "Department News", path: "/department/news", icon: FaNewspaper },
  { label: "Announcements", path: "/department/announcements", icon: FaBullhorn },
  { label: "Events", path: "/department/events", icon: FaCalendarAlt },
  { label: "SOP & Documents", path: "/department/documents", icon: FaFileAlt },
  { label: "Training Center", path: "/department/training", icon: FaGraduationCap },
  { label: "Resources", path: "/department/resources", icon: FaFolderOpen },
  { label: "Employees", path: "/department/employees", icon: FaIdCard },
  { label: "Suggestions", path: "/department/suggestions", icon: FaLightbulb },
  { label: "Reports & Analytics", path: "/department/reports", icon: FaChartPie },
];

const activityData = [
  { month: "Jan", events: 4, news: 2, docs: 8 },
  { month: "Feb", events: 6, news: 5, docs: 12 },
  { month: "Mar", events: 3, news: 4, docs: 7 },
  { month: "Apr", events: 8, news: 6, docs: 15 },
  { month: "May", events: 5, news: 8, docs: 10 },
  { month: "Jun", events: 7, news: 3, docs: 13 },
  { month: "Jul", events: 9, news: 7, docs: 18 },
];

const trainingData = [
  { month: "Apr", completed: 65, target: 80 },
  { month: "May", completed: 72, target: 80 },
  { month: "Jun", completed: 78, target: 80 },
  { month: "Jul", completed: 85, target: 80 },
];

const distributionData = [
  { name: "Technical", value: 18, color: "#ff7a12" },
  { name: "Administrative", value: 12, color: "#c22641" },
  { name: "Support", value: 8, color: "#f2c94c" },
  { name: "Interns", value: 4, color: "#3b82f6" },
];

const uploadData = [
  { week: "W1", SOPs: 3, policies: 1, training: 2 },
  { week: "W2", SOPs: 5, policies: 2, training: 4 },
  { week: "W3", SOPs: 2, policies: 3, training: 1 },
  { week: "W4", SOPs: 7, policies: 2, training: 5 },
];

const recentActivities = [
  { id: 1, type: "news", icon: FaNewspaper, color: "text-blue-500", bg: "bg-blue-50", title: "Published: Monthly IT Newsletter", time: "2 hours ago", user: "Dept Admin" },
  { id: 2, type: "event", icon: FaCalendarAlt, color: "text-emerald-500", bg: "bg-emerald-50", title: "Created Event: Team Training Day", time: "5 hours ago", user: "Dept Admin" },
  { id: 3, type: "doc", icon: FaFileAlt, color: "text-saffron-500", bg: "bg-saffron-50", title: "Uploaded SOP: Server Maintenance Protocol", time: "1 day ago", user: "Dept Admin" },
  { id: 4, type: "announce", icon: FaBullhorn, color: "text-maroon-500", bg: "bg-red-50", title: "Announcement: Holiday Schedule Updated", time: "2 days ago", user: "Dept Admin" },
  { id: 5, type: "suggestion", icon: FaLightbulb, color: "text-amber-500", bg: "bg-amber-50", title: "New Suggestion from Priya Sharma", time: "3 days ago", user: "Employee" },
];

const quickActions = [
  { label: "Add News", icon: FaPlus, color: "from-blue-500 to-blue-600", path: "/department/news" },
  { label: "Create Event", icon: FaCalendarAlt, color: "from-emerald-500 to-emerald-600", path: "/department/events" },
  { label: "Upload SOP", icon: FaUpload, color: "from-saffron-500 to-saffron-600", path: "/department/documents" },
  { label: "Announcement", icon: FaBullhorn, color: "from-maroon-500 to-maroon-700", path: "/department/announcements" },
];

const DepartmentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout
      menuItems={departmentMenuItems}
      pageTitle="Dashboard"
      breadcrumbs={["Department Admin", "Dashboard"]}
      profilePath="/department/dashboard"
    >
      {/* Welcome Banner */}
      <div className="mb-6 bg-gradient-to-r from-saffron-600 to-maroon-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white,transparent_50%)]"></div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0] || "Admin"} 🙏</h2>
            <p className="text-white/80 text-sm mt-1">IT Department · VCM Employee Portal · {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center">
              <p className="text-lg font-bold">42</p>
              <p className="text-xs text-white/70">Team Members</p>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-2 text-center">
              <p className="text-lg font-bold">87%</p>
              <p className="text-xs text-white/70">Training Done</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard icon={FaUsers} label="Total Employees" value="42" trend="+3" color="saffron" />
        <StatCard icon={FaFileAlt} label="Active SOPs" value="18" trend="+2" color="blue" />
        <StatCard icon={FaLightbulb} label="Pending Suggestions" value="8" trend="-1" color="amber" />
        <StatCard icon={FaNewspaper} label="Published News" value="14" trend="+5" color="maroon" />
        <StatCard icon={FaCalendarAlt} label="Upcoming Events" value="3" color="emerald" />
        <StatCard icon={FaBullhorn} label="Announcements" value="6" trend="+1" color="purple" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Department Activity */}
        <div className="lg:col-span-2">
          <Card title="Department Activity" action={
            <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600">
              <option>Last 7 months</option>
            </select>
          }>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={activityData} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="events" name="Events" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="news" name="News" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="docs" name="Documents" fill="#ff7a12" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Employee Distribution */}
        <Card title="Employee Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="value"
                paddingAngle={3}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Training Completion */}
        <div className="lg:col-span-2">
          <Card title="Training Completion">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={trainingData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff7a12" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ff7a12" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  formatter={(v) => `${v}%`}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  name="Completed %"
                  stroke="#ff7a12"
                  fill="url(#colorCompleted)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  name="Target %"
                  stroke="#c22641"
                  fill="none"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className={`w-full flex items-center gap-3 bg-gradient-to-r ${action.color} text-white px-4 py-3 rounded-xl text-sm font-medium hover:opacity-90 hover:shadow-md transition-all`}
              >
                <action.icon />
                {action.label}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent Activities */}
        <Card
          title="Recent Activities"
          action={
            <button className="text-xs text-saffron-600 font-medium hover:text-saffron-700">
              View all
            </button>
          }
        >
          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl ${act.bg} flex items-center justify-center flex-shrink-0`}>
                  <act.icon className={`${act.color} text-sm`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{act.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {act.time} · {act.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Uploads Chart */}
        <Card title="Recent Uploads">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={uploadData} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="SOPs" name="SOPs" fill="#ff7a12" radius={[4, 4, 0, 0]} />
              <Bar dataKey="policies" name="Policies" fill="#c22641" radius={[4, 4, 0, 0]} />
              <Bar dataKey="training" name="Training" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DepartmentDashboard;
