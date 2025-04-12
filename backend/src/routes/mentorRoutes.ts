import { Router } from 'express'
import mentorController from '../controllers/mentorController';

const router = Router();

router.get('/mentor', mentorController.getAll);

export default router;