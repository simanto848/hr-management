import { Request, Response } from 'express';
import { AttendanceService } from '../services/AttendanceService';
import { ApiResponser } from '../utils/ApiResponser';

export class AttendanceController {
  private attendanceService: AttendanceService;

  constructor() {
    this.attendanceService = new AttendanceService();
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const employeeId = req.query.employee_id ? parseInt(String(req.query.employee_id), 10) : undefined;
      const date = req.query.date ? String(req.query.date) : undefined;
      const from = req.query.from ? String(req.query.from) : undefined;
      const to = req.query.to ? String(req.query.to) : undefined;
      const page = req.query.page ? parseInt(String(req.query.page), 10) : 1;
      const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 10;

      const result = await this.attendanceService.getAll(employeeId, date, from, to, page, limit);
      return ApiResponser.success(res, 'Attendance entries listed successfully', result, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to list attendance', [], 500);
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return ApiResponser.error(res, 'Invalid attendance ID', [], 400);
      }

      const attendance = await this.attendanceService.getById(id);
      if (!attendance) {
        return ApiResponser.error(res, 'Attendance entry not found', [], 404);
      }

      return ApiResponser.success(res, 'Attendance entry retrieved successfully', attendance, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to retrieve attendance', [], 500);
    }
  };

  public upsert = async (req: Request, res: Response): Promise<Response> => {
    try {
      const attendance = await this.attendanceService.createOrUpdate(req.body);
      return ApiResponser.success(res, 'Attendance recorded successfully', attendance, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to record attendance', [], 400);
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return ApiResponser.error(res, 'Invalid attendance ID', [], 400);
      }

      const { check_in_time } = req.body;
      const updated = await this.attendanceService.update(id, check_in_time);
      if (!updated) {
        return ApiResponser.error(res, 'Attendance entry not found', [], 404);
      }

      return ApiResponser.success(res, 'Attendance entry updated successfully', updated, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to update attendance', [], 400);
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return ApiResponser.error(res, 'Invalid attendance ID', [], 400);
      }

      const success = await this.attendanceService.delete(id);
      if (!success) {
        return ApiResponser.error(res, 'Attendance entry not found', [], 404);
      }

      return ApiResponser.success(res, 'Attendance entry deleted successfully', null, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to delete attendance', [], 500);
    }
  };
}
