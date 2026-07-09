import { useState } from "react";
import { FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaList, FaTh, FaMapMarkerAlt, FaClock, FaSearch } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";
import Modal from "../../components/common/Modal";
import Card from "../../components/common/Card";

const initialEvents = [
  { id: 1, name: "IT Department Annual Review", date: "2026-07-15", time: "10:00", venue: "Conference Hall A, VCM Campus", description: "Annual performance review and goal-setting session for all IT department members. Please prepare your self-assessment reports.", status: "Upcoming", category: "Meeting" },
  { id: 2, name: "Cybersecurity Workshop", date: "2026-07-22", time: "14:00", venue: "Training Room 2, Block B", description: "Hands-on workshop on ethical hacking and cybersecurity best practices conducted by external experts.", status: "Upcoming", category: "Training" },
  { id: 3, name: "Team Lunch – Monsoon Special", date: "2026-07-25", time: "12:30", venue: "VCM Cafeteria, Main Building", description: "Monthly team bonding lunch. Light agenda, informal discussions, and fun activities planned.", status: "Upcoming", category: "Social" },
  { id: 4, name: "Server Migration Sprint", date: "2026-08-02", time: "09:00", venue: "IT Server Room, Ground Floor", description: "Final sprint for the server migration project. All senior engineers must attend.", status: "Upcoming", category: "Work" },
  { id: 5, name: "New Employee Induction", date: "2026-06-20", time: "09:30", venue: "Orientation Hall", description: "Induction program for new joiners in the IT department covering policies, tools, and culture.", status: "Completed", category: "HR" },
  { id: 6, name: "Quarterly Budget Review", date: "2026-06-30", time: "15:00", venue: "Finance Block, Room 104", description: "Quarterly budget discussion and allocation for Q3.", status: "Completed", category: "Meeting" },
];

const categoryColors = {
  Meeting: "bg-blue-100 text-blue-700",
  Training: "bg-purple-100 text-purple-700",
  Social: "bg-emerald-100 text-emerald-700",
  Work: "bg-orange-100 text-orange-700",
  HR: "bg-pink-100 text-pink-700",
};

const statusColors = {
  Upcoming: "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

const emptyForm = { name: "", date: "", time: "", venue: "", description: "", status: "Upcoming", category: "Meeting" };
const categories = ["Meeting", "Training", "Social", "Work", "HR"];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const DeptEvents = () => {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState({ open: false, mode: "create", data: null });
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const openCreate = () => {
    setForm(emptyForm);
    setModal({ open: true, mode: "create", data: null });
  };

  const openEdit = (item) => {
    setForm({
      name: item.name,
      date: item.date,
      time: item.time,
      venue: item.venue,
      description: item.description,
      status: item.status,
      category: item.category,
    });
    setModal({ open: true, mode: "edit", data: item });
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal.mode === "create") {
      setEvents(prev => [{ id: Date.now(), ...form }, ...prev]);
    } else {
      setEvents(prev => prev.map(e => e.id === modal.data.id ? { ...e, ...form } : e));
    }
    setModal({ open: false, mode: "create", data: null });
  };

  const handleDelete = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setDeleteConfirm(null);
  };

  const filtered = events.filter(e =>
    (filterStatus === "All" || e.status === filterStatus) &&
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const eventsOnDay = (day) => {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter(e => e.date === dateStr);
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Events" breadcrumbs={["Department Admin", "Events"]}>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800">Department Events</h2>
          <p className="text-slate-500 text-sm mt-1">Plan and manage department events</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${viewMode === "list" ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <FaList /> List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${viewMode === "calendar" ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <FaTh /> Calendar
            </button>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 hover:shadow-lg transition-all"
          >
            <FaPlus /> Add Event
          </button>
        </div>
      </div>

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-[200px]">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
              />
            </div>
            {["All", "Upcoming", "Completed", "Cancelled"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === s ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Event Cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(event => (
              <div key={event.id} className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-shadow p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[event.category] || "bg-slate-100 text-slate-600"}`}>
                    {event.category}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[event.status] || "bg-slate-100 text-slate-600"}`}>
                    {event.status}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-slate-800 text-sm leading-snug">{event.name}</h3>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaCalendarAlt className="text-saffron-500 flex-shrink-0" />
                    <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaClock className="text-blue-500 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaMapMarkerAlt className="text-red-400 flex-shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">{event.description}</p>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 justify-end">
                  <button
                    onClick={() => openEdit(event)}
                    className="w-8 h-8 rounded-lg bg-saffron-50 text-saffron-600 hover:bg-saffron-100 flex items-center justify-center transition-colors"
                    title="Edit Event"
                  >
                    <FaEdit className="text-xs" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(event.id)}
                    className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
                    title="Delete Event"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <FaCalendarAlt className="text-4xl text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No events found</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* CALENDAR VIEW */}
      {viewMode === "calendar" && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors text-lg font-bold"
            >
              &#8249;
            </button>
            <h3 className="font-display font-bold text-slate-800 text-lg">{monthNames[calMonth]} {calYear}</h3>
            <button
              onClick={nextMonth}
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors text-lg font-bold"
            >
              &#8250;
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = eventsOnDay(day);
              const isToday =
                day === today.getDate() &&
                calMonth === today.getMonth() &&
                calYear === today.getFullYear();

              return (
                <div
                  key={day}
                  className={`min-h-[70px] rounded-xl p-1.5 border transition-colors cursor-pointer hover:border-saffron-300 ${
                    isToday ? "border-saffron-400 bg-saffron-50" : "border-slate-100 bg-white"
                  }`}
                >
                  <p className={`text-xs font-semibold mb-1 ${isToday ? "text-saffron-600" : "text-slate-600"}`}>{day}</p>
                  {dayEvents.slice(0, 2).map(ev => (
                    <div
                      key={ev.id}
                      className="text-[9px] font-medium bg-gradient-to-r from-saffron-500 to-maroon-600 text-white rounded px-1 py-0.5 mb-0.5 truncate"
                      title={ev.name}
                    >
                      {ev.name}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[9px] text-slate-400">+{dayEvents.length - 2} more</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-saffron-500 to-maroon-600" />
              <span className="text-xs text-slate-500">Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border-2 border-saffron-400 bg-saffron-50" />
              <span className="text-xs text-slate-500">Today</span>
            </div>
          </div>
        </Card>
      )}

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, mode: "create", data: null })}
        title={modal.mode === "create" ? "Add Event" : "Edit Event"}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setModal({ open: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-maroon-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {modal.mode === "create" ? "Create Event" : "Save Changes"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Event Name *</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Enter event name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Venue</label>
            <input
              value={form.venue}
              onChange={e => setForm({ ...form, venue: e.target.value })}
              placeholder="Enter event venue"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the event..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 bg-white"
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 bg-white"
              >
                {["Upcoming", "Completed", "Cancelled"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {/* DELETE CONFIRM MODAL */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirm Delete"
        size="sm"
        footer={
          <>
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deleteConfirm)}
              className="px-6 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </>
        }
      >
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <FaTrash className="text-red-500 text-lg" />
          </div>
          <p className="text-slate-600 text-sm text-center">
            Are you sure you want to delete this event? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default DeptEvents;
