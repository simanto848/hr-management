export interface Employee {
  id: number;
  name: string;
  age: number;
  designation: string;
  hiring_date: string | Date;
  date_of_birth: string | Date;
  salary: number | string;
  photo_path?: string | null;
  deleted_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export type NewEmployee = Omit<Employee, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
export type UpdateEmployee = Partial<NewEmployee>;
export type EmployeeWithOptionalPhoto = Omit<NewEmployee, 'photo_path'> & { photo_path?: string };
