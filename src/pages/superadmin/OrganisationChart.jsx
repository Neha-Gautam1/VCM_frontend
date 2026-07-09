import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaSitemap, FaExpand, FaCompress } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { orgChartData } from "../../data/mockOrgChart";

const roleColors = {
  President: "from-maroon-700 to-maroon-800",
  "Super Admin": "from-saffron-600 to-saffron-700",
  "Department Admin": "from-blue-500 to-blue-600",
  Employee: "from-emerald-500 to-emerald-600",
};

const TreeNode = ({ node, depth = 0, allExpanded }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = allExpanded === null ? expanded : allExpanded;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center">
        <div className={`flex items-center gap-3 bg-gradient-to-br ${roleColors[node.name] || "from-slate-500 to-slate-600"} text-white rounded-2xl px-5 py-3.5 shadow-lg min-w-[220px]`}>
          <img src={node.avatar} alt={node.person} className="w-11 h-11 rounded-xl object-cover border-2 border-white/30 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{node.person}</p>
            <p className="text-[11px] text-white/75 truncate">{node.title}</p>
            <span className="text-[10px] font-medium bg-white/20 px-2 py-0.5 rounded-full inline-block mt-1">{node.name}</span>
          </div>
          {hasChildren && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isOpen ? <FaChevronDown className="text-[10px]" /> : <FaChevronRight className="text-[10px]" />}
            </button>
          )}
        </div>
      </div>

      {hasChildren && isOpen && (
        <div className="relative pt-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-300"></div>
          <div className="flex gap-8 relative">
            {node.children.length > 1 && (
              <div
                className="absolute top-0 h-px bg-slate-300"
                style={{ left: "calc(110px)", right: "calc(110px)" }}
              ></div>
            )}
            {node.children.map((child) => (
              <div key={child.id} className="relative flex flex-col items-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-slate-300"></div>
                <TreeNode node={child} depth={depth + 1} allExpanded={allExpanded} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const OrganizationChart = () => {
  const [allExpanded, setAllExpanded] = useState(null);

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Organization Chart" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Organization Chart"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Organization Chart</h2>
          <p className="text-slate-500 text-sm mt-1">Visual hierarchy and reporting structure across VCM.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAllExpanded(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 font-medium px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
          >
            <FaExpand className="text-xs" /> Expand All
          </button>
          <button
            onClick={() => setAllExpanded(false)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 font-medium px-4 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
          >
            <FaCompress className="text-xs" /> Collapse All
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(roleColors).map(([role, gradient]) => (
          <div key={role} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${gradient}`}></span>
            <span className="text-xs text-slate-500 font-medium">{role}</span>
          </div>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-max flex justify-center py-6 px-6">
            <TreeNode node={orgChartData} allExpanded={allExpanded} />
          </div>
        </div>
      </Card>

      <div className="mt-6 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <FaSitemap className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          This chart reflects the current reporting structure based on active department heads. Changes made in
          Department Management and User Management will be reflected here in the full implementation.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default OrganizationChart;