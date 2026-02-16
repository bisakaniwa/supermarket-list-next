export type ActionResponse<T> =
  | { success: true; data: T, statusCode: number }
  | { success: false; error: string, statusCode: number };

export type AddItemInput = {
  itemName: string,
};
