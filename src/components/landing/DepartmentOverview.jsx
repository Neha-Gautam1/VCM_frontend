import { FaArrowRight } from "react-icons/fa";
import { mockDepartments } from "../../data/mockDeparments";

const DepartmentOverview = () => {
  return (
    <section id="departments" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">Our Teams</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3">
              Department Overview
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm">
            Seven core departments working in harmony to bring the temple's vision to life every day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDepartments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl p-7 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-5">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${dept.color}`}>
                  {dept.employeeCount} employees
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2">{dept.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{dept.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <img src={`https://i.pravatar.cc/100?u=${dept.head}`} className="w-7 h-7 rounded-full object-cover" alt={dept.head} />
                  <span className="text-xs text-slate-500">{dept.head}</span>
                </div>
                <FaArrowRight className="text-saffron-500 text-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentOverview;