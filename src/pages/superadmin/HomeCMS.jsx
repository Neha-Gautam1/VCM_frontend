import { useState } from "react";
import { FaSave, FaEye, FaImage, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";

const tabs = [
  { key: "banner", label: "Homepage Banner" },
  { key: "about", label: "About Section" },
  { key: "vision", label: "Vision" },
  { key: "mission", label: "Mission" },
  { key: "leadership", label: "Leadership Message" },
  { key: "cards", label: "Homepage Cards" },
];

const SaveBar = ({ onSave, saved, onPreview }) => (
  <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
    <button onClick={onPreview} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">
      <FaEye className="text-xs" /> Preview
    </button>
    <button onClick={onSave} className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
      <FaSave className="text-xs" /> {saved ? "Saved!" : "Save Changes"}
    </button>
  </div>
);

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";

const HomepageCMS = () => {
  const [activeTab, setActiveTab] = useState("banner");
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [banner, setBanner] = useState({
    heading: "Empowering the Divine Mission Through Unified Service",
    subheading: "The official employee portal of Vrindavan Chandrodaya Mandir",
    ctaText: "Employee Login",
    image: "https://images.unsplash.com/photo-1609950547346-a4f431435b2b?w=800&q=80",
  });

  const [about, setAbout] = useState({
    heading: "A Sacred Institution, Powered by Dedicated People",
    body: "Vrindavan Chandrodaya Mandir is a landmark spiritual and cultural institution built to celebrate the life and teachings of Sri Krishna...",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80",
  });

  const [vision, setVision] = useState({
    text: "To establish Vrindavan Chandrodaya Mandir as a global center of spiritual awakening, cultural preservation and devotional service.",
  });

  const [mission, setMission] = useState({
    text: "To build and nurture a dedicated community of employees and volunteers who work with integrity, compassion and excellence.",
  });

  const [leadership, setLeadership] = useState({
    name: "Acharya Devakinandan Das",
    designation: "President, Vrindavan Chandrodaya Mandir",
    message: "Every employee who serves at Vrindavan Chandrodaya Mandir is part of something far greater than a workplace...",
    photo: "https://i.pravatar.cc/150?img=60",
  });

  const [cards, setCards] = useState([
    { id: 1, title: "Structured Hierarchy", desc: "Clear reporting lines across the organization." },
    { id: 2, title: "Role-Based Access", desc: "Tailored portal experience for every user." },
    { id: 3, title: "Cross-Department Sync", desc: "Departments collaborate on shared initiatives." },
  ]);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [cardForm, setCardForm] = useState({ title: "", desc: "" });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const openAddCard = () => { setActiveCard(null); setCardForm({ title: "", desc: "" }); setCardModalOpen(true); };
  const openEditCard = (card) => { setActiveCard(card); setCardForm({ title: card.title, desc: card.desc }); setCardModalOpen(true); };
  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (activeCard) {
      setCards(cards.map((c) => (c.id === activeCard.id ? { ...c, ...cardForm } : c)));
    } else {
      setCards([...cards, { id: Date.now(), ...cardForm }]);
    }
    setCardModalOpen(false);
  };
  const deleteCard = (id) => setCards(cards.filter((c) => c.id !== id));

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Homepage CMS" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Homepage CMS"]} />
      <div className="mt-3 mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">Homepage CMS</h2>
        <p className="text-slate-500 text-sm mt-1">Edit the public-facing landing page content.</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.key ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow-soft" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Banner */}
      {activeTab === "banner" && (
        <Card title="Homepage Banner">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Heading</label>
                <input value={banner.heading} onChange={(e) => setBanner({ ...banner, heading: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Subheading</label>
                <textarea rows={2} value={banner.subheading} onChange={(e) => setBanner({ ...banner, subheading: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">CTA Button Text</label>
                <input value={banner.ctaText} onChange={(e) => setBanner({ ...banner, ctaText: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Banner Image</label>
              <div className="rounded-xl overflow-hidden border border-slate-200 mb-3">
                <img src={banner.image} alt="Banner preview" className="w-full h-48 object-cover" />
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-saffron-600 border border-saffron-200 bg-saffron-50 px-4 py-2 rounded-xl hover:bg-saffron-100 transition-colors">
                <FaImage className="text-xs" /> Upload New Image
              </button>
            </div>
          </div>
          <SaveBar onSave={handleSave} saved={saved} onPreview={() => setPreviewOpen(true)} />
        </Card>
      )}

      {/* About */}
      {activeTab === "about" && (
        <Card title="About Section">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Heading</label>
                <input value={about.heading} onChange={(e) => setAbout({ ...about, heading: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Body Text</label>
                <textarea rows={6} value={about.body} onChange={(e) => setAbout({ ...about, body: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Section Image</label>
              <div className="rounded-xl overflow-hidden border border-slate-200 mb-3">
                <img src={about.image} alt="About preview" className="w-full h-56 object-cover" />
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-saffron-600 border border-saffron-200 bg-saffron-50 px-4 py-2 rounded-xl hover:bg-saffron-100 transition-colors">
                <FaImage className="text-xs" /> Upload New Image
              </button>
            </div>
          </div>
          <SaveBar onSave={handleSave} saved={saved} onPreview={() => setPreviewOpen(true)} />
        </Card>
      )}

      {/* Vision */}
      {activeTab === "vision" && (
        <Card title="Vision Statement">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Vision Text</label>
          <textarea rows={5} value={vision.text} onChange={(e) => setVision({ text: e.target.value })} className={`${inputClass} resize-none`} />
          <SaveBar onSave={handleSave} saved={saved} onPreview={() => setPreviewOpen(true)} />
        </Card>
      )}

      {/* Mission */}
      {activeTab === "mission" && (
        <Card title="Mission Statement">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Mission Text</label>
          <textarea rows={5} value={mission.text} onChange={(e) => setMission({ text: e.target.value })} className={`${inputClass} resize-none`} />
          <SaveBar onSave={handleSave} saved={saved} onPreview={() => setPreviewOpen(true)} />
        </Card>
      )}

      {/* Leadership */}
      {activeTab === "leadership" && (
        <Card title="Leadership Message">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Name</label>
                <input value={leadership.name} onChange={(e) => setLeadership({ ...leadership, name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Designation</label>
                <input value={leadership.designation} onChange={(e) => setLeadership({ ...leadership, designation: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Message</label>
                <textarea rows={5} value={leadership.message} onChange={(e) => setLeadership({ ...leadership, message: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Photo</label>
              <img src={leadership.photo} alt={leadership.name} className="w-32 h-32 rounded-2xl object-cover border border-slate-200 mb-3" />
              <button className="flex items-center gap-2 text-sm font-semibold text-saffron-600 border border-saffron-200 bg-saffron-50 px-4 py-2 rounded-xl hover:bg-saffron-100 transition-colors">
                <FaImage className="text-xs" /> Upload New Photo
              </button>
            </div>
          </div>
          <SaveBar onSave={handleSave} saved={saved} onPreview={() => setPreviewOpen(true)} />
        </Card>
      )}

      {/* Homepage Cards */}
      {activeTab === "cards" && (
        <Card
          title="Homepage Feature Cards"
          action={
            <button onClick={openAddCard} className="flex items-center gap-2 text-sm font-semibold text-saffron-600 hover:text-saffron-700">
              <FaPlus className="text-xs" /> Add Card
            </button>
          }
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div key={card.id} className="border border-slate-100 rounded-xl p-5 hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{card.title}</h4>
                  <div className="flex gap-1">
                    <button onClick={() => openEditCard(card)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500"><FaEdit className="text-xs" /></button>
                    <button onClick={() => deleteCard(card.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500"><FaTrash className="text-xs" /></button>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{card.desc}</p>
              </div>
            ))}
          </div>
          <SaveBar onSave={handleSave} saved={saved} onPreview={() => setPreviewOpen(true)} />
        </Card>
      )}

      {/* Card Add/Edit Modal */}
      <Modal
        isOpen={cardModalOpen} onClose={() => setCardModalOpen(false)} title={activeCard ? "Edit Card" : "Add Card"} size="sm"
        footer={<>
          <button onClick={() => setCardModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleCardSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Save</button>
        </>}
      >
        <form onSubmit={handleCardSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Title</label>
            <input value={cardForm.title} onChange={(e) => setCardForm({ ...cardForm, title: e.target.value })} className={inputClass} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Description</label>
            <textarea rows={3} value={cardForm.desc} onChange={(e) => setCardForm({ ...cardForm, desc: e.target.value })} className={`${inputClass} resize-none`} required />
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title="Live Preview" size="lg">
        <div className="rounded-xl overflow-hidden border border-slate-200">
          <div className="relative h-56 bg-gradient-to-br from-maroon-800 to-saffron-700 flex items-center justify-center p-6 text-center">
            <img src={banner.image} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
            <div className="relative">
              <h3 className="text-white font-display font-bold text-xl">{banner.heading}</h3>
              <p className="text-white/80 text-sm mt-2">{banner.subheading}</p>
              <span className="inline-block mt-4 bg-white text-maroon-700 text-xs font-semibold px-4 py-2 rounded-lg">{banner.ctaText}</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center py-3">This is a simplified preview of your current CMS content.</p>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default HomepageCMS;