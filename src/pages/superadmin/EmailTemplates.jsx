import { useState } from "react";
import { FaSave, FaEye, FaEnvelopeOpenText, FaKey, FaBullhorn, FaCheckCircle } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition";

const initialTemplates = {
  welcome: {
    icon: FaEnvelopeOpenText,
    label: "Welcome Email",
    subject: "Welcome to the VCM Employee Portal, {{name}}!",
    body: "Dear {{name}},\n\nWelcome to Vrindavan Chandrodaya Mandir! We're delighted to have you join our {{department}} team.\n\nYour Employee ID is {{employeeId}}. You can log in to the portal using your registered email.\n\nWarm regards,\nHR Team, VCM",
  },
  passwordReset: {
    icon: FaKey,
    label: "Password Reset",
    subject: "Reset Your VCM Portal Password",
    body: "Dear {{name}},\n\nWe received a request to reset your password. Click the link below to set a new password:\n\n{{resetLink}}\n\nIf you didn't request this, please ignore this email.\n\nRegards,\nVCM IT Team",
  },
  announcement: {
    icon: FaBullhorn,
    label: "Announcement Email",
    subject: "New Announcement: {{title}}",
    body: "Dear {{name}},\n\n{{message}}\n\nFor more details, please visit the Announcements section on your dashboard.\n\nRegards,\nVCM Administration",
  },
  approval: {
    icon: FaCheckCircle,
    label: "Approval Email",
    subject: "Your Request Has Been {{status}}",
    body: "Dear {{name}},\n\nYour request for {{requestType}} submitted on {{date}} has been {{status}}.\n\n{{remarks}}\n\nRegards,\nVCM Administration",
  },
};

const sampleData = {
  name: "Neha Sharma", department: "IT Department", employeeId: "VCM-EMP-101",
  resetLink: "https://vcm-portal.org/reset/abc123", title: "Portal Maintenance This Weekend",
  message: "The portal will undergo scheduled maintenance on Saturday from 2 AM to 5 AM.",
  status: "Approved", requestType: "Leave Request", date: "July 8, 2026", remarks: "Enjoy your time off!",
};

const renderPreview = (text) => {
  let output = text;
  Object.entries(sampleData).forEach(([key, val]) => {
    output = output.replaceAll(`{{${key}}}`, val);
  });
  return output;
};

const EmailTemplates = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [activeKey, setActiveKey] = useState("welcome");
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const active = templates[activeKey];

  const updateField = (field, value) => {
    setTemplates({ ...templates, [activeKey]: { ...templates[activeKey], [field]: value } });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Email Templates" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Email Templates"]} />
      <div className="mt-3 mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">Email Templates</h2>
        <p className="text-slate-500 text-sm mt-1">Customize automated emails sent by the portal.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Template list */}
        <div className="lg:col-span-1 space-y-2">
          {Object.entries(templates).map(([key, tpl]) => (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-colors ${
                activeKey === key ? "bg-gradient-to-r from-saffron-500 to-maroon-600 text-white shadow-soft" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <tpl.icon className={activeKey === key ? "text-white" : "text-saffron-500"} />
              <span className="text-sm font-semibold">{tpl.label}</span>
            </button>
          ))}
        </div>

        {/* Editor */}
        <Card title={`Editing: ${active.label}`} className="lg:col-span-3">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Subject Line</label>
              <input value={active.subject} onChange={(e) => updateField("subject", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Body</label>
              <textarea rows={10} value={active.body} onChange={(e) => updateField("body", e.target.value)} className={`${inputClass} resize-none font-mono text-xs leading-relaxed`} />
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 mb-2">Available Placeholders</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(sampleData).map((key) => (
                  <span key={key} className="text-xs font-mono bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg">{`{{${key}}}`}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setPreviewOpen(true)} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                <FaEye className="text-xs" /> Preview
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft">
                <FaSave className="text-xs" /> {saved ? "Saved!" : "Save Template"}
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Preview Modal */}
      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title="Email Preview" size="lg">
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
            <p className="text-xs text-slate-400">Subject</p>
            <p className="text-sm font-semibold text-slate-800">{renderPreview(active.subject)}</p>
          </div>
          <div className="p-6 bg-white">
            <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{renderPreview(active.body)}</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">Preview rendered using sample placeholder data.</p>
      </Modal>
    </DashboardLayout>
  );
};

export default EmailTemplates;