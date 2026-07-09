import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPlay, FaUsers, FaBuilding, FaCalendarCheck } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-maroon-800 via-maroon-700 to-saffron-700 overflow-hidden pt-24"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,white,transparent_35%)]"></div>
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-saffron-400/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-16">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-gold-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/10">
            🙏 Seva Portal for VCM Employees
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Empowering the <span className="text-gold-400">Divine Mission</span> Through Unified Service
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
            The official employee portal of Vrindavan Chandrodaya Mandir — connecting employees,
            department admins and leadership on one platform to manage operations, communication
            and collaboration seamlessly.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/login")}
              className="group flex items-center gap-2 bg-white text-maroon-700 font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Employee Login
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
  href="#about"
  className="flex items-center gap-2 bg-white/10 backdrop-blur text-white font-semibold px-7 py-3.5 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
>
  <FaPlay className="text-xs" />
  Explore VCM
</a>
          </div>

          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { icon: FaUsers, num: "700+", label: "Employees" },
              { icon: FaBuilding, num: "12", label: "Departments" },
              { icon: FaCalendarCheck, num: "50+", label: "Annual Events" },
            ].map(({ icon: Icon, num, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="text-gold-400" />
                </div>
                <div>
                  <p className="text-white font-display font-bold text-xl leading-tight">{num}</p>
                  <p className="text-white/60 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1609950547346-a4f431435b2b?w=800&q=80"
              alt="Vrindavan Chandrodaya Mandir"
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 via-transparent to-transparent"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 w-56 animate-slide-up">
            <p className="text-xs text-slate-500 mb-1">Currently Active</p>
            <p className="font-display font-bold text-slate-800 text-lg">213 Employees Online</p>
            <div className="flex -space-x-2 mt-3">
              {[47, 12, 32, 51, 44].map((n) => (
                <img
                  key={n}
                  src={`https://i.pravatar.cc/150?img=${n}`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  alt="employee"
                />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-saffron-500 flex items-center justify-center text-[10px] text-white font-semibold">
                +208
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;