import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { FaCalendarAlt } from "react-icons/fa";
import { departmentMenuItems } from "./DepartmentDashboard";

const DeptEvents = () => {
  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Events" profilePath="/department/dashboard">
      <Card>
        <EmptyState icon={FaCalendarAlt} message="Department Events Module" subMessage="Placeholder screen — to be built by the assigned intern." />
      </Card>
    </DashboardLayout>
  );
};

export default DeptEvents;