const Skeleton = ({ className = "" }) => {
  return <div className={`bg-slate-200 rounded-lg animate-pulse ${className}`}></div>;
};

export default Skeleton;