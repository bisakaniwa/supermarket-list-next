import { AddItemInput } from './types';

export const addItem = ({ itemName }: AddItemInput) => {
  try {
    let payload = {
      itemName,
      checked: false,
      created_at: new Date(),
    };

    console.log('Item adicionado', payload);
  } catch (error) {
    console.error("Falha ao adicionar o item:", error)
  }
};

export const getAllItems = async () => {

};
