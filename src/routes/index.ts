import { Router } from 'express';
import authRoutes from './authentication';
import employeesRoutes from './employees';
import attendanceRoutes from './attendance';
import reportsRoutes from './reports';

const router = Router();

router.use('/auth', authRoutes);
router.use('/employees', employeesRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/reports', reportsRoutes);

export default router;
