import * as React from "react";

interface ToastContextType {
  show: (message: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const show = (msg: string) => {
    setMessage(msg);
    setOpen(true);
    setTimeout(() => setOpen(false), 2500);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {open && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
