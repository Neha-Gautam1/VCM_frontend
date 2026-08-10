import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, FormInput, FormSelect, SearchBar
} from "../../components/user/ui/UserUI";
import { pujaServices } from "./data/mockData";
import { FaClock, FaRupeeSign, FaCheckCircle, FaPrayingHands, FaArrowRight } from "react-icons/fa";

const PujaPage = () => {
  const [search, setSearch] = useState("");
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ date: "", time: "", persons: "1", name: "", gotra: "", sankalp: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);

  const filtered = pujaServices.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.deity.toLowerCase().includes(search.toLowerCase())
  );

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
    error: errors[key],
  });

  const handleBook = () => {
    const e = {};
    if (!form.date) e.date = "Select a puja date";
    if (!form.name.trim()) e.name = "Enter devotee name for Sankalp";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setModalOpen(false);
    setToast(true);
    setForm({ date: "", time: "", persons: "1", name: "", gotra: "", sankalp: "" });
    setTimeout(() => setToast(false), 4500);
  };

  return (
    <UserLayout pageTitle="Puja Services">
      <PageHeader
        title="Sacred Puja & Aarti"
        subtitle="Schedule personalized Vedic rituals, Abhishek, and Archana performed by temple priests on your behalf"
        badge="Vedic Ceremonies"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by puja or deity name..." />
        <span className="text-xs font-bold text-slate-400 self-end sm:self-center">
          Showing {filtered.length} sacred rituals
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filtered.map((puja) => (
          <div
            key={puja.id}
            onClick={() => { if (puja.available) { setSelectedPuja(puja); setModalOpen(true); } }}
            className={`group relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between bg-white
              ${puja.available
                ? "border-slate-100/90 hover:border-orange-300 hover:shadow-xl cursor-pointer"
                : "border-slate-100 bg-slate-50/50 opacity-65 cursor-not-allowed"}`}
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-orange-50 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-60 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-13 h-13 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                  🪔
                </div>
                {!puja.available ? (
                  <span className="text-xs font-bold bg-slate-200 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider">
                    Fully Booked
                  </span>
                ) : (
                  <span className="text-xs font-extrabold bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                    <FaRupeeSign className="text-[10px]" /> {puja.price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <h3 className="font-display font-black text-slate-800 text-lg group-hover:text-orange-600 transition-colors mb-2">
                {puja.name}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium line-clamp-2">
                {puja.description}
              </p>

              <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-orange-600">
                  <FaPrayingHands /> {puja.deity}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <FaClock className="text-orange-500" /> {puja.duration}
                </span>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-3 flex items-center justify-between">
              <span className={`text-xs font-bold ${puja.available ? "text-slate-700 group-hover:text-orange-600" : "text-slate-400"}`}>
                {puja.available ? "Schedule Ceremony" : "Slots Currently Full"}
              </span>
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-2xs ${
                puja.available
                  ? "bg-orange-50 group-hover:bg-orange-500 group-hover:text-white text-orange-600"
                  : "bg-slate-200 text-slate-400"
              }`}>
                <FaArrowRight className="text-xs" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen && !!selectedPuja}
        onClose={() => { setModalOpen(false); setErrors({}); }}
        title={`Book Ceremony — ${selectedPuja?.name}`}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-slate-800 text-base">{selectedPuja?.name}</p>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Deity: {selectedPuja?.deity} · Duration: {selectedPuja?.duration} · ₹{selectedPuja?.price?.toLocaleString("en-IN")}
              </p>
            </div>
            <span className="text-2xl">🪔</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormInput label="Ceremony Date" id="puja-date" type="date" required {...f("date")} />
            <FormSelect label="Time Slot" id="puja-time" {...f("time")}>
              <option value="">Select time slot</option>
              <option>Morning (06:00 - 09:00 AM)</option>
              <option>Forenoon (09:00 AM - 12:00 PM)</option>
              <option>Afternoon (02:00 - 05:00 PM)</option>
              <option>Evening (05:00 - 08:00 PM)</option>
            </FormSelect>
          </div>

          <FormInput label="Devotee Name (For Sankalp)" id="sankalp-name" placeholder="Full name for priest resolution" required {...f("name")} />
          <FormInput label="Gotra (Family Lineage)" id="sankalp-gotra" placeholder="Optional gotra name" {...f("gotra")} />
          <FormInput label="Special Wish / Prayer Resolution" id="sankalp" placeholder="e.g. For family peace, spiritual advancement, and health" {...f("sankalp")} />

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-600">Ceremony Contribution</span>
            <span className="font-display font-black text-lg text-orange-600">
              ₹{selectedPuja?.price?.toLocaleString("en-IN")}
            </span>
          </div>

          <PrimaryBtn onClick={handleBook} className="w-full py-3.5 text-base shadow-lg">
            <FaCheckCircle /> Confirm & Schedule Puja
          </PrimaryBtn>
        </div>
      </Modal>

      {toast && <SuccessToast message="Sacred Puja scheduled successfully! Temple priests will perform the resolution on your selected date." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default PujaPage;
