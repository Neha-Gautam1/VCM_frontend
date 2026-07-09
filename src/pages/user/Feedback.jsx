import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { userMenuItems } from "./UserDashboard";

const Feedback = () => {
  return (
    <DashboardLayout
      menuItems={userMenuItems}
      pageTitle="Feedback"
      profilePath="/user/profile"
    >
      <div className="bg-white rounded-2xl p-10 shadow-card border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">
          Feedback
        </h2>

        <p className="text-slate-500 mt-2">
          Share your suggestions and help us improve your experience.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;