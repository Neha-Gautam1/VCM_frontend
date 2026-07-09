import { FaInbox } from "react-icons/fa";

const EmptyState = ({ icon: Icon = FaInbox, message = "No data found", subMessage, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Icon className="text-2xl text-slate-400" />
      </div>
      <p className="font-semibold text-slate-600">{message}</p>
      {subMessage && <p className="text-sm text-slate-400 mt-1 max-w-xs">{subMessage}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;