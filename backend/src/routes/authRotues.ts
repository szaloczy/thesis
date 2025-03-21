import { Router } from 'express'
import authController from '../controllers/authController';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/auth-check', authController.authCheck);

export default router;
