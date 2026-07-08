import { Response } from 'express';

export class ApiResponser {
  public static success(
    res: Response,
    message: string = 'Successful',
    data: any = null,
    statusCode: number = 200,
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  public static error(
    res: Response,
    message: string = 'Something went wrong',
    errors: any[] | null = [],
    statusCode: number = 500,
  ): Response {
    const response: {
      success: boolean;
      message: string;
      data: any;
      errors?: any[];
      timestamp: string;
    } = {
      success: false,
      message,
      data: null,
      timestamp: new Date().toISOString(),
    };

    if (errors !== null) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }
}