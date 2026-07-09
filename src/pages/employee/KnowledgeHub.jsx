import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import { FaFileAlt, FaVideo, FaBook } from "react-icons/fa";
import { employeeMenuItems } from "./EmlpoyeeDashboard";

const resources = [
  { icon: FaFileAlt, title: "Employee Handbook 2026", type: "PDF" },
  { icon: FaVideo, title: "Onboarding Orientation", type: "Video" },
  { icon: FaBook, title: "Spiritual Practices Guide", type: "Article" },
];

const KnowledgeHub = () => {
  return (
    <DashboardLayout menuItems={employeeMenuItems} pageTitle="Knowledge Hub" profilePath="/employee/profile">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map(({ icon: Icon, title, type }) => (
          <Card key={title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-saffron-50 flex items-center justify-center mb-4">
              <Icon className="text-saffron-600 text-lg" />
            </div>
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-400 mt-1">{type}</p>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeHub;