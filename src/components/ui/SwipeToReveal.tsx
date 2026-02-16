"use client";

import { useState, useRef, TouchEvent } from "react";
import { Trash2, Pencil } from "lucide-react";

interface SwipeToRevealProps {
  children: React.ReactNode;
  onDelete: () => Promise<void> | void;
  onEdit?: () => void;
}

export const SwipeToReveal = ({ children, onDelete, onEdit }: SwipeToRevealProps) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startX = useRef<number | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startX.current === null) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;

    // Apenas permite arrastar para a esquerda (valores negativos)
    // Limitamos a -160px para acomodar os dois botões
    if (diff < 0 && diff > -160) {
      setOffsetX(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    startX.current = null;

    // Se arrastou o suficiente, "trava" aberto para mostrar os botões
    if (offsetX < -60) {
      setOffsetX(-128); // Largura dos dois botões (w-32 = 128px)
    } else {
      setOffsetX(0);
    }
  };

  const handleDeleteClick = () => {
    onDelete();
    setOffsetX(0);
  };

  const handleEditClick = () => {
    if (onEdit) onEdit();
    setOffsetX(0);
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Camada de Fundo (Ações) */}
      <div
        className={`absolute inset-y-0 right-0 flex w-32 transition-opacity duration-200 ${offsetX < 0 ? 'opacity-100' : 'opacity-0'}`}
      >
        <button
          onClick={handleEditClick}
          className="w-16 bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
          aria-label="Editar"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={handleDeleteClick}
          className="w-16 bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
          aria-label="Excluir"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Camada da Frente (Conteúdo do Item) */}
      <div
        ref={itemRef}
        className="relative bg-card touch-pan-y"
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isSwiping ? 'none' : 'transform 0.2s ease-out'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};
