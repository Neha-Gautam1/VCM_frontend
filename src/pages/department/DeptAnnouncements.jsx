import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import { FaBullhorn } from "react-icons/fa";
import { departmentMenuItems } from "./DepartmentDashboard";

const DeptAnnouncements = () => {
  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Announcements" profilePath="/department/dashboard">
      <Card>
        <EmptyState icon={FaBullhorn} message="Department Announcements Module" subMessage="Placeholder screen — CRUD UI to be built by the assigned intern." />
      </Card>
    </DashboardLayout>
  );
};

export default DeptAnnouncements;