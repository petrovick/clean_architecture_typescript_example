import { CustomerData } from '@useCases/common/dtos';

export interface ListCustomerResponseDTO {
  success?: CustomerData[],
  failures?: string[]
};

