import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { FaDownload, FaFileAlt, FaUsers, FaChartLine, FaGlobe, FaSignInAlt } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import {
  employeeGrowthData, departmentActivityData, portalVisitsData, monthlyLoginsData, userRoleDistribution,
} from "../../data/mockAnalytics";

const reports = [
  { id: 1, name: "Monthly Employee Report — June 2026", type: "PDF", size: "1.2 MB", date: "2026-07-01" },
  { id: 2, name: "Department Performance Summary Q2", type: "XLSX", size: "845 KB", date: "2026-06-28" },
  { id: 3, name: "Portal Usage Analytics — June 2026", type: "PDF", size: "2.1 MB", date: "2026-06-25" },
  { id: 4, name: "Audit Compliance Report", type: "PDF", size: "980 KB", date: "2026-06-20" },
];

const tooltipStyle = { borderRadius: 12, border: "1px solid #f1f5f9", fontSize: 13 };
const range = ["7 Days", "30 Days", "3 Months", "1 Year"];

const Analytics = () => {
  const [activeRange, setActiveRange] = useState("30 Days");

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Analytics" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Analytics"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Analytics</h2>
          <p className="text-slate-500 text-sm mt-1">Portal-wide insights and performance metrics.</p>
        </div>
        <div className="flex gap-2">
          {range.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeRange === r ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow-soft" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[
          { icon: FaUsers, label: "Total Employees", value: "702", trend: "+4.2%", color: "text-saffron-600 bg-saffron-50" },
          { icon: FaChartLine, label: "Avg. Department Activity", value: "69%", trend: "+3.1%", color: "text-blue-600 bg-blue-50" },
          { icon: FaGlobe, label: "Portal Visits (Weekly)", value: "2,570", trend: "+11%", color: "text-emerald-600 bg-emerald-50" },
          { icon: FaSignInAlt, label: "Monthly Logins", value: "3,100", trend: "+8.7%", color: "text-purple-600 bg-purple-50" },
        ].map(({ icon: Icon, label, value, trend, color }) => (
          <Card key={label}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}><Icon /></div>
            <p className="text-2xl font-display font-bold text-slate-800">{value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-slate-500 text-sm">{label}</p>
              <span className="text-xs font-semibold text-emerald-600">{trend}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Employee Growth */}
        <Card title="Employee Growth Trend">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={employeeGrowthData}>
              <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7a12" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff7a12" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="employees" stroke="#ff7a12" strokeWidth={3} fill="url(#growthGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Department Activity */}
        <Card title="Department Activity">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentActivityData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="department" type="category" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="activity" fill="#941b32" radius={[0, 8, 8, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Portal Visits */}
        <Card title="Portal Visits (This Week)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={portalVisitsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="visits" fill="#ff9838" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* User Role Distribution */}
        <Card title="User Role Distribution">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={userRoleDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {userRoleDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {userRoleDistribution.map((r) => (
              <div key={r.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-500"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }}></span>{r.name}</span>
                <span className="font-semibold text-slate-700">{r.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Logins */}
      <Card title="Monthly Logins Trend" className="mb-6">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyLoginsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="logins" name="Logins" stroke="#941b32" strokeWidth={3} dot={{ fill: "#941b32", r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Reports */}
      <Card title="Recent Reports" noPadding>
        <div className="divide-y divide-slate-50">
          {reports.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <FaFileAlt className="text-slate-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.type} · {r.size} · {r.date}</p>
                </div>
              </div>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-saffron-50 text-saffron-600 transition-colors flex-shrink-0">
                <FaDownload className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Analytics;