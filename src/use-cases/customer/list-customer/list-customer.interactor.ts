import { ListCustomers, OutputPort } from '@useCases';
import { ListCustomerDataInteractor } from '@useCases/common/list-customer-data';

export class ListCustomerInteractor {
  private _getCustomerDataInteractor: ListCustomerDataInteractor;
  private _presenter: OutputPort<ListCustomers.ListCustomerResponseDTO>;

  constructor(
    getCustomerDataInteractor: ListCustomerDataInteractor,
    presenter: OutputPort<ListCustomers.ListCustomerResponseDTO>
  ) {
    this._getCustomerDataInteractor = getCustomerDataInteractor;
    this._presenter = presenter;
  }

  public async execute() {    
    const listCustomerResult = await this._getCustomerDataInteractor
      .execute();

    if (!listCustomerResult.succeeded) {
      return this._presenter.show({
        failures: listCustomerResult.errors
      });
    }
    
    return this._presenter.show({
      success: listCustomerResult.value
    });
  }
}


