import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import AuthLayout from "../../layouts/AuthLayout";
import { useAuth } from "../../hooks/useAuth";
import { ROLES, ROLE_DASHBOARD_PATH } from "../../utils/contants";

// Helper function to validate User email and password format
const validateUserCredentials = (email, password) => {
  // User email format: user<number>@vcm.org.in (e.g., user1@vcm.org.in, user123@vcm.org.in)
  const emailRegex = /^user\d+@vcm\.org\.in$/i;
  
  // User password format: user@<number> (e.g., user@123, user@456)
  const passwordRegex = /^user@\d+$/i;
  
  return {
    emailValid: emailRegex.test(email),
    passwordValid: passwordRegex.test(password)
  };
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", role: ROLES.USER });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setAuthError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Minimum 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setSubmitting(true);
  try {
    const sessionUser = await login(form.email, form.password);
    navigate(ROLE_DASHBOARD_PATH[sessionUser.role]);
  } catch (err) {
    setErrors({ password: err.response?.data?.message || "Login failed. Please try again." });
  } finally {
    setSubmitting(false);
  }
};

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access your dashboard">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@vcm.org.in"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-slate-200"} bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent text-sm`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.password ? "border-red-400" : "border-slate-200"} bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent text-sm`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Role selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Login as</label>
          <div className="relative">
            <FaUserShield className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent text-sm appearance-none cursor-pointer"
            >
              <option value={ROLES.DEPARTMENT_ADMIN}>Department Admin</option>
              <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
              <option value={ROLES.USER}>User</option>
            </select>
          </div>
        </div>

        {authError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-red-600 text-xs">{authError}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300 text-saffron-500 focus:ring-saffron-400" />
            Remember me
          </label>
          <a href="#" className="text-saffron-600 font-medium hover:text-saffron-700">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold py-3 rounded-xl shadow-soft hover:shadow-lg hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-saffron-600 font-semibold hover:text-saffron-700">
            Sign up
          </Link>
        </p>

        <p className="text-center text-xs text-slate-400 pt-2 border-t border-slate-100">
          <strong>User Login Format:</strong><br/>
          Email: user&lt;number&gt;@vcm.org.in<br/>
          Password: user@&lt;number&gt;<br/>
          <span className="text-slate-500">Example: user1@vcm.org.in / user@123</span><br/>
          <span className="text-slate-500">Or: user456@vcm.org.in / user@789</span><br/>
          <br/>
          <strong>Dept Admin:</strong><br/>
          deptadmin@gmail.com / department
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
