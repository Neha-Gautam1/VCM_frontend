export const ROLES = {
  EMPLOYEE: "Employee",
  DEPARTMENT_ADMIN: "Department Admin",
  SUPER_ADMIN: "Super Admin",
  USER:"User"
};

export const ROLE_DASHBOARD_PATH = {
  [ROLES.EMPLOYEE]: "/employee/dashboard",
  [ROLES.DEPARTMENT_ADMIN]: "/department/dashboard",
  [ROLES.SUPER_ADMIN]: "/superadmin/dashboard",
  [ROLES.USER]:"/user/dashboard",
};