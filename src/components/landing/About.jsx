import { FaLandmark, FaHandsHelping, FaSeedling } from "react-icons/fa";

const highlights = [
  { icon: FaLandmark, title: "World's Tallest Temple", desc: "A 700-ft architectural marvel dedicated to Sri Krishna, blending tradition with modern engineering." },
  { icon: FaHandsHelping, title: "Community Seva", desc: "Thousands of devotees and employees engaged in daily service, education, and spiritual outreach." },
  { icon: FaSeedling, title: "Sustainable Campus", desc: "70-acre green campus with eco-friendly infrastructure, gardens, and dedicated visitor facilities." },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80"
              alt="About VCM"
              className="rounded-3xl shadow-xl w-full h-[420px] object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-saffron-500 to-maroon-600 text-white rounded-2xl shadow-xl p-6 w-48 hidden sm:block">
              <p className="font-display text-3xl font-bold">15+</p>
              <p className="text-white/80 text-sm mt-1">Years of Dedicated Seva</p>
            </div>
          </div>

          <div>
            <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">About VCM</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3 mb-6 leading-tight">
              A Sacred Institution, Powered by Dedicated People
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Vrindavan Chandrodaya Mandir is a landmark spiritual and cultural institution built to
              celebrate the life and teachings of Sri Krishna. Behind its grandeur stands a large,
              dedicated workforce — spanning construction, administration, hospitality, security and
              spiritual services — working together every day to bring this vision to life.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              This employee portal was built to unify that workforce on a single digital platform,
              streamlining communication, operations and collaboration across every department.
            </p>

            <div className="space-y-5">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-saffron-50 flex items-center justify-center flex-shrink-0 group-hover:bg-saffron-500 transition-colors">
                    <Icon className="text-saffron-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{title}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;