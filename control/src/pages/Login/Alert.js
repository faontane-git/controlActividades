import { useEffect } from "react";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const alertStyles = {
    success: "bg-emerald-900/80 border-l-4 border-emerald-400 text-emerald-100",
    error: "bg-red-900/80 border-l-4 border-red-400 text-red-100",
  };

  const iconStyles = {
    success: <FiCheckCircle className="text-emerald-300" size={20} />,
    error: <FiAlertCircle className="text-red-300" size={20} />,
  };

  return (
    <div
      className={`fixed top-6 right-6 flex items-center gap-3 px-5 py-3 rounded-r-lg ${alertStyles[type]} shadow-lg animate-fadeIn z-50 backdrop-blur-sm`}
    >
      {iconStyles[type]}
      <span className="font-medium text-sm">{message}</span>
      <button
        onClick={onClose}
        className="ml-3 text-gray-300 hover:text-white"
      >
        <FiX size={18} />
      </button>
    </div>
  );
};