import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { userMenuItems } from "./UserDashboard";

const Accommodation = () => {
  return (
    <DashboardLayout
      menuItems={userMenuItems}
      pageTitle="Accommodation"
      profilePath="/user/profile"
    >
      <div className="bg-white rounded-2xl p-10 shadow-card border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">
          Accommodation
        </h2>

        <p className="text-slate-500 mt-2">
          Check accommodation requests, booking details and stay information.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Accommodation;