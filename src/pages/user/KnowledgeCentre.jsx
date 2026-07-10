import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import { SCard, PageHeader, SearchBar } from "../../components/user/ui/UserUI";
import { knowledgeCentreContent } from "./data/mockData";
import { FaEye, FaPlay, FaHeadphones, FaBookOpen, FaFire } from "react-icons/fa";

const CATEGORIES = ["All", "Philosophy", "Sadhana", "Sacred Places", "Chanting", "Lifestyle", "Lila"];

const typeIcon = { Article: <FaBookOpen />, Video: <FaPlay />, Audio: <FaHeadphones /> };
const typeBg = { Article: "bg-blue-100 text-blue-700", Video: "bg-red-100 text-red-700", Audio: "bg-purple-100 text-purple-700" };

const KnowledgeCentre = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = knowledgeCentreContent.filter((c) =>
    (category === "All" || c.category === category) &&
    (!search || c.title.toLowerCase().includes(search.toLowerCase()) || c.author.toLowerCase().includes(search.toLowerCase()))
  );

  const featured = knowledgeCentreContent.sort((a, b) => b.views - a.views).slice(0, 1)[0];

  return (
    <UserLayout pageTitle="Knowledge Centre">
      <PageHeader
        title="Knowledge Centre"
        subtitle="Explore articles, videos and audio on Vaishnava philosophy, sadhana and devotional life"
        badge="Spiritual Learning"
      />

      {/* Featured */}
      {featured && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3d1a00] to-[#6b2f00] p-7 mb-7 shadow-lg shadow-amber-900/20">
          <div className="absolute -top-8 -right-8 w-36 h-36 bg-amber-500/10 rounded-full" />
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full mb-3">
            <FaFire /> Most Read
          </span>
          <h3 className="font-display font-bold text-xl text-white mb-2 max-w-xl">{featured.title}</h3>
          <p className="text-amber-300/70 text-sm mb-4">By {featured.author} · {featured.category}</p>
          <button
            onClick={() => alert(`Opening: ${featured.title}`)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white font-semibold text-sm hover:bg-amber-600 transition-colors shadow-md"
          >
            <FaBookOpen /> Read Article
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search topics, authors..." />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${category === c ? "bg-amber-500 text-white shadow-sm" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <SCard key={item.id} className="p-5 cursor-pointer group" onClick={() => alert(`Opening: ${item.title}`)}>
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${typeBg[item.type]}`}>
                {typeIcon[item.type]} {item.type}
              </span>
              <span className="text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
            </div>
            <h3 className="font-display font-semibold text-amber-900 leading-snug mb-3 group-hover:text-amber-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-amber-600/70 mb-3">By {item.author}</p>
            <div className="flex items-center justify-between text-xs text-amber-500/60">
              <span className="flex items-center gap-1"><FaEye /> {item.views.toLocaleString("en-IN")} views</span>
              <span>{item.duration}</span>
            </div>
          </SCard>
        ))}
      </div>
    </UserLayout>
  );
};

export default KnowledgeCentre;
