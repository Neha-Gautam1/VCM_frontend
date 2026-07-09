import { useState } from "react";
import { FaNewspaper, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaTimes } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";

const initialNews = [
  { id: 1, title: "Monthly IT Department Newsletter - July 2026", description: "Updates on new software deployments, security patches, and team achievements for the month of July.", category: "Newsletter", publishDate: "2026-07-01", status: "Published", author: "Dept Admin" },
  { id: 2, title: "New Server Infrastructure Upgrades Completed", description: "The IT team has successfully completed the server migration project ahead of schedule, ensuring 99.9% uptime.", category: "Announcement", publishDate: "2026-06-25", status: "Published", author: "Dept Admin" },
  { id: 3, title: "Cybersecurity Awareness Week - August 2026", description: "Join us for a week-long series of workshops and seminars on best practices for cybersecurity.", category: "Event", publishDate: "2026-08-05", status: "Draft", author: "Dept Admin" },
  { id: 4, title: "Team Outing - Vrindavan Heritage Walk", description: "The IT department will be organizing a team outing to explore the heritage sites of Vrindavan.", category: "General", publishDate: "2026-07-20", status: "Published", author: "Dept Admin" },
  { id: 5, title: "New Employee Onboarding Process Updated", description: "The onboarding process has been revamped to include digital orientation sessions and self-paced modules.", category: "HR Update", publishDate: "2026-07-10", status: "Draft", author: "Dept Admin" },
];

const categories = ["Newsletter", "Announcement", "Event", "General", "HR Update", "Technical"];
const statusColors = { Published: "bg-emerald-100 text-emerald-700", Draft: "bg-amber-100 text-amber-700" };

const emptyForm = { title: "", description: "", category: "Newsletter", publishDate: "", status: "Draft" };

const DeptNews = () => {
  const [newsList, setNewsList] = useState(initialNews);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState({ open: false, mode: "create", data: null });
  const [viewModal, setViewModal] = useState({ open: false, data: null });
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openCreate = () => { setForm(emptyForm); setModal({ open: true, mode: "create", data: null }); };
  const openEdit = (item) => { setForm({ title: item.title, description: item.description, category: item.category, publishDate: item.publishDate, status: item.status }); setModal({ open: true, mode: "edit", data: item }); };
  const openView = (item) => setViewModal({ open: true, data: item });

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (modal.mode === "create") {
      setNewsList(prev => [{ id: Date.now(), ...form, author: "Dept Admin" }, ...prev]);
    } else {
      setNewsList(prev => prev.map(n => n.id === modal.data.id ? { ...n, ...form } : n));
    }
    setModal({ open: false, mode: "create", data: null });
  };

  const handleDelete = (id) => { setNewsList(prev => prev.filter(n => n.id !== id)); setDeleteConfirm(null); };

  const filtered = newsList.filter(n =>
    (filterStatus === "All" || n.status === filterStatus) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Department News" breadcrumbs={["Department Admin", "Department News"]}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800">Department News</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and publish news for your department</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 hover:shadow-lg transition-all">
          <FaPlus /> Add News
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400" />
        </div>
        {["All", "Published", "Draft"].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === s ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{s}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-shadow p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-full">{item.category}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[item.status]}`}>{item.status}</span>
            </div>
            <h3 className="font-display font-semibold text-slate-800 text-sm leading-snug line-clamp-2">{item.title}</h3>
            <p className="text-xs text-slate-500 line-clamp-3">{item.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400">{new Date(item.publishDate).toLocaleDateString("en-IN")}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => openView(item)} className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"><FaEye className="text-xs" /></button>
                <button onClick={() => openEdit(item)} className="w-7 h-7 rounded-lg bg-saffron-50 text-saffron-600 hover:bg-saffron-100 flex items-center justify-center transition-colors"><FaEdit className="text-xs" /></button>
                <button onClick={() => setDeleteConfirm(item.id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"><FaTrash className="text-xs" /></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <FaNewspaper className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No news found</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, mode: "create", data: null })}
        title={modal.mode === "create" ? "Add News" : "Edit News"}
        size="lg"
        footer={
          <>
            <button onClick={() => setModal({ open: false, mode: "create", data: null })} className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-maroon-600 text-white text-sm font-semibold hover:opacity-90">{modal.mode === "create" ? "Publish" : "Save Changes"}</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title *</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="News title" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="News content..." rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400">
                {categories.map(c => <option key={c}>{c}</option>)}
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

      <Modal isOpen={viewModal.open} onClose={() => setViewModal({ open: false, data: null })} title="News Preview" size="lg">
        {viewModal.data && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-full">{viewModal.data.category}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[viewModal.data.status]}`}>{viewModal.data.status}</span>
            </div>
            <h3 className="font-display font-bold text-xl text-slate-800">{viewModal.data.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{viewModal.data.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-100">
              <span>Published: {new Date(viewModal.data.publishDate).toLocaleDateString("en-IN")}</span>
              <span>Author: {viewModal.data.author}</span>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete" size="sm"
        footer={
          <>
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={() => handleDelete(deleteConfirm)} className="px-6 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
          </>
        }
      >
        <p className="text-slate-600 text-sm">Are you sure you want to delete this news article? This action cannot be undone.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default DeptNews;
