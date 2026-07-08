/// <reference path="../types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponser } from '../utils/ApiResponser';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ApiResponser.error(res, 'Access denied. No token provided.', [], 401);
    return;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET || 'super_secret_hr_jwt_key_12345';

  try {
    const decoded = jwt.verify(token, jwtSecret) as {
      id: number;
      email: string;
      name: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    ApiResponser.error(res, 'Invalid or expired token.', [], 403);
  }
};
