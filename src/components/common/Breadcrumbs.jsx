import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumbs = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
      <FaHome className="text-xs" />
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <FaChevronRight className="text-[10px] text-slate-300" />
          <span className={i === items.length - 1 ? "text-slate-700 font-medium" : ""}>{item}</span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;