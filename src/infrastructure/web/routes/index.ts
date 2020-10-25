import { Router } from 'express';
import OrderRouter from './order';
import ProductRouter from './product';
import CustomerRouter from './customer';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/order', OrderRouter);
router.use('/product', ProductRouter);
router.use('/customer', CustomerRouter);

// Export the base-router
export default router;
