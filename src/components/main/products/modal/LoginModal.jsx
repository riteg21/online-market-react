import { useEffect } from "react";
import { createPortal } from "react-dom";

export const LoginModal = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key == "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-60 bg-black/10 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-[90%] max-w-xl bg-white text-black p-6 rounded-2xl shadow-lg animate-fadeIn">
        <h1 className="text-3xl font-black text-orange-500 flex justify-center mb-10">
          LogIn
        </h1>
      </div>
    </div>,
    document.body
  );
};
