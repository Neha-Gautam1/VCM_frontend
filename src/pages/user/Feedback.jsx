import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, CardHeader, StatusBadge,
  FormInput, FormSelect, FormTextarea
} from "../../components/user/ui/UserUI";
import { supportTickets, faqItems } from "./data/mockData";
import { FaPlus, FaChevronDown, FaChevronUp, FaHeadset, FaCommentDots, FaEnvelope, FaPhone } from "react-icons/fa";

const Support = () => {
  const [tab, setTab] = useState("faq");
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ subject: "", category: "Booking", priority: "Medium", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
    error: errors[key],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.subject.trim()) errs.subject = "Enter a subject";
    if (!form.message.trim()) errs.message = "Describe your issue";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setForm({ subject: "", category: "Booking", priority: "Medium", message: "" });
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <UserLayout pageTitle="Support">
      <PageHeader
        title="Help & Support"
        subtitle="Get help with bookings, services, or technical issues"
        badge="Customer Care"
      />

      {/* Contact options */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { icon: FaCommentDots, label: "Live Chat", desc: "Available 9AM – 6PM", color: "emerald" },
          { icon: FaEnvelope, label: "Email Us", desc: "support@vcm.org", color: "amber" },
          { icon: FaPhone, label: "Call Us", desc: "0565-123456", color: "sky" },
        ].map((c) => (
          <SCard key={c.label} className="p-4 flex items-center gap-3 cursor-pointer hover:border-amber-300">
            <div className={`w-10 h-10 rounded-xl bg-${c.color}-100 flex items-center justify-center flex-shrink-0`}>
              <c.icon className={`text-${c.color}-600 text-lg`} />
            </div>
            <div>
              <p className="font-semibold text-amber-900 text-sm">{c.label}</p>
              <p className="text-xs text-amber-600/70">{c.desc}</p>
            </div>
          </SCard>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {["faq", "ticket", "myTickets"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${tab === t ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>
            {t === "faq" ? "FAQs" : t === "ticket" ? "New Ticket" : "My Tickets"}
          </button>
        ))}
      </div>

      {tab === "faq" && (
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <SCard key={i} className="overflow-hidden" hover={false}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <p className="font-semibold text-amber-900 text-sm pr-4">{faq.q}</p>
                {openFaq === i ? <FaChevronUp className="text-amber-500 flex-shrink-0" /> : <FaChevronDown className="text-amber-400 flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 pt-0">
                  <div className="border-t border-amber-50 pt-4">
                    <p className="text-sm text-amber-700/80 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </SCard>
          ))}
        </div>
      )}

      {tab === "ticket" && (
        <SCard className="p-6 max-w-2xl">
          <CardHeader title="Raise a Support Ticket" subtitle="Our team will respond within 24 hours" />
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <FormInput label="Subject" id="ticket-subject" placeholder="Brief description of your issue" required {...f("subject")} />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormSelect label="Category" id="ticket-category" {...f("category")}>
                <option>Booking</option>
                <option>Payment</option>
                <option>Technical</option>
                <option>Accommodation</option>
                <option>Events</option>
                <option>Other</option>
              </FormSelect>
              <FormSelect label="Priority" id="ticket-priority" {...f("priority")}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </FormSelect>
            </div>
            <FormTextarea
              label="Message"
              id="ticket-message"
              placeholder="Describe your issue in detail..."
              required
              rows={5}
              {...f("message")}
            />
            <PrimaryBtn type="submit">
              <FaHeadset /> Submit Ticket
            </PrimaryBtn>
          </form>
        </SCard>
      )}

      {tab === "myTickets" && (
        <div className="space-y-4">
          {supportTickets.length === 0 ? (
            <div className="text-center py-16 text-amber-500/60">No support tickets yet.</div>
          ) : supportTickets.map((t) => (
            <SCard key={t.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-amber-500">{t.id}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${t.priority === "High" ? "bg-red-50 text-red-600 border-red-200" : "bg-amber-50 text-amber-600 border-amber-200"}`}>
                      {t.priority}
                    </span>
                  </div>
                  <p className="font-semibold text-amber-900">{t.subject}</p>
                  <p className="text-xs text-amber-600/70 mt-1">
                    Category: {t.category} · Created: {new Date(t.date).toLocaleDateString("en-IN")} · Updated: {new Date(t.lastUpdate).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <StatusBadge status={t.status} />
              </div>
            </SCard>
          ))}
        </div>
      )}

      {toast && <SuccessToast message="Support ticket raised! Our team will respond within 24 hours." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default Support;
