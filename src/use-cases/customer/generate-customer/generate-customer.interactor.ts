import { Customer, Address, UniqueEntityID } from '@entities';
import { OutputPort, GenerateCustomer } from '@useCases';

export class GenerateCustomerInteractor {
  private _gateway: GenerateCustomer.GenerateCustomerGateway;
  private _presenter: OutputPort<GenerateCustomer.GenerateCustomerResponseDTO>;

  constructor(
    gateway: GenerateCustomer.GenerateCustomerGateway,
    presenter: OutputPort<GenerateCustomer.GenerateCustomerResponseDTO>
  ) {
    this._gateway = gateway;
    this._presenter = presenter;
  }

  public async execute(data: GenerateCustomer.GenerateCustomerRequestDTO) {
    let address: Address | undefined;

    if(!!data.address) {
      const addressOrError = Address.build(data.address);
      
      if(!addressOrError.succeeded) {
        return this._presenter.show({
          success: false,
          failures: ['missing_address']
        });
      }

      address = addressOrError.value;
    }

    if (!address) {
      return this._presenter.show({
        success: false,
        failures: ['missing_customer_address']
      });
    }

    const customerResult = Customer.build({
      address: address,
      birthdate: data.birthdate,
      cellphone: `${data.cellphone}`,
      document: data.document,
      email: data.email,
      name: data.name
    });
    console.log(customerResult)

    if (!customerResult.succeeded) {
      return this._presenter.show({
        success: false,
        failures: customerResult.errors
      });
    }

    const order = customerResult.value;

    try {
      await this._gateway.startTransaction();
      await this._gateway.save(order);
      await this._gateway.endTransaction();
    } catch (err) {
      return this._presenter.show({
        success: false,
        failures: ['unexpected_failure']
      });
    }

    return this._presenter.show({
      success: true
    });
  }
}