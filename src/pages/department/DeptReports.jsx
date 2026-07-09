import { useState } from "react";
import { FaChartPie, FaUsers, FaDownload, FaCalendarAlt } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const monthlyActivity = [
  { month: "Jan", activities: 22 }, { month: "Feb", activities: 28 }, { month: "Mar", activities: 19 },
  { month: "Apr", activities: 35 }, { month: "May", activities: 29 }, { month: "Jun", activities: 32 }, { month: "Jul", activities: 41 },
];

const participationData = [
  { month: "Jan", rate: 72 }, { month: "Feb", rate: 78 }, { month: "Mar", rate: 68 },
  { month: "Apr", rate: 85 }, { month: "May", rate: 80 }, { month: "Jun", rate: 82 }, { month: "Jul", rate: 88 },
];

const uploadTrends = [
  { month: "Jan", SOPs: 5, policies: 2, training: 3 },
  { month: "Feb", SOPs: 7, policies: 3, training: 5 },
  { month: "Mar", SOPs: 4, policies: 4, training: 2 },
  { month: "Apr", SOPs: 9, policies: 3, training: 7 },
  { month: "May", SOPs: 6, policies: 5, training: 4 },
  { month: "Jun", SOPs: 8, policies: 4, training: 6 },
  { month: "Jul", SOPs: 11, policies: 5, training: 8 },
];

const trainingStats = [
  { name: "Completed", value: 85, fill: "#10b981" },
  { name: "In Progress", value: 60, fill: "#ff7a12" },
  { name: "Not Started", value: 30, fill: "#e2e8f0" },
];

const suggestionsOverview = [
  { name: "Process Improvement", value: 5, color: "#3b82f6" },
  { name: "Team Culture", value: 4, color: "#8b5cf6" },
  { name: "Technical", value: 6, color: "#ff7a12" },
  { name: "Work Policy", value: 3, color: "#ec4899" },
  { name: "Other", value: 2, color: "#94a3b8" },
];

const DeptReports = () => (
  <DashboardLayout menuItems={departmentMenuItems} pageTitle="Reports & Analytics" breadcrumbs={["Department Admin", "Reports & Analytics"]}>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-800">Reports & Analytics</h2>
        <p className="text-slate-500 text-sm mt-1">Comprehensive department performance insights</p>
      </div>
      <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
        <FaDownload className="text-saffron-500" /> Export Report
      </button>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard icon={FaChartPie} label="Total Activities" value="206" trend="+18%" color="saffron" />
      <StatCard icon={FaUsers} label="Avg Participation" value="79%" trend="+6%" color="emerald" />
      <StatCard icon={FaCalendarAlt} label="Events Held" value="26" trend="+4" color="blue" />
      <StatCard icon={FaChartPie} label="Suggestions" value="20" trend="+8" color="amber" />
    </div>

    <div className="grid lg:grid-cols-2 gap-5 mb-5">
      <Card title="Monthly Department Activity" action={<span className="text-xs text-slate-400">Jan–Jul 2026</span>}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyActivity} barSize={20}>
            <defs>
              <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff7a12" />
                <stop offset="100%" stopColor="#c22641" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Bar dataKey="activities" name="Activities" fill="url(#actGrad)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Employee Participation Rate" action={<span className="text-xs text-slate-400">%</span>}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={participationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} formatter={v => `${v}%`} />
            <Line type="monotone" dataKey="rate" name="Participation %" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>

    <div className="grid lg:grid-cols-3 gap-5 mb-5">
      <div className="lg:col-span-2">
        <Card title="Content Upload Trends">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={uploadTrends}>
              <defs>
                <linearGradient id="sopGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7a12" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff7a12" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="polGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c22641" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c22641" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="SOPs" name="SOPs" stroke="#ff7a12" fill="url(#sopGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="policies" name="Policies" stroke="#c22641" fill="url(#polGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="training" name="Training" stroke="#3b82f6" fill="none" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Suggestions Overview">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={suggestionsOverview} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={3}>
              {suggestionsOverview.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>

    <Card title="Training Statistics">
      <div className="grid sm:grid-cols-3 gap-6">
        {trainingStats.map(stat => (
          <div key={stat.name} className="text-center">
            <div className="relative w-28 h-28 mx-auto mb-3">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={stat.fill} strokeWidth="3"
                  strokeDasharray={`${stat.value} ${100 - stat.value}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-bold text-xl text-slate-800">{stat.value}%</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-700">{stat.name}</p>
          </div>
        ))}
      </div>
    </Card>
  </DashboardLayout>
);

export default DeptReports;