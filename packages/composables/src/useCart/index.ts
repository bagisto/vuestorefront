import {
  Context,
  useCartFactory,
  UseCartFactoryParams
} from '@vue-storefront/core';
import type {
  Cart,
  CartItem,
  Product
} from '@vue-storefront/bagisto-api';

const params: UseCartFactoryParams<Cart, CartItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: useCart.load');
    const cartResults = await context.$bagisto.api.getCart(customQuery);

    return cartResults?.data?.cartDetail || null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: useCart.addItem');
    const data = {
      product, quantity, customQuery
    };

    const addItemToCartResults = await context.$bagisto.api.addToCart(data);
    params.load(context, {});
    return addItemToCartResults?.data?.addItemToCart?.cart || null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    console.log('Mocked: useCart.removeItem');
    const params = { id: product?.id };
    const removeItemToCartResults = await context.$bagisto.api.removeFromCart(params);

    return removeItemToCartResults?.data?.removeCartItem?.cart || null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    console.log('Mocked: useCart.updateItemQty');
    const params = {
      qty: [{
        cartItemId: product?.id,
        quantity: quantity
      }]
    };
    const updateItemToCartResults = await context.$bagisto.api.updateToCart(params);

    return updateItemToCartResults?.data?.updateItemToCart?.cart || null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    console.log('Mocked: useCart.clear');
    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: useCart.applyCoupon');
    return {
      updatedCart: null,
      updatedCoupon: null
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    console.log('Mocked: useCart.removeCoupon');
    return {
      updatedCart: null
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    if (currentCart?.items && currentCart?.items.length > 0) {
      for (const cartItem of currentCart.items) {
        if (cartItem.productId === product.id) {
          return true;
        }
      }
    }

    return false;
  }
};

export const useCart = useCartFactory<Cart, CartItem, Product>(params);
