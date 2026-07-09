import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { FaLightbulb } from "react-icons/fa";
import { departmentMenuItems } from "./DepartmentDashboard";

const DeptSuggestions = () => {
  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Suggestions" profilePath="/department/dashboard">
      <Card>
        <EmptyState icon={FaLightbulb} message="Department Suggestions Module" subMessage="Placeholder screen — to be built by the assigned intern." />
      </Card>
    </DashboardLayout>
  );
};

export default DeptSuggestions;