import { Router } from 'express';
import authRoutes from './authentication';
import employeesRoutes from './employees';
import attendanceRoutes from './attendance';

const router = Router();

router.use('/auth', authRoutes);
router.use('/employees', employeesRoutes);
router.use('/attendance', attendanceRoutes);

export default router;
