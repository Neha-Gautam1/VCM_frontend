import { useState } from "react";
import UserLayout from "../../components/user/layout/UserLayout";
import {
  SCard, PageHeader, SearchBar, StatusBadge, CardHeader, PrimaryBtn, SuccessToast
} from "../../components/user/ui/UserUI";
import { storeProducts, myOrders } from "./data/mockData";
import { FaShoppingCart, FaStar, FaPlus, FaCheck, FaBoxOpen } from "react-icons/fa";

const TempleStore = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [tab, setTab] = useState("shop");
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const categories = ["All", ...new Set(storeProducts.map((p) => p.category))];

  const filtered = storeProducts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const addToCart = (product) => {
    if (!cart.find((c) => c.id === product.id)) {
      setCart((prev) => [...prev, { ...product, qty: 1 }]);
      setToastMsg(`${product.name} added to cart!`);
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    }
  };

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const badgeColor = {
    Bestseller: "bg-amber-100 text-amber-700 border-amber-200",
    Premium: "bg-purple-100 text-purple-700 border-purple-200",
    New: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Popular: "bg-sky-100 text-sky-700 border-sky-200",
    "Out of Stock": "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <UserLayout pageTitle="Temple Store">
      <PageHeader
        title="Temple Store"
        subtitle="Purchase sacred items, prasad, books and devotional products"
        badge="Divine Shop"
        action={
          cart.length > 0 && (
            <button
              onClick={() => alert(`Checkout: ${cart.length} items · ₹${cartTotal.toLocaleString("en-IN")}`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-md hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              <FaShoppingCart /> Cart ({cart.length}) · ₹{cartTotal.toLocaleString("en-IN")}
            </button>
          )
        }
      />

      <div className="flex gap-2 mb-5">
        <button onClick={() => setTab("shop")} className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "shop" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>Shop</button>
        <button onClick={() => setTab("orders")} className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "orders" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>My Orders</button>
      </div>

      {tab === "shop" ? (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." />
            <div className="flex gap-2 flex-wrap">
              {categories.slice(0, 6).map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${category === c ? "bg-amber-500 text-white shadow-sm" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => {
              const inCart = cart.find((c) => c.id === product.id);
              const isOOS = product.stock === 0;
              return (
                <SCard key={product.id} className="overflow-hidden">
                  <div className="h-40 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center relative">
                    <span className="text-5xl">
                      {product.category === "Mala & Accessories" ? "📿" :
                       product.category === "Idols & Statues" ? "🗿" :
                       product.category === "Puja Essentials" ? "🪔" :
                       product.category === "Books" ? "📚" :
                       product.category === "Music" ? "🎵" :
                       product.category === "Prasad" ? "🍬" : "🛍️"}
                    </span>
                    {product.badge && (
                      <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor[product.badge] || "bg-slate-100 text-slate-500"}`}>
                        {product.badge}
                      </span>
                    )}
                    {isOOS && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-500">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-amber-500/70 uppercase tracking-wide font-semibold mb-1">{product.category}</p>
                    <h3 className="font-semibold text-amber-900 text-sm leading-snug mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <FaStar className="text-amber-400 text-xs" />
                      <span className="text-xs text-amber-600/70">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">₹{product.price.toLocaleString("en-IN")}</span>
                      <button
                        disabled={isOOS}
                        onClick={() => addToCart(product)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95
                          ${inCart ? "bg-emerald-100 text-emerald-700 border border-emerald-200" :
                            isOOS ? "bg-slate-100 text-slate-400 cursor-not-allowed" :
                            "bg-amber-500 text-white hover:bg-amber-600 shadow-sm"}`}
                      >
                        {inCart ? <><FaCheck />Added</> : isOOS ? "Unavailable" : <><FaPlus />Add</>}
                      </button>
                    </div>
                  </div>
                </SCard>
              );
            })}
          </div>
        </>
      ) : (
        <SCard className="p-6">
          <CardHeader title="My Orders" subtitle="Track your temple store purchases" />
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <FaBoxOpen className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-900">{order.item}</p>
                    <p className="text-xs text-amber-600/70 mt-0.5">
                      {new Date(order.date).toLocaleDateString("en-IN")} · {order.tracking}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="font-bold text-amber-900">₹{order.amount.toLocaleString("en-IN")}</p>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SCard>
      )}

      {toast && <SuccessToast message={toastMsg} onClose={() => setToast(false)} />}
    </UserLayout>
  );
};

export default TempleStore;
