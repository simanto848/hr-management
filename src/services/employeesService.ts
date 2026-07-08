import db from '../database/db';
import { Employee } from '../types/Employee';
import path from 'path';
import fs from 'fs';

export class EmployeesService {
  private deleteFile(filename?: string | null): void {
    if (!filename) return;
    const filePath = path.join(process.cwd(), process.env.UPLOAD_PATH || 'uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  public async getAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Employee[];
    pagination: { total: number; page: number; limit: number; totalPages: number };
  }> {
    const query = db<Employee>('employees').whereNull('deleted_at');
    if (search) {
      query.where('name', 'ilike', `%${search}%`);
    }

    const countQuery = query.clone();
    const countResult = await countQuery.count<{ count: string }>('* as count').first();
    const total = countResult ? parseInt(countResult.count, 10) : 0;

    const offset = (page - 1) * limit;
    const data = await query.select('*').orderBy('id', 'asc').limit(limit).offset(offset);

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

  public async getById(id: number): Promise<Employee | undefined> {
    return db<Employee>('employees').where({ id }).whereNull('deleted_at').first();
  }

  public async create(data: any, file?: Express.Multer.File): Promise<Employee> {
    const employeeData = { ...data };
    if (file) {
      employeeData.photo_path = file.filename;
    }

    // Parse numerical values which come as strings from multipart/form-data
    if (employeeData.age) {
      employeeData.age = parseInt(employeeData.age, 10);
    }
    if (employeeData.salary) {
      employeeData.salary = parseFloat(employeeData.salary);
    }

    try {
      const [newEmployee] = await db<Employee>('employees').insert(employeeData).returning('*');
      return newEmployee;
    } catch (error) {
      if (file) {
        this.deleteFile(file.filename);
      }
      throw error;
    }
  }

  public async update(
    id: number,
    data: any,
    file?: Express.Multer.File,
  ): Promise<Employee | undefined> {
    const currentEmployee = await this.getById(id);
    if (!currentEmployee) {
      if (file) {
        this.deleteFile(file.filename);
      }
      return undefined;
    }

    const updateData = { ...data };
    if (file) {
      updateData.photo_path = file.filename;
    }

    if (updateData.age) {
      updateData.age = parseInt(updateData.age, 10);
    }
    if (updateData.salary) {
      updateData.salary = parseFloat(updateData.salary);
    }

    try {
      if (file) {
        // Delete the old photo if it exists
        this.deleteFile(currentEmployee.photo_path);
      }

      const [updatedEmployee] = await db<Employee>('employees')
        .where({ id })
        .update({
          ...updateData,
          updated_at: new Date(),
        })
        .returning('*');

      return updatedEmployee;
    } catch (error) {
      if (file) {
        this.deleteFile(file.filename);
      }
      throw error;
    }
  }

  public async delete(id: number): Promise<boolean> {
    const employee = await this.getById(id);
    if (!employee) return false;

    await db<Employee>('employees').where({ id }).update({
      deleted_at: new Date(),
      updated_at: new Date(),
    });

    return true;
  }
}
