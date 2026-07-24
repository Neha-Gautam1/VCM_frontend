import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import { SCard, PageHeader, PrimaryBtn, SuccessToast, CardHeader } from "../../components/user/ui/UserUI";
import { FaBell, FaMoon, FaLanguage, FaLock, FaTrash, FaShieldAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-amber-500" : "bg-slate-200"}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
  </button>
);

const SettingRow = ({ label, desc, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-amber-50 last:border-0">
    <div className="pr-4">
      <p className="text-sm font-semibold text-amber-900">{label}</p>
      {desc && <p className="text-xs text-amber-600/60 mt-0.5">{desc}</p>}
    </div>
    {children}
  </div>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    emailBookings: true,
    emailEvents: true,
    emailDonations: false,
    emailNews: true,
    smsBookings: true,
    smsEvents: false,
    darkMode: false,
    language: "English",
    twoFactor: false,
    publicProfile: true,
  });
  const [toast, setToast] = useState(false);

  const toggle = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));
  const handleSave = () => { setToast(true); setTimeout(() => setToast(false), 3000); };

  return (
    <UserLayout pageTitle="Settings">
      <PageHeader
        title="Account Settings"
        subtitle="Manage your preferences, notifications and privacy settings"
        badge="Preferences"
        action={<PrimaryBtn onClick={handleSave}>Save Changes</PrimaryBtn>}
      />

      {/* Notifications */}
      <SCard className="p-6 mb-5">
        <CardHeader title="Notification Preferences" icon={FaBell} subtitle="Control what updates you receive" />
        <div className="space-y-0">
          <SettingRow label="Booking Confirmations" desc="Email notifications for bookings">
            <Toggle checked={settings.emailBookings} onChange={() => toggle("emailBookings")} />
          </SettingRow>
          <SettingRow label="Event Reminders" desc="Alerts for upcoming events you've registered for">
            <Toggle checked={settings.emailEvents} onChange={() => toggle("emailEvents")} />
          </SettingRow>
          <SettingRow label="News & Announcements" desc="Temple updates and newsletters">
            <Toggle checked={settings.emailNews} onChange={() => toggle("emailNews")} />
          </SettingRow>
          <SettingRow label="SMS Booking Alerts" desc="Text messages for booking confirmations">
            <Toggle checked={settings.smsBookings} onChange={() => toggle("smsBookings")} />
          </SettingRow>
          <SettingRow label="Donation Receipts" desc="Email receipts for your donations">
            <Toggle checked={settings.emailDonations} onChange={() => toggle("emailDonations")} />
          </SettingRow>
          <SettingRow label="SMS Event Reminders" desc="Text reminders for events">
            <Toggle checked={settings.smsEvents} onChange={() => toggle("smsEvents")} />
          </SettingRow>
        </div>
      </SCard>

      {/* Display */}
      <SCard className="p-6 mb-5">
        <CardHeader title="Display & Language" subtitle="Appearance and localization settings" />
        <div className="space-y-0">
          <SettingRow label="Dark Mode" desc="Switch to a darker theme">
            <Toggle checked={settings.darkMode} onChange={() => toggle("darkMode")} />
          </SettingRow>
          <SettingRow label="Language" desc="Select your preferred language">
            <select
              value={settings.language}
              onChange={(e) => setSettings((p) => ({ ...p, language: e.target.value }))}
              className="px-3 py-1.5 rounded-xl border border-amber-200 text-sm text-amber-900 bg-amber-50 outline-none focus:ring-2 focus:ring-amber-400/30"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Sanskrit</option>
            </select>
          </SettingRow>
        </div>
      </SCard>

      {/* Security */}
      <SCard className="p-6 mb-5">
        <CardHeader title="Privacy & Security" subtitle="Protect your account and data" />
        <div className="space-y-0">
          <SettingRow label="Two-Factor Authentication" desc="Add an extra layer of security to your account">
            <Toggle checked={settings.twoFactor} onChange={() => toggle("twoFactor")} />
          </SettingRow>
          <SettingRow label="Public Devotee Profile" desc="Allow other devotees to see your profile">
            <Toggle checked={settings.publicProfile} onChange={() => toggle("publicProfile")} />
          </SettingRow>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-semibold text-amber-900">Change Password</p>
              <p className="text-xs text-amber-600/60 mt-0.5">Last changed 3 months ago</p>
            </div>
            <button
              onClick={() => alert("Password change flow")}
              className="px-4 py-2 rounded-xl border border-amber-200 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      </SCard>

      {/* Danger Zone */}
      <SCard className="p-6 border-red-100 bg-red-50/30">
        <h3 className="font-display font-semibold text-red-700 mb-4 flex items-center gap-2">
          <FaTrash /> Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-red-800">Delete Account</p>
            <p className="text-xs text-red-600/70 mt-0.5">This will permanently delete your devotee profile and all data. This action cannot be undone.</p>
          </div>
          <button
            onClick={() => confirm("Are you sure? This cannot be undone.") && alert("Account deletion initiated.")}
            className="px-4 py-2 rounded-xl border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors flex-shrink-0 ml-4"
          >
            Delete Account
          </button>
        </div>
      </SCard>

      {toast && <SuccessToast message="Settings saved successfully!" onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default Settings;
