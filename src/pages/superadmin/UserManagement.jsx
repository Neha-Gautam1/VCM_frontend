import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import SearchBox from "../../components/common/SearchBox";
import Pagination from "../../components/common/Pagination";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Modal from "../../components/common/Modal";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { fetchUsers, createUserRequest, updateUserRequest, deleteUserRequest } from "../../api/usersApi";
import { fetchDepartments } from "../../api/departmentsApi";
import { mediaUrl } from "../../utils/mediaUrl";

const PAGE_SIZE = 5;
const emptyForm = { name: "", employeeId: "", email: "", phone: "", department: "", role: "Employee", status: "Active" };

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchUsers({
        search, role: roleFilter, status: statusFilter, page: currentPage, limit: PAGE_SIZE,
      });
      setUsers(res.data);
      setTotalItems(res.pagination.totalItems);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter, currentPage]);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  // Load departments once, for the Add/Edit form's dropdown
  useEffect(() => {
    fetchDepartments("")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Failed to load departments:", err));
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const resetFilters = (updater) => {
    updater();
    setCurrentPage(1);
  };

  const openAdd = () => {
    setForm(emptyForm);
    setFormErrors({});
    setAddOpen(true);
  };

  const openEdit = (user) => {
    setActiveUser(user);
    setForm({
      name: user.name,
      employeeId: user.employee_id || user.employeeId,
      email: user.email,
      phone: user.phone,
      department: user.department,
      role: user.role,
      status: user.status,
    });
    setFormErrors({});
    setEditOpen(true);
  };

  const openView = (user) => {
    setActiveUser(user);
    setViewOpen(true);
  };

  const openDelete = (user) => {
    setActiveUser(user);
    setDeleteOpen(true);
  };

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.employeeId.trim()) errs.employeeId = "Employee ID is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.department) errs.department = "Select a department";
    return errs;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length) return setFormErrors(errs);
    try {
      await createUserRequest(form);
      setAddOpen(false);
      loadUsers();
    } catch (err) {
      setFormErrors({ email: err.response?.data?.message || "Failed to create user" });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length) return setFormErrors(errs);
    try {
      await updateUserRequest(activeUser.id, form);
      setEditOpen(false);
      loadUsers();
    } catch (err) {
      setFormErrors({ email: err.response?.data?.message || "Failed to update user" });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserRequest(activeUser.id);
      setDeleteOpen(false);
      loadUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Employee",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img src={mediaUrl(row.avatar_url || row.avatar)} alt={row.name} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <p className="font-medium text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-400">{row.employee_id || row.employeeId}</p>
          </div>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{row.role}</span>
      ),
    },
    { key: "status", label: "Status", render: (row) => <Badge status={row.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => openView(row)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View">
            <FaEye className="text-sm" />
          </button>
          <button onClick={() => openEdit(row)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Edit">
            <FaEdit className="text-sm" />
          </button>
          <button onClick={() => openDelete(row)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Delete">
            <FaTrash className="text-sm" />
          </button>
        </div>
      ),
    },
  ];

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border ${formErrors[field] ? "border-red-400" : "border-slate-200"} text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition`;

  const UserForm = ({ onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass("name")} placeholder="Enter full name" />
          {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Employee ID</label>
          <input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} className={inputClass("employeeId")} placeholder="VCM-EMP-XXX" />
          {formErrors.employeeId && <p className="text-red-500 text-xs mt-1">{formErrors.employeeId}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass("email")} placeholder="employee@vcm.org.in" />
          {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass("phone")} placeholder="10-digit number" />
          {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Department</label>
          <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={`${inputClass("department")} appearance-none cursor-pointer`}>
            <option value="">Select</option>
            {departments.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
          {formErrors.department && <p className="text-red-500 text-xs mt-1">{formErrors.department}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Role</label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 appearance-none cursor-pointer">
            <option>Employee</option>
            <option>Department Admin</option>
            <option>Super Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 appearance-none cursor-pointer">
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>
      </div>
    </form>
  );

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="User Management" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "User Management"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 text-sm mt-1">Manage all employees, department admins, and super admins.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft"
        >
          <FaPlus className="text-xs" /> Add User
        </button>
      </div>

      <Card noPadding>
        <div className="flex flex-col sm:flex-row gap-3 p-6 border-b border-slate-100">
          <SearchBox
            value={search}
            onChange={(v) => resetFilters(() => setSearch(v))}
            placeholder="Search by name, email, or ID..."
            className="flex-1"
          />
          <select
            value={roleFilter}
            onChange={(e) => resetFilters(() => setRoleFilter(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option>Employee</option>
            <option>Department Admin</option>
            <option>Super Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => resetFilters(() => setStatusFilter(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>

        <Table columns={columns} data={users} loading={loading} emptyMessage="No users match your filters" />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          pageSize={PAGE_SIZE}
        />
      </Card>

      {/* Add User Modal */}
      <Modal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add New User"
        size="lg"
        footer={
          <>
            <button onClick={() => setAddOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
            <button onClick={handleAddSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Add User</button>
          </>
        }
      >
        <UserForm onSubmit={handleAddSubmit} />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit User"
        size="lg"
        footer={
          <>
            <button onClick={() => setEditOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
            <button onClick={handleEditSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Save Changes</button>
          </>
        }
      >
        <UserForm onSubmit={handleEditSubmit} />
      </Modal>

      {/* View User Modal */}
      <Modal isOpen={viewOpen} onClose={() => setViewOpen(false)} title="User Details" size="md">
        {activeUser && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <img src={mediaUrl(activeUser.avatar_url || activeUser.avatar)} alt={activeUser.name} className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <p className="font-display font-bold text-lg text-slate-800">{activeUser.name}</p>
                <p className="text-sm text-slate-400">{activeUser.employee_id || activeUser.employeeId}</p>
                <div className="mt-1.5"><Badge status={activeUser.status} /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
              <div><p className="text-slate-400 text-xs">Email</p><p className="text-slate-700 font-medium">{activeUser.email}</p></div>
              <div><p className="text-slate-400 text-xs">Phone</p><p className="text-slate-700 font-medium">{activeUser.phone}</p></div>
              <div><p className="text-slate-400 text-xs">Department</p><p className="text-slate-700 font-medium">{activeUser.department}</p></div>
              <div><p className="text-slate-400 text-xs">Role</p><p className="text-slate-700 font-medium">{activeUser.role}</p></div>
              <div><p className="text-slate-400 text-xs">Join Date</p><p className="text-slate-700 font-medium">{activeUser.join_date ? new Date(activeUser.join_date).toLocaleDateString() : "—"}</p></div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete User"
        size="sm"
        footer={
          <>
            <button onClick={() => setDeleteOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
            <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
          </>
        }
      >
        {activeUser && (
          <div className="text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <FaTrash className="text-red-500 text-xl" />
            </div>
            <p className="text-slate-700">
              Are you sure you want to delete <span className="font-semibold">{activeUser.name}</span>? This action cannot be undone.
            </p>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default UserManagement;