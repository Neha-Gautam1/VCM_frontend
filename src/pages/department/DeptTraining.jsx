import { useState } from "react";
import { FaGraduationCap, FaPlay, FaFilePdf, FaChalkboard, FaUpload, FaSearch, FaLock, FaCheckCircle } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";
import Modal from "../../components/common/Modal";
import StatCard from "../../components/common/StatCard";

const trainingData = {
  videos: [
    { id: 1, title: "Introduction to VCM IT Systems", duration: "45 min", instructor: "Vikram Singh", category: "Onboarding", status: "Available", completions: 38, thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
    { id: 2, title: "Cybersecurity Best Practices", duration: "32 min", instructor: "Kavitha Reddy", category: "Security", status: "Available", completions: 30, thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80" },
    { id: 3, title: "Cloud Infrastructure on AWS", duration: "1 hr 20 min", instructor: "Vikram Singh", category: "Technical", status: "Available", completions: 22, thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
    { id: 4, title: "DevOps Pipeline with Jenkins", duration: "55 min", instructor: "Suresh Nair", category: "Technical", status: "Coming Soon", completions: 0, thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&q=80" },
  ],
  pdfs: [
    { id: 1, title: "IT Department Handbook 2026", pages: 48, category: "Policy", status: "Available", downloads: 42, updatedAt: "2026-07-01" },
    { id: 2, title: "Network Configuration Guide", pages: 32, category: "Technical", status: "Available", downloads: 18, updatedAt: "2026-06-15" },
    { id: 3, title: "Data Protection Guidelines", pages: 24, category: "Compliance", status: "Available", downloads: 35, updatedAt: "2026-06-01" },
    { id: 4, title: "Incident Response Playbook", pages: 56, category: "Security", status: "Available", downloads: 27, updatedAt: "2026-05-20" },
    { id: 5, title: "Employee Onboarding Checklist", pages: 12, category: "HR", status: "Available", downloads: 40, updatedAt: "2026-05-10" },
  ],
  presentations: [
    { id: 1, title: "Q2 2026 Department Review", slides: 28, presenter: "Dept Admin", category: "Review", status: "Available", views: 42, date: "2026-06-30" },
    { id: 2, title: "New Tech Stack Introduction", slides: 45, presenter: "Arjun Mehta", category: "Technical", status: "Available", views: 30, date: "2026-06-15" },
    { id: 3, title: "Cybersecurity Awareness Deck", slides: 35, presenter: "Kavitha Reddy", category: "Security", status: "Available", views: 38, date: "2026-06-01" },
    { id: 4, title: "Cloud Migration Roadmap", slides: 52, presenter: "Vikram Singh", category: "Planning", status: "Draft", views: 0, date: "2026-07-08" },
  ],
};

const tabs = [
  { id: "videos", label: "Recorded Videos", icon: FaPlay, count: trainingData.videos.length },
  { id: "pdfs", label: "PDFs", icon: FaFilePdf, count: trainingData.pdfs.length },
  { id: "presentations", label: "Presentations", icon: FaChalkboard, count: trainingData.presentations.length },
];

const categoryColors = {
  Onboarding: "bg-emerald-100 text-emerald-700",
  Security: "bg-red-100 text-red-700",
  Technical: "bg-blue-100 text-blue-700",
  Policy: "bg-purple-100 text-purple-700",
  Compliance: "bg-orange-100 text-orange-700",
  HR: "bg-pink-100 text-pink-700",
  Review: "bg-teal-100 text-teal-700",
  Planning: "bg-indigo-100 text-indigo-700",
};

const DeptTraining = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [search, setSearch] = useState("");
  const [uploadModal, setUploadModal] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const currentData = trainingData[activeTab];
  const filtered = currentData.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalCompletions = trainingData.videos.reduce((a, v) => a + v.completions, 0);
  const totalDownloads = trainingData.pdfs.reduce((a, v) => a + v.downloads, 0);
  const totalViews = trainingData.presentations.reduce((a, v) => a + v.views, 0);
  const totalResources = trainingData.videos.length + trainingData.pdfs.length + trainingData.presentations.length;

  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Training Center" breadcrumbs={["Department Admin", "Training Center"]}>
      {toast && (
        <div className="fixed top-4 right-4 z-[200] bg-emerald-500 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg animate-slide-up">{toast}</div>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800">Training Center</h2>
          <p className="text-slate-500 text-sm mt-1">Manage training materials for your department</p>
        </div>
        <button
          onClick={() => setUploadModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 hover:shadow-lg transition-all"
        >
          <FaUpload /> Upload Material
        </button>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FaPlay} label="Video Completions" value={totalCompletions} color="saffron" />
        <StatCard icon={FaFilePdf} label="PDF Downloads" value={totalDownloads} color="maroon" />
        <StatCard icon={FaChalkboard} label="Slides Views" value={totalViews} color="blue" />
        <StatCard icon={FaGraduationCap} label="Total Resources" value={totalResources} color="emerald" />
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearch(""); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <tab.icon />
            {tab.label}
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${activeTab}...`}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
        />
      </div>

      {activeTab === "videos" && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {filtered.map(video => (
            <div key={video.id} className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full h-36 object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                  {video.status === "Available" ? (
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-colors">
                      <FaPlay className="text-saffron-600 ml-0.5" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                      <FaLock className="text-white" />
                    </div>
                  )}
                </div>
                <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${video.status === "Available" ? "bg-emerald-500 text-white" : "bg-slate-600 text-white"}`}>
                  {video.status}
                </span>
              </div>
              <div className="p-4">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[video.category] || "bg-slate-100 text-slate-600"}`}>{video.category}</span>
                <h3 className="font-display font-semibold text-slate-800 text-sm mt-2 leading-snug line-clamp-2">{video.title}</h3>
                <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                  <span>⏱ {video.duration}</span>
                  <span><FaCheckCircle className="inline text-emerald-400 mr-1" />{video.completions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "pdfs" && (
        <div className="space-y-3">
          {filtered.map(pdf => (
            <div key={pdf.id} className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-shadow p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <FaFilePdf className="text-red-500 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-slate-800 text-sm">{pdf.title}</h3>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[pdf.category] || "bg-slate-100 text-slate-600"}`}>{pdf.category}</span>
                  <span className="text-xs text-slate-400">{pdf.pages} pages</span>
                  <span className="text-xs text-slate-400">Updated: {new Date(pdf.updatedAt).toLocaleDateString("en-IN")}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-slate-500">{pdf.downloads} downloads</span>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-maroon-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                  View PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "presentations" && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(pres => (
            <div key={pres.id} className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-shadow p-5">
              <div className="w-full h-32 bg-gradient-to-br from-saffron-50 to-maroon-50 rounded-xl flex items-center justify-center mb-4">
                <FaChalkboard className="text-4xl text-saffron-400" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[pres.category] || "bg-slate-100 text-slate-600"}`}>{pres.category}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pres.status === "Available" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{pres.status}</span>
              </div>
              <h3 className="font-display font-semibold text-slate-800 text-sm mb-1">{pres.title}</h3>
              <p className="text-xs text-slate-400 mb-3">{pres.slides} slides · by {pres.presenter} · {new Date(pres.date).toLocaleDateString("en-IN")}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{pres.views} views</span>
                {pres.status === "Available" && (
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-maroon-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity">View</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100">
          <FaGraduationCap className="text-4xl text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No {activeTab} found</p>
        </div>
      )}

      <Modal
        isOpen={uploadModal}
        onClose={() => setUploadModal(false)}
        title="Upload Training Material"
        size="md"
        footer={
          <>
            <button onClick={() => setUploadModal(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={() => { setUploadModal(false); showToast("Material uploaded successfully!"); }} className="px-6 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-maroon-600 text-white text-sm font-semibold hover:opacity-90">Upload</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Material Type</label>
            <div className="grid grid-cols-3 gap-2">
              {[{ id: "videos", label: "Video", icon: FaPlay }, { id: "pdfs", label: "PDF", icon: FaFilePdf }, { id: "presentations", label: "Slides", icon: FaChalkboard }].map(t => (
                <button key={t.id} type="button" className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-saffron-400 bg-saffron-50 text-saffron-600 hover:bg-saffron-100 transition-colors">
                  <t.icon />
                  <span className="text-xs font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
            <input placeholder="Material title" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400">
              {["Onboarding", "Security", "Technical", "HR", "Compliance"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-saffron-400 transition-colors cursor-pointer">
            <FaUpload className="text-2xl text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">Drop file here or click to browse</p>
            <p className="text-xs text-slate-400 mt-1">MP4, PDF, PPTX supported</p>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default DeptTraining;
