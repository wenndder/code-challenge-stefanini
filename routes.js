import { Router } from 'express';
import { employeeRouter } from './src/routes/employee';

const router = Router();

router.use('/employees', employeeRouter);

export { router };
