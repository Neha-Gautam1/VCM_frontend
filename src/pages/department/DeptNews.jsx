import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { FaNewspaper } from "react-icons/fa";
import { departmentMenuItems } from "./DepartmentDashboard";

const DeptNews = () => {
  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Department News" profilePath="/department/dashboard">
      <Card>
        <EmptyState icon={FaNewspaper} message="Department News Module" subMessage="Placeholder screen — to be built by the assigned intern." />
      </Card>
    </DashboardLayout>
  );
};

export default DeptNews;