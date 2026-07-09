export const mockAuditLogs = [
  { id: 1, user: "Amit Tiwari", role: "Super Admin", activity: "Updated system configuration", module: "System Configuration", ip: "192.168.1.14", date: "2026-07-09 09:12 AM", severity: "Info" },
  { id: 2, user: "Rajesh Kumar", role: "Department Admin", activity: "Approved leave request for Priya Singh", module: "Approvals", ip: "192.168.1.42", date: "2026-07-09 08:47 AM", severity: "Info" },
  { id: 3, user: "Anjali Verma", role: "Department Admin", activity: "Failed login attempt", module: "Authentication", ip: "203.0.113.5", date: "2026-07-09 08:30 AM", severity: "Warning" },
  { id: 4, user: "Amit Tiwari", role: "Super Admin", activity: "Deleted user account: Kavita Joshi", module: "User Management", ip: "192.168.1.14", date: "2026-07-08 06:15 PM", severity: "Critical" },
  { id: 5, user: "Suresh Chandra", role: "Department Admin", activity: "Published news article", module: "News Management", ip: "192.168.1.58", date: "2026-07-08 04:02 PM", severity: "Info" },
  { id: 6, user: "Priya Singh", role: "Employee", activity: "Updated profile information", module: "Profile", ip: "192.168.1.77", date: "2026-07-08 02:20 PM", severity: "Info" },
  { id: 7, user: "System", role: "System", activity: "Automatic backup completed", module: "Backup & Restore", ip: "127.0.0.1", date: "2026-07-08 03:00 AM", severity: "Info" },
  { id: 8, user: "Amit Tiwari", role: "Super Admin", activity: "Modified permission matrix for Department Admin", module: "Permission Management", ip: "192.168.1.14", date: "2026-07-07 11:45 AM", severity: "Warning" },
  { id: 9, user: "Neha Sharma", role: "Employee", activity: "Multiple failed login attempts", module: "Authentication", ip: "203.0.113.12", date: "2026-07-07 09:10 AM", severity: "Critical" },
  { id: 10, user: "Kavita Joshi", role: "Department Admin", activity: "Uploaded 8 images to gallery", module: "Gallery Management", ip: "192.168.1.63", date: "2026-07-06 05:30 PM", severity: "Info" },
];

export const auditModules = ["All", "System Configuration", "Approvals", "Authentication", "User Management", "News Management", "Profile", "Backup & Restore", "Permission Management", "Gallery Management"];
export const auditSeverities = ["All", "Info", "Warning", "Critical"];