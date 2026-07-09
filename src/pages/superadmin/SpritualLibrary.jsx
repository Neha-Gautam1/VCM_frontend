import { useState, useMemo } from "react";
import { FaPlus, FaBook, FaVideo, FaFileAlt, FaTrash, FaSearch, FaUpload } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SearchBox from "../../components/common/SearchBox";
import EmptyState from "../../components/common/EmptyState";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { mockLibraryItems as initialItems, libraryTypes, libraryCategories } from "../../data/mockLibrary";

const typeIcons = { Book: FaBook, Video: FaVideo, Article: FaFileAlt };
const typeColors = { Book: "bg-blue-50 text-blue-600", Video: "bg-red-50 text-red-500", Article: "bg-emerald-50 text-emerald-600" };

const emptyForm = { title: "", type: "Book", category: "Scripture", author: "" };
const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";

const SpiritualLibrary = () => {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.author.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [items, search, typeFilter, categoryFilter]);

  const openDelete = (item) => { setActiveItem(item); setDeleteOpen(true); };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setItems([{ id: Date.now(), ...form, addedOn: new Date().toISOString().split("T")[0], thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" }, ...items]);
    setForm(emptyForm);
    setUploadOpen(false);
  };

  const handleDeleteConfirm = () => {
    setItems(items.filter((i) => i.id !== activeItem.id));
    setDeleteOpen(false);
  };

  const counts = {
    Book: items.filter((i) => i.type === "Book").length,
    Video: items.filter((i) => i.type === "Video").length,
    Article: items.filter((i) => i.type === "Article").length,
  };

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Spiritual Library" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Spiritual Library"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Spiritual Library</h2>
          <p className="text-slate-500 text-sm mt-1">Manage books, videos, and articles for the community.</p>
        </div>
        <button onClick={() => setUploadOpen(true)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
          <FaPlus className="text-xs" /> Upload Resource
        </button>
      </div>

      {/* Type Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        {Object.entries(counts).map(([type, count]) => {
          const Icon = typeIcons[type];
          return (
            <Card key={type} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeColors[type]}`}><Icon /></div>
              <div><p className="text-xl font-display font-bold text-slate-800">{count}</p><p className="text-xs text-slate-500">{type}s</p></div>
            </Card>
          );
        })}
      </div>

      <Card noPadding>
        <div className="flex flex-col lg:flex-row gap-3 p-6 border-b border-slate-100">
          <SearchBox value={search} onChange={setSearch} placeholder="Search by title or author..." className="flex-1" />
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {libraryTypes.map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${typeFilter === t ? "bg-saffron-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {t}
              </button>
            ))}
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 cursor-pointer">
            <option value="All">All Categories</option>
            {libraryCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={FaSearch} message="No resources found" subMessage="Try adjusting your filters or search term." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-6">
            {filtered.map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-shadow">
                  <div className="relative h-36">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    <div className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[item.type]} backdrop-blur`}>
                      <Icon className="text-xs" />
                    </div>
                    <button
                      onClick={() => openDelete(item)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                  <div className="p-4 bg-white">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{item.category}</span>
                    <h3 className="font-semibold text-sm text-slate-800 mt-1 line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1.5">{item.author}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Upload Modal */}
      <Modal
        isOpen={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload New Resource" size="md"
        footer={<>
          <button onClick={() => setUploadOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleUploadSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Upload</button>
        </>}
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-saffron-300 transition-colors cursor-pointer">
            <FaUpload className="text-xl text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">Click to browse file (prototype — no real upload)</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`}>
                <option>Book</option><option>Video</option><option>Article</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`}>
                {libraryCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Author / Creator</label>
            <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={inputClass} required />
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Resource" size="sm"
        footer={<>
          <button onClick={() => setDeleteOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
        </>}
      >
        {activeItem && <p className="text-slate-700">Delete <span className="font-semibold">{activeItem.title}</span> from the library?</p>}
      </Modal>
    </DashboardLayout>
  );
};

export default SpiritualLibrary;