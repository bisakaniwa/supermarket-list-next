"use client";

import { Item } from "@prisma/client";
import { Checkbox } from "../ui/Checkbox";
import { SwipeToReveal } from "../ui/SwipeToReveal";
import { toggleItem, deleteItem, updateItem } from "@/actions/list-actions";
import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";

type ListItemProps = {
  item: Item;
};

export const ListItem = ({ item }: ListItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(item.name);

  const handleDelete = async () => {
    await deleteItem(item.id);
    setShowDeleteModal(false);
  };

  const handleEdit = async () => {
    if (editName.trim() !== "") {
      await updateItem(item.id, editName);
    }
    setShowEditModal(false);
  };

  return (
    <>
      <SwipeToReveal
        onDelete={() => setShowDeleteModal(true)}
        onEdit={() => {
          setEditName(item.name); // Garante que o input comece com o nome atual
          setShowEditModal(true);
        }}
      >
        <Checkbox
          label={item.name}
          checked={item.checked}
          onChange={toggleItem.bind(null, item.id)}
        />
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
        <Input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Nome do item"
          autoFocus
        />
      </Modal>
    </>
  );
};

ListItem.displayName = "ListItem";
