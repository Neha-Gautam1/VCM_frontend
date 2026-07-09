import { useState } from "react";
import { FaFolderOpen, FaTools, FaLink, FaFileAlt, FaWpforms, FaExternalLinkAlt, FaDownload, FaStar, FaRegStar, FaSearch } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";

const initialResources = [
  { id: 1, name: "Jira Issue Tracker", description: "Track bugs, tasks, and sprint progress for the development team", category: "tools", icon: "🛠", link: "#", type: "link", starred: true },
  { id: 2, name: "Confluence Wiki", description: "Internal knowledge base for documentation and team notes", category: "tools", icon: "📚", link: "#", type: "link", starred: false },
  { id: 3, name: "Grafana Dashboard", description: "Server monitoring and performance metrics visualization", category: "tools", icon: "📊", link: "#", type: "link", starred: true },
  { id: 4, name: "VCM IT Ticketing", description: "Internal helpdesk and IT support request management", category: "tools", icon: "🎫", link: "#", type: "link", starred: false },
  { id: 5, name: "VCM Employee Portal", description: "Main employee portal for all official HR processes", category: "links", icon: "🌐", link: "#", type: "link", starred: true },
  { id: 6, name: "HR Leave Portal", description: "Apply for leaves, view balance, and track approvals", category: "links", icon: "📅", link: "#", type: "link", starred: false },
  { id: 7, name: "IT Asset Management", description: "Track department hardware and software assets", category: "links", icon: "💻", link: "#", type: "link", starred: false },
  { id: 8, name: "VPN Access Portal", description: "Remote access VPN for working outside campus", category: "links", icon: "🔐", link: "#", type: "link", starred: true },
  { id: 9, name: "Project Plan Template", description: "Standard project planning template with milestones and timelines", category: "templates", icon: "📋", link: "#", type: "download", starred: false },
  { id: 10, name: "Meeting Minutes Template", description: "Record meeting decisions, action items, and owners", category: "templates", icon: "📝", link: "#", type: "download", starred: true },
  { id: 11, name: "Technical Spec Document", description: "Template for technical specification and system architecture", category: "templates", icon: "📐", link: "#", type: "download", starred: false },
  { id: 12, name: "Code Review Checklist", description: "Comprehensive checklist for peer code reviews", category: "templates", icon: "✅", link: "#", type: "download", starred: false },
  { id: 13, name: "IT Access Request Form", description: "Request access to systems, applications, or servers", category: "forms", icon: "🔑", link: "#", type: "download", starred: true },
  { id: 14, name: "Hardware Request Form", description: "Request new equipment or hardware replacement", category: "forms", icon: "🖥", link: "#", type: "download", starred: false },
  { id: 15, name: "Software License Request", description: "Request new software licenses for development tools", category: "forms", icon: "📄", link: "#", type: "download", starred: false },
  { id: 16, name: "Incident Report Form", description: "Report IT incidents and security breaches promptly", category: "forms", icon: "🚨", link: "#", type: "download", starred: true },
];

const categoryConfig = [
  { id: "all", label: "All Resources", icon: FaFolderOpen },
  { id: "tools", label: "Internal Tools", icon: FaTools },
  { id: "links", label: "Important Links", icon: FaLink },
  { id: "templates", label: "Templates", icon: FaFileAlt },
  { id: "forms", label: "Forms", icon: FaWpforms },
];

const DeptResources = () => {
  const [resources, setResources] = useState(initialResources);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showStarred, setShowStarred] = useState(false);

  const toggleStar = id => setResources(prev => prev.map(r => r.id === id ? { ...r, starred: !r.starred } : r));

  const filtered = resources.filter(r =>
    (activeCategory === "all" || r.category === activeCategory) &&
    (!showStarred || r.starred) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Resources" breadcrumbs={["Department Admin", "Resources"]}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800">Department Resources</h2>
          <p className="text-slate-500 text-sm mt-1">Quick access to tools, links, templates, and forms</p>
        </div>
        <button
          onClick={() => setShowStarred(!showStarred)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${showStarred ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
        >
          <FaStar className="text-amber-400" /> Starred Only
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {categoryConfig.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === cat.id ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >
            <cat.icon className="text-xs" />
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative mb-5">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search resources..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(resource => (
          <div key={resource.id} className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-all p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-saffron-50 to-maroon-50 flex items-center justify-center text-2xl">{resource.icon}</div>
              <button onClick={() => toggleStar(resource.id)} className="hover:scale-110 transition-transform">
                {resource.starred ? <FaStar className="text-amber-400" /> : <FaRegStar className="text-slate-300 hover:text-amber-400 transition-colors" />}
              </button>
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-800 text-sm">{resource.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{resource.description}</p>
            </div>
            <div className="mt-auto pt-3 border-t border-slate-100">
              <a
                href={resource.link}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-maroon-600 text-white text-xs font-semibold hover:opacity-90 hover:shadow-md transition-all"
              >
                {resource.type === "link" ? <><FaExternalLinkAlt /> Open Link</> : <><FaDownload /> Download</>}
              </a>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <FaFolderOpen className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No resources found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DeptResources;
