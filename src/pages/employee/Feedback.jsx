import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import { employeeMenuItems } from "./EmlpoyeeDashboard";

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <DashboardLayout menuItems={employeeMenuItems} pageTitle="Feedback" profilePath="/employee/profile">
      <Card title="Share Your Feedback">
        {submitted ? (
          <p className="text-emerald-600 font-medium text-sm">Thank you! Your feedback has been submitted.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400">
              <option>General</option>
              <option>Facilities</option>
              <option>Management</option>
              <option>IT Support</option>
            </select>
            <textarea rows={5} placeholder="Write your feedback..." required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-saffron-400" />
            <button type="submit" className="bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity">
              Submit Feedback
            </button>
          </form>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default Feedback;