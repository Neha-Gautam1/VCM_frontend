import { useState } from "react";
import { FaSave, FaLock, FaPalette, FaGlobe, FaBell, FaUser } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { useAuth } from "../../hooks/useAuth";
import { updateProfileRequest, changePasswordRequest } from "../../api/settingsApi";
// ...


const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";
const tabs = [
  { key: "profile", label: "Profile Settings", icon: FaUser },
  { key: "password", label: "Password", icon: FaLock },
  { key: "theme", label: "Theme", icon: FaPalette },
  { key: "language", label: "Language", icon: FaGlobe },
  { key: "notifications", label: "Notifications", icon: FaBell },
];

const languages = ["English", "Hindi (हिन्दी)", "Bengali (বাংলা)", "Gujarati (ગુજરાતી)"];

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "", designation: "" });
const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });
const [passwordError, setPasswordError] = useState("");
const [profileError, setProfileError] = useState("");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    push: true,
    approvalAlerts: true,
    weeklyDigest: false,
    systemAlerts: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPass.length < 6) return setPasswordError("New password must be at least 6 characters");
    if (passwordForm.newPass !== passwordForm.confirm) return setPasswordError("Passwords do not match");
    setPasswordError("");
    setPasswordForm({ current: "", newPass: "", confirm: "" });
    handleSave();
  };

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Settings" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Settings"]} />
      <div className="mt-3 mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your account preferences and portal experience.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-colors ${
                activeTab === tab.key ? "bg-gradient-to-r from-saffron-500 to-maroon-600 text-white shadow-soft" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <tab.icon className={activeTab === tab.key ? "text-white" : "text-saffron-500"} />
              <span className="text-sm font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <Card title="Profile Settings">
              <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-100">
                <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div>
                  <button className="text-sm font-semibold text-saffron-600 border border-saffron-200 bg-saffron-50 px-4 py-2 rounded-xl hover:bg-saffron-100 transition-colors">
                    Change Photo
                  </button>
                  <p className="text-xs text-slate-400 mt-2">JPG or PNG, max 2MB</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
                  <input value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
                  <input value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone</label>
                  <input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Designation</label>
                  <input value={profileForm.designation} onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex justify-end pt-6 mt-2 border-t border-slate-100">
                <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
                  <FaSave className="text-xs" /> {saved ? "Saved!" : "Save Changes"}
                </button>
              </div>
            </Card>
          )}

          {/* Password */}
          {activeTab === "password" && (
            <Card title="Change Password">
              <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Current Password</label>
                  <input type="password" value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">New Password</label>
                  <input type="password" value={passwordForm.newPass} onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })} className={inputClass} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Confirm New Password</label>
                  <input type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })} className={inputClass} required />
                </div>
                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
                  <FaLock className="text-xs" /> {saved ? "Password Updated!" : "Update Password"}
                </button>
              </form>
            </Card>
          )}

          {/* Theme */}
          {activeTab === "theme" && (
            <Card title="Theme Preference">
              <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
                {[
                  { key: "light", label: "Light Mode", preview: "bg-white border-2" },
                  { key: "dark", label: "Dark Mode", preview: "bg-slate-800 border-2" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    className={`p-4 rounded-2xl border-2 transition-colors ${theme === t.key ? "border-saffron-400" : "border-slate-200"}`}
                  >
                    <div className={`h-20 rounded-xl mb-3 ${t.preview} ${theme === t.key ? "border-saffron-400" : "border-slate-200"}`}></div>
                    <p className="text-sm font-semibold text-slate-700">{t.label}</p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4">Dark mode is a prototype toggle in this build.</p>
              <div className="flex justify-end pt-6 mt-4 border-t border-slate-100">
                <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
                  <FaSave className="text-xs" /> {saved ? "Saved!" : "Save Preference"}
                </button>
              </div>
            </Card>
          )}

          {/* Language */}
          {activeTab === "language" && (
            <Card title="Language Preference">
              <label className="block text-xs font-semibold text-slate-500 mb-2">Portal Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={`${inputClass} max-w-xs appearance-none cursor-pointer`}>
                {languages.map((l) => <option key={l}>{l}</option>)}
              </select>
              <p className="text-xs text-slate-400 mt-3">Changing the language will update text across the portal (prototype only).</p>
              <div className="flex justify-end pt-6 mt-4 border-t border-slate-100">
                <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
                  <FaSave className="text-xs" /> {saved ? "Saved!" : "Save Preference"}
                </button>
              </div>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <Card title="Notification Preferences">
              <div className="space-y-5 max-w-lg">
                <ToggleSwitch checked={notifPrefs.email} onChange={(v) => setNotifPrefs({ ...notifPrefs, email: v })} label="Email Notifications" description="Receive updates via email" />
                <ToggleSwitch checked={notifPrefs.push} onChange={(v) => setNotifPrefs({ ...notifPrefs, push: v })} label="Push Notifications" description="Receive in-app notifications" />
                <ToggleSwitch checked={notifPrefs.approvalAlerts} onChange={(v) => setNotifPrefs({ ...notifPrefs, approvalAlerts: v })} label="Approval Alerts" description="Notify me for pending approval requests" />
                <ToggleSwitch checked={notifPrefs.weeklyDigest} onChange={(v) => setNotifPrefs({ ...notifPrefs, weeklyDigest: v })} label="Weekly Digest" description="Receive a weekly summary email" />
                <ToggleSwitch checked={notifPrefs.systemAlerts} onChange={(v) => setNotifPrefs({ ...notifPrefs, systemAlerts: v })} label="System Alerts" description="Critical system and security notifications" />
              </div>
              <div className="flex justify-end pt-6 mt-6 border-t border-slate-100">
                <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
                  <FaSave className="text-xs" /> {saved ? "Saved!" : "Save Preferences"}
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;