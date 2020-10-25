import { CustomerData } from '@useCases/common/dtos';

export interface DetailCustomerResponseDTO {
  success?: CustomerData,
  failures?: string[]
};

