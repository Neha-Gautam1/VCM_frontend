import { FaBars } from "react-icons/fa";
import SearchBox from "../common/SearchBox";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";

const TopNavbar = ({ onMenuClick, pageTitle, profilePath, settingsPath }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 flex-shrink-0">
          <FaBars />
        </button>
        <h1 className="font-display font-bold text-lg text-slate-800 truncate hidden sm:block">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3 flex-1 justify-end">
        <SearchBox value="" onChange={() => {}} placeholder="Search..." className="hidden md:block w-64" />
        <NotificationBell />
        <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
        <ProfileMenu profilePath={profilePath} settingsPath={settingsPath} />
      </div>
    </header>
  );
};

export default TopNavbar;