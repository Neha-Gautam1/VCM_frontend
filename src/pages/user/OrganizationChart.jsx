import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronRight, FaCompress, FaExpand, FaSitemap, FaUsers } from "react-icons/fa";
import UserLayout from "../../components/user/layout/UserLayout";
import { PageHeader, SCard } from "../../components/user/ui/UserUI";
import { orgChartData } from "../../data/mockOrgChart";

const ROLE_STYLES = {
  President: { accent: "from-rose-700 to-red-800", dot: "bg-rose-600" },
  "Super Admin": { accent: "from-orange-500 to-orange-700", dot: "bg-orange-500" },
  "Department Admin": { accent: "from-blue-500 to-indigo-700", dot: "bg-blue-500" },
  Employee: { accent: "from-emerald-500 to-teal-700", dot: "bg-emerald-500" },
};

const countPeople = (node) => 1 + (node.children || []).reduce((total, child) => total + countPeople(child), 0);
const countByRole = (node, role) => (node.name === role ? 1 : 0) + (node.children || []).reduce((total, child) => total + countByRole(child, role), 0);

const ChartNode = ({ node, expanded, setExpanded }) => {
  const hasChildren = node.children?.length > 0;
  const isOpen = expanded[node.id] ?? true;
  const style = ROLE_STYLES[node.name] || ROLE_STYLES.Employee;
  const toggle = () => setExpanded((current) => ({ ...current, [node.id]: !isOpen }));

  return <div className="flex flex-col items-center">
    <article className="group relative w-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`h-1.5 bg-gradient-to-r ${style.accent}`} />
      <div className="p-4"><div className="flex items-start gap-3"><img src={node.avatar} alt={node.person} className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-100" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">{node.person}</p><p className="mt-0.5 truncate text-xs text-slate-500">{node.title}</p><span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500"><i className={`h-2 w-2 rounded-full ${style.dot}`} />{node.name}</span></div>{hasChildren && <button onClick={toggle} aria-label={`${isOpen ? "Collapse" : "Expand"} ${node.person}'s team`} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">{isOpen ? <FaChevronDown className="text-xs" /> : <FaChevronRight className="text-xs" />}</button>}</div></div>
    </article>
    {hasChildren && isOpen && <div className="relative pt-9"><i className="absolute left-1/2 top-0 h-9 w-px -translate-x-1/2 bg-slate-300" /><div className="relative flex gap-8 px-4">{node.children.length > 1 && <i className="absolute left-[132px] right-[132px] top-0 h-px bg-slate-300" />}{node.children.map((child) => <div className="relative flex flex-col items-center" key={child.id}><i className="absolute -top-9 left-1/2 h-9 w-px -translate-x-1/2 bg-slate-300" /><ChartNode node={child} expanded={expanded} setExpanded={setExpanded} /></div>)}</div></div>}
  </div>;
};

const UserOrganizationChart = () => {
  const [expanded, setExpanded] = useState({});
  const totalPeople = useMemo(() => countPeople(orgChartData), []);
  const expandAll = () => setExpanded({ root: true, sa1: true, d1: true, d2: true, d3: true, d4: true });
  const collapseAll = () => setExpanded({ root: false, sa1: false, d1: false, d2: false, d3: false, d4: false });

  return <UserLayout pageTitle="Organization">
    <PageHeader title="Organization Chart" subtitle="Meet the people and teams that support the VCM community." badge="VCM Community" action={<div className="flex gap-2"><button onClick={expandAll} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"><FaExpand className="text-xs" /> Expand all</button><button onClick={collapseAll} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"><FaCompress className="text-xs" /> Collapse all</button></div>} />
    <div className="mb-6 grid gap-4 sm:grid-cols-3"><SCard className="p-5"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><FaSitemap /></span><div><p className="text-2xl font-bold text-slate-800">{totalPeople}</p><p className="text-sm text-slate-500">People in the hierarchy</p></div></div></SCard><SCard className="p-5"><p className="text-2xl font-bold text-slate-800">{countByRole(orgChartData, "Department Admin")}</p><p className="mt-1 text-sm text-slate-500">Department leaders</p></SCard><SCard className="p-5"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><FaUsers /></span><div><p className="text-2xl font-bold text-slate-800">{countByRole(orgChartData, "Employee")}</p><p className="text-sm text-slate-500">Team members</p></div></div></SCard></div>
    <SCard hover={false} className="overflow-hidden"><div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-100 px-6 py-4">{Object.entries(ROLE_STYLES).map(([role, style]) => <span key={role} className="flex items-center gap-2 text-xs font-medium text-slate-500"><i className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />{role}</span>)}</div><div className="overflow-x-auto bg-slate-50/70 p-7"><div className="min-w-max px-7 py-4"><ChartNode node={orgChartData} expanded={expanded} setExpanded={setExpanded} /></div></div></SCard>
    <div className="mt-5 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-800"><FaSitemap className="mt-1 shrink-0 text-blue-500" />This is a view-only directory for devotees. It shows the current VCM reporting structure and the people leading each active team.</div>
  </UserLayout>;
};

export default UserOrganizationChart;
