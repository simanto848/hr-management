export interface HrUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export type NewHrUser = Omit<HrUser, 'id' | 'created_at' | 'updated_at'>;
export type UpdateHrUser = Partial<NewHrUser>;
