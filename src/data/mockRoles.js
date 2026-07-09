export const mockRoles = [
  { id: 1, name: "Super Admin", usersCount: 2, description: "Full access to all modules." },
  { id: 2, name: "Department Admin", usersCount: 7, description: "Manages a single department's data." },
  { id: 3, name: "Employee", usersCount: 120, description: "Access to personal dashboard and resources." },
];

export const permissionModules = [
  "User Management", "Department Management", "Role Management", "News & Announcements",
  "Gallery", "Spiritual Library", "Approvals", "Analytics", "System Configuration", "Audit Logs",
];

export const mockPermissionMatrix = {
  "Super Admin": permissionModules.reduce((acc, m) => ({ ...acc, [m]: { view: true, create: true, edit: true, delete: true } }), {}),
  "Department Admin": permissionModules.reduce((acc, m) => ({ ...acc, [m]: { view: true, create: m !== "Role Management", edit: m !== "Role Management", delete: false } }), {}),
  "Employee": permissionModules.reduce((acc, m) => ({ ...acc, [m]: { view: ["News & Announcements", "Gallery", "Spiritual Library"].includes(m), create: false, edit: false, delete: false } }), {}),
};