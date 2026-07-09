import { FaEye, FaBullseye } from "react-icons/fa";

const VisionMission = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">Our Purpose</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3">
            Vision & Mission
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-10 shadow-card hover:shadow-lg transition-shadow border border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center mb-6">
              <FaEye className="text-white text-xl" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-800 mb-3">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To establish Vrindavan Chandrodaya Mandir as a global center of spiritual awakening,
              cultural preservation and devotional service — inspiring millions through the eternal
              teachings of Sri Krishna consciousness.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-card hover:shadow-lg transition-shadow border border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon-600 to-maroon-700 flex items-center justify-center mb-6">
              <FaBullseye className="text-white text-xl" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-800 mb-3">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To build and nurture a dedicated community of employees and volunteers who work with
              integrity, compassion and excellence — supported by modern systems and processes that
              empower every individual's contribution to this sacred mission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;