import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, FormInput, FormSelect, StatusBadge, TabBar
} from "../../components/user/ui/UserUI";
import { accommodationRooms, mockBookings } from "./data/mockData";
import { FaStar, FaUsers, FaWifi, FaSnowflake, FaTv, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

const amenityIcon = { AC: <FaSnowflake />, WiFi: <FaWifi />, TV: <FaTv />, "Hot Water": "🚿", Balcony: "🌅", Kitchen: "🍳", "Puja Room": "🪔", Fan: "🌀", Locker: "🔒", "Mini Fridge": "❄️", "Common Bathrooms": "🚽", "Garden View": "🌳" };

const AccommodationPage = () => {
  const [tab, setTab] = useState("book");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ checkin: "", checkout: "", persons: "2", name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);

  const myAccom = mockBookings.filter((b) => b.service === "Accommodation");

  const nights =
    form.checkin && form.checkout
      ? Math.max(1, Math.ceil((new Date(form.checkout) - new Date(form.checkin)) / (1000 * 60 * 60 * 24)))
      : 1;

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
    error: errors[key],
  });

  const handleBook = () => {
    const e = {};
    if (!form.checkin) e.checkin = "Select check-in date";
    if (!form.checkout) e.checkout = "Select check-out date";
    if (!form.name.trim()) e.name = "Enter your name";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setModalOpen(false);
    setToast(true);
    setForm({ checkin: "", checkout: "", persons: "2", name: "", phone: "" });
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <UserLayout pageTitle="Accommodation">
      <PageHeader
        title="Temple Accommodation"
        subtitle="Stay close to the divine — book your room at VCM Yatri Niwas"
        badge="Pilgrim Stay"
      />

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("book")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "book" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
        >
          Book a Room
        </button>
        <button
          onClick={() => setTab("myStays")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "myStays" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
        >
          My Stays ({myAccom.length})
        </button>
      </div>

      {tab === "book" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {accommodationRooms.map((room) => (
            <SCard key={room.id} className="overflow-hidden">
              {/* Image placeholder */}
              <div className={`h-40 w-full flex items-center justify-center text-6xl
                ${room.type === "Standard" ? "bg-gradient-to-br from-amber-100 to-yellow-50" :
                  room.type === "Deluxe" ? "bg-gradient-to-br from-orange-100 to-amber-50" :
                  room.type === "Premium" ? "bg-gradient-to-br from-yellow-100 to-orange-50" :
                  "bg-gradient-to-br from-amber-50 to-yellow-50"}`}
              >
                {room.type === "Standard" ? "🏨" : room.type === "Deluxe" ? "🛎️" : room.type === "Premium" ? "🏯" : "🛏️"}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-amber-900">{room.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <FaStar className="text-amber-400 text-xs" />
                      <span className="text-xs text-amber-600/70">{room.rating} · {room.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-900">₹{room.price}<span className="text-xs font-normal text-amber-600/70">/night</span></p>
                    <p className="text-xs text-amber-600/70 mt-0.5 flex items-center gap-1 justify-end"><FaUsers /> Up to {room.capacity}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4 mt-3">
                  {room.amenities.slice(0, 5).map((a) => (
                    <span key={a} className="flex items-center gap-1 text-[10px] font-medium bg-amber-50 border border-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      <span className="text-xs">{amenityIcon[a]}</span>{a}
                    </span>
                  ))}
                  {room.amenities.length > 5 && (
                    <span className="text-[10px] font-medium bg-amber-50 text-amber-500 px-2 py-0.5 rounded-full">+{room.amenities.length - 5} more</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${room.available > 5 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : room.available > 0 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                    {room.available > 0 ? `${room.available} Available` : "Fully Booked"}
                  </span>
                  <button
                    disabled={room.available === 0}
                    onClick={() => { setSelectedRoom(room); setModalOpen(true); }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95 ${room.available > 0 ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                  >
                    {room.available > 0 ? "Book Now" : "Full"}
                  </button>
                </div>
              </div>
            </SCard>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {myAccom.length === 0 ? (
            <div className="text-center py-16 text-amber-500/60">No accommodation bookings yet.</div>
          ) : myAccom.map((b) => (
            <SCard key={b.id} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-amber-900">{b.category}</p>
                  <p className="text-xs text-amber-600/70 mt-1">Check-in: {new Date(b.date).toLocaleDateString("en-IN")} · {b.persons} guests</p>
                  <p className="text-xs text-amber-500 mt-0.5">Ref: {b.refNo}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={b.status} />
                  <span className="font-bold text-amber-900">₹{b.amount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </SCard>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <Modal
        isOpen={modalOpen && !!selectedRoom}
        onClose={() => { setModalOpen(false); setErrors({}); }}
        title={`Book — ${selectedRoom?.name}`}
      >
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-sm">
            <p className="font-semibold text-amber-900">{selectedRoom?.name}</p>
            <p className="text-xs text-amber-600/70">₹{selectedRoom?.price}/night · Up to {selectedRoom?.capacity} persons</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="Check-in" id="checkin" type="date" required {...f("checkin")} />
            <FormInput label="Check-out" id="checkout" type="date" required {...f("checkout")} />
          </div>
          <FormSelect label="Guests" id="acc-persons" {...f("persons")}>
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
          </FormSelect>
          <FormInput label="Name" id="acc-name" placeholder="Primary guest name" required {...f("name")} />
          <FormInput label="Phone" id="acc-phone" type="tel" placeholder="+91 XXXXX XXXXX" {...f("phone")} />

          {form.checkin && form.checkout && (
            <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
              <div className="flex justify-between text-sm">
                <span className="text-amber-700">₹{selectedRoom?.price} × {nights} night{nights > 1 ? "s" : ""}</span>
                <span className="font-bold text-amber-900">₹{(selectedRoom?.price * nights).toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}

          <PrimaryBtn onClick={handleBook} className="w-full">
            <FaCheckCircle /> Confirm Booking
          </PrimaryBtn>
        </div>
      </Modal>

      {toast && <SuccessToast message="Room booked successfully! Check My Stays for confirmation." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default AccommodationPage;
