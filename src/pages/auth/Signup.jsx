import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser, FaIdBadge, FaBuilding, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash,
} from "react-icons/fa";
import AuthLayout from "../../layouts/AuthLayout";
import { mockDepartments } from "../../data/mockDeparments";

const initialForm = {
  fullName: "",
  employeeId: "",
  department: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!form.department) newErrors.department = "Select a department";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit number";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Minimum 6 characters";
    if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    }, 700);
  };

  if (success) {
    return (
      <AuthLayout title="Account created!" subtitle="Redirecting you to login...">
        <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-slate-600">Your account has been registered successfully.</p>
        </div>
      </AuthLayout>
    );
  }

  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border ${errors[field] ? "border-red-400" : "border-slate-200"} bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent text-sm transition`;

  return (
    <AuthLayout title="Create an account" subtitle="Join the VCM Employee Portal">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
          <div className="relative">
            <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" className={inputClass("fullName")} />
          </div>
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Employee ID</label>
            <div className="relative">
              <FaIdBadge className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="VCM-EMP-XXX" className={inputClass("employeeId")} />
            </div>
            {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
            <div className="relative">
              <FaBuilding className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <select name="department" value={form.department} onChange={handleChange} className={`${inputClass("department")} appearance-none cursor-pointer`}>
                <option value="">Select</option>
                {mockDepartments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@vcm.org.in" className={inputClass("email")} />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
          <div className="relative">
            <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" className={inputClass("phone")} />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="••••••••" className={inputClass("password")} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input type={showPassword ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" className={inputClass("confirmPassword")} />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold py-3 rounded-xl shadow-soft hover:shadow-lg hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-70 mt-2"
        >
          {submitting ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-saffron-600 font-semibold hover:text-saffron-700">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;