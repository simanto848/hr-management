import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ApiResponser } from '../utils/ApiResponser';

export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      ApiResponser.error(res, 'Validation error', errorDetails, 400);
      return;
    }
    next();
  };
};
