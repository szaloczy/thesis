import { Router } from 'express'
import studentController from '../controllers/studentController';

const router = Router();

router.post('/student', studentController.create);

export default router;