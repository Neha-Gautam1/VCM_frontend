# VCM Employee Portal — Frontend Prototype

A frontend-only Employee Portal Prototype built for **Vrindavan Chandrodaya Mandir (VCM)**, supporting three roles — Employee, Department Admin, and Super Admin — with a fully designed public landing page and authentication flow.

> **Scope note:** This intern's contribution covers the **Super Admin module** in full (20 modules) plus the shared project foundation (routing, auth context, landing page, dashboard shell, reusable components). The Employee and Department Admin dashboards are intentionally basic placeholders, to be completed by other interns on the team.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React.js (JavaScript only — no TypeScript) |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| Icons | React Icons (Font Awesome set) |
| Charts | Recharts |
| Auth (mock) | React Context API + LocalStorage |
| Backend | None — frontend prototype only, all data is mocked |

---

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

---

## Demo Login

This is a mock authentication system — **any email and password combination will work.** Select a role from the dropdown on the Login page to be routed to the matching dashboard:

| Role | Redirects To |
|---|---|
| Employee | `/employee/dashboard` |
| Department Admin | `/department/dashboard` |
| Super Admin | `/superadmin/dashboard` |

Sessions persist via `localStorage` (key: `vcm_auth_session`) until logout.

---

## Folder Structure

```
src/
├── assets/            Static images
├── components/
│   ├── common/        Shared UI primitives (Card, Table, Modal, Badge, etc.)
│   ├── landing/        Landing page sections (Navbar, Hero, Footer, etc.)
│   └── dashboard/      Sidebar, TopNavbar, ProfileMenu, DashboardLayout
├── context/           AuthContext (mock login/logout/session)
├── data/              All mock JSON-style datasets
├── hooks/             useAuth
├── layouts/           AuthLayout (Login/Signup wrapper)
├── pages/
│   ├── landing/        LandingPage
│   ├── auth/           Login, Signup
│   ├── employee/       Employee dashboard + placeholder pages
│   ├── department/     Department Admin dashboard + placeholder pages
│   └── superadmin/      All 20 Super Admin modules (see below)
├── routes/            AppRoutes, ProtectedRoute
├── utils/             Constants (roles, dashboard path mapping)
├── App.jsx
├── main.jsx
└── index.css
```

---

## Super Admin Modules (Primary Deliverable)

All 20 modules are fully functional against mock data, with realistic CRUD interactions (add/edit/delete/view), search, filters, pagination, and modals where applicable:

1. **Dashboard Home** — stat cards, charts (Recharts), recent activity, system health, quick actions
2. **User Management** — full CRUD, search, role/status filters, pagination
3. **Department Management** — card grid, head assignment, employee counts
4. **Role Management** — roles table, protected system roles
5. **Permission Management** — per-role permission matrix (view/create/edit/delete)
6. **Organization Chart** — recursive tree view with expand/collapse
7. **Campus Management** — buildings, hostels, offices, gallery, map placeholder
8. **Homepage CMS** — editable banner/about/vision/mission/leadership/cards with preview
9. **News Management** — CRUD, category filter, publish/draft toggle
10. **Announcement Management** — CRUD, audience targeting, priority levels
11. **Gallery Management** — upload (simulated), category filter, preview modal
12. **Spiritual Library** — books/videos/articles, type & category filters
13. **Approvals** — approve/reject workflow with status tracking
14. **Analytics** — 5 chart types (line, area, bar, horizontal bar, donut)
15. **Notifications (Admin)** — broadcast form with All/Department/Selected-Users targeting
16. **System Configuration** — portal branding, theme, maintenance mode, session timeout
17. **Email Templates** — 4 editable templates with placeholder preview
18. **Backup & Restore** — backup history, create/restore/download flows
19. **Audit Logs** — filterable log table with CSV export
20. **Settings & Profile** — profile edit, password change, theme, language, notification preferences

---

## Important Implementation Notes

- **`superAdminMenuItems`** is exported from `SuperAdminDashboard.jsx` and imported by every other Super Admin page to keep the sidebar navigation consistent — do not duplicate this array elsewhere.
- **`ToggleSwitch.jsx`** (in `components/common/`) was corrected after initial creation — an early version used invalid Tailwind classes (`h-6.5`, `translate-x-5.5`). Ensure the corrected version (using `h-6` and `translate-x-[22px]`) is the one in the codebase.
- All data in `src/data/` is static mock data — no API calls are made anywhere in the app.
- Protected routes redirect unauthenticated users to `/login`, and redirect users to `/login` if their role doesn't match the route's `allowedRoles`.

---

## Known Limitations (By Design)

- No real backend, database, or file upload — all "uploads" (images, backups, logos) are simulated with sample data or randomized mock assets.
- Employee and Department Admin dashboards are placeholders pending implementation by other interns.
- No persistent storage beyond the mock auth session in LocalStorage — all CRUD changes reset on page refresh.

---

*Prepared as part of the VCM Employee Portal internship project — Super Admin Module.*
