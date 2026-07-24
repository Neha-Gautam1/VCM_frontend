import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, CardHeader, StatusBadge
} from "../../components/user/ui/UserUI";
import { volunteerOpportunities, myVolunteerHistory } from "./data/mockData";
import { FaHandsHelping, FaCheckCircle, FaAward, FaClock, FaMapMarkerAlt, FaDownload } from "react-icons/fa";

const urgencyColor = {
  High: "bg-red-50 text-red-600 border-red-200",
  Medium: "bg-amber-50 text-amber-600 border-amber-200",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const VolunteerPage = () => {
  const [tab, setTab] = useState("opportunities");
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [appliedIds, setAppliedIds] = useState([]);
  const [toast, setToast] = useState(false);

  const totalHours = myVolunteerHistory.reduce((s, v) => s + v.hours, 0);

  const handleApply = () => {
    setAppliedIds((prev) => [...prev, selectedOpp.id]);
    setModalOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <UserLayout pageTitle="Volunteer">
      <PageHeader
        title="Seva & Volunteer"
        subtitle="Offer your time and skills in the divine service at Vrindavan Chandrodaya Mandir"
        badge="Volunteer Seva"
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SCard className="p-4 text-center" hover={false}>
          <p className="font-display font-bold text-2xl text-amber-900">{myVolunteerHistory.length}</p>
          <p className="text-xs text-amber-600/70 mt-1">Seva Events</p>
        </SCard>
        <SCard className="p-4 text-center" hover={false}>
          <p className="font-display font-bold text-2xl text-amber-900">{totalHours}</p>
          <p className="text-xs text-amber-600/70 mt-1">Total Hours</p>
        </SCard>
        <SCard className="p-4 text-center" hover={false}>
          <p className="font-display font-bold text-2xl text-emerald-600">
            {myVolunteerHistory.filter((v) => v.certificate).length}
          </p>
          <p className="text-xs text-amber-600/70 mt-1">Certificates</p>
        </SCard>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("opportunities")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "opportunities" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
        >
          Open Opportunities
        </button>
        <button
          onClick={() => setTab("history")}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "history" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
        >
          My Seva History
        </button>
      </div>

      {tab === "opportunities" ? (
        <div className="space-y-4">
          {volunteerOpportunities.map((opp) => {
            const applied = appliedIds.includes(opp.id);
            return (
              <SCard key={opp.id} className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <FaHandsHelping className="text-emerald-600 text-xl" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-display font-bold text-amber-900">{opp.role}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${urgencyColor[opp.urgency]}`}>
                          {opp.urgency} Priority
                        </span>
                      </div>
                      <p className="text-sm text-amber-700">{opp.department}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-amber-600/70">
                        <span className="flex items-center gap-1"><FaClock /> {opp.schedule}</span>
                        <span className="flex items-center gap-1"><FaCheckCircle /> {opp.spots} spots remaining</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {opp.skills.map((s) => (
                          <span key={s} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {applied ? (
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                        <FaCheckCircle /> Applied
                      </span>
                    ) : (
                      <PrimaryBtn onClick={() => { setSelectedOpp(opp); setModalOpen(true); }}>
                        Apply Now
                      </PrimaryBtn>
                    )}
                  </div>
                </div>
              </SCard>
            );
          })}
        </div>
      ) : (
        <SCard className="p-6">
          <CardHeader title="My Seva History" subtitle="Your completed volunteer service records" />
          <div className="space-y-4">
            {myVolunteerHistory.map((v) => (
              <div key={v.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <FaHandsHelping className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-900">{v.role}</p>
                    <p className="text-xs text-amber-600/70 mt-0.5">{v.event}</p>
                    <p className="text-xs text-amber-500 mt-0.5">
                      {new Date(v.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {v.hours} hours
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={v.status} />
                  {v.certificate && (
                    <button
                      onClick={() => alert(`Downloading certificate for ${v.event}`)}
                      className="flex items-center gap-1.5 text-xs text-amber-600 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      <FaAward /> Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SCard>
      )}

      {/* Apply Modal */}
      <Modal
        isOpen={modalOpen && !!selectedOpp}
        onClose={() => setModalOpen(false)}
        title={`Apply — ${selectedOpp?.role}`}
      >
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 space-y-1">
            <p className="text-sm font-semibold text-amber-900">{selectedOpp?.role}</p>
            <p className="text-xs text-amber-600/70">{selectedOpp?.department}</p>
            <p className="text-xs text-amber-600/70 flex items-center gap-1"><FaClock /> {selectedOpp?.schedule}</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800 text-sm">
            <p className="font-semibold mb-1">🙏 About This Seva</p>
            <p className="text-xs text-emerald-700">
              By applying, you agree to dedicate your time in devotional service at VCM. 
              You will receive training before your first seva shift. All volunteers receive a seva certificate.
            </p>
          </div>
          <PrimaryBtn onClick={handleApply} className="w-full">
            <FaCheckCircle /> Confirm Application
          </PrimaryBtn>
        </div>
      </Modal>

      {toast && <SuccessToast message="Application submitted! You'll receive a confirmation within 24 hours." onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default VolunteerPage;
