import {
  AgnosticBreadcrumb,
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import type { Product, Category, ProductFilter } from '@vue-storefront/bagisto-api';
import { categoryGetters } from './categoryGetters';
import { htmlDecode } from '../helpers/htmlDecoder';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(product: Product): string {
  if (!product) {
    return '';
  }

  if (typeof product !== 'undefined' && typeof product.productFlats !== 'undefined') {
    for (const productFlat of product.productFlats) {
      if (productFlat.locale === 'en') {
        return htmlDecode(productFlat.name);
      }
    }
  }

  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: Product): string {
  if (!product) {
    return '';
  }

  return product?.sku || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: Product): AgnosticPrice {
  if (!product) {
    return {
      regular: 0,
      special: 0
    };
  }

  if (typeof product !== 'undefined' && typeof product.productFlats !== 'undefined') {
    return {
      regular: product.productFlats[0]?.price,
      special: product.productFlats[0]?.specialPrice
    };
  }

  return {
    regular: 0,
    special: 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRegularPrice(product: Product): string {
  if (!product) {
    return '';
  }

  if (typeof product !== 'undefined' && typeof product.priceHtml !== 'undefined') {
    return product.priceHtml.regular;
  }

  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSpecialPrice(product: Product): string {
  if (!product) {
    return '';
  }

  if (typeof product !== 'undefined' && typeof product.priceHtml !== 'undefined') {
    return product.priceHtml.special;
  }

  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: Product): AgnosticMediaGalleryItem[] {
  if (!product || typeof product === 'undefined' || typeof product.cacheGalleryImages === 'undefined') {
    return [
      {
        small: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_small.jpg',
        normal: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_medium.jpg',
        big: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
      }
    ];
  }

  const images = [];
  for (const image of product.cacheGalleryImages) {
    images.push({
      small: image.smallImageUrl,
      normal: image.mediumImageUrl,
      big: image.largeImageUrl
    });
  }

  return images;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: Product): any {
  if (!product || typeof product === 'undefined' || typeof product.cacheBaseImage === 'undefined') {
    return {
      small: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_small.jpg',
      normal: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_medium.jpg',
      big: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
    };
  }

  return {
    small: product.cacheBaseImage?.smallImageUrl,
    normal: product.cacheBaseImage?.mediumImageUrl,
    big: product.cacheBaseImage?.largeImageUrl
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFiltered(products: Product[], filters: ProductFilter): Product[] {
  if (!products) {
    return [];
  }

  return products;

  // return [
  //   {
  //     _id: 1,
  //     _description: 'Some description',
  //     _categoriesRef: [
  //       '1',
  //       '2'
  //     ],
  //     name: 'Black jacket',
  //     sku: 'black-jacket',
  //     images: [
  //       'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
  //     ],
  //     price: {
  //       original: 12.34,
  //       current: 10.00
  //     }
  //   }
  // ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAttributes(products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> {
  return {};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShortDescription(product: Product): string {
  if (!product) {
    return '';
  }

  if (typeof product !== 'undefined' && typeof product.productFlats !== 'undefined') {
    for (const productFlat of product.productFlats) {
      if (productFlat.locale === 'en') {
        return productFlat.shortDescription;
      }
    }
  }

  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: Product): string {
  if (!product) {
    return '';
  }

  if (typeof product !== 'undefined' && typeof product.productFlats !== 'undefined') {
    for (const productFlat of product.productFlats) {
      if (productFlat.locale === 'en') {
        return htmlDecode(productFlat.description);
      }
    }
  }

  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAdditionalData(product: Product): AgnosticAttribute[] {
  if (!product) {
    return [];
  }

  if (typeof product !== 'undefined' && typeof product.additionalData !== 'undefined') {
    return product.additionalData;
  }

  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getConfigurableData(product: Product): any {
  if (!product) {
    return null;
  }

  if (typeof product !== 'undefined' && typeof product.configutableData !== 'undefined') {
    const configAttributes = [];
    for (const attribute of product.configutableData.attributes) {
      configAttributes.push({
        id: attribute.id,
        code: attribute.code,
        label: attribute.label,
        options: attribute.options,
        swatchType: attribute.swatchType
      });
    }

    return {
      configData: product.configutableData,
      configAttributes
    };
  }

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: Product): string[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product: Product): string | null {
  if (!product) {
    return null;
  }
  return product?.id || null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getNumber(product: Product): string | null {
  if (!product) {
    return null;
  }

  if (typeof product !== 'undefined' && typeof product.productFlats !== 'undefined') {
    for (const productFlat of product.productFlats) {
      if (productFlat.locale === 'en') {
        return productFlat.productNumber;
      }
    }
  }

  return null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
  // if (price === null) {
  //   return null;
  // }

  // // TODO get correct data from api
  // const locale = 'en';
  // const country = 'en';
  // const currency = 'USD';

  // return new Intl.NumberFormat(`${locale}-${country}`, {
  //   style: 'currency',
  //   currency,
  // }).format(price);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: Product): number {
  if (!product) {
    return 0;
  }

  let total = 0;
  if (typeof product !== 'undefined' && typeof product.reviews !== 'undefined') {
    for (const review of product.reviews) {
      if (review.status === 'approved') {
        total += 1;
      }
    }

    return total;
  }

  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: Product): number {
  if (!product) {
    return 0;
  }

  let total = 0;
  if (typeof product !== 'undefined' && typeof product.reviews !== 'undefined') {
    for (const review of product.reviews) {
      total += review.rating;
    }

    return Math.round(((total / getTotalReviews(product)) + Number.EPSILON) * 10) / 10;
  }

  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(product: Product, category?: Category): AgnosticBreadcrumb[] {
  let breadcrumbs = [];

  if (!product) {
    return breadcrumbs;
  }

  if (category) {
    breadcrumbs = categoryGetters.getBreadcrumbs(category) as AgnosticBreadcrumb[];
  }

  breadcrumbs.push({
    text: getName(product),
    route: {
      path: getId(product)
    }
  });

  return breadcrumbs;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProductRelatedProduct(product: Product): Product[] {
  if (!product) {
    return [];
  }

  if (typeof product !== 'undefined' && typeof product.relatedProducts !== 'undefined') {

    return product.relatedProducts;
  }

  return [];
}

export const productGetters: ProductGetters<Product, ProductFilter> = {
  getName,
  getSlug,
  getPrice,
  getGallery,
  getCoverImage,
  getFiltered,
  getAttributes,
  getDescription,
  getCategoryIds,
  getId,
  getFormattedPrice,
  getRegularPrice,
  getSpecialPrice,
  getTotalReviews,
  getAverageRating,
  getBreadcrumbs,
  getShortDescription,
  getAdditionalData,
  getNumber,
  getProductRelatedProduct,
  getConfigurableData
};
