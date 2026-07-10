import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import { SCard, PageHeader, SearchBar, EmptyBox } from "../../components/user/ui/UserUI";
import { libraryBooks } from "./data/mockData";
import { FaBook, FaDownload, FaBookmark, FaStar, FaLanguage, FaFilter } from "react-icons/fa";

const CATEGORIES = ["All", "Scripture", "Devotional", "Biography", "Stotra"];
const LANGUAGES = ["All", "English", "Hindi", "Sanskrit"];

const SpiritualLibrary = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");
  const [bookmarked, setBookmarked] = useState([]);

  const filtered = libraryBooks.filter((b) =>
    (category === "All" || b.category === category) &&
    (language === "All" || b.language === language) &&
    (!search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleBookmark = (id) => {
    setBookmarked((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const catColors = {
    Scripture: "bg-amber-100 text-amber-700",
    Devotional: "bg-orange-100 text-orange-700",
    Biography: "bg-purple-100 text-purple-700",
    Stotra: "bg-rose-100 text-rose-700",
  };

  return (
    <UserLayout pageTitle="Spiritual Library">
      <PageHeader
        title="Spiritual Library"
        subtitle="Read, download and study sacred texts, devotional literature and more"
        badge="Digital Library"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books, authors..." />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${category === c ? "bg-amber-500 text-white shadow-sm" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {LANGUAGES.map((l) => (
            <button key={l} onClick={() => setLanguage(l)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${language === l ? "bg-orange-500 text-white shadow-sm" : "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyBox icon="📚" title="No books found" subtitle="Try a different search or category." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((book) => (
            <SCard key={book.id} className="p-4 flex flex-col">
              {/* Book cover */}
              <div className="h-36 rounded-xl bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 border border-amber-200 flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="text-5xl">📖</div>
                <div className="absolute top-2 left-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColors[book.category] || "bg-slate-100 text-slate-600"}`}>
                    {book.category}
                  </span>
                </div>
                {!book.available && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">Unavailable</span>
                  </div>
                )}
              </div>

              <h3 className="font-display font-bold text-amber-900 text-sm leading-snug mb-1 line-clamp-2">{book.title}</h3>
              <p className="text-xs text-amber-600/70 mb-2 line-clamp-1">{book.author}</p>

              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-0.5 text-amber-400 text-xs">
                  <FaStar />{book.rating}
                </span>
                <span className="text-amber-300">·</span>
                <span className="text-xs text-amber-600/70 flex items-center gap-1"><FaLanguage />{book.language}</span>
                <span className="text-amber-300">·</span>
                <span className="text-xs text-amber-600/70">{book.pages}pp</span>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  disabled={!book.available}
                  onClick={() => alert(`Reading: ${book.title}`)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95
                    ${book.available ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                >
                  {book.available ? "Read Now" : "Unavailable"}
                </button>
                <button
                  onClick={() => book.available && alert(`Downloading: ${book.title}`)}
                  disabled={!book.available}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-amber-200 text-amber-600 hover:bg-amber-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Download PDF"
                >
                  <FaDownload className="text-xs" />
                </button>
                <button
                  onClick={() => toggleBookmark(book.id)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-colors
                    ${bookmarked.includes(book.id) ? "bg-amber-500 border-amber-500 text-white" : "border-amber-200 text-amber-500 hover:bg-amber-50"}`}
                  title="Bookmark"
                >
                  <FaBookmark className="text-xs" />
                </button>
              </div>
            </SCard>
          ))}
        </div>
      )}
    </UserLayout>
  );
};

export default SpiritualLibrary;
