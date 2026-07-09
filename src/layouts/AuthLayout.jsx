import { Link } from "react-router-dom";
import { FaOm } from "react-icons/fa";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-saffron-600 via-saffron-500 to-maroon-700 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]"></div>
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-white/10 rounded-full"></div>

        <div className="relative z-10 text-white max-w-md animate-fade-in">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <FaOm className="text-2xl text-gold-400" />
            </div>
            <div>
              <p className="font-display font-bold text-lg leading-tight">VCM Employee Portal</p>
              <p className="text-xs text-white/70">Vrindavan Chandrodaya Mandir</p>
            </div>
          </Link>
          <h2 className="font-display text-3xl font-bold mb-4 leading-snug">
            Serving the divine mission, together.
          </h2>
          <p className="text-white/80 leading-relaxed">
            A unified workspace for employees, department admins and leadership to
            collaborate, manage operations and stay connected with the temple's growth.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              ["700+", "Employees"],
              ["12", "Departments"],
              ["70", "Acres Campus"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold font-display">{num}</p>
                <p className="text-xs text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-saffron-500 flex items-center justify-center">
              <FaOm className="text-xl text-white" />
            </div>
            <p className="font-display font-bold text-lg text-slate-800">VCM Portal</p>
          </div>

          <h1 className="font-display text-2xl font-bold text-slate-800 mb-1">{title}</h1>
          <p className="text-slate-500 text-sm mb-8">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;