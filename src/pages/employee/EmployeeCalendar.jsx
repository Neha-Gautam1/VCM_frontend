import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import { employeeMenuItems } from "./EmlpoyeeDashboard";

const EmployeeCalendar = () => {
  return (
    <DashboardLayout menuItems={employeeMenuItems} pageTitle="Calendar" profilePath="/employee/profile">
      <Card title="July 2026">
        <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400 mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <span key={d}>{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                day === 18 ? "bg-saffron-500 text-white font-semibold" : day === 27 ? "bg-maroon-100 text-maroon-700 font-semibold" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default EmployeeCalendar;