import { useState } from "react";
import { FaDatabase, FaDownload, FaUndo, FaPlus, FaCheckCircle, FaHdd, FaClock } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";

const initialBackups = [
  { id: 1, name: "Full System Backup", size: "482 MB", date: "2026-07-09 03:00 AM", type: "Automatic", status: "Completed" },
  { id: 2, name: "Full System Backup", size: "478 MB", date: "2026-07-08 03:00 AM", type: "Automatic", status: "Completed" },
  { id: 3, name: "Manual Backup — Pre-Update", size: "475 MB", date: "2026-07-06 04:12 PM", type: "Manual", status: "Completed" },
  { id: 4, name: "Full System Backup", size: "470 MB", date: "2026-07-07 03:00 AM", type: "Automatic", status: "Completed" },
  { id: 5, name: "Full System Backup", size: "465 MB", date: "2026-07-06 03:00 AM", type: "Automatic", status: "Failed" },
];

const BackupRestore = () => {
  const [backups, setBackups] = useState(initialBackups);
  const [creating, setCreating] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [activeBackup, setActiveBackup] = useState(null);
  const [restoring, setRestoring] = useState(false);
  const [restoreDone, setRestoreDone] = useState(false);

  const handleCreateBackup = () => {
    setCreating(true);
    setTimeout(() => {
      const newBackup = {
        id: Date.now(),
        name: "Manual Backup",
        size: `${(Math.random() * 20 + 470).toFixed(0)} MB`,
        date: new Date().toLocaleString("en-IN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
        type: "Manual",
        status: "Completed",
      };
      setBackups([newBackup, ...backups]);
      setCreating(false);
    }, 1800);
  };

  const openRestore = (backup) => {
    setActiveBackup(backup);
    setRestoreDone(false);
    setRestoreOpen(true);
  };

  const handleRestoreConfirm = () => {
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      setRestoreDone(true);
    }, 2000);
  };

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Backup & Restore" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Backup & Restore"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Backup & Restore</h2>
          <p className="text-slate-500 text-sm mt-1">Manage system backups and restore points.</p>
        </div>
        <button
          onClick={handleCreateBackup}
          disabled={creating}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft disabled:opacity-70"
        >
          <FaPlus className="text-xs" /> {creating ? "Creating Backup..." : "Create Backup"}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-saffron-50 flex items-center justify-center"><FaDatabase className="text-saffron-600" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{backups.length}</p><p className="text-xs text-slate-500">Total Backups</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center"><FaHdd className="text-blue-600" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">2.3 GB</p><p className="text-xs text-slate-500">Storage Used</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center"><FaClock className="text-emerald-600" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">Daily 3:00 AM</p><p className="text-xs text-slate-500">Auto Backup Schedule</p></div>
        </Card>
      </div>

      {/* Backup History */}
      <Card title="Backup History" noPadding>
        <div className="divide-y divide-slate-50">
          {backups.map((b) => (
            <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${b.status === "Completed" ? "bg-emerald-50" : "bg-red-50"}`}>
                  <FaDatabase className={b.status === "Completed" ? "text-emerald-600" : "text-red-500"} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{b.name}</p>
                  <p className="text-xs text-slate-400">{b.date} · {b.size} · {b.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge status={b.status === "Completed" ? "Active" : "Rejected"}>{b.status}</Badge>
                {b.status === "Completed" && (
                  <>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="Download Backup">
                      <FaDownload className="text-sm" />
                    </button>
                    <button onClick={() => openRestore(b)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Restore">
                      <FaUndo className="text-sm" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Restore Modal */}
      <Modal
        isOpen={restoreOpen} onClose={() => setRestoreOpen(false)} title="Restore Backup" size="sm"
        footer={!restoreDone && (
          <>
            <button onClick={() => setRestoreOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
            <button onClick={handleRestoreConfirm} disabled={restoring} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors disabled:opacity-70">
              {restoring ? "Restoring..." : "Restore Now"}
            </button>
          </>
        )}
      >
        {activeBackup && !restoreDone && (
          <div className="text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <FaUndo className="text-amber-500 text-xl" />
            </div>
            <p className="text-slate-700 mb-2">
              Restore system to backup from <span className="font-semibold">{activeBackup.date}</span>?
            </p>
            <p className="text-xs text-slate-400">This will overwrite current data with the selected backup. This action cannot be undone.</p>
          </div>
        )}
        {restoreDone && (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
              <FaCheckCircle className="text-emerald-500 text-xl" />
            </div>
            <p className="text-slate-700 font-medium">System restored successfully!</p>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default BackupRestore;