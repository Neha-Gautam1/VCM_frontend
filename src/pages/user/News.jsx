import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import { SCard, PageHeader, SearchBar } from "../../components/user/ui/UserUI";
import { newsItems } from "./data/mockData";
import { FaCalendarAlt, FaUser, FaBookmark, FaExternalLinkAlt, FaThumbtack } from "react-icons/fa";

const CATEGORIES = ["All", "Announcement", "Achievement", "Technology", "Infrastructure"];

const catColor = {
  Announcement: "bg-amber-100 text-amber-700 border-amber-200",
  Achievement: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Technology: "bg-sky-100 text-sky-700 border-sky-200",
  Infrastructure: "bg-orange-100 text-orange-700 border-orange-200",
};

const NewsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [bookmarked, setBookmarked] = useState([]);

  const filtered = newsItems.filter(
    (n) =>
      (category === "All" || n.category === category) &&
      (!search || n.title.toLowerCase().includes(search.toLowerCase()))
  );

  const pinned = filtered.filter((n) => n.isPinned);
  const regular = filtered.filter((n) => !n.isPinned);

  const toggleBookmark = (id) =>
    setBookmarked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const NewsCard = ({ news, large }) => (
    <SCard className={`overflow-hidden flex flex-col ${large ? "" : ""}`}>
      {/* Image placeholder */}
      <div className={`w-full ${large ? "h-48" : "h-32"} bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-6xl relative`}>
        {news.category === "Announcement" ? "📢" : news.category === "Achievement" ? "🏆" : news.category === "Technology" ? "💻" : "🏗️"}
        {news.isPinned && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            <FaThumbtack className="text-[8px]" /> Pinned
          </div>
        )}
        {news.isNew && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            NEW
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${catColor[news.category] || "bg-slate-100 text-slate-600"}`}>
            {news.category}
          </span>
          <button
            onClick={() => toggleBookmark(news.id)}
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${bookmarked.includes(news.id) ? "text-amber-600 bg-amber-100" : "text-amber-400 hover:bg-amber-50"}`}
          >
            <FaBookmark className="text-xs" />
          </button>
        </div>

        <h3 className={`font-display font-bold text-amber-900 leading-snug mb-2 ${large ? "text-lg" : "text-sm"}`}>
          {news.title}
        </h3>
        <p className="text-xs text-amber-700/70 mb-3 flex-1 line-clamp-3">{news.summary}</p>

        <div className="flex items-center justify-between text-[11px] text-amber-500/70">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><FaCalendarAlt />{new Date(news.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><FaUser />{news.author}</span>
          </div>
          <button
            onClick={() => alert(`Reading full article: ${news.title}`)}
            className="flex items-center gap-1 text-amber-600 hover:text-amber-800 font-semibold transition-colors"
          >
            Read <FaExternalLinkAlt className="text-[9px]" />
          </button>
        </div>
      </div>
    </SCard>
  );

  return (
    <UserLayout pageTitle="News & Updates">
      <PageHeader
        title="News & Announcements"
        subtitle="Stay informed with the latest updates from Vrindavan Chandrodaya Mandir"
        badge="Temple News"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search news..." />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${category === c ? "bg-amber-500 text-white shadow-sm" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">📌 Pinned</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            {pinned.map((n) => <NewsCard key={n.id} news={n} large />)}
          </div>
        </div>
      )}

      {/* Regular */}
      {regular.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">Latest</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regular.map((n) => <NewsCard key={n.id} news={n} />)}
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default NewsPage;
