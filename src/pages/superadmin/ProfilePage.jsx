import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaBuilding, FaIdBadge, FaCalendarAlt, FaShieldAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { useAuth } from "../../hooks/useAuth";
import { getMeRequest } from "../../api/authApi";
import { fetchAuditLogs } from "../../api/auditLogsApi";
import { mediaUrl } from "../../utils/mediaUrl";

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMeRequest(),
      fetchAuditLogs({ search: authUser?.name || "", page: 1, limit: 5 }),
    ])
      .then(([meRes, logsRes]) => {
        setProfile(meRes.user);
        setRecentActivities(logsRes.data);
      })
      .catch((err) => console.error("Failed to load profile:", err))
      .finally(() => setLoading(false));
  }, [authUser?.name]);

  if (loading || !profile) {
    return (
      <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Profile" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
        <p className="text-slate-400 text-sm">Loading profile...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Profile" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Profile"]} />
      <div className="mt-3 mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">My Profile</h2>
        <p className="text-slate-500 text-sm mt-1">Your account overview and recent activity.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <img src={mediaUrl(profile.avatar)} alt={profile.name} className="w-24 h-24 rounded-2xl object-cover mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-slate-800">{profile.name}</h3>
            <p className="text-saffron-600 font-medium text-sm mt-1">{profile.role}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <FaEnvelope className="text-saffron-500 flex-shrink-0" />
              <span className="text-slate-600 truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaPhone className="text-saffron-500 flex-shrink-0" />
              <span className="text-slate-600">{profile.phone || "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaBuilding className="text-saffron-500 flex-shrink-0" />
              <span className="text-slate-600">{profile.department || "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaIdBadge className="text-saffron-500 flex-shrink-0" />
              <span className="text-slate-600">{profile.employeeId || "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaCalendarAlt className="text-saffron-500 flex-shrink-0" />
              <span className="text-slate-600">
                Joined {profile.joinDate
                  ? new Date(profile.joinDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
                  : "—"}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/superadmin/settings")}
            className="w-full flex items-center justify-center gap-2 mt-6 bg-slate-50 text-slate-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-100 transition-colors"
          >
            <FaCog className="text-xs" /> Edit Profile & Settings
          </button>
        </Card>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Access & Permissions">
            <div className="flex items-start gap-3 bg-saffron-50 border border-saffron-100 rounded-xl p-4">
              <FaShieldAlt className="text-saffron-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-saffron-800">Super Admin — Full System Access</p>
                <p className="text-xs text-saffron-600 mt-1">You have unrestricted access to all 20 modules across the Super Admin panel.</p>
              </div>
            </div>
          </Card>

          <Card title="My Recent Activity" noPadding>
            {recentActivities.length === 0 ? (
              <p className="text-slate-400 text-sm p-6">No recent activity found.</p>
            ) : (
              <div className="divide-y divide-slate-50">
                {recentActivities.map((a) => (
                  <div key={a.id} className="flex items-center justify-between gap-4 px-6 py-3.5">
                    <div>
                      <p className="text-sm text-slate-700">{a.activity}</p>
                      <p className="text-xs text-slate-400">{a.module}</p>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{new Date(a.date).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;