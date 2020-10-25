import { Router } from 'express';
import detailCustomer from '@infrastructure/web/actions/customer/detail-customer';

const router = Router();

router.route('/:id')
  .get(detailCustomer);

export default router;
