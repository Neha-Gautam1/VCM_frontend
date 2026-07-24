import { useEffect, useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import { SCard, PageHeader, PrimaryBtn, SuccessToast, CardHeader, FormInput, Modal } from "../../components/user/ui/UserUI";
import { FaBell, FaTrash } from "react-icons/fa";
import { getUserPreferences, saveUserPreferences } from "../../utils/userPreferences";

const Toggle = ({ checked, onChange, label }) => (
  <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${checked ? "bg-amber-500" : "bg-slate-200"}`}>
    <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
  </button>
);

const SettingRow = ({ label, desc, children }) => (
  <div className="flex items-center justify-between gap-4 border-b border-amber-50 py-4 last:border-0">
    <div><p className="text-sm font-semibold text-amber-900">{label}</p>{desc && <p className="mt-0.5 text-xs text-amber-600/60">{desc}</p>}</div>
    {children}
  </div>
);

const PasswordModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.current) nextErrors.current = "Enter your current password";
    if (form.next.length < 6) nextErrors.next = "Use at least 6 characters";
    if (form.next !== form.confirm) nextErrors.confirm = "Passwords do not match";
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);
    localStorage.setItem("vcm_demo_password", form.next);
    onSuccess();
    onClose();
  };
  return <Modal isOpen onClose={onClose} title="Change Password"><form onSubmit={submit} className="space-y-4"><p className="text-sm text-slate-500">Your new password is saved locally until backend authentication is connected.</p><FormInput label="Current password" id="current-password" type="password" required value={form.current} onChange={update("current")} error={errors.current} /><FormInput label="New password" id="new-password" type="password" required value={form.next} onChange={update("next")} error={errors.next} /><FormInput label="Confirm new password" id="confirm-password" type="password" required value={form.confirm} onChange={update("confirm")} error={errors.confirm} /><div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-500">Cancel</button><PrimaryBtn type="submit">Update password</PrimaryBtn></div></form></Modal>;
};

const Settings = () => {
  const [settings, setSettings] = useState(getUserPreferences);
  const [toast, setToast] = useState("");
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordChangedAt, setPasswordChangedAt] = useState(localStorage.getItem("vcm_password_changed_at"));

  useEffect(() => { saveUserPreferences(settings); }, [settings]);
  const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }));
  const save = () => { saveUserPreferences(settings); setToast("Settings saved successfully!"); };
  const passwordUpdated = () => { const now = new Date().toLocaleDateString("en-IN"); localStorage.setItem("vcm_password_changed_at", now); setPasswordChangedAt(now); setToast("Password updated successfully!"); };

  return <UserLayout pageTitle="Settings">
    <PageHeader title="Account Settings" subtitle="Manage your preferences, notifications and privacy settings" badge="Preferences" action={<PrimaryBtn onClick={save}>Save Changes</PrimaryBtn>} />
    <SCard className="mb-5 p-6"><CardHeader title="Notification Preferences" subtitle="Control what updates you receive" /><div>
      <SettingRow label="Booking Confirmations" desc="Email notifications for bookings"><Toggle label="Booking confirmations" checked={settings.emailBookings} onChange={(value) => update("emailBookings", value)} /></SettingRow>
      <SettingRow label="Event Reminders" desc="Alerts for upcoming events you've registered for"><Toggle label="Event reminders" checked={settings.emailEvents} onChange={(value) => update("emailEvents", value)} /></SettingRow>
      <SettingRow label="News & Announcements" desc="Temple updates and newsletters"><Toggle label="News and announcements" checked={settings.emailNews} onChange={(value) => update("emailNews", value)} /></SettingRow>
      <SettingRow label="SMS Booking Alerts" desc="Text messages for booking confirmations"><Toggle label="SMS booking alerts" checked={settings.smsBookings} onChange={(value) => update("smsBookings", value)} /></SettingRow>
      <SettingRow label="Donation Receipts" desc="Email receipts for your donations"><Toggle label="Donation receipts" checked={settings.emailDonations} onChange={(value) => update("emailDonations", value)} /></SettingRow>
      <SettingRow label="SMS Event Reminders" desc="Text reminders for events"><Toggle label="SMS event reminders" checked={settings.smsEvents} onChange={(value) => update("smsEvents", value)} /></SettingRow>
    </div></SCard>
    <SCard className="mb-5 p-6"><CardHeader title="Display & Language" subtitle="Appearance and localization settings" /><div>
      <SettingRow label="Dark Mode" desc="Switch the portal to a darker theme"><Toggle label="Dark mode" checked={settings.darkMode} onChange={(value) => update("darkMode", value)} /></SettingRow>
      <SettingRow label="Language" desc="Select your preferred language"><select value={settings.language} onChange={(event) => update("language", event.target.value)} className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-900 outline-none focus:ring-2 focus:ring-amber-400/30"><option>English</option><option>Hindi</option></select></SettingRow>
    </div></SCard>
    <SCard className="mb-5 p-6"><CardHeader title="Privacy & Security" subtitle="Protect your account and data" /><div>
      <SettingRow label="Two-Factor Authentication" desc="Add an extra layer of security to your account"><Toggle label="Two-factor authentication" checked={settings.twoFactor} onChange={(value) => update("twoFactor", value)} /></SettingRow>
      <SettingRow label="Public Devotee Profile" desc="Allow other devotees to see your profile"><Toggle label="Public devotee profile" checked={settings.publicProfile} onChange={(value) => update("publicProfile", value)} /></SettingRow>
      <SettingRow label="Change Password" desc={passwordChangedAt ? `Last changed on ${passwordChangedAt}` : "Set a new password for your account"}><button onClick={() => setPasswordOpen(true)} className="rounded-xl border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50">Change</button></SettingRow>
    </div></SCard>
    <SCard className="border-red-100 bg-red-50/30 p-6"><h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-red-700"><FaTrash /> Danger Zone</h3><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-red-800">Delete Account</p><p className="mt-0.5 text-xs text-red-600/70">This action requires backend confirmation and is not available yet.</p></div><button type="button" disabled className="cursor-not-allowed rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-300">Delete Account</button></div></SCard>
    {passwordOpen && <PasswordModal onClose={() => setPasswordOpen(false)} onSuccess={passwordUpdated} />}
    {toast && <SuccessToast message={toast} onClose={() => setToast("")} />}
  </UserLayout>;
};

export default Settings;
