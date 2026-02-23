"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Modal } from "../ui/Modal";
import MenuDropdown from "../layout/MenuDropdown";
import Divider from "../ui/Divider";
import Link from "next/link";
import { CircleUserRound, LogOut, UserRoundPlus } from "lucide-react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!session) return null;

  const AvatarTrigger = (
    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 ring-2 ring-transparent hover:ring-gray-300 dark:hover:ring-gray-500 transition-all">
      {session.user?.image ? (
        <img
          src={session.user.image}
          alt={session.user?.name || "Avatar"}
          className="w-full h-full rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="text-lg font-bold text-gray-600 dark:text-gray-200 uppercase">
          {session.user?.name?.charAt(0) || "U"}
        </span>
      )}
    </div>
  );

  return (
    <>
      <MenuDropdown trigger={AvatarTrigger}>
        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-2 text-sm text-left text-main-text hover:bg-gray-100 dark:text-main-text dark:hover:bg-gray-700 transition-colors"
        >
          <CircleUserRound />
          Perfil
        </Link>

        <Divider />
        
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 py-2 text-sm text-left text-main-text hover:bg-gray-100 dark:text-main-text dark:hover:bg-gray-700 transition-colors"
        >
          <UserRoundPlus />
          Adicionar Usuário
        </button>

        <Divider />

        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-3 px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700 transition-colors"
        >
          <LogOut />
          Logout
        </button>
      </MenuDropdown>

      {isLogoutModalOpen && (
        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          title="Confirmar Logout"
          description="Você tem certeza que deseja sair?"
          variant="danger"
          primaryAction={() => signOut({ callbackUrl: '/' })}
          primaryActionLabel="Logout"
          secondaryAction={() => setIsLogoutModalOpen(false)}
          secondaryActionLabel="Cancelar"
        />
      )}
    </>
  );
}