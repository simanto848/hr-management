import db from '../database/db';

export class ReportService {
  public async attendanceReport(month: string, employeeId?: number) {
    const empQuery = db('employees').whereNull('deleted_at');
    if (employeeId) {
      empQuery.where('id', employeeId);
    }

    const employees = await empQuery.select('id', 'name');

    const [yearStr, monthStr] = month.split('-');
    const year = parseInt(yearStr, 10);
    const monthNum = parseInt(monthStr, 10);
    const nextMonth = monthNum === 12 ? 1 : monthNum + 1;
    const nextYear = monthNum === 12 ? year + 1 : year;
    const nextMonthStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

    const attQuery = db('attendance')
      .where('date', '>=', `${month}-01`)
      .where('date', '<', nextMonthStr);
    if (employeeId) {
      attQuery.where('employee_id', employeeId);
    }

    const records = await attQuery;

    return employees.map((emp) => {
      const empRecords = records.filter((r) => r.employee_id === emp.id);
      const days_present = empRecords.length;
      const times_late = empRecords.filter((r) => r.check_in_time > '09:45:00').length;

      return {
        employee_id: emp.id,
        name: emp.name,
        days_present,
        times_late,
      };
    });
  }
}
