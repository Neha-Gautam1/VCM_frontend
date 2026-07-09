import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { FaChartBar } from "react-icons/fa";
import { departmentMenuItems } from "./DepartmentDashboard";

const DeptReports = () => {
  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Reports" profilePath="/department/dashboard">
      <Card>
        <EmptyState icon={FaChartBar} message="Department Reports Module" subMessage="Placeholder screen — to be built by the assigned intern." />
      </Card>
    </DashboardLayout>
  );
};

export default DeptReports;