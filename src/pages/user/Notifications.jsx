import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { userMenuItems } from "./UserDashboard";

const Notifications = () => {
  return (
    <DashboardLayout
      menuItems={userMenuItems}
      pageTitle="Notifications"
      profilePath="/user/profile"
    >
      <div className="bg-white rounded-2xl p-10 shadow-card border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">
          Notifications
        </h2>

        <p className="text-slate-500 mt-2">
          Stay updated with announcements, approvals and important notices.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;