import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const DashboardLayout = ({ menuItems, pageTitle, profilePath, settingsPath, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar menuItems={menuItems} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="lg:pl-72">
        <TopNavbar
          onMenuClick={() => setMobileOpen(true)}
          pageTitle={pageTitle}
          profilePath={profilePath}
          settingsPath={settingsPath}
        />
        <main className="p-4 sm:p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;