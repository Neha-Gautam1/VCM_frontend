import { useState,useEffect } from "react";
import { FaCheck, FaTimes, FaSave } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { fetchPermissionMatrix, togglePermissionRequest } from "../../api/permissionsApi";
import { fetchRoles } from "../../api/rolesApi";

// Static list — matches the modules seeded in Part 5's seedPermissions.js
const permissionModules = [
  "User Management", "Department Management", "Role Management", "News & Announcements",
  "Gallery", "Spiritual Library", "Approvals", "Analytics", "System Configuration", "Audit Logs",
];

const actions = ["view", "create", "edit", "delete"];

const PermissionManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [matrix, setMatrix] = useState({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([fetchRoles(), fetchPermissionMatrix()])
      .then(([rolesRes, matrixRes]) => {
        setRoles(rolesRes.data);
        setMatrix(matrixRes.data);
        setSelectedRole(rolesRes.data[0]?.name || "");
      })
      .catch((err) => console.error("Failed to load permissions:", err))
      .finally(() => setLoading(false));
  }, []);

  const togglePermission = async (moduleName, action) => {
    if (selectedRole === "Super Admin") return; // Super Admin always has full access

    const currentValue = matrix[selectedRole]?.[moduleName]?.[action] || false;
    const newValue = !currentValue;

    // Optimistic UI update
    setMatrix((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [moduleName]: { ...prev[selectedRole][moduleName], [action]: newValue },
      },
    }));

    try {
      await togglePermissionRequest(selectedRole, moduleName, action, newValue);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (err) {
      console.error("Failed to update permission:", err);
      // Roll back on failure
      setMatrix((prev) => ({
        ...prev,
        [selectedRole]: {
          ...prev[selectedRole],
          [moduleName]: { ...prev[selectedRole][moduleName], [action]: currentValue },
        },
      }));
    }
  };

  if (loading || !matrix[selectedRole]) {
  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Permission Management" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Permission Management"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Permission Management</h2>
          <p className="text-slate-500 text-sm mt-1">Assign granular module-level permissions per role.</p>
        </div>
       <span className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
  <FaSave className="text-xs" /> {saved ? "All changes saved automatically" : "Changes save instantly"}
</span>
      </div>

      {/* Role tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.name)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedRole === role.name ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow-soft" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {role.name}
          </button>
        ))}
      </div>

      <Card title={`Permission Matrix — ${selectedRole}`} noPadding>
        {selectedRole === "Super Admin" && (
          <div className="px-6 py-3 bg-saffron-50 text-saffron-700 text-xs font-medium border-b border-saffron-100">
            Super Admin has full unrestricted access to all modules — permissions cannot be modified.
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left font-semibold text-slate-500 px-6 py-3.5 uppercase text-xs tracking-wide">Module</th>
                {actions.map((action) => (
                  <th key={action} className="text-center font-semibold text-slate-500 px-4 py-3.5 uppercase text-xs tracking-wide">{action}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionModules.map((module) => (
                <tr key={module} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{module}</td>
                  {actions.map((action) => {
                    const enabled = matrix[selectedRole][module][action];
                    return (
                      <td key={action} className="px-4 py-4 text-center">
                        <button
                          onClick={() => togglePermission(module, action)}
                          disabled={selectedRole === "Super Admin"}
                          className={`w-8 h-8 rounded-lg inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed ${
                            enabled ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-red-50 text-red-500 hover:bg-red-100"
                          }`}
                        >
                          {enabled ? <FaCheck className="text-xs" /> : <FaTimes className="text-xs" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
  }
};

export default PermissionManagement;