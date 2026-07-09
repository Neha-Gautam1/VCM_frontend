const newsItems = [
  { title: "New Employee Wellness Center Opens on Campus", date: "July 2, 2026", category: "Announcement", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80" },
  { title: "VCM Celebrates Record Attendance at Janmashtami", date: "June 20, 2026", category: "Event Recap", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80" },
  { title: "Department Heads Meet for Q3 Planning Session", date: "June 10, 2026", category: "Internal", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80" },
];

const LatestNews = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">Stay Informed</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3">Latest News</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {newsItems.map((news) => (
            <div key={news.title} className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={news.img} alt={news.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-saffron-600 bg-saffron-50 px-3 py-1 rounded-full">{news.category}</span>
                  <span className="text-xs text-slate-400">{news.date}</span>
                </div>
                <h3 className="font-display font-bold text-slate-800 leading-snug">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;