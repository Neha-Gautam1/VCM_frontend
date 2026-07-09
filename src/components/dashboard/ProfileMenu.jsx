import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const ProfileMenu = ({ profilePath, settingsPath }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-colors">
        <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-lg object-cover" />
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.name}</p>
          <p className="text-xs text-slate-400 leading-tight">{user?.role}</p>
        </div>
        <FaChevronDown className="text-xs text-slate-400 hidden sm:block" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-slide-up z-50">
          <div className="px-4 py-3.5 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
          <div className="py-2">
            <button onClick={() => { navigate(profilePath); setOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
              <FaUserCircle className="text-slate-400" /> My Profile
            </button>
            {settingsPath && (
              <button onClick={() => { navigate(settingsPath); setOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                <FaCog className="text-slate-400" /> Settings
              </button>
            )}
          </div>
          <div className="border-t border-slate-100 py-2">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;