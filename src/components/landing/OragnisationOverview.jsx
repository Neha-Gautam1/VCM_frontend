import { FaSitemap, FaUsersCog, FaProjectDiagram, FaHandshake } from "react-icons/fa";

const orgFeatures = [
  { icon: FaSitemap, title: "Structured Hierarchy", desc: "Clear reporting lines from department admins to super admin leadership." },
  { icon: FaUsersCog, title: "Role-Based Access", desc: "Every employee, admin and leader has a tailored portal experience." },
  { icon: FaProjectDiagram, title: "Cross-Department Sync", desc: "Departments collaborate seamlessly on shared events and initiatives." },
  { icon: FaHandshake, title: "Unified Governance", desc: "Consistent policies, approvals and communication across the organization." },
];

const OrganizationOverview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">How We Operate</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3">
            Organization Overview
          </h2>
          <p className="text-slate-500 mt-4">
            A well-structured organization built on collaboration between employees, department
            admins, and central leadership.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {orgFeatures.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-slate-50 hover:bg-gradient-to-br hover:from-saffron-500 hover:to-maroon-600 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-card flex items-center justify-center mb-5">
                <Icon className="text-saffron-600 text-lg" />
              </div>
              <h3 className="font-display font-bold text-slate-800 group-hover:text-white mb-2 transition-colors">
                {title}
              </h3>
              <p className="text-slate-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationOverview;