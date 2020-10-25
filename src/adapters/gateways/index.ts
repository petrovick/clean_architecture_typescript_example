import BaseRepository from './repositories/base-repository';
import MixCustomerRepository from './repositories/customer.rep';
import MixProductRepository from './repositories/product.rep';
import MixOrderRepository from './repositories/order.rep';
import MixInvoiceService from './services/invoice.service';

export { Mapper, Mappers } from './mappers';
export { MapperRegistry } from './mapper-registry';
export { InvoiceGateway } from './services/invoice.service';
export { OrderData, InvoiceData } from '@useCases/common/dtos'

export const GetOrderDataGateway = MixOrderRepository(BaseRepository);
export const GenerateOrderGateway = MixCustomerRepository(MixProductRepository(BaseRepository));
export const GenerateOrderInvoiceGateway = MixInvoiceService(MixOrderRepository(BaseRepository));
export const GetProductDataGateway = MixProductRepository(BaseRepository)

export const ListProductDataGateway = MixProductRepository(BaseRepository);
export const GenerateProductGateway = MixProductRepository(BaseRepository);
export const UpdateProductGateway = MixProductRepository(BaseRepository);
export const DestroyProductGateway = MixProductRepository(BaseRepository);

export const GetCustomerDataGateway = MixCustomerRepository(BaseRepository);
export const GenerateCustomerGateway = MixCustomerRepository(BaseRepository);