'use server'

import { prisma } from '@/lib/prisma';
import { ActionResponse, AddItemInput } from './types';
import { Item } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const addItem = async (
  { itemName }: AddItemInput
): Promise<ActionResponse<Item>> => {
  try {
    const newItem = await prisma.item.create({
      data: {
        name: itemName,
        checked: false,
      },
    });

    revalidatePath('/');
    return { success: true, data: newItem, statusCode: 201 };
  } catch (error) {
    console.error("Falha ao adicionar o item:", error);
    return { success: false, error: "Falha ao adicionar o item.", statusCode: 500 };
  }
};

export const getAllItems = async (): Promise<Item[]> => {
  try {
    const itemList = await prisma.item.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return itemList;
  } catch (error) {
    console.error('Erro ao buscar suculentas:', error);
    return [];
  }
};

export const toggleItem = async (itemId: string) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) return { success: false, error: "Item não encontrado", statusCode: 404 };

    const updatedItem = await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        checked: !item.checked,
      },
    });

    revalidatePath('/');
    return { success: true, data: updatedItem, statusCode: 200 };
  } catch (error) {
    console.error("Falha ao alternar o item:", error);
    return { success: false, error: "Falha ao atualizar o item.", statusCode: 500 };
  }
}

export const deleteItem = async (itemId: string) => {
  try {
    await prisma.item.delete({
      where: { id: itemId },
    });

    revalidatePath('/');
    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error("Falha ao deletar item:", error);
    return { success: false, error: "Falha ao deletar item.", statusCode: 500 };
  }
};

export const updateItem = async (itemId: string, name: string) => {
  try {
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { name },
    });
    revalidatePath('/');
    return { success: true, data: updatedItem, statusCode: 200 };
  } catch (error) {
    console.error("Falha ao atualizar item:", error);
    return { success: false, error: "Falha ao atualizar item.", statusCode: 500 };
  }
};
