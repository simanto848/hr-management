import { Router } from 'express';
import { EmployeesController } from '../controllers/EmployeesController';
import { authenticateJWT } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { createEmployeeSchema, updateEmployeeSchema } from '../validators/employeesSchema';

const router = Router();
const controller = new EmployeesController();

router.use(authenticateJWT);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', upload.single('photo_path'), validateBody(createEmployeeSchema), controller.create);
router.put('/:id', upload.single('photo_path'), validateBody(updateEmployeeSchema), controller.update);
router.delete('/:id', controller.delete);

export default router;
