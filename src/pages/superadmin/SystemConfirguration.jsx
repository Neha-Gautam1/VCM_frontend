import { useState, useEffect } from "react";
import { fetchSystemConfig, updateSystemConfigRequest } from "../../api/systemConfigApi";
import { FaSave, FaImage, FaExclamationTriangle, FaPalette, FaClock } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import { superAdminMenuItems } from "./SuperAdminDashboard";

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";

const themeColors = [
  { name: "Saffron", value: "saffron", swatch: "bg-saffron-500" },
  { name: "Maroon", value: "maroon", swatch: "bg-maroon-600" },
  { name: "Blue", value: "blue", swatch: "bg-blue-500" },
  { name: "Emerald", value: "emerald", swatch: "bg-emerald-500" },
];

const SystemConfiguration = () => {
  const [portalName, setPortalName] = useState("");
  const [tagline, setTagline] = useState("");
  const [theme, setTheme] = useState("saffron");
  const [darkMode, setDarkMode] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMsg, setMaintenanceMsg] = useState("");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemConfig()
      .then((res) => {
        const c = res.data;
        setPortalName(c.portalName);
        setTagline(c.tagline);
        setTheme(c.theme);
        setDarkMode(c.darkMode);
        setMaintenanceMode(c.maintenanceMode);
        setMaintenanceMsg(c.maintenanceMsg || "");
        setSessionTimeout(String(c.sessionTimeout));
      })
      .catch((err) => console.error("Failed to load system config:", err))
      .finally(() => setLoading(false));
  }, []);

const handleSave = async () => {
  try {
    await updateSystemConfigRequest({
      portalName, tagline, theme, darkMode, maintenanceMode, maintenanceMsg,
      sessionTimeout: Number(sessionTimeout),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  } catch (err) {
    console.error("Failed to save system configuration:", err);
  }
};
  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="System Configuration" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "System Configuration"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">System Configuration</h2>
          <p className="text-slate-500 text-sm mt-1">General portal-wide settings and preferences.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft"
        >
          <FaSave className="text-xs" /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card title="General Settings">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Portal Name</label>
              <input value={portalName} onChange={(e) => setPortalName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Tagline</label>
              <input value={tagline} onChange={(e) => setTagline(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Portal Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-saffron-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-display font-bold text-xl">V</span>
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold text-saffron-600 border border-saffron-200 bg-saffron-50 px-4 py-2 rounded-xl hover:bg-saffron-100 transition-colors">
                  <FaImage className="text-xs" /> Upload New Logo
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2">Recommended size: 256×256px, PNG with transparent background.</p>
            </div>
          </div>
        </Card>

        {/* Theme Settings */}
        <Card title="Theme Settings">
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3"><FaPalette className="text-slate-400" /> Primary Theme Color</label>
              <div className="grid grid-cols-4 gap-3">
                {themeColors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setTheme(c.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors ${
                      theme === c.value ? "border-saffron-400 bg-saffron-50" : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full ${c.swatch}`}></span>
                    <span className="text-xs font-medium text-slate-600">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <ToggleSwitch checked={darkMode} onChange={setDarkMode} label="Dark Mode" description="Enable dark theme across the portal (prototype toggle)" />
            </div>
          </div>
        </Card>

        {/* Maintenance Mode */}
        <Card title="Maintenance Mode">
          <ToggleSwitch checked={maintenanceMode} onChange={setMaintenanceMode} label="Enable Maintenance Mode" description="Temporarily restrict portal access for non-admin users" />
          {maintenanceMode && (
            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
                <FaExclamationTriangle className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700">Enabling this will log out all non-admin users and display the maintenance message below.</p>
              </div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Maintenance Message</label>
              <textarea rows={3} value={maintenanceMsg} onChange={(e) => setMaintenanceMsg(e.target.value)} className={`${inputClass} resize-none`} />
            </div>
          )}
        </Card>

        {/* Session Settings */}
        <Card title="Session Settings">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2"><FaClock className="text-slate-400" /> Session Timeout</label>
          <select value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="480">8 hours</option>
          </select>
          <p className="text-xs text-slate-400 mt-2">Users will be automatically logged out after this period of inactivity.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SystemConfiguration;