import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, FormInput, FormSelect
} from "../../components/user/ui/UserUI";
import { darshanSlots } from "./data/mockData";
import { FaClock, FaUsers, FaCheckCircle, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const DarshanPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [persons, setPersons] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const handleBook = () => {
    const e = {};
    if (!selectedDate) e.date = "Please select a date";
    if (!persons || parseInt(persons) < 1) e.persons = "At least 1 person required";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setModalOpen(false);
    setToast(true);
    setSelectedSlot(null);
    setSelectedDate("");
    setPersons("1");
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <UserLayout pageTitle="Darshan Booking">
      <PageHeader
        title="Book Darshan"
        subtitle="Reserve your slot for a divine darshan at Vrindavan Chandrodaya Mandir"
        badge="Temple Darshan"
      />

      {/* Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-3 items-start">
        <FaInfoCircle className="text-amber-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Darshan Guidelines</p>
          <ul className="list-disc list-inside space-y-0.5 text-amber-700/80 text-xs">
            <li>Please arrive 15 minutes before your scheduled slot.</li>
            <li>Dress code: Traditional Indian attire preferred. No shorts or sleeveless.</li>
            <li>Mobile phones and cameras are not permitted inside the sanctum.</li>
            <li>Free darshan is available for all. Paid slots offer closer views with priority entry.</li>
          </ul>
        </div>
      </div>

      {/* Slot Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {darshanSlots.map((slot) => {
          const pct = Math.round(((slot.total - slot.available) / slot.total) * 100);
          const isSelected = selectedSlot?.id === slot.id;
          return (
            <button
              key={slot.id}
              onClick={() => { setSelectedSlot(slot); setModalOpen(true); }}
              className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 w-full
                ${isSelected
                  ? "border-amber-500 bg-amber-50 shadow-md shadow-amber-100"
                  : "border-amber-100 bg-white hover:border-amber-300 hover:shadow-sm hover:shadow-amber-50"
                }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-bold text-amber-900">{slot.name}</h3>
                  <p className="text-xs text-amber-600/70 flex items-center gap-1 mt-1">
                    <FaClock /> {slot.time}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border
                  ${slot.type === "Free"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : slot.type === "Special"
                    ? "bg-purple-50 text-purple-700 border-purple-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"}`}
                >
                  {slot.type === "Free" ? "Free" : `₹${slot.price}`}
                </span>
              </div>

              {/* Availability bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-amber-600/70 mb-1">
                  <span className="flex items-center gap-1"><FaUsers /> {slot.available} available</span>
                  <span>{pct}% filled</span>
                </div>
                <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pct > 80 ? "bg-red-400" : pct > 60 ? "bg-amber-400" : "bg-emerald-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg inline-block hover:bg-amber-100 transition-colors">
                  Book This Slot →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={modalOpen && !!selectedSlot}
        onClose={() => { setModalOpen(false); setErrors({}); }}
        title={`Book — ${selectedSlot?.name}`}
      >
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-sm font-semibold text-amber-900">{selectedSlot?.name}</p>
            <p className="text-xs text-amber-600/70 mt-1">
              {selectedSlot?.time} · {selectedSlot?.type === "Free" ? "Free Entry" : `₹${selectedSlot?.price} per person`}
            </p>
          </div>

          <FormInput
            label="Visit Date"
            id="darshan-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            error={errors.date}
          />

          <FormSelect
            label="Number of Persons"
            id="darshan-persons"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            required
            error={errors.persons}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} Person{n > 1 ? "s" : ""}</option>
            ))}
          </FormSelect>

          {selectedSlot?.price && (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <div className="flex justify-between text-sm">
                <span className="text-amber-700">Total Amount</span>
                <span className="font-bold text-amber-900">₹{(selectedSlot.price * parseInt(persons || 1)).toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <PrimaryBtn onClick={handleBook} className="flex-1">
              <FaCheckCircle /> Confirm Booking
            </PrimaryBtn>
          </div>
        </div>
      </Modal>

      {toast && <SuccessToast message="Darshan slot booked successfully! Check My Bookings for details." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default DarshanPage;
