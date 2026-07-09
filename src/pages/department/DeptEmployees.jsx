import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { FaUsers } from "react-icons/fa";
import { departmentMenuItems } from "./DepartmentDashboard";

const DeptEmployees = () => {
  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Employees" profilePath="/department/dashboard">
      <Card>
        <EmptyState icon={FaUsers} message="Department Employees Module" subMessage="Placeholder screen — full employee management UI to be built." />
      </Card>
    </DashboardLayout>
  );
};

export default DeptEmployees;