import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, FormInput
} from "../../components/user/ui/UserUI";
import { chadhavaItems } from "./data/mockData";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaCheckCircle } from "react-icons/fa";

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
    if (!form.date) e.date = "Select date";
    if (!form.name.trim()) e.name = "Enter name";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setModalOpen(false);
    setCart({});
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <UserLayout pageTitle="Chadhava Offerings">
      <PageHeader
        title="Chadhava Offerings"
        subtitle="Select sacred offerings for the deity at Vrindavan Chandrodaya Mandir"
        badge="Sacred Offerings"
        action={
          cartCount > 0 && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-md hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              <FaShoppingCart />
              Proceed ({cartCount} items · ₹{cartTotal.toLocaleString("en-IN")})
            </button>
          )
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chadhavaItems.map((item) => (
          <SCard key={item.id} className="p-5">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-display font-bold text-amber-900 mb-1">{item.name}</h3>
            <p className="text-xs text-amber-600/70 mb-4">{item.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-bold text-amber-900">₹{item.price}</span>
              {cart[item.id] ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center hover:bg-amber-200 transition-colors"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-6 text-center font-bold text-amber-900 text-sm">{cart[item.id]}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center hover:bg-amber-600 transition-colors"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-100 text-amber-700 text-sm font-semibold hover:bg-amber-200 transition-colors"
                >
                  <FaPlus className="text-xs" /> Add
                </button>
              )}
            </div>
          </SCard>
        ))}
      </div>

      {/* Cart Summary (bottom bar when items in cart) */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-72 z-20 bg-white border-t border-amber-100 px-6 py-3 flex items-center justify-between shadow-xl shadow-amber-900/5 transition-all duration-300">
          <div>
            <p className="text-sm font-semibold text-amber-900">{cartCount} offering{cartCount > 1 ? "s" : ""} selected</p>
            <p className="text-xs text-amber-600/70">Total: ₹{cartTotal.toLocaleString("en-IN")}</p>
          </div>
          <PrimaryBtn onClick={() => setModalOpen(true)}>
            <FaShoppingCart /> Proceed to Booking
          </PrimaryBtn>
        </div>
      )}

      {/* Checkout Modal */}
      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setErrors({}); }} title="Chadhava Booking">
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-100 overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border-b border-amber-50 last:border-0">
                <span className="text-sm text-amber-900">{item.icon} {item.name} × {cart[item.id]}</span>
                <span className="text-sm font-semibold text-amber-800">₹{(item.price * cart[item.id]).toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-3 bg-amber-50">
              <span className="font-semibold text-amber-900">Total</span>
              <span className="font-bold text-amber-900">₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <FormInput label="Offering Date" id="cha-date" type="date" required {...f("date")} />
          <FormInput label="Devotee Name" id="cha-name" placeholder="Name for Sankalp" required {...f("name")} />
          <FormInput label="Phone Number" id="cha-phone" type="tel" placeholder="+91 XXXXX XXXXX" {...f("phone")} />

          <PrimaryBtn onClick={handleSubmit} className="w-full">
            <FaCheckCircle /> Confirm Offering
          </PrimaryBtn>
        </div>
      </Modal>

      {toast && <SuccessToast message="Chadhava offering booked! Priests will perform on your behalf." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default ChadhavaPage;
