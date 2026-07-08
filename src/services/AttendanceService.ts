import db from '../database/db';
import { Attendance, NewAttendance } from '../types/Attendance';
import { Employee } from '../types/Employee';

export class AttendanceService {
  public async getAll(
    employeeId?: number,
    date?: string,
    from?: string,
    to?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Attendance[];
    pagination: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const query = db<Attendance>('attendance');

    if (employeeId) {
      query.where('employee_id', employeeId);
    }

    if (date) {
      query.where('date', date);
    }

    if (from) {
      query.where('date', '>=', from);
    }

    if (to) {
      query.where('date', '<=', to);
    }

    const countQuery = query.clone();
    const countResult = await countQuery.count<{ count: string }>('* as count').first();
    const total = countResult ? parseInt(countResult.count, 10) : 0;

    const offset = (page - 1) * limit;
    const data = await query
      .select('*')
      .orderBy('date', 'desc')
      .orderBy('check_in_time', 'asc')
      .limit(limit)
      .offset(offset);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  public async getById(id: number): Promise<Attendance | undefined> {
    return db<Attendance>('attendance').where({ id }).first();
  }

  public async createOrUpdate(data: NewAttendance): Promise<Attendance> {
    const { employee_id, date, check_in_time } = data;

    const employee = await db<Employee>('employees')
      .where({ id: employee_id })
      .whereNull('deleted_at')
      .first();
    if (!employee) {
      throw new Error('Active employee not found with the provided ID');
    }

    const existing = await db<Attendance>('attendance').where({ employee_id, date }).first();
    if (existing) {
      const [updated] = await db<Attendance>('attendance')
        .where({ id: existing.id })
        .update({ check_in_time })
        .returning('*');
      return updated;
    } else {
      const [created] = await db<Attendance>('attendance')
        .insert({ employee_id, date, check_in_time })
        .returning('*');
      return created;
    }
  }

  public async update(id: number, checkInTime: string): Promise<Attendance | undefined> {
    const existing = await this.getById(id);
    if (!existing) return undefined;

    const [updated] = await db<Attendance>('attendance')
      .where({ id })
      .update({ check_in_time: checkInTime })
      .returning('*');

    return updated;
  }

  public async delete(id: number): Promise<boolean> {
    const deletedCount = await db<Attendance>('attendance').where({ id }).del();
    return deletedCount > 0;
  }
}
