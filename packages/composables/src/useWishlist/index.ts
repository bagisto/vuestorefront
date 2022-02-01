/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/bagisto-api';
import { useUser } from '../useUser';
import { exit } from 'process';

const params: UseWishlistFactoryParams<any, any, Product> = {
  provide() {
    return {
      user: useUser()
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params) => {
    console.log('Mocked: useWishlist.load');
    const wishlistParams = {
      input: params?.customQuery?.input || {},
      page: params?.customQuery?.page || 1
    };
    if (context.user.value?.id) {
      wishlistParams.input = {customerId: parseInt(context.user.value?.id)};
    }
    const wishlistResult = await context.$bagisto.api.getWishlist(wishlistParams);

    return {
      results: wishlistResult?.data?.wishlists.data || null,
      pagination: wishlistResult?.data?.wishlists.paginatorInfo || null
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentWishlist, product }) => {
    console.log('Mocked: useWishlist.addItem');
    const data = {
      productId: parseInt(product?.id)
    };
    const addWishlistResults = await context.$bagisto.api.addToWishlist(data);

    const wishlistResponse = addWishlistResults?.data?.addToWishlist;
    if (wishlistResponse?.wishlist) {
      params.load(context, {});
      params.isInWishlist(context, { currentWishlist, product });
    }

    return wishlistResponse?.wishlist ? wishlistResponse?.wishlist : null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentWishlist, product }) => {
    console.log('Mocked: useWishlist.removeItem');
    const data = {productId: product?.productId ? parseInt(product?.productId) : parseInt(product?.id)};
    const removeResults = await context.$bagisto.api.removeFromWishlist(data);

    const wishlistResponse = removeResults?.data?.removeFromWishlist;
    if (wishlistResponse?.wishlist) {
      params.load(context, {});
      params.isInWishlist(context, { currentWishlist, product });
    }

    return wishlistResponse?.status ? wishlistResponse?.wishlist : null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: useWishlist.clear');
    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInWishlist: (context: Context, { currentWishlist, product }) => {
    if (!product) {
      return false;
    }

    let exist = false;
    const user = context?.user?.user.value;

    if (currentWishlist?.results && currentWishlist?.results.length > 0) {
      for (const wishlistProduct of currentWishlist.results) {
        if (user?.id && (wishlistProduct?.customerId === user?.id) && (wishlistProduct?.productId === product.id)) {
          exist = true;
          break;
        }
        if (!user?.id && wishlistProduct?.productId === product.id) {
          exist = true;
          break;
        }
      }
    }

    return exist;
  }
};

export const useWishlist = useWishlistFactory<any, any, Product>(params);
