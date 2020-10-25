import { DetailCustomer, OutputPort } from '@useCases';
import { GetCustomerDataInteractor } from '@useCases/common/get-customer-data';

export class DetailCustomerInteractor {
  private _getCustomerDataInteractor: GetCustomerDataInteractor;
  private _presenter: OutputPort<DetailCustomer.DetailCustomerResponseDTO>;

  constructor(
    getCustomerDataInteractor: GetCustomerDataInteractor,
    presenter: OutputPort<DetailCustomer.DetailCustomerResponseDTO>
  ) {
    this._getCustomerDataInteractor = getCustomerDataInteractor;
    this._presenter = presenter;
  }

  public async execute(customerId: string) {    
    const orderCustomerResult = await this._getCustomerDataInteractor
      .execute(customerId);

    if (!orderCustomerResult.succeeded) {
      return this._presenter.show({
        failures: orderCustomerResult.errors
      });
    }

    return this._presenter.show({
      success: orderCustomerResult.value
    });
  }
}


