import * as Adapters from '@adapters';
import { GenerateProduct } from '@useCases';
import { Request, Response } from 'express';
 
export default async function generateProduct(req: Request, res: Response) {
  const generateProductPresenter = new Adapters.Presenters.HTTPGenerateProductPresenter();
  const generateProductGateway = new Adapters.Gateways.GenerateProductGateway();

  const generateProductInteractor = new GenerateProduct.GenerateProductInteractor(
    generateProductGateway,
    generateProductPresenter
  );

  const generateProductController = new Adapters.Controllers.HTTPGenerateProductController(req, generateProductInteractor);

  await generateProductController.run();
  const view = generateProductPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
