import {
  Context,
  useBillingFactory,
  UseBillingParams
} from '@vue-storefront/core';
import type { BillingAddress } from '@vue-storefront/bagisto-api';
import { useCart } from '../useCart';
import type {
  UseBillingAddParams as AddParams
} from '../types';

const params: UseBillingParams<BillingAddress, AddParams> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: useBilling.load');

    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { params, billingDetails, customQuery }) => {
    console.log('Mocked: useBilling.save');
    const excludeIndex = ['customerId', 'cartId', 'orderId', 'shippingRates', 'id', 'addressType', 'additional', 'gender', 'defaultAddress', 'vatId', 'createdAt', 'updatedAt', '__typename'];
    const shippingAddress = context.cart?.cart.value?.shippingAddress;
    for (const key in shippingAddress) {
      if (excludeIndex.includes(key)) {
        delete shippingAddress[key];
      }
    }
    const paramDetails = {
      type: 'billing',
      shipping: shippingAddress,
      billing: billingDetails,
      shippingAddressId: 0,
      billingAddressId: parseInt(params?.billingAddressId) || 0
    };

    const saveBillingResults = await context.$bagisto.api.saveShippingAddress(paramDetails);

    if (!saveBillingResults?.data) {
      await context.cart.setCart(null);
      await context.cart.load();
    }

    const paymentMethods = saveBillingResults?.data?.saveCheckoutAddresses?.paymentMethods;

    if (saveBillingResults?.data?.paymentMethods?.cart) {
      context.cart.setCart(saveBillingResults?.data?.paymentMethods?.cart);
      await context.cart.load();
    }

    return paymentMethods ? paymentMethods : null;
  }
};

export const useBilling = useBillingFactory<BillingAddress, AddParams>(params);
