import { FaTachometerAlt, FaUserCircle, FaBell, FaBook, FaCalendarAlt, FaCommentDots } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../hooks/useAuth";

export const employeeMenuItems = [
  { label: "Dashboard", path: "/employee/dashboard", icon: FaTachometerAlt, end: true },
  { label: "My Profile", path: "/employee/profile", icon: FaUserCircle },
  { label: "Notifications", path: "/employee/notifications", icon: FaBell },
  { label: "Knowledge Hub", path: "/employee/knowledge-hub", icon: FaBook },
  { label: "Calendar", path: "/employee/calendar", icon: FaCalendarAlt },
  { label: "Feedback", path: "/employee/feedback", icon: FaCommentDots },
];

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout menuItems={employeeMenuItems} pageTitle="Dashboard" profilePath="/employee/profile">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">Welcome back, {user?.name?.split(" ")[0]} 👋</h2>
        <p className="text-slate-500 text-sm mt-1">Here's a quick look at your workspace today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard icon={FaCalendarAlt} label="Leaves Remaining" value="12" color="saffron" />
        <StatCard icon={FaBell} label="Unread Notifications" value="4" color="blue" />
        <StatCard icon={FaBook} label="Courses Assigned" value="3" color="emerald" />
        <StatCard icon={FaCommentDots} label="Feedback Submitted" value="7" color="purple" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card title="Announcements" className="lg:col-span-2">
          <div className="space-y-4">
            {[
              "New wellness center opens next week on campus.",
              "Q3 town hall scheduled for July 27.",
              "Please update your emergency contact details.",
            ].map((text, i) => (
              <div key={i} className="flex gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <span className="w-2 h-2 rounded-full bg-saffron-500 mt-2 flex-shrink-0"></span>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming">
          <div className="space-y-4">
            {[
              { title: "Guru Purnima", date: "Jul 18" },
              { title: "Town Hall Meeting", date: "Jul 27" },
            ].map((e) => (
              <div key={e.title} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{e.title}</span>
                <span className="text-xs font-semibold text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-full">{e.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;