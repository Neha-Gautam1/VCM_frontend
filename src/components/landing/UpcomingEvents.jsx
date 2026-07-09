import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const events = [
  { day: "18", month: "Jul", title: "Guru Purnima Celebration", location: "Main Temple Hall", time: "6:00 AM" },
  { day: "27", month: "Jul", title: "Employee Town Hall Meeting", location: "Admin Auditorium", time: "4:00 PM" },
  { day: "15", month: "Aug", title: "Independence Day Seva Drive", location: "Campus Grounds", time: "9:00 AM" },
  { day: "26", month: "Aug", title: "Janmashtami Preparations Begin", location: "All Departments", time: "All Day" },
];

const UpcomingEvents = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">Mark Your Calendar</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3">Upcoming Events</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {events.map((event) => (
            <div key={event.title} className="flex items-center gap-5 bg-slate-50 hover:bg-gradient-to-r hover:from-saffron-50 hover:to-maroon-50 rounded-2xl p-6 transition-colors group">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-saffron-500 to-maroon-600 text-white flex flex-col items-center justify-center">
                <span className="font-display font-bold text-xl leading-none">{event.day}</span>
                <span className="text-[10px] uppercase mt-1">{event.month}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-800 mb-1.5">{event.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-saffron-500" /> {event.location}</span>
                  <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-saffron-500" /> {event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;