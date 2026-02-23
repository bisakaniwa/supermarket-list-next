'use client'

import { useState } from "react"
import { IconButton } from "../ui/IconButton";
import { CirclePlus, Loader2 } from "lucide-react";
import { addItem } from "@/actions/list-actions";
import { Input } from "../ui/Input";
import { Item } from "@prisma/client";
import { Snackbar, SnackbarVariant } from "../ui/Snackbar";

type ItemInputProps = {
  list: Pick<Item, "id" | "name">[];
}

export const ItemInput = ({ list }: ItemInputProps) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    variant: SnackbarVariant;
  }>({
    isOpen: false,
    message: "",
    variant: "success",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (error) setError(null);
  };

  const handleAdd = async () => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return setError("Insira o nome de um item!");

    const alreadyExists = list.some((item) => item.name.toLowerCase() === trimmedValue.toLocaleLowerCase());

    if (alreadyExists) return setError("Esse item já está na lista!");

    try {
      setLoading(true);
      setError(null);

      const result = await addItem({ name: value });

      if (!result.success) {
        setError(result.message);
        return;
      }

      setValue('');
      setSnackbar({
        isOpen: true,
        message: "Item adicionado!",
        variant: "success",
      });
    } catch (error) {
      setSnackbar({
        isOpen: true,
        message: "Ocorreu um erro inesperado! Por favor, tente novamente.",
        variant: "danger",
      })
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !loading) {
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
        error={error}
        disabled={loading}
      />
      <IconButton
        onClick={handleAdd}
        className="flex self-end-safe"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : <CirclePlus />}
      </IconButton>

      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        variant={snackbar.variant}
        onClose={() => setSnackbar((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  )
}
