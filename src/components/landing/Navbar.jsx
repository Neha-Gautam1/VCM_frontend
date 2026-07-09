import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaOm, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Departments", href: "#departments" },
  { label: "Gallery", href: "#gallery" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-soft py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${scrolled ? "bg-saffron-500" : "bg-white/20 backdrop-blur"}`}>
            <FaOm className={`text-lg ${scrolled ? "text-white" : "text-gold-400"}`} />
          </div>
          <div>
            <p className={`font-display font-bold text-sm leading-tight ${scrolled ? "text-slate-800" : "text-white"}`}>
              VCM Employee Portal
            </p>
            <p className={`text-[10px] leading-tight ${scrolled ? "text-slate-500" : "text-white/70"}`}>
              Vrindavan Chandrodaya Mandir
            </p>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
         {navLinks.map((link) => (
  <a
    key={link.label}
    href={link.href}
    className={`text-sm font-medium transition-colors hover:text-saffron-500 ${
      scrolled ? "text-slate-700" : "text-white/90"
    }`}
  >
    {link.label}
  </a>
))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className={`text-sm font-semibold px-5 py-2 rounded-lg transition-colors ${
              scrolled ? "text-saffron-600 hover:bg-saffron-50" : "text-white hover:bg-white/10"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow-soft hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden text-xl ${scrolled ? "text-slate-700" : "text-white"}`}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-lg mt-3 mx-4 rounded-2xl p-5 animate-slide-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
  <a
    key={link.label}
    href={link.href}
    onClick={() => setMobileOpen(false)}
    className="text-sm font-medium text-slate-700 hover:text-saffron-500"
  >
    {link.label}
  </a>
))}
            <hr className="border-slate-100" />
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-saffron-600 text-left"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-gradient-to-r from-saffron-600 to-maroon-600 text-white text-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;