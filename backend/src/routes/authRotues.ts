import { Router } from 'express'
import authController from '../controllers/authController';

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/auth-check', authController.authCheck);
router.get('/get-role', authController.getRole);

export default router;
