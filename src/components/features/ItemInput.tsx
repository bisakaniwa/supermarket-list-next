'use client'

import { useState } from "react"
import { IconButton } from "../ui/IconButton";
import { CirclePlus } from "lucide-react";
import { addItem } from "@/actions/list-actions";
import { Input } from "../ui/Input";

export const ItemInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAdd = async () => {
    if (!value.trim()) return console.warn("valor vazio");

    await addItem({ itemName: value });
    setValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex flex-row w-full justify-center-safe gap-3 mt-8">
      <Input
        label="Adicione um item:"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="O que está faltando?"
        className="w-full"
      />
      <IconButton
        onClick={handleAdd}
        className="flex self-end-safe"
      >
        <CirclePlus />
      </IconButton>
    </div>
  )
}
