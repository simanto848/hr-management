import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import routes from './routes';

dotenv.config();

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// For photo uploads
const uploadPath = process.env.UPLOAD_PATH || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, '../', uploadPath)));

// Register Routes
app.use('/', routes);

// Health Check Route
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  // Handle Multer upload errors
  if (err.name === 'MulterError' || err.message === 'Only image files are allowed!') {
    res.status(400).json({ error: 'Bad Request', message: err.message });
    return;
  }

  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;
