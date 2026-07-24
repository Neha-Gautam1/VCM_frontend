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
    setTimeout(() => setToast(false), 5000);
  };

  const totalDonated = myDonations.reduce((s, d) => s + d.amount, 0);

  return (
    <UserLayout pageTitle="Donations">
      <PageHeader
        title="Donate to VCM"
        subtitle="Support the sacred mission of Vrindavan Chandrodaya Mandir"
        badge="Dana & Seva"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <SCard className="p-5 text-center" hover={false}>
          <p className="font-display font-bold text-2xl text-amber-900">₹{totalDonated.toLocaleString("en-IN")}</p>
          <p className="text-xs text-amber-600/70 mt-1">Your Total Contribution</p>
        </SCard>
        <SCard className="p-5 text-center" hover={false}>
          <p className="font-display font-bold text-2xl text-amber-900">{myDonations.length}</p>
          <p className="text-xs text-amber-600/70 mt-1">Donations Made</p>
        </SCard>
        <SCard className="p-5 text-center col-span-2 sm:col-span-1" hover={false}>
          <p className="font-display font-bold text-2xl text-emerald-600">80G ✓</p>
          <p className="text-xs text-amber-600/70 mt-1">Tax Exemption Eligible</p>
        </SCard>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setTab("causes")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "causes" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
        >
          Donation Causes
        </button>
        <button
          onClick={() => setTab("history")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "history" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
        >
          My Donations
        </button>
      </div>

      {tab === "causes" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {donationCauses.map((cause) => (
            <SCard key={cause.id} className="p-5">
              <div className="text-3xl mb-3">{cause.icon}</div>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                {cause.category}
              </span>
              <h3 className="font-display font-semibold text-amber-900 mt-2 mb-3 leading-snug">{cause.name}</h3>
              <ProgressBar value={cause.raised} max={cause.goal} />
              <button
                onClick={() => { setSelectedCause(cause); setModalOpen(true); }}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:from-amber-600 hover:to-orange-600 transition-all active:scale-95 shadow-sm"
              >
                <FaHeart /> Donate Now
              </button>
            </SCard>
          ))}
        </div>
      ) : (
        <SCard className="p-6">
          <CardHeader title="My Donation History" subtitle="All your past contributions" />
          {myDonations.length === 0 ? (
            <p className="text-center text-amber-500/60 py-8">No donations yet. Be the first to contribute!</p>
          ) : (
            <div className="space-y-3">
              {myDonations.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                  <div>
                    <p className="text-sm font-semibold text-amber-900">{d.cause}</p>
                    <p className="text-xs text-amber-600/70 mt-0.5">
                      {new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {d.mode}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="font-bold text-amber-900">₹{d.amount.toLocaleString("en-IN")}</p>
                      <StatusBadge status={d.status} />
                    </div>
                    <button
                      onClick={() => alert(`Downloading receipt ${d.receipt}`)}
                      className="w-8 h-8 rounded-lg border border-amber-200 flex items-center justify-center text-amber-600 hover:bg-amber-100 transition-colors"
                    >
                      <FaDownload className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SCard>
      )}

      {/* Donation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setErrors({}); setAmount(""); setCustomAmount(""); }}
        title={`Donate to — ${selectedCause?.name}`}
      >
        <div className="space-y-4">
          {/* Amount presets */}
          <div>
            <p className="text-sm font-medium text-amber-800 mb-2">Select Amount</p>
            <div className="grid grid-cols-3 gap-2">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(String(a)); setCustomAmount(""); }}
                  className={`py-2 rounded-xl text-sm font-semibold border transition-all ${amount === String(a) && !customAmount ? "bg-amber-500 text-white border-amber-500" : "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400"}`}
                >
                  ₹{a.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
          </div>

          <FormInput
            label="Custom Amount (₹)"
            id="custom-amount"
            type="number"
            placeholder="Enter any amount"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
          />

          <FormInput label="Full Name" id="don-name" placeholder="Your name" required {...f("name")} />
          <FormInput label="Email" id="don-email" type="email" placeholder="For receipt" required {...f("email")} />
          <FormInput label="Phone" id="don-phone" type="tel" placeholder="+91 XXXXX XXXXX" {...f("phone")} />
          <FormSelect label="Payment Mode" id="don-mode" {...f("mode")}>
            <option>UPI</option>
            <option>Net Banking</option>
            <option>Debit Card</option>
            <option>Credit Card</option>
          </FormSelect>

          {finalAmount > 0 && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex justify-between text-sm">
                <span className="text-amber-700">Donation Amount</span>
                <span className="font-bold text-amber-900">₹{finalAmount.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><FaInfoCircle /> Eligible for 80G income tax exemption.</p>
            </div>
          )}

          <PrimaryBtn onClick={handleDonate} className="w-full">
            <FaHeart /> Donate ₹{finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "—"}
          </PrimaryBtn>
        </div>
      </Modal>

      {toast && <SuccessToast message="Thank you for your generous donation! Receipt sent to your email." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default DonationsPage;
