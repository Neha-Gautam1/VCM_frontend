import { FaChartBar, FaUsers, FaFolderOpen, FaGraduationCap, FaTasks } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const monthlyActivity = [
  { month: "Jan", events: 4, announcements: 6, news: 3, docs: 9 },
  { month: "Feb", events: 7, announcements: 5, news: 5, docs: 12 },
  { month: "Mar", events: 5, announcements: 8, news: 4, docs: 8 },
  { month: "Apr", events: 9, announcements: 7, news: 7, docs: 15 },
  { month: "May", events: 6, announcements: 9, news: 6, docs: 11 },
  { month: "Jun", events: 8, announcements: 6, news: 8, docs: 14 },
  { month: "Jul", events: 11, announcements: 10, news: 9, docs: 18 },
];

const trainingProgress = [
  { name: "Videos", completion: 78, fill: "#ff7a12" },
  { name: "PDFs", completion: 92, fill: "#c22641" },
  { name: "Presentations", completion: 65, fill: "#3b82f6" },
  { name: "Quizzes", completion: 55, fill: "#10b981" },
];

const employeeGrowth = [
  { month: "Jan", count: 36 }, { month: "Feb", count: 37 }, { month: "Mar", count: 38 },
  { month: "Apr", count: 39 }, { month: "May", count: 40 }, { month: "Jun", count: 41 }, { month: "Jul", count: 42 },
];

const projectStatus = [
  { name: "Completed", value: 8, color: "#10b981" },
  { name: "In Progress", value: 5, color: "#ff7a12" },
  { name: "On Hold", value: 2, color: "#f59e0b" },
  { name: "Planned", value: 3, color: "#3b82f6" },
];

const DeptStatistics = () => (
  <DashboardLayout menuItems={departmentMenuItems} pageTitle="Statistics" breadcrumbs={["Department Admin", "Statistics"]}>
    <div className="mb-6">
      <h2 className="font-display text-xl font-bold text-slate-800">Department Statistics</h2>
      <p className="text-slate-500 text-sm mt-1">Comprehensive analytics and metrics for your department</p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard icon={FaUsers} label="Employee Count" value="42" trend="+3" color="saffron" />
      <StatCard icon={FaTasks} label="Active Projects" value="5" trend="+1" color="blue" />
      <StatCard icon={FaFolderOpen} label="Docs Uploaded" value="38" trend="+8" color="emerald" />
      <StatCard icon={FaGraduationCap} label="Training Avg." value="78%" trend="+12%" color="purple" />
    </div>

    <div className="grid lg:grid-cols-2 gap-5 mb-5">
      <Card title="Monthly Activities">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyActivity} barSize={9}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="events" name="Events" fill="#10b981" radius={[3, 3, 0, 0]} />
            <Bar dataKey="announcements" name="Announcements" fill="#c22641" radius={[3, 3, 0, 0]} />
            <Bar dataKey="news" name="News" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            <Bar dataKey="docs" name="Documents" fill="#ff7a12" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Employee Growth">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={employeeGrowth}>
            <defs>
              <linearGradient id="empGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7a12" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ff7a12" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis domain={[30, 45]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Area type="monotone" dataKey="count" name="Employees" stroke="#ff7a12" fill="url(#empGrad)" strokeWidth={2.5} dot={{ fill: "#ff7a12", r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>

    <div className="grid lg:grid-cols-2 gap-5">
      <Card title="Project Status">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={projectStatus} cx="50%" cy="50%" outerRadius={90} dataKey="value" paddingAngle={3}>
              {projectStatus.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Training Completion by Type">
        <ResponsiveContainer width="100%" height={250}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={trainingProgress} startAngle={180} endAngle={0}>
            <RadialBar minAngle={15} background clockWise dataKey="completion" cornerRadius={5} />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} formatter={v => `${v}%`} />
          </RadialBarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </DashboardLayout>
);

export default DeptStatistics;
