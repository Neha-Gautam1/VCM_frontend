import { FaBars, FaChevronRight, FaHome } from "react-icons/fa";
import SearchBox from "../common/SearchBox";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../../hooks/useAuth";

const TopNavbar = ({ onMenuClick, pageTitle, breadcrumbs = [], profilePath, settingsPath }) => {
  const { user } = useAuth();
  const isDeptAdmin = user?.role === "Department Admin";

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <button onClick={onMenuClick} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 flex-shrink-0">
            <FaBars />
          </button>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-lg text-slate-800 truncate hidden sm:block">{pageTitle}</h1>
            {breadcrumbs.length > 0 && (
              <nav className="hidden sm:flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                <FaHome className="text-[10px]" />
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <FaChevronRight className="text-[8px]" />
                    <span className={i === breadcrumbs.length - 1 ? "text-saffron-600 font-medium" : ""}>{crumb}</span>
                  </span>
                ))}
              </nav>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-end">
          <SearchBox value="" onChange={() => {}} placeholder="Search..." className="hidden md:block w-64" />
          {isDeptAdmin && (
            <div className="hidden lg:flex items-center gap-2 bg-saffron-50 border border-saffron-200 rounded-xl px-3 py-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-600 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">IT</span>
              </div>
              <span className="text-xs font-semibold text-saffron-700">IT Department</span>
            </div>
          )}
          <NotificationBell />
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <ProfileMenu profilePath={profilePath} settingsPath={settingsPath} />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;