import { ProductData } from '@useCases/common/dtos';

export interface DetailProductResponseDTO {
  success?: ProductData,
  failures?: string[]
};

