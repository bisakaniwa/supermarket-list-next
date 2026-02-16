"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Modal } from "../ui/Modal";
import { deleteAllItems } from "@/actions/list-actions";

export const ResetButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    await deleteAllItems();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-primary text-sm font-medium border border-primary rounded-lg px-3 py-2 hover:bg-primary/10 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Nova Lista
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Criar Nova Lista"
        description="Tem certeza que deseja criar uma nova lista? A lista atual será excluída permanentemente."
        variant="danger"
        primaryAction={handleConfirm}
        primaryActionLabel="Sim, criar nova lista"
      />
    </>
  );
};
