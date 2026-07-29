import { FaLandmark, FaQuoteLeft, FaUsers } from "react-icons/fa";

const council = [
  {
    name: "Madhu Pandit Dasa",
    role: "Chairman",
    initials: "MP",
    summary: "Born in 1956 in Nagercoil near Trivandrum, Madhu Pandit Dasa completed his B.Tech. in Civil Engineering before dedicating himself to the service of humanity as a full-time member of ISKCON in 1981.",
    detail: "His leadership spans temple development, the architectural design of cultural complexes, fundraising, and the training of dedicated teams serving spiritual and social initiatives.",
    tone: "from-amber-500 to-orange-700",
  },
  {
    name: "Chanchalapathi Dasa",
    role: "President",
    initials: "CD",
    summary: "Born in Bangalore in 1963, Chanchalapathi Dasa joined ISKCON Bangalore as a full-time dedicated member in 1984 after completing postgraduate studies in Electrical Communication Engineering.",
    detail: "As Temple President of Sri Sri Radha Vrindavanchandra Mandir, he leads the Group's projects in Vrindavan and supports programmes serving communities across the country.",
    tone: "from-rose-600 to-red-800",
  },
  {
    name: "Yudhisthira Krishna Dasa",
    role: "Vice President",
    initials: "YK",
    summary: "A medical student at M.S. Ramaiah Medical College, Yudhisthira Krishna Dasa came in touch with the Krishna Consciousness movement and dedicated his life to Srila Prabhupada's mission in 1997.",
    detail: "His service has included the Prasadam Department of ISKCON Bangalore and resource mobilisation initiatives for Vrindavan Chandrodaya Mandir.",
    tone: "from-indigo-600 to-blue-800",
  },
  {
    name: "Bharatarsabha Dasa",
    role: "Vice President",
    initials: "BD",
    summary: "Bharatarsabha Dasa joined ISKCON Bangalore as a missionary in 1992 while pursuing a Computer Science degree at Regional Engineering College, Calicut.",
    detail: "He serves as Vice President of Vrindavan Chandrodaya Mandir and oversees the organisation's communications and public relations, including important publication work.",
    tone: "from-emerald-600 to-teal-800",
  },
];

const Governance = () => (
  <section id="governance" className="relative overflow-hidden bg-slate-950 py-24 text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,.2),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(30,64,175,.35),_transparent_43%)]" />
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-amber-300"><FaLandmark /> Governance</span>
        <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">Guided by service, vision and stewardship</h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">Vrindavan Chandrodaya Mandir is managed in the spirit of Srila Prabhupada's instructions. Our Executive Council brings diverse experience together in service of spiritual, cultural and social endeavours.</p>
      </div>

      <div className="my-12 grid gap-5 rounded-3xl border border-white/10 bg-white/[.06] p-7 md:grid-cols-[auto_1fr] md:items-center">
        <FaQuoteLeft className="text-3xl text-amber-400" />
        <p className="text-lg italic leading-8 text-slate-200">“To broadcast the glories of Sri Krishna and His transcendental abode, Sri Vrindavana, all over the world, in a manner that the contemporary world can appreciate and derive the supreme benefit of pure love of Godhead.”</p>
      </div>

      <div className="mb-9 flex items-center justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-amber-300">Executive Council</p><h3 className="mt-2 font-display text-3xl font-bold">Meet our leadership</h3></div><span className="hidden items-center gap-2 text-sm text-slate-300 sm:flex"><FaUsers /> {council.length} council members</span></div>
      <div className="grid gap-6 md:grid-cols-2">
        {council.map((member) => <article key={member.name} className="group rounded-3xl border border-white/10 bg-white/[.07] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[.1]">
          <div className="flex gap-5"><div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${member.tone} text-2xl font-bold text-white shadow-lg ring-4 ring-white/10`}>{member.initials}</div><div><h4 className="font-display text-2xl font-bold text-white">{member.name}</h4><p className="mt-1 font-semibold text-amber-300">{member.role}</p><p className="mt-3 text-sm leading-6 text-slate-300">{member.summary}</p></div></div><p className="mt-5 border-t border-white/10 pt-5 text-sm leading-6 text-slate-400">{member.detail}</p>
        </article>)}
      </div>
      <p className="mt-8 text-center text-sm text-slate-400">Portrait spaces can be updated with official high-resolution council photos when they are available.</p>
    </div>
  </section>
);

export default Governance;
