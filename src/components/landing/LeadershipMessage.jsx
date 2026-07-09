import { FaQuoteLeft } from "react-icons/fa";

const LeadershipMessage = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-maroon-800 to-maroon-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"></div>
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <span className="text-gold-400 font-semibold text-sm tracking-wide uppercase">A Message From Leadership</span>
        </div>

        <div className="bg-white/5 backdrop-blur rounded-3xl p-10 sm:p-14 border border-white/10">
          <FaQuoteLeft className="text-gold-400/40 text-4xl mb-6" />
          <p className="text-white/90 text-lg sm:text-xl leading-relaxed italic mb-10">
            Every employee who serves at Vrindavan Chandrodaya Mandir is part of something far
            greater than a workplace — you are a participant in a sacred mission that will inspire
            generations to come. This portal is our way of honoring your seva, keeping you informed,
            connected, and equipped to serve with excellence.
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/150?img=60"
              alt="Leadership"
              className="w-16 h-16 rounded-full border-2 border-gold-400 object-cover"
            />
            <div>
              <p className="text-white font-display font-bold">Acharya Devakinandan Das</p>
              <p className="text-white/60 text-sm">President, Vrindavan Chandrodaya Mandir</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipMessage;