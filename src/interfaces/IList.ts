export interface ItemInterface {
  id: string,
  name: string,
  quantity?: number,
  note?: string,
  checked: boolean,
  created_at: string,
  updated_at?: string,
  // created_by?: User,
  // updated_by?: User,
};
