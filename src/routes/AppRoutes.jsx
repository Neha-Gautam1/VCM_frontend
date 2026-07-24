import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../utils/contants";

import LandingPage from "../pages/landing/LandingPage";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import EmployeeDashboard from "../pages/employee/EmlpoyeeDashboard";
import MyProfile from "../pages/employee/MyProfile";
import EmpNotifications from "../pages/employee/Notifications";
import KnowledgeHub from "../pages/employee/KnowledgeHub";
import EmployeeCalendar from "../pages/employee/EmployeeCalendar";
import Feedback from "../pages/employee/Feedback";

import DepartmentDashboard from "../pages/department/DepartmentDashboard";
import DeptEmployees from "../pages/department/DeptEmployees";
import DeptAnnouncements from "../pages/department/DeptAnnouncements";
import DeptNews from "../pages/department/DeptNews";
import DeptDocuments from "../pages/department/DeptDocuments";
import DeptEvents from "../pages/department/DeptEvents";
import DeptSuggestions from "../pages/department/DeptSuggestions";
import DeptReports from "../pages/department/DeptReports";
import DeptTeamOverview from "../pages/department/DeptTeamOverview";
import DeptStatistics from "../pages/department/DeptStatistics";
import DeptTraining from "../pages/department/DeptTraining";
import DeptResources from "../pages/department/DeptResources";

import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import UserManagement from "../pages/superadmin/UserManagement";
import DepartmentManagement from "../pages/superadmin/DepartmentManagement";
import RoleManagement from "../pages/superadmin/RoleManagement";
import PermissionManagement from "../pages/superadmin/PermissionManagement";
import OrganizationChart from "../pages/superadmin/OrganisationChart";
import CampusManagement from "../pages/superadmin/CampusManagement";
import HomepageCMS from "../pages/superadmin/HomeCMS";
import NewsManagement from "../pages/superadmin/NewsManagement";
import AnnouncementManagement from "../pages/superadmin/AnnoucementsManagement";
import GalleryManagement from "../pages/superadmin/GalleryMangement";
import SpiritualLibraryAdmin from "../pages/superadmin/SpritualLibrary";
import Approvals from "../pages/superadmin/Approvals";
import Analytics from "../pages/superadmin/Analytics";
// import NotificationsAdmin from "../pages/superadmin/NotificationsAdmin";
import SystemConfiguration from "../pages/superadmin/SystemConfirguration";
import EmailTemplates from "../pages/superadmin/EmailTemplates";
import BackupRestore from "../pages/superadmin/BackupRestore";
import AuditLogs from "../pages/superadmin/AuditLogs";
import SettingsPage from "../pages/superadmin/SettingsPage";

// ── User Pages ───────────────────────────────────────────────────
import UserDashboard from "../pages/user/UserDashboard";
import UserProfile from "../pages/user/Profile";
import MyBookings from "../pages/user/MyBookings";
import DarshanPage from "../pages/user/Darshan";
import PujaPage from "../pages/user/Puja";
import ChadhavaPage from "../pages/user/Chadhava";
import DonationsPage from "../pages/user/Donations";
import AccommodationPage from "../pages/user/Accomodation";
import EventsPage from "../pages/user/Events";
import VolunteerPage from "../pages/user/Volunteer";
import SpiritualLibrary from "../pages/user/SpiritualLibrary";
import KnowledgeCentre from "../pages/user/KnowledgeCentre";
import TempleStore from "../pages/user/TempleStore";
import NewsPage from "../pages/user/News";
import NotificationsPage from "../pages/user/Notifications";
import SupportPage from "../pages/user/Feedback";
import SuggestionsPage from "../pages/user/Suggestions";
import SettingsUser from "../pages/user/Settings";

const UR = ({ children }) => (
  <ProtectedRoute allowedRoles={[ROLES.USER]}>{children}</ProtectedRoute>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Employee */}
      <Route path="/employee/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/employee/profile" element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}><MyProfile /></ProtectedRoute>} />
      <Route path="/employee/notifications" element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}><EmpNotifications /></ProtectedRoute>} />
      <Route path="/employee/knowledge-hub" element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}><KnowledgeHub /></ProtectedRoute>} />
      <Route path="/employee/calendar" element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}><EmployeeCalendar /></ProtectedRoute>} />
      <Route path="/employee/feedback" element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}><Feedback /></ProtectedRoute>} />

      {/* Department Admin */}
      <Route path="/department/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DepartmentDashboard /></ProtectedRoute>} />
      <Route path="/department/employees" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptEmployees /></ProtectedRoute>} />
      <Route path="/department/announcements" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptAnnouncements /></ProtectedRoute>} />
      <Route path="/department/news" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptNews /></ProtectedRoute>} />
      <Route path="/department/documents" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptDocuments /></ProtectedRoute>} />
      <Route path="/department/events" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptEvents /></ProtectedRoute>} />
      <Route path="/department/suggestions" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptSuggestions /></ProtectedRoute>} />
      <Route path="/department/reports" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptReports /></ProtectedRoute>} />
      <Route path="/department/team" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptTeamOverview /></ProtectedRoute>} />
      <Route path="/department/statistics" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptStatistics /></ProtectedRoute>} />
      <Route path="/department/training" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptTraining /></ProtectedRoute>} />
      <Route path="/department/resources" element={<ProtectedRoute allowedRoles={[ROLES.DEPARTMENT_ADMIN]}><DeptResources /></ProtectedRoute>} />

      {/* Super Admin */}
      <Route path="/superadmin/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/superadmin/users" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><UserManagement /></ProtectedRoute>} />
      <Route path="/superadmin/departments" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><DepartmentManagement /></ProtectedRoute>} />
      <Route path="/superadmin/roles" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><RoleManagement /></ProtectedRoute>} />
      <Route path="/superadmin/permissions" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><PermissionManagement /></ProtectedRoute>} />
      <Route path="/superadmin/org-chart" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><OrganizationChart /></ProtectedRoute>} />
      <Route path="/superadmin/campus" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><CampusManagement /></ProtectedRoute>} />
      <Route path="/superadmin/homepage-cms" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><HomepageCMS /></ProtectedRoute>} />
      <Route path="/superadmin/news" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><NewsManagement /></ProtectedRoute>} />
      <Route path="/superadmin/announcements" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><AnnouncementManagement /></ProtectedRoute>} />
      <Route path="/superadmin/gallery" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><GalleryManagement /></ProtectedRoute>} />
      <Route path="/superadmin/library" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><SpiritualLibraryAdmin /></ProtectedRoute>} />
      <Route path="/superadmin/approvals" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><Approvals /></ProtectedRoute>} />
      <Route path="/superadmin/analytics" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><Analytics /></ProtectedRoute>} />
      {/* <Route path="/superadmin/notifications" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><NotificationsAdmin /></ProtectedRoute>} /> */}
      <Route path="/superadmin/system-config" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><SystemConfiguration /></ProtectedRoute>} />
      <Route path="/superadmin/email-templates" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><EmailTemplates /></ProtectedRoute>} />
      <Route path="/superadmin/backup-restore" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><BackupRestore /></ProtectedRoute>} />
      <Route path="/superadmin/audit-logs" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><AuditLogs /></ProtectedRoute>} />
      <Route path="/superadmin/settings" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><SettingsPage /></ProtectedRoute>} />
      {/* <Route path="/superadmin/profile" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><ProfilePage /></ProtectedRoute>} /> */}

      {/* ── User Routes ────────────────────────────────────────────────── */}
      <Route path="/user/dashboard"     element={<UR><UserDashboard /></UR>} />
      <Route path="/user/profile"       element={<UR><UserProfile /></UR>} />
      <Route path="/user/bookings"      element={<UR><MyBookings /></UR>} />
      <Route path="/user/darshan"       element={<UR><DarshanPage /></UR>} />
      <Route path="/user/puja"          element={<UR><PujaPage /></UR>} />
      <Route path="/user/chadhava"      element={<UR><ChadhavaPage /></UR>} />
      <Route path="/user/donations"     element={<UR><DonationsPage /></UR>} />
      <Route path="/user/accommodation" element={<UR><AccommodationPage /></UR>} />
      <Route path="/user/events"        element={<UR><EventsPage /></UR>} />
      <Route path="/user/volunteer"     element={<UR><VolunteerPage /></UR>} />
      <Route path="/user/library"       element={<UR><SpiritualLibrary /></UR>} />
      <Route path="/user/knowledge"     element={<UR><KnowledgeCentre /></UR>} />
      <Route path="/user/store"         element={<UR><TempleStore /></UR>} />
      <Route path="/user/news"          element={<UR><NewsPage /></UR>} />
      <Route path="/user/notifications" element={<UR><NotificationsPage /></UR>} />
      <Route path="/user/support"       element={<UR><SupportPage /></UR>} />
      <Route path="/user/suggestions"   element={<UR><SuggestionsPage /></UR>} />
      <Route path="/user/settings"      element={<UR><SettingsUser /></UR>} />

      {/* Legacy user routes for backwards compatibility */}
      <Route path="/user/applications"  element={<UR><MyBookings /></UR>} />
      <Route path="/user/feedback"      element={<UR><SupportPage /></UR>} />

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRoutes;
