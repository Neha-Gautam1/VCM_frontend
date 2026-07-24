import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, PrimaryBtn, SuccessToast, Modal, StatusBadge, SearchBar, EmptyBox
} from "../../components/user/ui/UserUI";
import { events } from "./data/mockData";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCheckCircle, FaFilter } from "react-icons/fa";

const CATEGORIES = ["All", "Festival", "Spiritual", "Volunteer", "Cultural"];

const EventsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [registeredIds, setRegisteredIds] = useState(events.filter((e) => e.isRegistered).map((e) => e.id));
  const [toast, setToast] = useState(false);

  const filtered = events.filter(
    (ev) =>
      (category === "All" || ev.category === category) &&
      (!search || ev.title.toLowerCase().includes(search.toLowerCase()) || ev.venue.toLowerCase().includes(search.toLowerCase()))
  );

  const handleRegister = (ev) => {
    setSelectedEvent(ev);
    setModalOpen(true);
  };

  const confirmRegister = () => {
    setRegisteredIds((prev) => [...prev, selectedEvent.id]);
    setModalOpen(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  const unregister = (id) => {
    setRegisteredIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <UserLayout pageTitle="Events">
      <PageHeader
        title="Temple Events"
        subtitle="Festivals, spiritual programs, and volunteer opportunities at VCM"
        badge="Events & Festivals"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events..." />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${category === c ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards */}
      {filtered.length === 0 ? (
        <EmptyBox icon="📅" title="No events found" subtitle="Try a different category or search term." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ev) => {
            const isReg = registeredIds.includes(ev.id);
            const pct = Math.round((ev.registered / ev.capacity) * 100);
            return (
              <SCard key={ev.id} className="overflow-hidden flex flex-col">
                {/* Header */}
                <div className={`h-28 flex items-center justify-center text-5xl
                  ${ev.category === "Festival" ? "bg-gradient-to-br from-amber-100 to-orange-100" :
                    ev.category === "Spiritual" ? "bg-gradient-to-br from-purple-100 to-indigo-100" :
                    ev.category === "Volunteer" ? "bg-gradient-to-br from-emerald-100 to-teal-100" :
                    "bg-gradient-to-br from-sky-100 to-blue-100"}`}
                >
                  {ev.category === "Festival" ? "🎊" : ev.category === "Spiritual" ? "🙏" : ev.category === "Volunteer" ? "🤲" : "🎭"}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                      ${ev.category === "Festival" ? "bg-amber-100 text-amber-700" :
                        ev.category === "Spiritual" ? "bg-purple-100 text-purple-700" :
                        ev.category === "Volunteer" ? "bg-emerald-100 text-emerald-700" :
                        "bg-sky-100 text-sky-700"}`}
                    >
                      {ev.category}
                    </span>
                    <StatusBadge status={ev.status} />
                  </div>

                  <h3 className="font-display font-bold text-amber-900 leading-snug mb-2">{ev.title}</h3>
                  <p className="text-xs text-amber-600/70 mb-3 line-clamp-2 flex-1">{ev.description}</p>

                  <div className="space-y-1.5 text-xs text-amber-600/70 mb-4">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt />
                      {new Date(ev.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })} · {ev.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt /> {ev.venue}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaUsers /> {ev.registered.toLocaleString("en-IN")} / {ev.capacity.toLocaleString("en-IN")} registered
                    </p>
                  </div>

                  {/* Capacity bar */}
                  <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full ${pct > 90 ? "bg-red-400" : pct > 70 ? "bg-amber-400" : "bg-emerald-400"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => { setSelectedEvent(ev); setModalOpen(true); }}
                      className="flex-1 text-sm text-amber-700 border border-amber-200 py-2 rounded-xl hover:bg-amber-50 transition-colors font-medium"
                    >
                      Details
                    </button>
                    {isReg ? (
                      <button
                        onClick={() => unregister(ev.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                      >
                        <FaCheckCircle /> Registered
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(ev)}
                        disabled={ev.status === "Upcoming"}
                        className={`flex-1 text-sm font-semibold py-2 rounded-xl transition-all active:scale-95
                          ${ev.status !== "Upcoming"
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </SCard>
            );
          })}
        </div>
      )}

      {/* Detail / Registration Modal */}
      <Modal
        isOpen={modalOpen && !!selectedEvent}
        onClose={() => setModalOpen(false)}
        title={selectedEvent?.title}
        maxW="max-w-xl"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-amber-50 rounded-xl">
                <p className="text-xs text-amber-500/70 mb-0.5">Date & Time</p>
                <p className="font-semibold text-amber-900">
                  {new Date(selectedEvent.date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })} · {selectedEvent.time}
                </p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl">
                <p className="text-xs text-amber-500/70 mb-0.5">Venue</p>
                <p className="font-semibold text-amber-900">{selectedEvent.venue}</p>
              </div>
            </div>
            <p className="text-sm text-amber-800/80">{selectedEvent.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedEvent.tags.map((t) => (
                <span key={t} className="text-xs bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
            {!registeredIds.includes(selectedEvent.id) && selectedEvent.status === "Open" && (
              <PrimaryBtn onClick={confirmRegister} className="w-full">
                <FaCheckCircle /> Confirm Registration
              </PrimaryBtn>
            )}
            {registeredIds.includes(selectedEvent.id) && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-semibold text-center flex items-center justify-center gap-2">
                <FaCheckCircle /> You are registered for this event!
              </div>
            )}
          </div>
        )}
      </Modal>

      {toast && <SuccessToast message={`Registered for ${selectedEvent?.title}! Confirmation sent to your email.`} onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default EventsPage;