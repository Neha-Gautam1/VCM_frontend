import { useState } from "react";
import { FaUsers, FaSearch, FaEnvelope, FaPhone } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { departmentMenuItems } from "./DepartmentDashboard";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";

const teamMembers = [
  { id: 1, name: "Arjun Mehta", designation: "Senior Software Engineer", email: "arjun.mehta@vcm.org.in", phone: "+91 98765 43210", status: "Active", avatar: "https://i.pravatar.cc/150?img=11", joinDate: "2022-03-15", experience: "4 yrs", skills: ["React", "Node.js", "Python"] },
  { id: 2, name: "Priya Sharma", designation: "System Administrator", email: "priya.sharma@vcm.org.in", phone: "+91 98123 45678", status: "Active", avatar: "https://i.pravatar.cc/150?img=5", joinDate: "2021-07-01", experience: "5 yrs", skills: ["Linux", "AWS", "Docker"] },
  { id: 3, name: "Rahul Gupta", designation: "Network Engineer", email: "rahul.gupta@vcm.org.in", phone: "+91 97654 32109", status: "Active", avatar: "https://i.pravatar.cc/150?img=12", joinDate: "2023-01-10", experience: "3 yrs", skills: ["Cisco", "Firewalls", "VPN"] },
  { id: 4, name: "Ananya Verma", designation: "UI/UX Designer", email: "ananya.verma@vcm.org.in", phone: "+91 96543 21098", status: "Active", avatar: "https://i.pravatar.cc/150?img=47", joinDate: "2023-06-01", experience: "2 yrs", skills: ["Figma", "CSS", "Tailwind"] },
  { id: 5, name: "Kiran Patel", designation: "Database Administrator", email: "kiran.patel@vcm.org.in", phone: "+91 95432 10987", status: "On Leave", avatar: "https://i.pravatar.cc/150?img=15", joinDate: "2020-11-20", experience: "6 yrs", skills: ["MySQL", "PostgreSQL", "MongoDB"] },
  { id: 6, name: "Suresh Nair", designation: "DevOps Engineer", email: "suresh.nair@vcm.org.in", phone: "+91 94321 09876", status: "Active", avatar: "https://i.pravatar.cc/150?img=17", joinDate: "2022-09-05", experience: "3 yrs", skills: ["Kubernetes", "Jenkins", "Terraform"] },
  { id: 7, name: "Meera Iyer", designation: "QA Engineer", email: "meera.iyer@vcm.org.in", phone: "+91 93210 98765", status: "Active", avatar: "https://i.pravatar.cc/150?img=48", joinDate: "2023-03-20", experience: "2 yrs", skills: ["Selenium", "Jest", "Postman"] },
  { id: 8, name: "Vikram Singh", designation: "Cloud Architect", email: "vikram.singh@vcm.org.in", phone: "+91 92109 87654", status: "Active", avatar: "https://i.pravatar.cc/150?img=20", joinDate: "2021-02-14", experience: "5 yrs", skills: ["AWS", "Azure", "GCP"] },
  { id: 9, name: "Kavitha Reddy", designation: "IT Security Analyst", email: "kavitha.reddy@vcm.org.in", phone: "+91 91098 76543", status: "Active", avatar: "https://i.pravatar.cc/150?img=49", joinDate: "2022-05-30", experience: "4 yrs", skills: ["SIEM", "Pen Testing", "ISO 27001"] },
  { id: 10, name: "Aditya Kumar", designation: "Junior Developer", email: "aditya.kumar@vcm.org.in", phone: "+91 90987 65432", status: "Inactive", avatar: "https://i.pravatar.cc/150?img=25", joinDate: "2024-01-08", experience: "1 yr", skills: ["HTML", "CSS", "JavaScript"] },
  { id: 11, name: "Pooja Joshi", designation: "Data Analyst", email: "pooja.joshi@vcm.org.in", phone: "+91 89876 54321", status: "Active", avatar: "https://i.pravatar.cc/150?img=44", joinDate: "2023-08-15", experience: "2 yrs", skills: ["Python", "Tableau", "Power BI"] },
  { id: 12, name: "Nikhil Tiwari", designation: "IT Support Specialist", email: "nikhil.tiwari@vcm.org.in", phone: "+91 88765 43210", status: "Active", avatar: "https://i.pravatar.cc/150?img=30", joinDate: "2022-12-01", experience: "3 yrs", skills: ["Helpdesk", "Windows", "Active Directory"] },
];

const statusColors = { Active: "bg-emerald-100 text-emerald-700", "On Leave": "bg-amber-100 text-amber-700", Inactive: "bg-red-100 text-red-600" };

const DeptTeamOverview = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = teamMembers.filter(m =>
    (filterStatus === "All" || m.status === filterStatus) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      m.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
  );

  const counts = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === "Active").length,
    onLeave: teamMembers.filter(m => m.status === "On Leave").length,
    inactive: teamMembers.filter(m => m.status === "Inactive").length,
  };

  return (
    <DashboardLayout menuItems={departmentMenuItems} pageTitle="Team Overview" breadcrumbs={["Department Admin", "Team Overview"]}>
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold text-slate-800">Team Overview</h2>
        <p className="text-slate-500 text-sm mt-1">IT Department team — {counts.total} members</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FaUsers} label="Total Members" value={counts.total} color="saffron" />
        <StatCard icon={FaUsers} label="Active" value={counts.active} color="emerald" />
        <StatCard icon={FaUsers} label="On Leave" value={counts.onLeave} color="amber" />
        <StatCard icon={FaUsers} label="Inactive" value={counts.inactive} color="maroon" />
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, designation, skill..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400"
          />
        </div>
        {["All", "Active", "On Leave", "Inactive"].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterStatus === s
              ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          >{s}</button>
        ))}
      </div>

      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Member", "Designation", "Contact", "Skills", "Experience", "Joined", "Status"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide py-3.5 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, i) => (
                <tr key={member.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === filtered.length - 1 ? "border-0" : ""}`}>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-slate-600">{member.designation}</td>
                  <td className="py-4 px-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <FaEnvelope className="text-saffron-400" />
                        <span className="truncate max-w-[140px]">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <FaPhone className="text-blue-400" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map(skill => (
                        <span key={skill} className="text-[10px] font-medium bg-saffron-50 text-saffron-600 px-2 py-0.5 rounded-full">{skill}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-slate-600">{member.experience}</td>
                  <td className="py-4 px-5 text-xs text-slate-500">{new Date(member.joinDate).toLocaleDateString("en-IN")}</td>
                  <td className="py-4 px-5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[member.status]}`}>{member.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <FaUsers className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No team members found</p>
            </div>
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default DeptTeamOverview;
