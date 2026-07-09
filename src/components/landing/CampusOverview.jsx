import { FaMapMarkedAlt, FaBuilding, FaBed, FaTree } from "react-icons/fa";

const campusStats = [
  { icon: FaMapMarkedAlt, num: "70", label: "Acres of Campus" },
  { icon: FaBuilding, num: "8", label: "Major Buildings" },
  { icon: FaBed, num: "3", label: "Guest Hostels" },
  { icon: FaTree, num: "12", label: "Landscaped Gardens" },
];

const CampusOverview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">Our Campus</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3 mb-6 leading-tight">
              A Sprawling Campus Built for Devotion and Community
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Spread across 70 acres, the VCM campus houses the main temple structure, administrative
              buildings, guest accommodations, gardens, and dedicated facilities for employees and
              visiting devotees alike.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {campusStats.map(({ icon: Icon, num, label }) => (
                <div key={label} className="flex items-center gap-4 bg-slate-50 rounded-2xl p-5">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-card flex items-center justify-center flex-shrink-0">
                    <Icon className="text-saffron-600" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-slate-800 text-lg leading-tight">{num}</p>
                    <p className="text-slate-500 text-xs">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80" className="rounded-2xl h-52 w-full object-cover" alt="Campus" />
            <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80" className="rounded-2xl h-52 w-full object-cover mt-8" alt="Campus" />
            <img src="https://images.unsplash.com/photo-1590766940554-153a5c1a3f37?w=500&q=80" className="rounded-2xl h-52 w-full object-cover" alt="Campus" />
            <img src="https://images.unsplash.com/photo-1609950547346-a4f431435b2b?w=500&q=80" className="rounded-2xl h-52 w-full object-cover mt-8" alt="Campus" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusOverview;