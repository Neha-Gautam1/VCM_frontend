import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, FormInput
} from "../../components/user/ui/UserUI";
import { chadhavaItems } from "./data/mockData";
import { FaPlus, FaMinus, FaShoppingCart, FaCheckCircle, FaArrowRight } from "react-icons/fa";

const ChadhavaPage = () => {
  const [cart, setCart] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [form, setForm] = useState({ date: "", name: "", phone: "" });
  const [errors, setErrors] = useState({});

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const cur = prev[id] || 0;
      const next = cur + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartItems = chadhavaItems.filter((i) => cart[i.id]);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * cart[i.id], 0);
  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
    error: errors[key],
  });

  const handleSubmit = () => {
    const e = {};
    if (!form.date) e.date = "Select offering date";
    if (!form.name.trim()) e.name = "Enter devotee name";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setModalOpen(false);
    setCart({});
    setToast(true);
    setTimeout(() => setToast(false), 4500);
  };

  return (
    <UserLayout pageTitle="Chadhava Offerings">
      <PageHeader
        title="Sacred Chadhava Seva"
        subtitle="Offer holy Panchamrit, Tulsi Mala, Shringar diyas, and divine Bhog prasad directly to Sri Sri Radha Vrindavanchandra"
        badge="Devotee Offerings"
        action={
          cartCount > 0 && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all"
              style={{ boxShadow: "0 6px 20px rgba(249,115,22,0.4)" }}
            >
              <FaShoppingCart className="text-base" />
              <span>Proceed to Offer ({cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal.toLocaleString("en-IN")})</span>
            </button>
          )
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {chadhavaItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-3xl p-6 border border-slate-100/90 bg-white hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-orange-50 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-60 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-xs font-extrabold bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full shadow-2xs">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
              </div>

              <h3 className="font-display font-black text-slate-800 text-lg group-hover:text-orange-600 transition-colors mb-2">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
                {cart[item.id] ? "Selected Quantity:" : "Sacred Offering:"}
              </span>

              {cart[item.id] ? (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center hover:bg-orange-200 transition-colors shadow-2xs font-bold"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-7 text-center font-display font-black text-slate-800 text-base">{cart[item.id]}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-9 h-9 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white flex items-center justify-center hover:scale-105 transition-all shadow-md font-bold"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-600 text-xs font-bold transition-all shadow-2xs group/btn"
                >
                  <FaPlus className="text-[10px]" />
                  <span>Add Offering</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-72 z-40 bg-white/95 backdrop-blur-md border-t border-orange-200/80 px-6 sm:px-8 py-4 flex items-center justify-between shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl shadow-md">
              🪷
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{cartCount} sacred offering{cartCount > 1 ? "s" : ""} prepared</p>
              <p className="text-xs font-bold text-orange-600">Total Seva Contribution: ₹{cartTotal.toLocaleString("en-IN")}</p>
            </div>
          </div>
          <PrimaryBtn onClick={() => setModalOpen(true)} className="px-6 py-3 text-sm">
            <span>Proceed to Offer</span>
            <FaArrowRight className="text-xs" />
          </PrimaryBtn>
        </div>
      )}

      {/* Checkout Modal */}
      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setErrors({}); }} title="Confirm Chadhava Seva">
        <div className="space-y-4">
          <div className="rounded-2xl border border-orange-200/80 overflow-hidden bg-slate-50/60">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3.5 border-b border-orange-100 last:border-0 bg-white/80">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name} × {cart[item.id]}</span>
                </span>
                <span className="text-xs font-black text-orange-600">₹{(item.price * cart[item.id]).toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 bg-orange-50/90 border-t border-orange-200">
              <span className="font-bold text-slate-800 text-sm">Total Contribution</span>
              <span className="font-display font-black text-lg text-orange-600">₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <FormInput label="Offering Date" id="cha-date" type="date" required {...f("date")} />
          <FormInput label="Devotee Name (For Sankalp)" id="cha-name" placeholder="Full name for deity resolution" required {...f("name")} />
          <FormInput label="Phone Number" id="cha-phone" type="tel" placeholder="+91 XXXXX XXXXX" {...f("phone")} />

          <PrimaryBtn onClick={handleSubmit} className="w-full py-3.5 text-base shadow-lg mt-2">
            <FaCheckCircle /> Complete Chadhava Offering
          </PrimaryBtn>
        </div>
      </Modal>

      {toast && <SuccessToast message="Chadhava offering booked successfully! Temple priests will perform the offering on your selected date." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default ChadhavaPage;
