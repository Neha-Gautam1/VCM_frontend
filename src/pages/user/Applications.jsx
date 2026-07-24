import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { userMenuItems } from "./UserDashboard";

const Applications = () => {
  return (
    <DashboardLayout
      menuItems={userMenuItems}
      pageTitle="Applications"
      profilePath="/user/profile"
    >
      <div className="bg-white rounded-2xl p-10 shadow-card border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">
          Applications
        </h2>

        <p className="text-slate-500 mt-2">
          View and manage your submitted applications here.
        </p>
      </div>
    </DashboardLayout>
  );
};
export default Applications;
