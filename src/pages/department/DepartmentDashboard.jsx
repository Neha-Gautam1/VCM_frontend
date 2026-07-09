import { FaTachometerAlt, FaUsers, FaBullhorn, FaNewspaper, FaFileAlt, FaCalendarAlt, FaLightbulb, FaChartBar } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../hooks/useAuth";

export const departmentMenuItems = [
  { label: "Dashboard", path: "/department/dashboard", icon: FaTachometerAlt, end: true },
  { label: "Employees", path: "/department/employees", icon: FaUsers },
  { label: "Announcements", path: "/department/announcements", icon: FaBullhorn },
  { label: "Department News", path: "/department/news", icon: FaNewspaper },
  { label: "Documents", path: "/department/documents", icon: FaFileAlt },
  { label: "Events", path: "/department/events", icon: FaCalendarAlt },
  { label: "Suggestions", path: "/department/suggestions", icon: FaLightbulb },
  { label: "Reports", path: "/department/reports", icon: FaChartBar },
];

const DepartmentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Dashboard" profilePath="/department/dashboard">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">Welcome, {user?.name?.split(" ")[0]}</h2>
        <p className="text-slate-500 text-sm mt-1">Overview of your department's activity.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard icon={FaUsers} label="Department Employees" value="42" color="saffron" />
        <StatCard icon={FaBullhorn} label="Active Announcements" value="5" color="blue" />
        <StatCard icon={FaLightbulb} label="Pending Suggestions" value="8" color="amber" />
        <StatCard icon={FaCalendarAlt} label="Upcoming Events" value="3" color="emerald" />
      </div>

      <Card title="Recent Activity">
        <p className="text-sm text-slate-400">This module is a basic prototype — full functionality to be implemented by the assigned intern.</p>
      </Card>
    </DashboardLayout>
  );
};

export default DepartmentDashboard;