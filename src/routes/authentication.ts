import { Router } from 'express';
import { AuthenticationController } from '../controllers/authenticationController';
import { validateBody } from '../middleware/validation.middleware';
import { loginSchema } from '../validators/authenticationSchema';

const router = Router();
const controller = new AuthenticationController();

router.post('/login', validateBody(loginSchema), controller.login);

export default router;
