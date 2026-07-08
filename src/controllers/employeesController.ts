import { Request, Response } from 'express';
import { EmployeesService } from '../services/EmployeesService';
import { ApiResponser } from '../utils/ApiResponser';

export class EmployeesController {
  private employeesService: EmployeesService;

  constructor() {
    this.employeesService = new EmployeesService();
  }

  private formatEmployeePhotoUrl(req: Request, employee: any): any {
    if (employee && employee.photo_path) {
      if (
        !employee.photo_path.startsWith('http://') &&
        !employee.photo_path.startsWith('https://')
      ) {
        const protocol = req.protocol;
        const host = req.get('host');
        employee.photo_path = `${protocol}://${host}/uploads/${employee.photo_path}`;
      }
    }
    return employee;
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const search = req.query.search ? String(req.query.search) : undefined;
      const page = req.query.page ? parseInt(String(req.query.page), 10) : 1;
      const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 10;

      const result = await this.employeesService.getAll(search, page, limit);
      const formattedData = result.data.map((emp) => this.formatEmployeePhotoUrl(req, { ...emp }));

      return ApiResponser.success(
        res,
        'Employees listed successfully',
        {
          ...result,
          data: formattedData,
        },
        200,
      );
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to list employees', [], 500);
    }
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return ApiResponser.error(res, 'Invalid employee ID', [], 400);
      }

      const employee = await this.employeesService.getById(id);
      if (!employee) {
        return ApiResponser.error(res, 'Employee not found', [], 404);
      }

      const formattedEmployee = this.formatEmployeePhotoUrl(req, { ...employee });
      return ApiResponser.success(res, 'Employee retrieved successfully', formattedEmployee, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to retrieve employee', [], 500);
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const newEmployee = await this.employeesService.create(req.body, req.file);
      const formattedEmployee = this.formatEmployeePhotoUrl(req, { ...newEmployee });
      return ApiResponser.success(res, 'Employee created successfully', formattedEmployee, 201);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to create employee', [], 400);
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return ApiResponser.error(res, 'Invalid employee ID', [], 400);
      }

      const updatedEmployee = await this.employeesService.update(id, req.body, req.file);
      if (!updatedEmployee) {
        return ApiResponser.error(res, 'Employee not found', [], 404);
      }

      const formattedEmployee = this.formatEmployeePhotoUrl(req, { ...updatedEmployee });
      return ApiResponser.success(res, 'Employee updated successfully', formattedEmployee, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to update employee', [], 400);
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return ApiResponser.error(res, 'Invalid employee ID', [], 400);
      }

      const success = await this.employeesService.delete(id);
      if (!success) {
        return ApiResponser.error(res, 'Employee not found or already deleted', [], 404);
      }

      return ApiResponser.success(res, 'Employee deleted successfully', null, 200);
    } catch (error: any) {
      return ApiResponser.error(res, error.message || 'Failed to delete employee', [], 500);
    }
  };
}
