import { useNavigate } from "react-router-dom";
import { FaBell, FaCalendarAlt, FaCheckCircle, FaHandsHelping, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import UserLayout from "../../components/user/layout/UserLayout";
import { useAuth } from "../../hooks/useAuth";
import { CardHeader, OutlineBtn, SCard, StatWidget } from "../../components/user/ui/UserUI";
import { events, notifications, myVolunteerHistory } from "./data/mockData";

const RecognitionSpotlight = () => (
  <section className="relative mb-8 overflow-hidden rounded-[24px] bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 px-6 py-9 text-white sm:px-12">
    <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full bg-orange-200/10" />
    <div className="absolute -bottom-28 right-24 h-72 w-72 rounded-full bg-indigo-300/10" />
    <div className="relative grid items-center gap-6 xl:grid-cols-[1.15fr_.85fr]">
      <div>
        <p className="mb-4 text-sm font-bold uppercase tracking-[.2em] text-indigo-200">VCM Recognition Spotlight</p>
        <h3 className="max-w-lg font-display text-3xl font-bold leading-tight sm:text-4xl">Celebrating excellence across our community.</h3>
        <p className="mt-4 max-w-xl text-lg leading-7 text-indigo-100">Recognising people whose commitment, leadership and service make a meaningful difference every day.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <RecognitionCard icon={<FaTrophy />} title="Employee of the Month" name="Priya Sharma" detail="Operations · July 2026" />
        <RecognitionCard icon={<FaTrophy />} title="Employee of the Week" name="Arjun Mehta" detail="Community Outreach · Week 29" muted />
      </div>
    </div>
  </section>
);

const RecognitionCard = ({ icon, title, name, detail, muted }) => (
  <div className={`rounded-[22px] border p-5 ${muted ? "border-white/20 bg-white/15" : "border-amber-200/25 bg-indigo-400/20"}`}>
    <p className="flex items-center gap-2 text-sm font-bold uppercase text-amber-300">{icon} {title}</p>
    <p className="mt-5 text-xl font-bold">{name}</p>
    <p className="mt-1 text-sm text-indigo-100">{detail}</p>
  </div>
);

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const unread = notifications.filter((item) => !item.isRead);
  const joinedEvents = events.filter((item) => item.isRegistered).length;
  const hours = myVolunteerHistory.reduce((total, item) => total + item.hours, 0);
  const upcomingEvents = events.filter((item) => item.status === "Open" || item.status === "Upcoming").slice(0, 3);
  const firstName = user?.name?.split(" ")[0] || "Devotee";
  const hour = new Date().getHours();
  const salutation = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <UserLayout pageTitle="Dashboard">
      <div className="mb-8">
        <p className="text-lg text-slate-500">{salutation}</p>
        <h2 className="font-display text-4xl font-bold text-slate-800">Welcome, {firstName}</h2>
        <p className="mt-2 text-lg text-slate-500">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      </div>

      <RecognitionSpotlight />

      <div className="mb-7 grid gap-5 md:grid-cols-3">
        <StatWidget icon={FaCalendarAlt} iconBg="rgba(37, 99, 235, .1)" iconColor="#2563eb" value={joinedEvents} label="Events Joined" sub="Registered programs" />
        <StatWidget icon={FaHandsHelping} iconBg="rgba(34, 197, 94, .12)" iconColor="#16a34a" value={hours} label="Volunteer Hours" sub="Community contribution" />
        <StatWidget icon={FaBell} iconBg="rgba(249, 115, 22, .12)" iconColor="#ea580c" value={unread.length} label="Unread Updates" sub="Announcements and notices" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SCard className="p-6">
          <CardHeader title="Upcoming Events" subtitle="Festivals & programs" action={<OutlineBtn className="px-3 py-1.5 text-xs" onClick={() => navigate("/user/events")}>Browse</OutlineBtn>} />
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <button key={event.id} onClick={() => navigate("/user/events")} className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-slate-50">
                <div className="flex items-center gap-3"><div className="rounded-xl bg-orange-50 px-3 py-2 text-center text-xs font-bold text-orange-500">{new Date(event.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</div><div><p className="font-semibold text-slate-800">{event.title}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><FaMapMarkerAlt /> {event.venue}</p></div></div>
                {event.isRegistered && <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600"><FaCheckCircle /> Joined</span>}
              </button>
            ))}
          </div>
        </SCard>
        <SCard className="p-6">
          <CardHeader title="Recent Notifications" subtitle={`${unread.length} unread`} action={<OutlineBtn className="px-3 py-1.5 text-xs" onClick={() => navigate("/user/notifications")}>View all</OutlineBtn>} />
          <div className="space-y-3">{notifications.slice(0, 4).map((item) => <div key={item.id} className={`flex gap-3 rounded-xl p-3 ${item.isRead ? "" : "border border-orange-100 bg-orange-50/50"}`}><span className="text-xl">{item.icon}</span><div><p className="font-semibold text-slate-800">{item.title}</p><p className="mt-1 text-sm text-slate-500">{item.message}</p><p className="mt-1 text-xs text-slate-400">{item.time}</p></div></div>)}</div>
        </SCard>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;