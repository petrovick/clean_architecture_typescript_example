import { Router } from 'express';
import listProduct from '@infrastructure/web/actions/product/list-product';
import detailProduct from '@infrastructure/web/actions/product/detail-product';
import generateProduct from '@infrastructure/web/actions/product/generate-product';

import updateProduct from '@infrastructure/web/actions/product/update-product';
import destroyProduct from '@infrastructure/web/actions/product/destroy-product';

const router = Router();

router.route('/:id')
  .get(detailProduct);

router.route('/')
  .get(listProduct);

router.route('/')
  .post(generateProduct);

router.route('/:id')
  .put(updateProduct);

router.route('/:id')
  .delete(destroyProduct);

export default router;
