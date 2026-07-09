import {
  FaPray,
  FaBroom,
  FaChalkboardTeacher,
  FaUtensils,
} from "react-icons/fa";

const activities = [
  {
    icon: FaPray,
    title: "Daily Aarti Service",
    desc: "Employees coordinate and support daily temple rituals and aarti ceremonies.",
  },
  {
    icon: FaBroom,
    title: "Campus Seva",
    desc: "Volunteer-led cleanliness and upkeep drives across temple grounds.",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Spiritual Education",
    desc: "Regular workshops and training sessions on scripture and values.",
  },
  {
    icon: FaUtensils,
    title: "Prasadam Distribution",
    desc: "Daily coordination of meal preparation and distribution for visitors.",
  },
];

const EmployeeActivities = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">Life at VCM</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3">Employee Activities</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-7 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-saffron-100 to-maroon-100 flex items-center justify-center mb-5">
                <Icon className="text-maroon-600 text-2xl" />
              </div>
              <h3 className="font-display font-bold text-slate-800 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployeeActivities;