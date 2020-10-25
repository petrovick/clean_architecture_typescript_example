import * as Adapters from '@adapters';
import { GenerateCustomer } from '@useCases';
import { Request, Response } from 'express';
 
export default async function generateCustomer(req: Request, res: Response) {
  const generateCustomerPresenter = new Adapters.Presenters.HTTPGenerateCustomerPresenter();
  const generateCustomerGateway = new Adapters.Gateways.GenerateCustomerGateway();

  const generateCustomerInteractor = new GenerateCustomer.GenerateCustomerInteractor(
    generateCustomerGateway,
    generateCustomerPresenter
  );

  const generateCustomerController = new Adapters.Controllers.HTTPGenerateCustomerController(req, generateCustomerInteractor);

  await generateCustomerController.run();
  const view = generateCustomerPresenter.view;

  if (view.message) {
    return res.status(view.statusCode)
      .end(view.message)
  }

  res.status(view.statusCode)
    .json(view.body);
}
