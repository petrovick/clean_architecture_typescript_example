import { ProductData } from '@useCases/common/dtos';

export interface ListProductResponseDTO {
  success?: ProductData[],
  failures?: string[]
};

