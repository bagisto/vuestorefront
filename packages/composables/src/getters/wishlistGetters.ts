import {
  WishlistGetters,
  AgnosticAttribute,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import type { Wishlist, WishlistItem } from '@vue-storefront/bagisto-api';
import { productGetters } from './productGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(wishlist: any): WishlistItem[] {
  if (!wishlist) {
    return [];
  }

  if (wishlist?.results) {
    return wishlist.results || [];
  }

  return wishlist?.items || [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(wishlist: Wishlist): AgnosticTotals {
  return {
    total: 0,
    subtotal: 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: any): string {
  if (!item || !item?.product) {
    return '';
  }

  return productGetters.getName(item?.product);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemImage(item: any): string {
  if (!item || !item?.product) {
    return 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_small.jpg';
  }

  return productGetters.getCoverImage(item?.product);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: any): AgnosticPrice {
  return {
    regular: productGetters.getRegularPrice(item?.product),
    special: productGetters.getSpecialPrice(item?.product)
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: WishlistItem): number {
  return 1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: WishlistItem, filters?: string[]): Record<string, AgnosticAttribute | string> {
  return {
    color: 'red'
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: any): string {
  if (!item || !item?.product) {
    return '';
  }

  return productGetters.getSlug(item?.product);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(wishlist: Wishlist): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalItems(wishlist: any): number {
  if (!wishlist || !wishlist?.pagination) {
    return 0;
  }

  return wishlist?.pagination?.total || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

export const wishlistGetters: WishlistGetters<Wishlist, WishlistItem> = {
  getItems,
  getTotals,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getShippingPrice,
  getItemSku,
  getTotalItems,
  getFormattedPrice
};
