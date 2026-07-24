import { useState } from "react";
import { FaBullhorn, FaPlus, FaEdit, FaTrash, FaPaperPlane, FaSearch } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";
import Modal from "../../components/common/Modal";
import Card from "../../components/common/Card";

const initialAnnouncements = [
  { id: 1, title: "Office Timing Change - Effective August 1", content: "Please note that office timings will be updated to 9:00 AM - 6:00 PM starting August 1, 2026. All employees are requested to update their schedules accordingly.", priority: "High", publishDate: "2026-07-08", status: "Published" },
  { id: 2, title: "Mandatory Cybersecurity Training", content: "All IT department employees must complete the cybersecurity awareness training module by July 31, 2026. Access the training portal via your dashboard.", priority: "Urgent", publishDate: "2026-07-05", status: "Published" },
  { id: 3, title: "Team Building Activity - July 25", content: "We are organizing a team building event at the VCM campus grounds on July 25. Participation is encouraged. Details will be shared via email.", priority: "Normal", publishDate: "2026-07-10", status: "Draft" },
  { id: 4, title: "New Equipment Allocation", content: "New laptops and peripherals have been allocated to the development team. Please visit IT desk between 10 AM-12 PM to collect your equipment.", priority: "Normal", publishDate: "2026-07-03", status: "Published" },
  { id: 5, title: "Monthly Feedback Session", content: "The monthly employee feedback session is scheduled for July 28 at 3:00 PM in the conference room. Your inputs are valuable for department growth.", priority: "Low", publishDate: "2026-07-15", status: "Draft" },
];

const priorityColors = {
  Urgent: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Normal: "bg-blue-100 text-blue-700",
  Low: "bg-slate-100 text-slate-600",
};

const statusColors = { Published: "bg-emerald-100 text-emerald-700", Draft: "bg-amber-100 text-amber-700" };
const emptyForm = { title: "", content: "", priority: "Normal", publishDate: "", status: "Draft" };

const DeptAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState({ open: false, mode: "create", data: null });
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openCreate = () => { setForm(emptyForm); setModal({ open: true, mode: "create", data: null }); };
  const openEdit = (item) => { setForm({ title: item.title, content: item.content, priority: item.priority, publishDate: item.publishDate, status: item.status }); setModal({ open: true, mode: "edit", data: item }); };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (modal.mode === "create") {
      setAnnouncements(prev => [{ id: Date.now(), ...form }, ...prev]);
    } else {
      setAnnouncements(prev => prev.map(a => a.id === modal.data.id ? { ...a, ...form } : a));
    }
    setModal({ open: false, mode: "create", data: null });
  };

  const handleDelete = (id) => { setAnnouncements(prev => prev.filter(a => a.id !== id)); setDeleteConfirm(null); };

  const handlePublish = (id) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, status: "Published" } : a));
  };

  const filtered = announcements.filter(a =>
    (filterStatus === "All" || a.status === filterStatus) &&
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Announcements" breadcrumbs={["Department Admin", "Announcements"]}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800">Announcements</h2>
          <p className="text-slate-500 text-sm mt-1">Create and manage department-wide announcements</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 hover:shadow-lg transition-all">
          <FaPlus /> New Announcement
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search announcements..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400" />
        </div>
        {["All", "Published", "Draft"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === s ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{s}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-shadow p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityColors[item.priority]}`}>{item.priority}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[item.status]}`}>{item.status}</span>
                  <span className="text-xs text-slate-400">{new Date(item.publishDate).toLocaleDateString("en-IN")}</span>
                </div>
                <h3 className="font-display font-semibold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{item.content}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.status === "Draft" && (
                  <button onClick={() => handlePublish(item.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold hover:bg-emerald-100 transition-colors">
                    <FaPaperPlane className="text-[10px]" /> Publish
                  </button>
                )}
                <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg bg-saffron-50 text-saffron-600 hover:bg-saffron-100 flex items-center justify-center transition-colors"><FaEdit className="text-xs" /></button>
                <button onClick={() => setDeleteConfirm(item.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"><FaTrash className="text-xs" /></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-100">
            <FaBullhorn className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No announcements found</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, mode: "create", data: null })}
        title={modal.mode === "create" ? "New Announcement" : "Edit Announcement"}
        size="lg"
        footer={
          <>
            <button onClick={() => setModal({ open: false, mode: "create", data: null })} className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-maroon-600 text-white text-sm font-semibold hover:opacity-90">{modal.mode === "create" ? "Create" : "Save Changes"}</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Announcement title" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Content *</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Announcement content..." rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400">
                {["Urgent", "High", "Normal", "Low"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Publish Date</label>
              <input type="date" value={form.publishDate} onChange={e => setForm({ ...form, publishDate: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
            <div className="flex gap-3">
              {["Draft", "Published"].map(s => (
                <button key={s} type="button" onClick={() => setForm({ ...form, status: s })} className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${form.status === s ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white border-transparent" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm"
        footer={
          <>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={() => handleDelete(deleteConfirm)} className="px-6 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
          </>
        }
      >
        <p className="text-slate-600 text-sm">Are you sure you want to delete this announcement? This action cannot be undone.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default DeptAnnouncements;
