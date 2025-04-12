import { Router } from 'express'
import companyController from '../controllers/companyController';

const router = Router();

router.get('/company', companyController.getAll);

export default router;