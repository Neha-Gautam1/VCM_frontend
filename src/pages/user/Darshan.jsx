import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, FormInput, FormSelect
} from "../../components/user/ui/UserUI";
import { darshanSlots } from "./data/mockData";
import { FaClock, FaUsers, FaCheckCircle, FaInfoCircle, FaArrowRight } from "react-icons/fa";

const DarshanPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [persons, setPersons] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState({});

  const handleBook = () => {
    const e = {};
    if (!selectedDate) e.date = "Please select a visit date";
    if (!persons || parseInt(persons) < 1) e.persons = "At least 1 devotee required";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setModalOpen(false);
    setToast(true);
    setSelectedSlot(null);
    setSelectedDate("");
    setPersons("1");
    setTimeout(() => setToast(false), 4500);
  };

  return (
    <UserLayout pageTitle="Darshan Booking">
      <PageHeader
        title="Book Sacred Darshan"
        subtitle="Reserve your priority or free entry slot for the divine Aarti at Vrindavan Chandrodaya Mandir"
        badge="Divine Sanctum"
      />

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-200/80 rounded-3xl p-5 mb-8 flex gap-4 items-start shadow-xs">
        <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
          <FaInfoCircle />
        </div>
        <div className="text-sm text-slate-700 leading-relaxed">
          <p className="font-display font-extrabold text-slate-800 text-base mb-1">Darshan & Sanctum Guidelines</p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs font-medium">
            <li>Please arrive 15 minutes before your scheduled Aarti slot for security verification.</li>
            <li>Traditional Indian attire is highly recommended inside the temple complex.</li>
            <li>Mobile phones, footwear, and cameras must be deposited at the cloakroom before sanctum entry.</li>
            <li>Priority passes offer expedited closer access and divine Charan Tulsi prasad.</li>
          </ul>
        </div>
      </div>

      {/* Slot Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {darshanSlots.map((slot) => {
          const pct = Math.round(((slot.total - slot.available) / slot.total) * 100);
          const isSelected = selectedSlot?.id === slot.id;
          const isSpecial = slot.type !== "Free";

          return (
            <div
              key={slot.id}
              onClick={() => { setSelectedSlot(slot); setModalOpen(true); }}
              className={`group relative overflow-hidden rounded-3xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between bg-white
                ${isSelected
                  ? "border-orange-500 shadow-xl shadow-orange-500/10 scale-[1.02]"
                  : "border-slate-100/90 hover:border-orange-300 hover:shadow-xl"
                }`}
            >
              {/* Decorative background glow */}
              <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl transition-opacity duration-300 ${isSpecial ? "bg-orange-400/15 group-hover:opacity-100" : "bg-slate-200/40"}`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display font-black text-slate-800 text-lg group-hover:text-orange-600 transition-colors">
                      {slot.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-1.5">
                      <FaClock className="text-orange-500" /> {slot.time}
                    </p>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-2xs flex-shrink-0
                    ${slot.type === "Free"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-orange-50 text-orange-600 border-orange-200"}`}
                  >
                    {slot.type === "Free" ? "🛕 Free Entry" : `⭐ ₹${slot.price}`}
                  </span>
                </div>

                {/* Availability bar */}
                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <FaUsers className="text-orange-500" /> {slot.available} spots left
                    </span>
                    <span className="text-orange-600">{pct}% filled</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${pct > 85 ? "bg-red-500" : pct > 60 ? "bg-orange-500" : "bg-emerald-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                  Instant Reservation
                </span>
                <span className="w-8 h-8 rounded-xl bg-orange-50 group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center transition-all shadow-2xs">
                  <FaArrowRight className="text-xs" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={modalOpen && !!selectedSlot}
        onClose={() => { setModalOpen(false); setErrors({}); }}
        title={`Reserve — ${selectedSlot?.name}`}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-slate-800 text-base">{selectedSlot?.name}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {selectedSlot?.time} · {selectedSlot?.type === "Free" ? "Free Devotee Pass" : `Priority Pass (₹${selectedSlot?.price} per person)`}
              </p>
            </div>
            <span className="text-2xl">🛕</span>
          </div>

          <FormInput
            label="Preferred Visit Date"
            id="darshan-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            error={errors.date}
          />

          <FormSelect
            label="Number of Devotees"
            id="darshan-persons"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            required
            error={errors.persons}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} Devotee{n > 1 ? "s" : ""}</option>
            ))}
          </FormSelect>

          {selectedSlot?.price > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Total Contribution</span>
              <span className="font-display font-black text-lg text-orange-600">
                ₹{(selectedSlot.price * parseInt(persons || 1)).toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div className="pt-3">
            <PrimaryBtn onClick={handleBook} className="w-full py-3.5 text-base shadow-lg">
              <FaCheckCircle /> Confirm Darshan Pass
            </PrimaryBtn>
          </div>
        </div>
      </Modal>

      {toast && <SuccessToast message="Darshan slot reserved successfully! Your pass has been issued." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default DarshanPage;
