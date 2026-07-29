import { FaOm, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-saffron-500 flex items-center justify-center">
                <FaOm className="text-white" />
              </div>
              <p className="font-display font-bold text-white">VCM Portal</p>
            </div>
            <p className="text-sm leading-relaxed">
              The official employee portal of Vrindavan Chandrodaya Mandir — serving the mission with unity and devotion.
            </p>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2.5 text-sm">
              {["About", "Governance", "Departments", "Gallery", "Careers", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-saffron-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Portal Access</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/login" className="hover:text-saffron-400 transition-colors">Employee Login</a></li>
              <li><a href="/signup" className="hover:text-saffron-400 transition-colors">Create Account</a></li>
              <li><a href="#" className="hover:text-saffron-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4">Follow Us</p>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaYoutube, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-saffron-500 flex items-center justify-center transition-colors">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs">
          <p>© 2026 Vrindavan Chandrodaya Mandir. All rights reserved.</p>
          <p>Frontend Prototype — Employee Portal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
