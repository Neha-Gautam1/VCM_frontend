import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaUsers, FaUserTie, FaBuilding } from "react-icons/fa";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import Modal from "../../components/common/Modal";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SearchBox from "../../components/common/SearchBox";
import EmptyState from "../../components/common/EmptyState";
import { superAdminMenuItems } from "./SuperAdminDashboard";
import { mockDepartments as initialDepartments } from "../../data/mockDeparments";
import { mockUsers } from "../../data/mockUsers";

const colorOptions = [
  "bg-blue-100 text-blue-700", "bg-amber-100 text-amber-700", "bg-pink-100 text-pink-700",
  "bg-slate-200 text-slate-700", "bg-emerald-100 text-emerald-700", "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700", "bg-cyan-100 text-cyan-700", "bg-rose-100 text-rose-700",
];

const emptyForm = { name: "", head: "", employeeCount: "", description: "" };

const potentialHeads = mockUsers.map((u) => u.name);

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [search, setSearch] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeDept, setActiveDept] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  const filteredDepts = departments.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.head.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm(emptyForm);
    setFormErrors({});
    setAddOpen(true);
  };

  const openEdit = (dept) => {
    setActiveDept(dept);
    setForm({ name: dept.name, head: dept.head, employeeCount: dept.employeeCount, description: dept.description });
    setFormErrors({});
    setEditOpen(true);
  };

  const openDelete = (dept) => {
    setActiveDept(dept);
    setDeleteOpen(true);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Department name is required";
    if (!form.head) errs.head = "Select a department head";
    if (!form.employeeCount || isNaN(form.employeeCount)) errs.employeeCount = "Enter a valid number";
    if (!form.description.trim()) errs.description = "Description is required";
    return errs;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setFormErrors(errs);
    const newDept = {
      id: Math.max(...departments.map((d) => d.id)) + 1,
      name: form.name,
      head: form.head,
      employeeCount: Number(form.employeeCount),
      description: form.description,
      color: colorOptions[departments.length % colorOptions.length],
    };
    setDepartments([newDept, ...departments]);
    setAddOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setFormErrors(errs);
    setDepartments(
      departments.map((d) =>
        d.id === activeDept.id ? { ...d, name: form.name, head: form.head, employeeCount: Number(form.employeeCount), description: form.description } : d
      )
    );
    setEditOpen(false);
  };

  const handleDeleteConfirm = () => {
    setDepartments(departments.filter((d) => d.id !== activeDept.id));
    setDeleteOpen(false);
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border ${formErrors[field] ? "border-red-400" : "border-slate-200"} text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition`;

  const DeptForm = ({ onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Department Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass("name")} placeholder="e.g. Guest Relations" />
        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Department Head</label>
          <select value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })} className={`${inputClass("head")} appearance-none cursor-pointer`}>
            <option value="">Select</option>
            {potentialHeads.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
          {formErrors.head && <p className="text-red-500 text-xs mt-1">{formErrors.head}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Employee Count</label>
          <input type="number" value={form.employeeCount} onChange={(e) => setForm({ ...form, employeeCount: e.target.value })} className={inputClass("employeeCount")} placeholder="e.g. 25" />
          {formErrors.employeeCount && <p className="text-red-500 text-xs mt-1">{formErrors.employeeCount}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass("description")} resize-none`} placeholder="Brief description of this department's role" />
        {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
      </div>
    </form>
  );

  return (
    <DashboardLayout menuItems={superAdminMenuItems} pageTitle="Department Management" profilePath="/superadmin/profile" settingsPath="/superadmin/settings">
      <Breadcrumbs items={["Super Admin", "Department Management"]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800">Department Management</h2>
          <p className="text-slate-500 text-sm mt-1">Create and manage all departments across VCM.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 to-maroon-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-soft"
        >
          <FaPlus className="text-xs" /> Add Department
        </button>
      </div>

      <SearchBox value={search} onChange={setSearch} placeholder="Search departments or heads..." className="mb-6 max-w-sm" />

      {filteredDepts.length === 0 ? (
        <Card><EmptyState icon={FaBuilding} message="No departments found" subMessage="Try a different search term." /></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDepts.map((dept) => (
            <Card key={dept.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${dept.color}`}>
                  <FaUsers className="inline mr-1.5 text-[10px]" />{dept.employeeCount} employees
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(dept)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-50 text-amber-500 transition-colors">
                    <FaEdit className="text-sm" />
                  </button>
                  <button onClick={() => openDelete(dept)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2">{dept.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{dept.description}</p>
              <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
                <div className="w-8 h-8 rounded-full bg-saffron-50 flex items-center justify-center flex-shrink-0">
                  <FaUserTie className="text-saffron-600 text-xs" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Department Head</p>
                  <p className="text-sm font-medium text-slate-700">{dept.head}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={addOpen} onClose={() => setAddOpen(false)} title="Add Department" size="md"
        footer={<>
          <button onClick={() => setAddOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleAddSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Add Department</button>
        </>}
      >
        <DeptForm onSubmit={handleAddSubmit} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Department" size="md"
        footer={<>
          <button onClick={() => setEditOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleEditSubmit} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-saffron-600 to-maroon-600 text-white hover:opacity-90 transition-opacity">Save Changes</button>
        </>}
      >
        <DeptForm onSubmit={handleEditSubmit} />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Department" size="sm"
        footer={<>
          <button onClick={() => setDeleteOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleDeleteConfirm} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
        </>}
      >
        {activeDept && (
          <div className="text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <FaTrash className="text-red-500 text-xl" />
            </div>
            <p className="text-slate-700">
              Are you sure you want to delete <span className="font-semibold">{activeDept.name}</span>? This will affect {activeDept.employeeCount} employees.
            </p>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default DepartmentManagement;