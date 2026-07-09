import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, FormInput, FormSelect, SearchBar
} from "../../components/user/ui/UserUI";
import { pujaServices } from "./data/mockData";
import { FaClock, FaRupeeSign, FaCheckCircle, FaPrayingHands, FaUsers } from "react-icons/fa";

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
    if (!form.date) e.date = "Select a date";
    if (!form.name.trim()) e.name = "Enter your name";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setModalOpen(false);
    setToast(true);
    setForm({ date: "", time: "", persons: "1", name: "", gotra: "", sankalp: "" });
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <UserLayout pageTitle="Puja Services">
      <PageHeader
        title="Book a Puja"
        subtitle="Schedule sacred rituals and puja ceremonies at the temple"
        badge="Temple Pujas"
      />

      <div className="mb-5">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pujas..." />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((puja) => (
          <SCard key={puja.id} className="p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">🪔</div>
              {!puja.available && (
                <span className="text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
                  Unavailable
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-amber-900 mb-1">{puja.name}</h3>
            <p className="text-xs text-amber-600/70 mb-3 flex-1">{puja.description}</p>
            <div className="flex items-center gap-3 text-xs text-amber-600/70 mb-4">
              <span className="flex items-center gap-1"><FaPrayingHands /> {puja.deity}</span>
              <span className="flex items-center gap-1"><FaClock /> {puja.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 flex items-center gap-0.5">
                <FaRupeeSign className="text-sm" />{puja.price.toLocaleString("en-IN")}
              </span>
              <button
                disabled={!puja.available}
                onClick={() => { setSelectedPuja(puja); setModalOpen(true); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95
                  ${puja.available
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
              >
                {puja.available ? "Book Now" : "Booked Out"}
              </button>
            </div>
          </SCard>
        ))}
      </div>

      <Modal
        isOpen={modalOpen && !!selectedPuja}
        onClose={() => { setModalOpen(false); setErrors({}); }}
        title={`Book — ${selectedPuja?.name}`}
      >
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm">
            <p className="font-semibold text-amber-900">{selectedPuja?.name}</p>
            <p className="text-amber-600/70 text-xs mt-1">{selectedPuja?.deity} · {selectedPuja?.duration} · ₹{selectedPuja?.price?.toLocaleString("en-IN")}</p>
          </div>
          <FormInput label="Puja Date" id="puja-date" type="date" required {...f("date")} />
          <FormSelect label="Preferred Time Slot" id="puja-time" {...f("time")}>
            <option value="">Select slot</option>
            <option>Morning (06:00 - 09:00 AM)</option>
            <option>Forenoon (09:00 AM - 12:00 PM)</option>
            <option>Afternoon (02:00 - 05:00 PM)</option>
            <option>Evening (05:00 - 08:00 PM)</option>
          </FormSelect>
          <FormInput label="Devotee Name (for Sankalp)" id="sankalp-name" placeholder="Your full name" required {...f("name")} />
          <FormInput label="Gotra" id="sankalp-gotra" placeholder="Enter your gotra (optional)" {...f("gotra")} />
          <FormInput label="Special Sankalp / Wish" id="sankalp" placeholder="e.g. For family health and prosperity" {...f("sankalp")} />
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex justify-between text-sm">
            <span className="text-amber-700">Total</span>
            <span className="font-bold text-amber-900">₹{selectedPuja?.price?.toLocaleString("en-IN")}</span>
          </div>
          <PrimaryBtn onClick={handleBook} className="w-full">
            <FaCheckCircle /> Confirm Puja Booking
          </PrimaryBtn>
        </div>
      </Modal>

      {toast && <SuccessToast message="Puja booked successfully! You'll receive a confirmation email." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default PujaPage;
