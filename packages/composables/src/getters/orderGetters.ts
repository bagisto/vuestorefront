import { UserOrderGetters, AgnosticAttribute } from '@vue-storefront/core';
import type { Order, OrderItem } from '@vue-storefront/bagisto-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDate(order: Order): string {
  if (!order) {
    return '';
  }

  return order.createdAt || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(order: Order): string | null {
  if (!order) {
    return null;
  }

  return order?.id.toString() || null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStatus(order: Order): string {
  if (!order) {
    return '';
  }

  let orderStatus = '';

  switch (order?.status) {
    case 'processing':
      orderStatus = 'Processing';
      break;
    case 'completed':
      orderStatus = 'Complete';
      break;
    case 'canceled':
      orderStatus = 'Cancelled';
      break;
    case 'closed':
      orderStatus = 'Closed';
      break;
    case 'pending_payment':
      orderStatus = 'Pending Payment';
      break;
    case 'fraud':
      orderStatus = 'Fraud';
      break;

    default:
      orderStatus = 'Pending';
      break;
  }

  return orderStatus || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(order: Order): number | null {
  if (!order) {
    return 0;
  }

  return order.grandTotal || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(order: any): OrderItem[] {
  if (!order) {
    return [];
  }

  if (order?.results) {
    return order.results || [];
  }

  return order?.items || [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: OrderItem): string {
  if (!item) {
    return '';
  }

  return item?.product?.id || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: OrderItem): string {
  if (!item) {
    return '';
  }

  return item?.name || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: OrderItem): number {
  if (!item) {
    return 0;
  }

  return item?.qtyOrdered || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: OrderItem): number {
  if (!item) {
    return 0;
  }

  return item?.price || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSubTotal(item: OrderItem): number {
  if (!item) {
    return 0;
  }

  return item?.total || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line
function getOrdersTotal(orders: any): number {
  if (!orders && !orders?.total) {
    return 0;
  }

  return orders?.total || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: OrderItem, filterByAttributeName?: Array<string>): Record<string, AgnosticAttribute | string> {
  if (!item || !item?.additional) {
    return {};
  }

  const attributes = {};
  const additionalData = JSON.parse(item?.additional);
  if (additionalData?.attributes) {
    for (const attribute in additionalData?.attributes) {
      if (Object.prototype.hasOwnProperty.call(additionalData?.attributes, attribute)) {
        const element = additionalData?.attributes[attribute];
        const attributeName = element.attribute_name;

        attributes[attributeName] = element.option_label;
      }
    }
  }

  return attributes;
}

export const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal,
  getItemSubTotal,
  getItemAttributes
};
