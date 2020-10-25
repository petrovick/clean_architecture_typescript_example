import { UniqueEntityID, Customer, Address } from '@entities';
import { GetCustomerData } from '@useCases';
import { CustomerData } from '@useCases/common/dtos';
import { Result } from '@shared/Result';

export class GetCustomerDataInteractor {
  private _gateway: GetCustomerData.GetCustomerDataGateway;

  constructor(gateway: GetCustomerData.GetCustomerDataGateway) {
    this._gateway = gateway;
  }

  public async execute(customerRef: string | Customer): Promise<Result<CustomerData>> {
    let customer: Customer;

    if (customerRef instanceof Customer) {
      customer = customerRef;
    }

    if (!customer && typeof customerRef === 'string') {
      try {
        customer = await this._gateway
          .findCustomerById(new UniqueEntityID(customerRef));
      } catch (err) {
        return Result.fail<CustomerData>([
          'unexpected_failure'
        ]);
      }
    }

    if (!customer) {
      return Result.fail<CustomerData>([
        'customer_not_found'
      ]);
    }
    
    const address = Address.build(customer.address).value;

    const response: CustomerData = {
      id: customer.id.toString(),
      birthdate: customer.birthdate,
      cellphone: Number(customer.cellphone),
      document: customer.document,
      name: customer.name,
      email: customer.email,
      address: address
    };

    return Result.success<CustomerData>(response);
  }
}


