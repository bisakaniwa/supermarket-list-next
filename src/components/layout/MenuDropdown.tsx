"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface MenuDropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

export default function MenuDropdown({ trigger, children }: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="cursor-pointer focus:outline-none focus:ring-1 focus:ring-contrast rounded-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </button>

      {isOpen && (
        <div 
          onClick={(e) => {
            // Previne que o clique nos itens propague e feche o modal de logout que será aberto logo em seguida
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="absolute left-0 z-40 w-48 mt-2 origin-top-left bg-background dark:bg-background border border-surface dark:border-header rounded-md shadow-lg outline-none animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="py-1 w-full">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}