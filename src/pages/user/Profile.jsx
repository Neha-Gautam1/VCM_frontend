import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, OutlineBtn, FormInput, FormSelect, SuccessToast, StatusBadge
} from "../../components/user/ui/UserUI";
import { mockUser } from "./data/mockData";
import { useAuth } from "../../hooks/useAuth";
import { FaEdit, FaSave, FaTimes, FaShieldAlt, FaIdCard, FaMapMarkerAlt, FaPrayingHands } from "react-icons/fa";

const Section = ({ icon: Icon, title, children }) => (
  <SCard className="p-6 mb-5">
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-amber-50">
      <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
        <Icon className="text-amber-600 text-base" />
      </div>
      <h3 className="font-display font-semibold text-amber-900">{title}</h3>
    </div>
    {children}
  </SCard>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-amber-500/70 font-medium uppercase tracking-wide mb-0.5">{label}</p>
    <p className="text-sm text-amber-900 font-medium">{value || "—"}</p>
  </div>
);

const UserProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || mockUser.name,
    phone: mockUser.phone,
    city: mockUser.city,
    state: mockUser.state,
    country: mockUser.country,
    gotra: mockUser.gotra,
    deity: mockUser.deity,
    devoteeType: mockUser.devoteeType,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setEditing(false);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const f = (key) => ({
    value: form[key],
    onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
    error: errors[key],
  });

  const avatar = user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`;

  return (
    <UserLayout pageTitle="My Profile">
      <PageHeader
        title="My Profile"
        subtitle="Manage your devotee information and account settings"
        badge="Devotee Account"
        action={
          editing ? null : (
            <PrimaryBtn onClick={() => setEditing(true)}>
              <FaEdit /> Edit Profile
            </PrimaryBtn>
          )
        }
      />

      {/* Avatar & ID card */}
      <SCard className="p-6 mb-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={avatar}
              alt={form.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-200 shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white text-xs">✓</span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-display font-bold text-2xl text-amber-900">{form.name}</h2>
            <p className="text-amber-600/70 text-sm mt-0.5">{user?.email}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                🪷 {mockUser.devoteeType}
              </span>
              <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
                🆔 {mockUser.membershipId}
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                ✅ Verified
              </span>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs text-amber-500/60">Member Since</p>
            <p className="text-sm font-bold text-amber-800">
              {new Date(mockUser.memberSince).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </SCard>

      {editing ? (
        <form onSubmit={handleSave} noValidate>
          <Section icon={FaIdCard} title="Personal Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Full Name" id="name" placeholder="Your full name" required {...f("name")} />
              <FormInput label="Phone Number" id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required {...f("phone")} />
              <FormInput label="City" id="city" placeholder="City" {...f("city")} />
              <FormInput label="State" id="state" placeholder="State" {...f("state")} />
              <FormInput label="Country" id="country" placeholder="Country" {...f("country")} />
            </div>
          </Section>

          <Section icon={FaPrayingHands} title="Devotional Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Gotra" id="gotra" placeholder="Your gotra" {...f("gotra")} />
              <FormInput label="Ishta Deva (Preferred Deity)" id="deity" placeholder="e.g. Radha Krishna" {...f("deity")} />
              <FormSelect label="Devotee Type" id="devoteeType" {...f("devoteeType")}>
                <option>Regular Devotee</option>
                <option>Life Member</option>
                <option>Patron Devotee</option>
                <option>Pilgrim</option>
              </FormSelect>
            </div>
          </Section>

          <div className="flex gap-3">
            <PrimaryBtn type="submit"><FaSave /> Save Changes</PrimaryBtn>
            <OutlineBtn onClick={() => { setEditing(false); setErrors({}); }}><FaTimes /> Cancel</OutlineBtn>
          </div>
        </form>
      ) : (
        <>
          <Section icon={FaIdCard} title="Personal Information">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Field label="Full Name" value={form.name} />
              <Field label="Email Address" value={user?.email} />
              <Field label="Phone Number" value={form.phone} />
              <Field label="City" value={form.city} />
              <Field label="State" value={form.state} />
              <Field label="Country" value={form.country} />
            </div>
          </Section>

          <Section icon={FaPrayingHands} title="Devotional Information">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Field label="Gotra" value={form.gotra} />
              <Field label="Initiated Name" value={mockUser.initiatedName} />
              <Field label="Ishta Deva" value={form.deity} />
              <Field label="Devotee Type" value={form.devoteeType} />
              <Field label="Membership ID" value={mockUser.membershipId} />
            </div>
          </Section>

          <Section icon={FaShieldAlt} title="Identity Documents">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Aadhaar (Masked)" value={mockUser.aadhaar} />
              <Field label="PAN" value={mockUser.pan} />
            </div>
            <p className="text-xs text-amber-500/60 mt-4 flex items-center gap-1.5">
              <FaShieldAlt /> Your documents are encrypted and stored securely.
            </p>
          </Section>
        </>
      )}

      {toast && <SuccessToast message="Profile updated successfully!" onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default UserProfile;