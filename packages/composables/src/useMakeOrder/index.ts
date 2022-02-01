import {
  Context,
  useMakeOrderFactory,
  UseMakeOrderFactoryParams
} from '@vue-storefront/core';
import type { Order } from '@vue-storefront/bagisto-api';
import { useCart } from '../useCart';

const factoryParams: UseMakeOrderFactoryParams<Order> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, { customQuery }) => {
    console.log('Mocked: useMakeOrder.make');

    const shippingAddress = context?.cart?.cart.value?.shippingAddress;
    const billingAddress = context?.cart?.cart.value?.billingAddress;
    const shippingRate = context?.cart?.cart.value?.selectedShippingRate;
    const paymentMethod = context?.cart?.cart.value?.payment?.method;
    if (shippingAddress && billingAddress && shippingRate && paymentMethod) {
      const orderResults = await context.$bagisto.api.makeOrder();

      if (!orderResults?.data) {
        await context.cart.setCart(null);
        await context.cart.load();
      }

      const orderResponse = orderResults?.data?.placeOrder;

      if (!orderResponse?.redirectUrl && orderResponse?.success) {
        context.cart.setCart(null);
      }

      return orderResponse?.order || null;
    }

    return null;
  }
};

export const useMakeOrder = useMakeOrderFactory<Order>(factoryParams);
