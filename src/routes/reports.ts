import { Router } from 'express';
import { ReportController } from '../controllers/ReportController';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();
const controller = new ReportController();

router.use(authenticateJWT);

router.get('/attendance', controller.getAttendance);

export default router;
