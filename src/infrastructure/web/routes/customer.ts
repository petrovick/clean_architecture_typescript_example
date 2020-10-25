import { Router } from 'express';
import detailCustomer from '@infrastructure/web/actions/customer/detail-customer';
import generateCustomer from '@infrastructure/web/actions/customer/generate-customer';

const router = Router();

router.route('/:id')
  .get(detailCustomer);

  router.route('/')
    .post(generateCustomer);

export default router;
