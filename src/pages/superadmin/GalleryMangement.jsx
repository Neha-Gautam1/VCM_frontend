import { useState, useEffect, useCallback, useRef } from "react";
import { FaUpload, FaTrash, FaSearchPlus, FaTimes, FaFilter, FaImages } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import EmptyState from "../../components/common/EmptyState";
import { mediaUrl } from "../../utils/mediaUrl";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { galleryCategories } from "../../data/mockGallery";
import { fetchGalleryImages, uploadGalleryImageRequest, deleteGalleryImageRequest } from "../../api/galleryApi";

const sampleUploadImages = [
  "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=500&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80",
];

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchGalleryImages({ category });
      setImages(res.data);
    } catch (err) {
      console.error("Failed to load gallery images:", err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => { loadImages(); }, [loadImages]);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [form, setForm] = useState({ title: "", category: "Architecture" });

  const filtered = category === "All" ? images : images.filter((img) => img.category === category);

  const openPreview = (img) => { setActiveImage(img); setPreviewOpen(true); };
  const openDelete = (img) => { setActiveImage(img); setDeleteOpen(true); };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file to upload");
      return;
    }
    try {
      await uploadGalleryImageRequest(selectedFile, form.title, form.category);
      setForm({ title: "", category: "Architecture" });
      setSelectedFile(null);
      setUploadOpen(false);
      loadImages();
    } catch (err) {
      console.error("Failed to upload image:", err);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteGalleryImageRequest(activeImage.id);
      setDeleteOpen(false);
      setPreviewOpen(false);
      loadImages();
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Gallery Management" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Gallery Management"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Gallery Management</h2>
          <p className="text-slate-500 text-sm mt-1">Upload and organize campus photos.</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft"
        >
          <FaUpload className="text-xs" /> Upload Image
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
        <FaFilter className="text-slate-400 text-xs flex-shrink-0" />
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${category === cat ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow-soft" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card><EmptyState icon={FaImages} message="No images in this category" subMessage="Try uploading a new image or selecting another category." /></Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div key={img.id} className="group relative rounded-2xl overflow-hidden shadow-card h-52 cursor-pointer" onClick={() => openPreview(img)}>
              <img src={mediaUrl(img.url)} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); openPreview(img); }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-colors"
                  >
                    <FaSearchPlus className="text-xs" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); openDelete(img); }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur text-white hover:bg-red-500 transition-colors"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold truncate">{img.title}</p>
                  <p className="text-white/60 text-xs">{img.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={uploadOpen} onClose={() => { setUploadOpen(false); setSelectedFile(null); }} title="Upload New Image" size="sm"
        footer={<>
          <button onClick={() => setUploadOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleUploadSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Upload</button>
        </>}
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-saffron-300 transition-colors cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0] || null)}
            />
            <FaUpload className="text-2xl text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">
              {selectedFile ? selectedFile.name : "Click to browse and select an image"}
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP, GIF up to 5MB</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Image Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`}>
              {galleryCategories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      {activeImage && (
        <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title={activeImage.title} size="lg">
          <img src={activeImage.url} alt={activeImage.title} className="w-full h-96 object-cover rounded-xl mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-saffron-50 text-saffron-600">{activeImage.category}</span>
              <span className="text-xs text-slate-400 ml-3">Uploaded {activeImage.uploadedOn}</span>
            </div>
            <button
              onClick={() => openDelete(activeImage)}
              className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600"
            >
              <FaTrash className="text-xs" /> Delete
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Image" size="sm"
        footer={<>
          <button onClick={() => setDeleteOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
        </>}
      >
        {activeImage && (
          <div className="text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <FaTrash className="text-red-500 text-xl" />
            </div>
            <p className="text-slate-700">Delete <span className="font-semibold">{activeImage.title}</span> from the gallery?</p>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default GalleryManagement;