"use client";

import { Item } from "@prisma/client";
import { Checkbox } from "../ui/Checkbox";
import { SwipeToReveal } from "../ui/SwipeToReveal";
import { toggleItem, deleteItem, updateItem } from "@/actions/list-actions";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { QuantityChanger } from "../ui/QuantityChanger";
import { IconButton } from "../ui/IconButton";
import { Pencil, Trash2 } from "lucide-react";

type ListItemProps = {
  item: Item | Pick<Item, "id" | "name" | "quantity" | "checked" | "notes">;
};

export const ListItem = ({ item }: ListItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity ?? 1);

  const handleDelete = async () => {
    await deleteItem(item.id);
    setShowDeleteModal(false);
  };

  const handleEdit = async () => {
    if (editName.trim() !== "") {
      await updateItem(item.id, editName, editQuantity);
    }
    setShowEditModal(false);
  };

  return (
    <>
      <SwipeToReveal
        onDelete={() => setShowDeleteModal(true)}
        onEdit={() => {
          setEditName(item.name);
          setEditQuantity(item.quantity ?? 1);
          setShowEditModal(true);
        }}
      >
        <div className="flex items-center justify-between w-full pr-4">
          <Checkbox
            label={item.name}
            checked={item.checked}
            onChange={toggleItem.bind(null, item.id)}
          />
          <div className="hidden md:flex items-center gap-2">
            <IconButton
              onClick={() => {
                setEditName(item.name);
                setEditQuantity(item.quantity ?? 1);
                setShowEditModal(true);
              }}
              aria-label="Editar item"
              className="text-contrast hover:text-blue-500"
            >
              <Pencil className="w-4 h-4" />
            </IconButton>

            <IconButton
              onClick={() => setShowDeleteModal(true)}
              aria-label="Deletar item"
              className="text-contrast hover:text-red-500 mr-2"
            >
              <Trash2 className="w-4 h-4" />
            </IconButton>
            {(item.quantity ?? 1) > 0 && (
              <span className="text-main-text text-sm font-medium">
                {item.quantity}x
              </span>
            )}
          </div>
        </div>
      </SwipeToReveal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Excluir Item"
        description={`Tem certeza que deseja excluir "${item.name}"? Essa ação não pode ser desfeita.`}
        variant="danger"
        primaryAction={handleDelete}
        primaryActionLabel="Excluir"
      />

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Item"
        primaryAction={handleEdit}
        primaryActionLabel="Salvar"
      >
        <div className="flex flex-col gap-4">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Nome do item"
            label="Nome"
            autoFocus
          />
          <QuantityChanger
            value={editQuantity}
            onChange={setEditQuantity}
            label="Quantidade"
          />
        </div>
      </Modal>
    </>
  );
};

ListItem.displayName = "ListItem";
