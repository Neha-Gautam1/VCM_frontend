import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { FaFileAlt } from "react-icons/fa";
import { departmentMenuItems } from "./DepartmentDashboard";

const DeptDocuments = () => {
  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Documents" profilePath="/department/dashboard">
      <Card>
        <EmptyState icon={FaFileAlt} message="Department Documents Module" subMessage="Placeholder screen — file repository UI to be built." />
      </Card>
    </DashboardLayout>
  );git 
};

export default DeptDocuments;