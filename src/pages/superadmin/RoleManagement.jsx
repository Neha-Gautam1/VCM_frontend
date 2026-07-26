import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaUserShield, FaUsers } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { useEffect, useCallback } from "react";
import { fetchRoles, createRoleRequest, updateRoleRequest, deleteRoleRequest } from "../../api/rolesApi";

const emptyForm = { name: "", description: "" };

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
const [loading, setLoading] = useState(true);

const loadRoles = useCallback(async () => {
  setLoading(true);
  try {
    const res = await fetchRoles();
    setRoles(res.data);
  } catch (err) {
    console.error("Failed to load roles:", err);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => { loadRoles(); }, [loadRoles]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  const openAdd = () => { setForm(emptyForm); setFormErrors({}); setAddOpen(true); };
  const openEdit = (role) => { setActiveRole(role); setForm({ name: role.name, description: role.description }); setFormErrors({}); setEditOpen(true); };
  const openDelete = (role) => { setActiveRole(role); setDeleteOpen(true); };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Role name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    return errs;
  };

 const handleAddSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length) return setFormErrors(errs);
  try {
    await createRoleRequest({ name: form.name, description: form.description });
    setAddOpen(false);
    loadRoles();
  } catch (err) {
    setFormErrors({ name: err.response?.data?.message || "Failed to create role" });
  }
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length) return setFormErrors(errs);
  try {
    await updateRoleRequest(activeRole.id, { name: form.name, description: form.description });
    setEditOpen(false);
    loadRoles();
  } catch (err) {
    setFormErrors({ name: err.response?.data?.message || "Failed to update role" });
  }
};

const handleDeleteConfirm = async () => {
  try {
    await deleteRoleRequest(activeRole.id);
    setDeleteOpen(false);
    loadRoles();
  } catch (err) {
    alert(err.response?.data?.message || "Failed to delete role");
    setDeleteOpen(false);
  }
};

  const isSystemRole = (name) => ["Super Admin", "Department Admin", "Employee"].includes(name);

  const columns = [
    {
      key: "name",
      label: "Role",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-saffron-50 flex items-center justify-center">
            <FaUserShield className="text-saffron-600 text-sm" />
          </div>
          <span className="font-medium text-slate-800">{row.name}</span>
        </div>
      ),
    },
    { key: "description", label: "Description" },
    {
      key: "usersCount",
      label: "Users Assigned",
      render: (row) => (
        <span className="flex items-center gap-1.5 text-sm text-slate-600">
          <FaUsers className="text-slate-400 text-xs" /> {row.usersCount}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => openEdit(row)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Edit">
            <FaEdit className="text-sm" />
          </button>
          <button
            onClick={() => !isSystemRole(row.name) && openDelete(row)}
            disabled={isSystemRole(row.name)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            title={isSystemRole(row.name) ? "System role cannot be deleted" : "Delete"}
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      ),
    },
  ];

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border ${formErrors[field] ? "border-red-400" : "border-slate-200"} text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition`;

  const RoleForm = ({ onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Role Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass("name")} placeholder="e.g. Content Editor" />
        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass("description")} resize-none`} placeholder="What can this role do?" />
        {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
      </div>
    </form>
  );

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Role Management" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Role Management"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Role Management</h2>
          <p className="text-slate-500 text-sm mt-1">Create and manage roles used across the portal.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft"
        >
          <FaPlus className="text-xs" /> Create Role
        </button>
      </div>

      <Card noPadding>
        <Table columns={columns} data={roles} loading={loading} emptyMessage="No roles created yet" />
      </Card>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="Create New Role" size="md"
        footer={<>
          <button onClick={() => setAddOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleAddSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Create Role</button>
        </>}>
        <RoleForm onSubmit={handleAddSubmit} />
      </Modal>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Role" size="md"
        footer={<>
          <button onClick={() => setEditOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleEditSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Save Changes</button>
        </>}>
        <RoleForm onSubmit={handleEditSubmit} />
      </Modal>

      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Role" size="sm"
        footer={<>
          <button onClick={() => setDeleteOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
        </>}>
        {activeRole && (
          <div className="text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <FaTrash className="text-red-500 text-xl" />
            </div>
            <p className="text-slate-700">Are you sure you want to delete the <span className="font-semibold">{activeRole.name}</span> role?</p>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default RoleManagement;