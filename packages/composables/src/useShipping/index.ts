import {
  Context,
  useShippingFactory,
  UseShippingParams
} from '@vue-storefront/core';
import type { ShippingAddress } from '@vue-storefront/bagisto-api';
import type {
  UseShippingAddParams as AddParams
} from '../types';
import { useCart } from '../useCart';

const params: UseShippingParams<ShippingAddress, AddParams> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: useShipping.load');
    if (!context?.cart?.cart.value?.shippingAddress) {
      await context.cart.load();
    }

    return context?.cart.value?.shippingAddress || {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingDetails, customQuery }) => {
    console.log('Mocked: useShipping.save');
    const params = {
      type: 'shipping',
      shipping: shippingDetails,
      billing: shippingDetails,
      shippingAddressId: parseInt(customQuery?.shippingAddressId) || 0,
      billingAddressId: parseInt(customQuery?.shippingAddressId) || 0
    };

    const saveShippingResults = await context.$bagisto.api.saveShippingAddress(params);
    if (!saveShippingResults?.data) {
      await context?.cart.setCart(null);
      await context.cart.load();
    }

    const shippingResponse = saveShippingResults?.data?.saveCheckoutAddresses;

    if (shippingResponse?.cart) {
      await context?.cart.setCart(shippingResponse?.cart);
      await context.cart.load();
    }

    return shippingResponse ? context?.cart.value?.shippingAddress : {};
  }
};

export const useShipping = useShippingFactory<ShippingAddress, AddParams>(params);
