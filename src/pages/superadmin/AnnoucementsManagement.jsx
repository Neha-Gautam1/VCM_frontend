import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaBullhorn } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SearchBox from "../../components/common/SearchBox";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { mockAnnouncements as initialAnnouncements, audienceOptions } from "../../data/mockAnnouncemenrs";

const emptyForm = { title: "", audience: "All Employees", priority: "Medium" };
const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";

const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-slate-100 text-slate-600",
};

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [search, setSearch] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = announcements.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm(emptyForm); setAddOpen(true); };
  const openDelete = (item) => { setActiveItem(item); setDeleteOpen(true); };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setAnnouncements([{ id: Date.now(), ...form, status: "Draft", date: new Date().toISOString().split("T")[0] }, ...announcements]);
    setAddOpen(false);
  };

  const togglePublish = (id) => {
    setAnnouncements(announcements.map((a) => (a.id === id ? { ...a, status: a.status === "Published" ? "Draft" : "Published" } : a)));
  };

  const handleDeleteConfirm = () => {
    setAnnouncements(announcements.filter((a) => a.id !== activeItem.id));
    setDeleteOpen(false);
  };

  const columns = [
    { key: "title", label: "Announcement", render: (row) => <p className="font-medium text-slate-800 max-w-xs truncate">{row.title}</p> },
    { key: "audience", label: "Audience", render: (row) => <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">{row.audience}</span> },
    { key: "priority", label: "Priority", render: (row) => <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityStyles[row.priority]}`}>{row.priority}</span> },
    { key: "date", label: "Date" },
    { key: "status", label: "Status", render: (row) => <Badge status={row.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => togglePublish(row.id)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${row.status === "Published" ? "hover:bg-slate-100 text-slate-400" : "hover:bg-emerald-50 text-emerald-500"}`}
            title={row.status === "Published" ? "Unpublish" : "Publish"}
          >
            <FaCheckCircle className="text-sm" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Edit">
            <FaEdit className="text-sm" />
          </button>
          <button onClick={() => openDelete(row)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete">
            <FaTrash className="text-sm" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Announcements" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Announcements"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Announcement Management</h2>
          <p className="text-slate-500 text-sm mt-1">Broadcast announcements to employees and departments.</p>
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
          <FaPlus className="text-xs" /> New Announcement
        </button>
      </div>

      <Card noPadding>
        <div className="p-6 border-b border-slate-100">
          <SearchBox value={search} onChange={setSearch} placeholder="Search announcements..." className="max-w-sm" />
        </div>
        <Table columns={columns} data={filtered} emptyMessage="No announcements found" />
      </Card>

      <Modal
        isOpen={addOpen} onClose={() => setAddOpen(false)} title="Create Announcement" size="md"
        footer={<>
          <button onClick={() => setAddOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleAddSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Save as Draft</button>
        </>}
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Audience</label>
              <select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`}>
                {audienceOptions.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`}>
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Announcement" size="sm"
        footer={<>
          <button onClick={() => setDeleteOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
        </>}
      >
        {activeItem && <p className="text-slate-700">Delete <span className="font-semibold">{activeItem.title}</span>? This cannot be undone.</p>}
      </Modal>
    </DashboardLayout>
  );
};

export default AnnouncementManagement;