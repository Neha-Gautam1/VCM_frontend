import { useState } from "react";
import { FaBuilding, FaBed, FaMapMarkerAlt, FaImages, FaMapMarkedAlt, FaLayerGroup } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { campusBuildings, campusHostels, campusOffices, campusGallery } from "../../data/mockCampus";

const tabs = [
  { key: "buildings", label: "Buildings", icon: FaBuilding },
  { key: "hostels", label: "Hostels", icon: FaBed },
  { key: "offices", label: "Office Locations", icon: FaMapMarkerAlt },
  { key: "gallery", label: "Gallery", icon: FaImages },
];

const buildingStatusMap = { "Active": "Active", "Under Construction": "Pending" };

const CampusManagement = () => {
  const [activeTab, setActiveTab] = useState("buildings");

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Campus Management" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Campus Management"]} />
      <div className="mt-3 mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">Campus Management</h2>
        <p className="text-slate-500 text-sm mt-1">Manage buildings, hostels, offices, and campus visuals.</p>
      </div>

      {/* Campus Overview Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-saffron-50 flex items-center justify-center flex-shrink-0"><FaMapMarkedAlt className="text-saffron-600" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">70</p><p className="text-xs text-slate-500">Acres Campus</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0"><FaBuilding className="text-blue-600" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{campusBuildings.length}</p><p className="text-xs text-slate-500">Buildings</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0"><FaBed className="text-emerald-600" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{campusHostels.length}</p><p className="text-xs text-slate-500">Hostels</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0"><FaMapMarkerAlt className="text-purple-600" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{campusOffices.length}</p><p className="text-xs text-slate-500">Office Locations</p></div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.key ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow-soft" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <tab.icon className="text-xs" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Buildings */}
      {activeTab === "buildings" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {campusBuildings.map((b) => (
            <Card key={b.id} noPadding className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={b.img} alt={b.name} className="w-full h-36 object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400">{b.type}</span>
                  <Badge status={buildingStatusMap[b.status]}>{b.status}</Badge>
                </div>
                <h3 className="font-display font-bold text-slate-800 mb-1">{b.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><FaLayerGroup className="text-slate-300" /> {b.floors} floor{b.floors > 1 ? "s" : ""}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Hostels */}
      {activeTab === "hostels" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {campusHostels.map((h) => {
            const pct = Math.round((h.occupancy / h.capacity) * 100);
            return (
              <Card key={h.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-saffron-50 flex items-center justify-center"><FaBed className="text-saffron-600" /></div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{h.type}</span>
                </div>
                <h3 className="font-display font-bold text-slate-800 mb-3">{h.name}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span>Occupancy</span>
                  <span className="font-semibold text-slate-700">{h.occupancy}/{h.capacity} ({pct}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct > 85 ? "bg-red-400" : pct > 60 ? "bg-amber-400" : "bg-emerald-400"}`} style={{ width: `${pct}%` }}></div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Offices */}
      {activeTab === "offices" && (
        <Card noPadding>
          <div className="divide-y divide-slate-50">
            {campusOffices.map((o) => (
              <div key={o.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center"><FaMapMarkerAlt className="text-purple-600 text-xs" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{o.name}</p>
                    <p className="text-xs text-slate-400">{o.building}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">{o.floor}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Gallery */}
      {activeTab === "gallery" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {campusGallery.map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden h-48 shadow-card group cursor-pointer">
              <img src={img} alt={`Campus ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}

      {/* Maps Placeholder */}
      <Card title="Campus Map" className="mt-6">
        <div className="h-72 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400">
          <FaMapMarkedAlt className="text-4xl mb-3" />
          <p className="text-sm font-medium">Interactive campus map will be integrated here</p>
          <p className="text-xs mt-1">Map placeholder — Google Maps / custom SVG map to be added later</p>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default CampusManagement;