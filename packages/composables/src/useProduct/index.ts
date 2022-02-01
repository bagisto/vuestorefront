import {
  Context,
  useProductFactory,
  UseProductFactoryParams
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/bagisto-api';
import type {
  UseProductSearchParams as SearchParams
} from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: Context, params) => {
    switch (params.typeListing) {
      case 'productDetail':
        console.log('Mocked: useProduct.getProductDetail');
        const productDetailResults = await context.$bagisto.api.getProductDetail(params);

        return productDetailResults?.data?.product || {};
      case 'newProduct':
        console.log('Mocked: useProduct.getNewProduct');
        const newProductResults = await context.$bagisto.api.getNewProduct(params);

        return newProductResults?.data?.newProducts || [];
      case 'featuredProduct':
        console.log('Mocked: useProduct.getFeaturedProduct');
        const featuredProductResults = await context.$bagisto.api.getFeaturedProduct(params);

        return featuredProductResults?.data?.featuredProducts || [];
      case 'relatedProduct':
        console.log('Mocked: useProduct.getRelatedProduct');
        const relatedProductResults = await context.$bagisto.api.getRelatedProduct(params);

        return relatedProductResults?.data?.relatedProducts || [];
    }
  }
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
