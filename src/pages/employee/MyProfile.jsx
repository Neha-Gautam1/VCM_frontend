import { FaTachometerAlt, FaUserCircle, FaBell, FaBook, FaCalendarAlt, FaCommentDots, FaEnvelope, FaPhone, FaBuilding, FaIdBadge } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import { employeeMenuItems } from "./EmlpoyeeDashboard";
import { useAuth } from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout menuItems={employeeMenuItems} pageTitle="My Profile" profilePath="/employee/profile">
      <Card>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img src={user?.avatar} alt={user?.name} className="w-28 h-28 rounded-2xl object-cover" />
          <div className="text-center sm:text-left">
            <h2 className="font-display text-xl font-bold text-slate-800">{user?.name}</h2>
            <p className="text-saffron-600 font-medium text-sm">{user?.role}</p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-5 text-sm">
              <div className="flex items-center gap-2.5 text-slate-500"><FaEnvelope className="text-saffron-500" /> {user?.email}</div>
              <div className="flex items-center gap-2.5 text-slate-500"><FaPhone className="text-saffron-500" /> +91 98765 43210</div>
              <div className="flex items-center gap-2.5 text-slate-500"><FaBuilding className="text-saffron-500" /> IT Department</div>
              <div className="flex items-center gap-2.5 text-slate-500"><FaIdBadge className="text-saffron-500" /> VCM-EMP-101</div>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default MyProfile;