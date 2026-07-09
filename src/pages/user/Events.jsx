import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { userMenuItems } from "./UserDashboard";

const Events = () => {
  return (
    <DashboardLayout
      menuItems={userMenuItems}
      pageTitle="Events"
      profilePath="/user/profile"
    >
      <div className="bg-white rounded-2xl p-10 shadow-card border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">
          Events
        </h2>

        <p className="text-slate-500 mt-2">
          Explore upcoming temple events, festivals and volunteer activities.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Events;