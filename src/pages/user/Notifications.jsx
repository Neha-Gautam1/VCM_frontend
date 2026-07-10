import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import { SCard, PageHeader, PrimaryBtn } from "../../components/user/ui/UserUI";
import { notifications as notifData } from "./data/mockData";
import { FaBell, FaBellSlash, FaCheck, FaTrash } from "react-icons/fa";

const NotificationsPage = () => {
  const [notifs, setNotifs] = useState(notifData);
  const [filter, setFilter] = useState("all"); // all | unread

  const markRead = (id) =>
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));

  const deleteNotif = (id) =>
    setNotifs((prev) => prev.filter((n) => n.id !== id));

  const filtered = notifs.filter((n) => filter === "all" || !n.isRead);

  const typeColor = {
    booking: "bg-amber-50 border-amber-200",
    event: "bg-purple-50 border-purple-200",
    donation: "bg-rose-50 border-rose-200",
    store: "bg-sky-50 border-sky-200",
    system: "bg-slate-50 border-slate-200",
  };

  return (
    <UserLayout pageTitle="Notifications">
      <PageHeader
        title="Notifications"
        subtitle="Your alerts, reminders and activity updates"
        badge="Activity Feed"
        action={
          <div className="flex gap-2">
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-200 text-amber-700 text-sm font-semibold hover:bg-amber-50 transition-colors"
            >
              <FaCheck className="text-xs" /> Mark all read
            </button>
          </div>
        }
      />

      {/* Filter + count */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === "all" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>
            All ({notifs.length})
          </button>
          <button onClick={() => setFilter("unread")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === "unread" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>
            Unread ({notifs.filter((n) => !n.isRead).length})
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <FaBellSlash className="text-5xl text-amber-200 mb-4" />
          <p className="font-display font-semibold text-amber-900 text-lg">All caught up!</p>
          <p className="text-amber-600/60 text-sm mt-1">No notifications to show.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={`flex gap-4 p-4 rounded-2xl border transition-all ${!n.isRead ? typeColor[n.type] || "bg-amber-50 border-amber-200" : "bg-white border-amber-50 hover:border-amber-100"}`}
            >
              <div className="text-2xl flex-shrink-0 mt-0.5">{n.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-amber-900">{n.title}</p>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-xs text-amber-700/70 mt-1 leading-relaxed">{n.message}</p>
                    <p className="text-[11px] text-amber-400/70 mt-2">{n.time}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {!n.isRead && (
                      <button
                        onClick={() => markRead(n.id)}
                        title="Mark as read"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition-colors"
                      >
                        <FaCheck className="text-xs" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotif(n.id)}
                      title="Delete"
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 border border-red-200 transition-colors"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  );
};

export default NotificationsPage;