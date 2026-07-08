export interface Attendance {
  id: number;
  employee_id: number;
  date: string | Date;
  check_in_time: string;
}

export type NewAttendance = Omit<Attendance, 'id'>;
export type UpdateAttendance = Partial<Omit<NewAttendance, 'employee_id' | 'date'>>;
