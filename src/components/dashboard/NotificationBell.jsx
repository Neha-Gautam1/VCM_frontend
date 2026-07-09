import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";

const mockNotifications = [
  { id: 1, text: "New leave request from Priya Singh", time: "5 min ago", unread: true },
  { id: 2, text: "Department budget report is due tomorrow", time: "1 hour ago", unread: true },
  { id: 3, text: "System backup completed successfully", time: "3 hours ago", unread: false },
  { id: 4, text: "5 new users pending approval", time: "Yesterday", unread: false },
];

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
      >
        <FaBell />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-slide-up z-50">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <p className="font-display font-semibold text-slate-800 text-sm">Notifications</p>
            <span className="text-xs text-saffron-600 font-medium cursor-pointer">Mark all read</span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {mockNotifications.map((n) => (
              <div key={n.id} className={`px-5 py-3.5 border-b border-slate-50 hover:bg-slate-50 cursor-pointer flex gap-3 ${n.unread ? "bg-saffron-50/40" : ""}`}>
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? "bg-saffron-500" : "bg-transparent"}`}></span>
                <div>
                  <p className="text-sm text-slate-700">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 text-center">
            <span className="text-xs font-semibold text-saffron-600 cursor-pointer">View all notifications</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;