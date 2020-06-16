import RepositoryMapper from './repository.mapper';
import { LineItem, UniqueEntityID } from '@entities';

const sqlLineItemMapper: RepositoryMapper<LineItem> = {
  toDomain(lineItemRowDTO: any): LineItem {
    const lineItemProps = {
      productId: new UniqueEntityID(lineItemRowDTO.product_id),
      invoiceId: new UniqueEntityID(lineItemRowDTO.invoice_id),
      quantity: lineItemRowDTO.quantity
    };

    const uniqueId = new UniqueEntityID(lineItemRowDTO.id);
    return LineItem.build(lineItemProps, uniqueId).value;
  },

  toPersistence(lineItem: LineItem): any {
    return {
      id: lineItem.id.toValue(),
      invoice_id: lineItem.invoiceId.toValue(),
      product_id: lineItem.productId.toValue(),
      quantity: lineItem.quantity
    }
  }
}

export default sqlLineItemMapper;