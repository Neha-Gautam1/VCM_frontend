import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaFilter } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SearchBox from "../../components/common/SearchBox";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { mockNews as initialNews, newsCategories } from "../../data/mockNews";

const emptyForm = { title: "", category: "Announcement", excerpt: "", author: "" };
const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";

const NewsManagement = () => {
  const [news, setNews] = useState(initialNews);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeNews, setActiveNews] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = news.filter(
    (n) => (category === "All" || n.category === category) && n.title.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(emptyForm); setAddOpen(true); };
  const openDelete = (item) => { setActiveNews(item); setDeleteOpen(true); };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setNews([{ id: Date.now(), ...form, status: "Draft", date: new Date().toISOString().split("T")[0] }, ...news]);
    setAddOpen(false);
  };

  const togglePublish = (id) => {
    setNews(news.map((n) => (n.id === id ? { ...n, status: n.status === "Published" ? "Draft" : "Published" } : n)));
  };

  const handleDeleteConfirm = () => {
    setNews(news.filter((n) => n.id !== activeNews.id));
    setDeleteOpen(false);
  };

  const columns = [
    {
      key: "title",
      label: "News Article",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-800 max-w-xs truncate">{row.title}</p>
          <p className="text-xs text-slate-400 mt-0.5">by {row.author}</p>
        </div>
      ),
    },
    { key: "category", label: "Category", render: (row) => <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{row.category}</span> },
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
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="News Management" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "News Management"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">News Management</h2>
          <p className="text-slate-500 text-sm mt-1">Create, publish, and manage news articles.</p>
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
          <FaPlus className="text-xs" /> New Article
        </button>
      </div>

      <Card noPadding>
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-b border-slate-100">
          <SearchBox value={search} onChange={setSearch} placeholder="Search news articles..." className="flex-1" />
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <FaFilter className="text-slate-400 text-xs flex-shrink-0" />
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  category === cat ? "bg-saffron-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <Table columns={columns} data={filtered} emptyMessage="No news articles found" />
      </Card>

      <Modal
        isOpen={addOpen} onClose={() => setAddOpen(false)} title="Create News Article" size="lg"
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
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`}>
                {newsCategories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Author</label>
              <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={inputClass} required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Excerpt</label>
            <textarea rows={4} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={`${inputClass} resize-none`} required />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Article" size="sm"
        footer={<>
          <button onClick={() => setDeleteOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
        </>}
      >
        {activeNews && <p className="text-slate-700">Delete <span className="font-semibold">{activeNews.title}</span>? This cannot be undone.</p>}
      </Modal>
    </DashboardLayout>
  );
};

export default NewsManagement;