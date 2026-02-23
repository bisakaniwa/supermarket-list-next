export type ActionResponse<T> =
  | { success: true; data: T, statusCode: number }
  | { success: false; message: string, statusCode: number };

export type AddItemInput = {
  name: string,
};
