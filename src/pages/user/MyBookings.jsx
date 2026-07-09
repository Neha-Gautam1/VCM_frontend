import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, StatusBadge, SearchBar, TabBar, OutlineBtn, EmptyBox
} from "../../components/user/ui/UserUI";
import { mockBookings } from "./data/mockData";
import { FaDownload, FaTimes, FaClock, FaHashtag, FaUserFriends, FaRupeeSign } from "react-icons/fa";

const TABS = [
  { label: "All", value: "All" },
  { label: "Upcoming", value: "Confirmed" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const serviceEmoji = { Darshan: "🛕", Puja: "🪔", Accommodation: "🏠", Chadhava: "🌸", Donation: "💝" };

const BookingCard = ({ booking }) => (
  <SCard className="p-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center text-2xl flex-shrink-0">
          {serviceEmoji[booking.service] || "📋"}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-amber-900">{booking.service}</p>
            <span className="text-amber-400">·</span>
            <p className="text-amber-700 text-sm">{booking.category}</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-amber-600/70">
            <span className="flex items-center gap-1"><FaClock /> {new Date(booking.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {booking.time}</span>
            <span className="flex items-center gap-1"><FaUserFriends /> {booking.persons} person{booking.persons > 1 ? "s" : ""}</span>
            <span className="flex items-center gap-1"><FaHashtag /> {booking.refNo}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:gap-2">
        <StatusBadge status={booking.status} />
        <div className="flex items-center gap-1 text-amber-800 font-bold">
          <FaRupeeSign className="text-xs" />
          <span>{booking.amount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1.5 text-xs text-amber-600 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
            onClick={() => alert(`Downloading receipt for ${booking.refNo}`)}
          >
            <FaDownload className="text-[10px]" /> Receipt
          </button>
          {booking.status === "Confirmed" && (
            <button
              className="flex items-center gap-1.5 text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              onClick={() => alert(`Cancel booking ${booking.refNo}?`)}
            >
              <FaTimes className="text-[10px]" /> Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  </SCard>
);

const MyBookings = () => {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockBookings
    .filter((b) => tab === "All" || b.status === tab)
    .filter((b) =>
      !search ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.refNo.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <UserLayout pageTitle="My Bookings">
      <PageHeader
        title="My Bookings"
        subtitle="Track all your temple service reservations"
        badge="Service History"
      />

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", val: mockBookings.length, color: "amber" },
          { label: "Confirmed", val: mockBookings.filter((b) => b.status === "Confirmed").length, color: "emerald" },
          { label: "Completed", val: mockBookings.filter((b) => b.status === "Completed").length, color: "sky" },
          { label: "Cancelled", val: mockBookings.filter((b) => b.status === "Cancelled").length, color: "red" },
        ].map((s) => (
          <SCard key={s.label} className="p-4 text-center" hover={false}>
            <p className="font-display font-bold text-2xl text-amber-900">{s.val}</p>
            <p className="text-xs text-amber-600/70 font-medium mt-0.5">{s.label}</p>
          </SCard>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by service, ref..."
        />
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <EmptyBox icon="📋" title="No bookings found" subtitle="Try adjusting your filter or search query." />
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => <BookingCard key={b.id} booking={b} />)}
        </div>
      )}
    </UserLayout>
  );
};

export default MyBookings;
