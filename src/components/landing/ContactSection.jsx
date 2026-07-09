import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-maroon-800 to-maroon-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-gold-400 font-semibold text-sm tracking-wide uppercase">Get in Touch</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">Contact Us</h2>
            <p className="text-white/70 leading-relaxed mb-10 max-w-md">
              Have a question about employment, careers, or general inquiries? Reach out to our
              administrative office — we'd love to hear from you.
            </p>

            <div className="space-y-6">
              {[
                { icon: FaMapMarkerAlt, label: "Address", value: "Vrindavan Chandrodaya Mandir, Vrindavan, Uttar Pradesh, India" },
                { icon: FaPhoneAlt, label: "Phone", value: "+91 98765 43210" },
                { icon: FaEnvelope, label: "Email", value: "hr@vcm.org.in" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">{label}</p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10 space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-saffron-500 text-maroon-900 font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              {sent ? "Message Sent!" : (<>Send Message <FaPaperPlane className="text-sm" /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;