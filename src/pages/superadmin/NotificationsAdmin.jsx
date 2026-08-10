import { useState, useEffect } from "react";
import { FaBullhorn, FaUsers, FaBuilding, FaUserFriends, FaPaperPlane, FaHistory } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import EmptyState from "../../components/common/EmptyState";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { fetchDepartments } from "../../api/departmentsApi";
import { fetchUsers } from "../../api/usersApi";
import { fetchNotificationHistory, sendNotificationRequest } from "../../api/notificationsApi";
import { mediaUrl } from "../../utils/mediaUrl";

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";

const NotificationsAdmin = () => {
  const [history, setHistory] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [targetType, setTargetType] = useState("All Employees");
  const [department, setDepartment] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadHistory = () => {
    fetchNotificationHistory()
      .then((res) => setHistory(res.data))
      .catch((err) => console.error("Failed to load notification history:", err));
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchDepartments(""), fetchUsers({ limit: 1000 }), fetchNotificationHistory()])
      .then(([deptRes, usersRes, historyRes]) => {
        setDepartments(deptRes.data);
        setAllUsers(usersRes.data);
        setHistory(historyRes.data);
        setDepartment(deptRes.data[0]?.name || "");
      })
      .catch((err) => console.error("Failed to load notification page data:", err))
      .finally(() => setLoading(false));
  }, []);

  const toggleUser = (id) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]));
  };

  const getRecipientCount = () => {
    if (targetType === "All Employees") return allUsers.length;
    if (targetType === "Department") return departments.find((d) => d.name === department)?.employeeCount || 0;
    return selectedUsers.length;
  };

  const getTargetLabel = () => {
    if (targetType === "All Employees") return "All Employees";
    if (targetType === "Department") return `${department} Department`;
    return "Selected Users";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) return;

    try {
      await sendNotificationRequest({
        title: form.title,
        message: form.message,
        targetType,
        departmentName: targetType === "Department" ? department : undefined,
        userIds: targetType === "Selected Users" ? selectedUsers : undefined,
      });
      setForm({ title: "", message: "" });
      setSelectedUsers([]);
      setSent(true);
      setTimeout(() => setSent(false), 2500);
      loadHistory();
    } catch (err) {
      console.error("Failed to send notification:", err);
    }
  };

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Notifications" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Notifications"]} />
      <div className="mt-3 mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">Notifications</h2>
        <p className="text-slate-500 text-sm mt-1">Broadcast announcements and manage notification history.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Broadcast Form */}
        <Card title="Broadcast Notification" className="lg:col-span-3">
          <form onSubmit={handleSend} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Notification Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="e.g. Important Update" required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Message</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} placeholder="Write your notification message..." required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">Send To</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "All Employees", icon: FaUsers },
                  { key: "Department", icon: FaBuilding },
                  { key: "Selected Users", icon: FaUserFriends },
                ].map(({ key, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTargetType(key)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-xs font-semibold transition-colors ${
                      targetType === key ? "border-saffron-400 bg-saffron-50 text-saffron-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="text-lg" />
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {targetType === "Department" && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Select Department</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                  {departments.map((d) => <option key={d.id} value={d.name}>{d.name} ({d.employeeCount})</option>)}
                </select>
              </div>
            )}

            {targetType === "Selected Users" && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Select Users ({selectedUsers.length} selected)</label>
                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-50">
                  {allUsers.map((u) => (
                    <label key={u.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                      <input type="checkbox" checked={selectedUsers.includes(u.id)} onChange={() => toggleUser(u.id)} className="rounded border-slate-300 text-saffron-500 focus:ring-saffron-400" />
                      <img src={mediaUrl(u.avatar_url || u.avatar)} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="text-sm text-slate-700 truncate">{u.name}</p>
                        <p className="text-xs text-slate-400 truncate">{u.department}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Will be sent to <span className="font-semibold text-slate-700">{getRecipientCount()}</span> recipient{getRecipientCount() !== 1 ? "s" : ""}
              </p>
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft"
              >
                <FaPaperPlane className="text-xs" /> {sent ? "Sent!" : "Send Notification"}
              </button>
            </div>
          </form>
        </Card>

        {/* Notification History */}
        <Card title="Notification History" className="lg:col-span-2" noPadding>
          {loading ? (
            <p className="text-slate-400 text-sm p-6">Loading history...</p>
          ) : history.length === 0 ? (
            <EmptyState icon={FaHistory} message="No notifications sent yet" />
          ) : (
            <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
              {history.map((n) => (
                <div key={n.id} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-saffron-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaBullhorn className="text-saffron-600 text-xs" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800 truncate">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-1">To: {n.target} · {n.recipients} recipients</p>
                      <p className="text-xs text-slate-400 mt-0.5">by {n.sentBy} · {new Date(n.date).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsAdmin;