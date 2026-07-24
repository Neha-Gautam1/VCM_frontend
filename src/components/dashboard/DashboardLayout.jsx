import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const DashboardLayout = ({ menuItems, pageTitle, breadcrumbs, profilePath, settingsPath, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        menuItems={menuItems}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className={`transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        <TopNavbar
          onMenuClick={() => setMobileOpen(true)}
          pageTitle={pageTitle}
          breadcrumbs={breadcrumbs}
          profilePath={profilePath}
          settingsPath={settingsPath}
        />
        <main className="p-4 sm:p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;