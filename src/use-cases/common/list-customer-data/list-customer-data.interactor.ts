import { UniqueEntityID, Customer, Address } from '@entities';
import { ListCustomerData } from '@useCases';
import { CustomerData } from '@useCases/common/dtos';
import { Result } from '@shared/Result';

export class ListCustomerDataInteractor {
  private _gateway: ListCustomerData.ListCustomerDataGateway;

  constructor(gateway: ListCustomerData.ListCustomerDataGateway) {
    this._gateway = gateway;
  }

  public async execute(): Promise<Result<CustomerData[]>> {
    const constumers = await this._gateway.getAll();
    const customersData: CustomerData[] = constumers.map(customer => {
      const customerData: CustomerData = {
        id: `${customer.id.toValue()}`,
        document: customer.document,
        name: customer.name,
        cellphone: Number(customer.cellphone),
        email: customer.email,
        birthdate: customer.birthdate,
        address: customer.address.toValue()
      }
      return customerData
    }) 
    return Result.success<CustomerData[]>(customersData);
  }
}