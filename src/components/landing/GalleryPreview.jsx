const galleryImages = [
  { src: "https://images.unsplash.com/photo-1609950547346-a4f431435b2b?w=500&q=80", label: "Main Temple" },
  { src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80", label: "Architecture" },
  { src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80", label: "Gardens" },
  { src: "https://images.unsplash.com/photo-1590766940554-153a5c1a3f37?w=500&q=80", label: "Campus Grounds" },
  { src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80", label: "Festival Celebration" },
  { src: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=500&q=80", label: "Community Seva" },
];

const GalleryPreview = () => {
  return (
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-saffron-600 font-semibold text-sm tracking-wide uppercase">Glimpses</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 mt-3">Gallery Preview</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-card cursor-pointer h-64">
              <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-semibold text-sm">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;