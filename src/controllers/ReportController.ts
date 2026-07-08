import { Request, Response } from 'express';
import { ReportService } from '../services/ReportService';
import { ApiResponser } from '../utils/ApiResponser';

export class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  public getAttendance = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { month, employee_id } = req.query;
      if (!month || typeof month !== 'string') {
        return ApiResponser.error(
          res,
          'Month query parameter is required in YYYY-MM format',
          [],
          400,
        );
      }

      const match = month.match(/^\d{4}-\d{2}$/);
      if (!match) {
        return ApiResponser.error(res, 'Invalid month format. Please use YYYY-MM', [], 400);
      }

      const employeeId = employee_id ? parseInt(String(employee_id), 10) : undefined;
      if (employee_id && isNaN(employeeId!)) {
        return ApiResponser.error(res, 'Invalid employee ID format', [], 400);
      }

      const report = await this.reportService.attendanceReport(month, employeeId);

      return ApiResponser.success(res, 'Attendance report generated successfully', report, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to generate report', [], 500);
    }
  };
}
