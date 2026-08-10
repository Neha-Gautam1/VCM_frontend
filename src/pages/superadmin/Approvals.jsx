import { useState, useEffect, useCallback } from "react";
import { FaCheck, FaTimes, FaEye, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SearchBox from "../../components/common/SearchBox";
import EmptyState from "../../components/common/EmptyState";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { approvalTypes } from "../../data/mockApprovals";
import { fetchApprovals, approveRequestApi, rejectRequestApi } from "../../api/approvalsApi";
import { mediaUrl } from "../../utils/mediaUrl";

const statusTabs = ["Pending", "Approved", "Rejected", "All"];

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [statusTab, setStatusTab] = useState("Pending");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadApprovals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchApprovals({ status: statusTab, type: typeFilter, search });
      setApprovals(res.data);
    } catch (err) {
      console.error("Failed to load approvals:", err);
    } finally {
      setLoading(false);
    }
  }, [statusTab, typeFilter, search]);

  useEffect(() => { loadApprovals(); }, [loadApprovals]);
  const [viewOpen, setViewOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [activeApproval, setActiveApproval] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const filtered = useMemo(() => {
    return approvals.filter((a) => {
      const matchesStatus = statusTab === "All" || a.status === statusTab;
      const matchesType = typeFilter === "All" || a.type === typeFilter;
      const matchesSearch = a.requester.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [approvals, statusTab, typeFilter, search]);

const [counts, setCounts] = useState({ Pending: 0, Approved: 0, Rejected: 0 });

useEffect(() => {
  const loadCounts = async () => {
    try {
      const [pending, approved, rejected] = await Promise.all([
        fetchApprovals({ status: "Pending" }),
        fetchApprovals({ status: "Approved" }),
        fetchApprovals({ status: "Rejected" }),
      ]);
      setCounts({ Pending: pending.data.length, Approved: approved.data.length, Rejected: rejected.data.length });
    } catch (err) {
      console.error("Failed to load approval counts:", err);
    }
  };
  loadCounts();
}, [approvals]); // refetch counts whenever the main list changes (e.g. after an approve/reject action)

  const openView = (item) => { setActiveApproval(item); setViewOpen(true); };
  const openReject = (item) => { setActiveApproval(item); setRejectReason(""); setRejectOpen(true); };

  const handleApprove = async (id) => {
  try {
    await approveRequestApi(id);
    setViewOpen(false);
    loadApprovals();
  } catch (err) {
    console.error("Failed to approve request:", err);
  }
};

const handleRejectConfirm = async () => {
  try {
    await rejectRequestApi(activeApproval.id, rejectReason);
    setRejectOpen(false);
    setViewOpen(false);
    loadApprovals();
  } catch (err) {
    console.error("Failed to reject request:", err);
  }
};

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Approvals" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Approvals"]} />
      <div className="mt-3 mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">Approval Workflow</h2>
        <p className="text-slate-500 text-sm mt-1">Review and process pending requests across departments.</p>
      </div>

      {/* Status summary cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center"><FaHourglassHalf className="text-amber-500" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{counts.Pending}</p><p className="text-xs text-slate-500">Pending Requests</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center"><FaCheck className="text-emerald-500" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{counts.Approved}</p><p className="text-xs text-slate-500">Approved</p></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center"><FaTimes className="text-red-500" /></div>
          <div><p className="text-xl font-display font-bold text-slate-800">{counts.Rejected}</p><p className="text-xs text-slate-500">Rejected</p></div>
        </Card>
      </div>

      <Card noPadding>
        <div className="flex flex-col lg:flex-row gap-3 p-6 border-b border-slate-100">
          <div className="flex gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  statusTab === tab ? "bg-gradient-to-r from-saffron-600 to-maroon-600 text-white shadow-soft" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <SearchBox value={search} onChange={setSearch} placeholder="Search requester or type..." className="flex-1" />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 cursor-pointer">
            {approvalTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={FaCheckCircle} message="No requests found" subMessage="Nothing matches the current filters." />
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={mediaUrl(item.avatar)} alt={item.requester} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{item.type}</p>
                    <p className="text-xs text-slate-400 truncate">{item.requester} · {item.department} · {item.submittedOn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge status={item.status} />
                  <button onClick={() => openView(item)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View Details">
                    <FaEye className="text-sm" />
                  </button>
                  {item.status === "Pending" && (
                    <>
                      <button onClick={() => handleApprove(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-emerald-500 transition-colors" title="Approve">
                        <FaCheck className="text-sm" />
                      </button>
                      <button onClick={() => openReject(item)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Reject">
                        <FaTimes className="text-sm" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* View Details Modal */}
      <Modal isOpen={viewOpen} onClose={() => setViewOpen(false)} title="Request Details" size="md">
        {activeApproval && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <img src={activeApproval.avatar} alt={activeApproval.requester} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <p className="font-display font-bold text-slate-800">{activeApproval.requester}</p>
                <p className="text-sm text-slate-400">{activeApproval.department}</p>
                <div className="mt-1.5"><Badge status={activeApproval.status} /></div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 space-y-3 text-sm">
              <div><p className="text-slate-400 text-xs mb-1">Request Type</p><p className="text-slate-700 font-medium">{activeApproval.type}</p></div>
              <div><p className="text-slate-400 text-xs mb-1">Submitted On</p><p className="text-slate-700 font-medium">{activeApproval.submittedOn}</p></div>
              <div><p className="text-slate-400 text-xs mb-1">Details</p><p className="text-slate-600 leading-relaxed">{activeApproval.details}</p></div>
            </div>
            {activeApproval.status === "Pending" && (
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleApprove(activeApproval.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-emerald-600 transition-colors"
                >
                  <FaCheck className="text-xs" /> Approve
                </button>
                <button
                  onClick={() => openReject(activeApproval)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 font-semibold py-2.5 rounded-xl text-sm hover:bg-red-100 transition-colors"
                >
                  <FaTimes className="text-xs" /> Reject
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={rejectOpen} onClose={() => setRejectOpen(false)} title="Reject Request" size="sm"
        footer={<>
          <button onClick={() => setRejectOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleRejectConfirm} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">Reject Request</button>
        </>}
      >
        {activeApproval && (
          <div>
            <p className="text-slate-700 text-sm mb-4">
              Reject <span className="font-semibold">{activeApproval.type}</span> from <span className="font-semibold">{activeApproval.requester}</span>?
            </p>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Reason (optional)</label>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Provide a reason for rejection..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default Approvals;