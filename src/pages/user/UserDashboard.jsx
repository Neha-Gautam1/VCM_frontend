import {
  FaTachometerAlt,
  FaUserCircle,
  FaBell,
  FaCalendarAlt,
  FaHome,
  FaFileAlt,
  FaCommentDots,
  FaHandsHelping,
} from "react-icons/fa";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/common/Card";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../hooks/useAuth";

export const userMenuItems = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    icon: FaTachometerAlt,
    end: true,
  },
  {
    label: "My Profile",
    path: "/user/profile",
    icon: FaUserCircle,
  },
  {
    label: "Applications",
    path: "/user/applications",
    icon: FaFileAlt,
  },
  {
    label: "Accommodation",
    path: "/user/accommodation",
    icon: FaHome,
  },
  {
    label: "Events",
    path: "/user/events",
    icon: FaCalendarAlt,
  },
  {
    label: "Notifications",
    path: "/user/notifications",
    icon: FaBell,
  },
  {
    label: "Feedback",
    path: "/user/feedback",
    icon: FaCommentDots,
  },
];

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout
      menuItems={userMenuItems}
      pageTitle="Dashboard"
      profilePath="/user/profile"
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-800">
          Welcome, {user?.name?.split(" ")[0]} 👋
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Manage your applications, bookings and stay connected with temple
          activities.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard
          icon={FaFileAlt}
          label="Applications"
          value="2"
          color="saffron"
        />

        <StatCard
          icon={FaHome}
          label="Accommodation"
          value="Booked"
          color="emerald"
        />

        <StatCard
          icon={FaCalendarAlt}
          label="Upcoming Events"
          value="5"
          color="blue"
        />

        <StatCard
          icon={FaBell}
          label="Notifications"
          value="3"
          color="purple"
        />
      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-3 gap-6">

        <Card
          title="Latest Updates"
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {[
              "Volunteer registrations for Janmashtami are now open.",
              "Accommodation booking has been confirmed.",
              "Temple visit guidelines have been updated.",
              "New internship opportunities are available.",
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <span className="w-2 h-2 rounded-full bg-saffron-500 mt-2 flex-shrink-0"></span>

                <p className="text-sm text-slate-600">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming Events">
          <div className="space-y-4">

            {[
              {
                title: "Guru Purnima",
                date: "Jul 18",
              },
              {
                title: "Janmashtami Seva",
                date: "Aug 15",
              },
              {
                title: "Volunteer Orientation",
                date: "Aug 20",
              },
            ].map((event) => (
              <div
                key={event.title}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-600">
                  {event.title}
                </span>

                <span className="text-xs font-semibold bg-saffron-50 text-saffron-600 px-3 py-1 rounded-full">
                  {event.date}
                </span>
              </div>
            ))}

          </div>
        </Card>

      </div>

      {/* Bottom Cards */}

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        <Card title="Application Status">
          <div className="space-y-4">

            <div className="flex justify-between items-center">
              <span className="text-slate-600">
                Internship Application
              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-700 font-semibold">
                Under Review
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-600">
                Accommodation Request
              </span>

              <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 font-semibold">
                Approved
              </span>
            </div>

          </div>
        </Card>

        <Card title="Quick Actions">

          <div className="grid grid-cols-2 gap-4">

            {[
              {
                icon: FaHandsHelping,
                title: "Volunteer",
              },
              {
                icon: FaCalendarAlt,
                title: "Book Event",
              },
              {
                icon: FaHome,
                title: "Accommodation",
              },
              {
                icon: FaCommentDots,
                title: "Feedback",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  className="rounded-xl border border-slate-200 p-4 hover:border-saffron-500 hover:bg-saffron-50 transition"
                >
                  <Icon className="mx-auto text-saffron-600 text-xl mb-2" />

                  <p className="text-sm font-medium text-slate-700">
                    {item.title}
                  </p>
                </button>
              );
            })}

          </div>

        </Card>

      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;