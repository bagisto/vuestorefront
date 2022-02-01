import { useShippingProviderFactory, UseShippingProviderParams, Context } from '@vue-storefront/core';
import type { ShippingProvider, ShippingMethod } from '@vue-storefront/bagisto-api';
import { useCart } from '../useCart';

const params: UseShippingProviderParams<any, ShippingMethod> = {
  provide() {
    return useCart();
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: loadShippingProvider');
    if (customQuery.type === 'payment') {
      const shippingAddress = context?.cart.value?.shippingAddress;
      const billingAddress = context?.cart.value?.billingAddress;
      const shippingRate = context?.cart.value?.selectedShippingRate;
      if (shippingAddress && billingAddress && shippingRate) {
        const params = {
          shippingMethod: shippingRate.method
        };
        const paymentMethodResults = await context.$bagisto.api.saveShippingMethod(params);

        if (paymentMethodResults?.data?.paymentMethods?.cart) {
          context.setCart(paymentMethodResults?.data?.paymentMethods?.cart);
        }

        const paymentMethods = paymentMethodResults?.data?.paymentMethods?.paymentMethods;

        return paymentMethods ? paymentMethods : null;
      }
    }

    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingMethod, customQuery }) => {
    console.log('Mocked: saveShippingProvider');
    const params = {
      shippingMethod: shippingMethod
    };
    if (customQuery?.actionType && customQuery.actionType === 'shipping') {
      const shippingMethodResults = await context.$bagisto.api.saveShippingMethod(params);
      if (shippingMethodResults?.data?.paymentMethods?.cart) {
        context.setCart(shippingMethodResults?.data?.paymentMethods?.cart);
      }

      return shippingMethodResults?.data?.paymentMethods?.paymentMethods || null;
    } else if (customQuery?.actionType && customQuery.actionType === 'payment') {

      const params = {
        payment: {
          method: shippingMethod
        }
      };
      const paymentMethodResults = await context.$bagisto.api.savePaymentMethod(params);
      if (paymentMethodResults?.data?.savePayment?.cart) {
        context.setCart(paymentMethodResults?.data?.savePayment?.cart);
      }

      return paymentMethodResults?.data?.savePayment || null;
    }

    return null;
  }
};

export const useShippingProvider = useShippingProviderFactory<any, ShippingMethod>(params);
