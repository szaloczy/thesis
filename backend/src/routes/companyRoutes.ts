import { Router } from 'express'
import companyController from '../controllers/companyController';

const router = Router();

router.get('/companies', companyController.getAll);
router.get('/company', companyController.getOne);

export default router;