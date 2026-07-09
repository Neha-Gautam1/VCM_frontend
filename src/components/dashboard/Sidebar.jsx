import { NavLink, useNavigate } from "react-router-dom";
import { FaOm, FaSignOutAlt, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ menuItems, mobileOpen, setMobileOpen, collapsed, setCollapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)}></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-slate-900 z-50 flex flex-col transition-all duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "w-20" : "w-72"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-saffron-500 flex items-center justify-center flex-shrink-0">
              <FaOm className="text-white" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="font-display font-bold text-white text-sm leading-tight truncate">VCM Portal</p>
                <p className="text-white/40 text-[10px]">Employee System</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex w-7 h-7 items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              {collapsed ? <FaChevronRight className="text-xs" /> : <FaChevronLeft className="text-xs" />}
            </button>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/60 hover:text-white">
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-saffron-500 to-maroon-600 text-white shadow-lg"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    } ${collapsed ? "justify-center" : ""}`
                  }
                >
                  <item.icon className="text-base flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10 flex-shrink-0">
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-colors ${collapsed ? "justify-center" : ""}`}
          >
            <FaSignOutAlt className="flex-shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;