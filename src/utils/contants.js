export const ROLES = {
  EMPLOYEE: "Employee",
  DEPARTMENT_ADMIN: "Department Admin",
  SUPER_ADMIN: "Super Admin",
};

export const ROLE_DASHBOARD_PATH = {
  [ROLES.EMPLOYEE]: "/employee/dashboard",
  [ROLES.DEPARTMENT_ADMIN]: "/department/dashboard",
  [ROLES.SUPER_ADMIN]: "/superadmin/dashboard",
};