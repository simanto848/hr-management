import { Router } from 'express';
import authRoutes from './authentication';
import employeesRoutes from './employees';

const router = Router();

router.use('/auth', authRoutes);
router.use('/employees', employeesRoutes);

export default router;
