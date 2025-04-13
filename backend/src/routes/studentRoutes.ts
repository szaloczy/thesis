import { Router } from 'express'
import studentController from '../controllers/studentController';

const router = Router();

router.post('/student', studentController.create);
router.get('/student', studentController.getOne);

export default router;