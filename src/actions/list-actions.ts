'use server'

import { prisma } from '@/lib/prisma';
import { ActionResponse, AddItemInput } from './types';
import { Item } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export const addItem = async (
  { name }: AddItemInput
): Promise<ActionResponse<Item>> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { success: false, message: 'Você não está logado!', statusCode: 401 }
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        checked: false,
        userId: session.user.id,
      },
    });

    revalidatePath('/');

    return { success: true, data: newItem, statusCode: 201 };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, message: 'Este item já existe na sua lista!', statusCode: 409 }
    }

    console.error("Falha ao adicionar o item:", error);
    return { success: false, message: "Falha ao adicionar o item.", statusCode: 500 };
  }
};

export const getAllItems = async (): Promise<Item[]> => {
  const session = await getServerSession(authOptions);

  try {
    const itemList = await prisma.item.findMany({
      where: {
        userId: session?.user.id,
      },
      orderBy: [
        { checked: 'asc' },
        { name: 'asc' },
      ]
    });

    return itemList;
  } catch (error) {
    console.error('Erro ao buscar lista:', error);
    return [];
  }
};

export const toggleItem = async (itemId: string) => {
  const session = await getServerSession(authOptions);

  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) return { success: false, error: "Item não encontrado", statusCode: 404 };

    const updatedItem = await prisma.item.updateMany({
      where: {
        id: itemId,
        userId: session?.user.id,
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
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return { success: false, error: "Você não está logado!", statusCode: 401 };

  try {
    await prisma.item.deleteMany({
      where: { 
        id: itemId,
        userId: session.user.id
      },
    });

    revalidatePath('/');
    return { success: true, statusCode: 200 };

  } catch (error) {
    console.error("Falha ao deletar item:", error);
    return { success: false, error: "Falha ao deletar item.", statusCode: 500 };
  }
};

export const updateItem = async (itemId: string, name: string, quantity: number) => {
  const session = await getServerSession(authOptions);

  try {
    const updatedItem = await prisma.item.updateMany({
      where: { 
        id: itemId,
        userId: session?.user.id,
      },
      data: { name, quantity },
    });
    revalidatePath('/');
    return { success: true, data: updatedItem, statusCode: 200 };
  } catch (error) {
    console.error("Falha ao atualizar item:", error);
    return { success: false, error: "Falha ao atualizar item.", statusCode: 500 };
  }
};

export const deleteAllItems = async () => {
  const session = await getServerSession(authOptions);

  try {
    await prisma.item.deleteMany({
      where: {
        userId: session?.user.id,
      },
    });

    revalidatePath('/');
    
    return { success: true, statusCode: 200 };
  } catch (error) {
    console.error("Falha ao deletar todos os itens:", error);
    return { success: false, error: "Falha ao deletar itens.", statusCode: 500 };
  }
};
