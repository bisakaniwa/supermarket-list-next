'use client'

import { useState } from "react"
import { IconButton } from "../ui/IconButton";
import { CirclePlus } from "lucide-react";
import { addItem } from "@/actions/lists/list";
import { Input } from "../ui/Input";

export const ItemInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAdd = () => {
    if (!value.trim()) return;

    return addItem({ itemName: value });
  };

  return (
    <div className="flex flex-row w-4/6 gap-3 mt-8">
      <Input
        label="Adicione um item:"
        value={value}
        onChange={handleChange}
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
