"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export type SnackbarVariant = "success" | "danger" | "warning" | "info";

interface SnackbarProps {
  isOpen: boolean;
  message: string;
  variant?: SnackbarVariant;
  onClose: () => void;
}

export const Snackbar = ({
  isOpen,
  message,
  variant = "info",
  onClose,
}: SnackbarProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Dicionário de estilos para os temas claro e escuro (cores suaves e bordas)
  const variantStyles: Record<SnackbarVariant, string> = {
    success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/80 dark:text-green-200 dark:border-green-800",
    danger: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/80 dark:text-red-200 dark:border-red-800",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/80 dark:text-yellow-200 dark:border-yellow-800",
    info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-800",
  };

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between gap-3 w-full max-w-sm px-4 py-3 rounded-2xl border shadow-lg backdrop-blur-sm animate-in slide-in-from-bottom-8 fade-in duration-300 ${variantStyles[variant]}`}
        role="alert"
      >
        <p className="text-sm font-medium leading-tight">{message}</p>
        
        <button
          onClick={onClose}
          className="shrink-0 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};