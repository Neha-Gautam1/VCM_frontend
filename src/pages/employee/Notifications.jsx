import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { FaBell } from "react-icons/fa";
import { employeeMenuItems } from "./EmlpoyeeDashboard";

const notifications = [
  { text: "Your leave request has been approved.", time: "2 hours ago" },
  { text: "New policy document uploaded to Knowledge Hub.", time: "Yesterday" },
  { text: "Reminder: Submit your monthly feedback.", time: "2 days ago" },
];

const Notifications = () => {
  return (
    <DashboardLayout menuItems={employeeMenuItems} pageTitle="Notifications" profilePath="/employee/profile">
      <Card noPadding>
        {notifications.length ? (
          <div className="divide-y divide-slate-50">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-3 px-6 py-4">
                <FaBell className="text-saffron-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-700">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={FaBell} message="No notifications yet" />
        )}
      </Card>
    </DashboardLayout>
  );
};

export default Notifications;