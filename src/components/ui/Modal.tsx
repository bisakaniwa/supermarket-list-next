"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  primaryAction?: () => void;
  primaryActionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  variant?: "danger" | "primary";
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  primaryAction,
  primaryActionLabel = "Confirmar",
  secondaryAction,
  secondaryActionLabel = "Cancelar",
  variant = "primary",
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  // Garante que o portal só seja renderizado no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloqueia o scroll da página quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-card rounded-xl shadow-lg animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-1 border-b border-contrast/10">
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          <IconButton onClick={onClose} aria-label="Fechar">
            <X className="w-5 h-5" />
          </IconButton>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {description && <p className="text-contrast">{description}</p>}
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 bg-surface/50 rounded-b-xl">
          <button
            onClick={secondaryAction || onClose}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-contrast hover:text-text transition-colors"
          >
            {secondaryActionLabel}
          </button>
          {primaryAction && (
            <button
              onClick={primaryAction}
              className={`cursor-pointer px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${variant === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              {primaryActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
