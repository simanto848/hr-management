import { Router } from 'express';
import { AttendanceController } from '../controllers/AttendanceController';
import { authenticateJWT } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { createAttendanceSchema, updateAttendanceSchema } from '../validators/attendanceSchema';

const router = Router();
const controller = new AttendanceController();

router.use(authenticateJWT);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateBody(createAttendanceSchema), controller.upsert);
router.put('/:id', validateBody(updateAttendanceSchema), controller.update);
router.delete('/:id', controller.delete);

export default router;
