import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { userMenuItems } from "./UserDashboard";

const Profile = () => {
  return (
    <DashboardLayout
      menuItems={userMenuItems}
      pageTitle="My Profile"
      profilePath="/user/profile"
    >
      <div className="bg-white rounded-2xl p-10 shadow-card border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">
          My Profile
        </h2>

        <p className="text-slate-500 mt-2">
          This page is under development.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Profile;