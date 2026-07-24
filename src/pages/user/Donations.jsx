import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, FormInput, FormSelect, ProgressBar, StatusBadge, CardHeader
} from "../../components/user/ui/UserUI";
import { donationCauses, myDonations } from "./data/mockData";
import { FaHeart, FaDownload, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const AMOUNTS = [101, 251, 501, 1001, 2100, 5001];

const DonationsPage = () => {
  const [selectedCause, setSelectedCause] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", mode: "UPI" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);
  const [tab, setTab] = useState("causes"); // causes | history

  const finalAmount = customAmount ? parseInt(customAmount) : amount ? parseInt(amount) : 0;

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
    error: errors[key],
  });

  const handleDonate = () => {
    const e = {};
    if (!finalAmount || finalAmount < 1) e.amount = "Enter donation amount";
    if (!form.name.trim()) e.name = "Enter your name";
    if (!form.email.trim()) e.email = "Enter your email";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setModalOpen(false);
    setToast(true);
    setAmount("");
    setCustomAmount("");
    setForm({ name: "", email: "", phone: "", message: "", mode: "UPI" });
    setTimeout(() => setToast(false), 4500);
  };

  const totalDonated = myDonations.reduce((s, d) => s + d.amount, 0);

  return (
    <UserLayout pageTitle="Divya Seva & Donations">
      <PageHeader
        title="Contribute to VCM Vrindavan"
        subtitle="Support sacred initiatives including the 70-story Vrindavan Chandrodaya Mandir construction, Annadana, and Goshala Seva"
        badge="Divya Seva"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center text-2xl font-bold">
            ❤️
          </div>
          <div>
            <p className="font-display font-black text-2xl sm:text-3xl text-slate-800 tracking-tight">₹{totalDonated.toLocaleString("en-IN")}</p>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Your Total Contribution</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center text-2xl font-bold">
            🪔
          </div>
          <div>
            <p className="font-display font-black text-2xl sm:text-3xl text-slate-800 tracking-tight">{myDonations.length}</p>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Seva Contributions Made</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center text-2xl font-bold">
            80G
          </div>
          <div>
            <p className="font-display font-black text-2xl sm:text-3xl text-emerald-600 tracking-tight">Eligible ✓</p>
            <p className="text-xs font-bold text-slate-500 mt-0.5">Tax Exemption Certificate</p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-2xl w-fit mb-8">
        <button
          onClick={() => setTab("causes")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${tab === "causes" ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md" : "text-slate-600 hover:text-slate-800"}`}
        >
          Sacred Donation Causes
        </button>
        <button
          onClick={() => setTab("history")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${tab === "history" ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md" : "text-slate-600 hover:text-slate-800"}`}
        >
          My Donation History
        </button>
      </div>

      {tab === "causes" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {donationCauses.map((cause) => (
            <div
              key={cause.id}
              className="group relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-100/90 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-orange-50 rounded-bl-full transition-transform group-hover:scale-110 -z-0 opacity-60 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                    {cause.icon}
                  </div>
                  <span className="text-[11px] font-extrabold text-orange-600 uppercase tracking-wider bg-orange-50 border border-orange-200 px-3 py-1 rounded-full shadow-2xs">
                    {cause.category}
                  </span>
                </div>

                <h3 className="font-display font-black text-slate-800 text-lg group-hover:text-orange-600 transition-colors mt-2 mb-2 leading-snug">
                  {cause.name}
                </h3>
                <ProgressBar value={cause.raised} max={cause.goal} />
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => { setSelectedCause(cause); setModalOpen(true); }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-md"
                  style={{ boxShadow: "0 6px 20px rgba(249,115,22,0.3)" }}
                >
                  <FaHeart className="text-xs" /> Contribute Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm mb-12">
          <CardHeader title="My Donation History" subtitle="All your past contributions & 80G tax receipts" />
          {myDonations.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/70 rounded-2xl border border-slate-100">
              <span className="text-4xl block mb-2">🙏</span>
              <p className="text-slate-700 font-bold text-sm">No contributions made yet</p>
              <p className="text-slate-400 text-xs mt-1">Be the first to contribute to Vrindavan temple causes!</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {myDonations.map((d) => (
                <div key={d.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-orange-200 transition-all duration-200 gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-orange-100/80 text-orange-600 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-2xs">
                      ❤️
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{d.cause}</p>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · Mode: {d.mode} · Receipt #{d.receipt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                    <div className="text-right">
                      <p className="font-display font-black text-slate-800 text-base">₹{d.amount.toLocaleString("en-IN")}</p>
                      <StatusBadge status={d.status} />
                    </div>
                    <button
                      onClick={() => alert(`Downloading 80G Tax Receipt ${d.receipt}...`)}
                      title="Download 80G Receipt"
                      className="w-9 h-9 rounded-xl border border-orange-200 bg-white flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white transition-all shadow-2xs"
                    >
                      <FaDownload className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Donation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setErrors({}); setAmount(""); setCustomAmount(""); }}
        title={`Contribute — ${selectedCause?.name}`}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-slate-800 text-base">{selectedCause?.name}</p>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                Category: {selectedCause?.category} · Target Goal: ₹{selectedCause?.goal?.toLocaleString("en-IN")}
              </p>
            </div>
            <span className="text-2xl">{selectedCause?.icon}</span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Select Contribution Amount (₹)</p>
            <div className="grid grid-cols-3 gap-2.5">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(String(a)); setCustomAmount(""); }}
                  className={`py-2.5 rounded-xl text-sm font-bold border transition-all shadow-2xs ${amount === String(a) && !customAmount ? "bg-gradient-to-r from-orange-500 to-red-600 text-white border-transparent shadow-md scale-105" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-white"}`}
                >
                  ₹{a.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            {errors.amount && <p className="text-xs text-red-500 font-semibold mt-1">{errors.amount}</p>}
          </div>

          <FormInput
            label="Custom Amount (₹)"
            id="custom-amount"
            type="number"
            placeholder="Enter custom donation amount"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormInput label="Full Name (For Receipt)" id="don-name" placeholder="Legal full name" required {...f("name")} />
            <FormInput label="Email (For 80G Certificate)" id="don-email" type="email" placeholder="devotee@example.com" required {...f("email")} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormInput label="Phone Number" id="don-phone" type="tel" placeholder="+91 XXXXX XXXXX" {...f("phone")} />
            <FormSelect label="Payment Method" id="don-mode" {...f("mode")}>
              <option>UPI / BHIM</option>
              <option>Net Banking</option>
              <option>Debit Card</option>
              <option>Credit Card</option>
            </FormSelect>
          </div>

          {finalAmount > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 block">Total Contribution</span>
                <span className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5 font-semibold"><FaInfoCircle /> 100% Tax Exempt under Section 80G</span>
              </div>
              <span className="font-display font-black text-xl text-emerald-700">₹{finalAmount.toLocaleString("en-IN")}</span>
            </div>
          )}

          <PrimaryBtn onClick={handleDonate} className="w-full py-3.5 text-base shadow-lg mt-2">
            <FaHeart /> Donate ₹{finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "—"}
          </PrimaryBtn>
        </div>
      </Modal>

      {toast && <SuccessToast message="Thank you for your divine contribution! Your 80G tax receipt has been sent to your email." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default DonationsPage;
