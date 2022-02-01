import {
  Context,
  useFacetFactory,
  FacetSearchResult
} from '@vue-storefront/core';
import type {
  UseFacetSearchParams as SearchParams
} from '../types';

const sortingOptions = [
  {
    attrName: 'Default',
    value: ''
  }, {
    attrName: 'Name A-Z',
    value: '?sort=name&order=asc'
  }, {
    attrName: 'Name Z-A',
    value: '?sort=name&order=desc'
  }, {
    attrName: 'Newest First',
    value: '?sort=created_at&order=desc'
  }, {
    attrName: 'Oldest First',
    value: '?sort=created_at&order=asc'
  }, {
    attrName: 'Price Low to High',
    value: '?sort=price&order=asc'
  }, {
    attrName: 'Price High to Low',
    value: '?sort=price&order=desc'
  }
];

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchParams>) => {
    console.log('Mocked: useFacet.search');
    const productListResults = await context.$bagisto.api.getProductList(params);

    let categoryResult = null;
    if (params.input.categorySlug) {

      const categoryParams = {
        slug: params.input.categorySlug
      };
      categoryResult = await context.$bagisto.api.getCategories(categoryParams);
    }

    return {
      items: productListResults?.data?.getProductListing?.data || [],
      categoryDetail: categoryResult || [],
      pagination: productListResults?.data?.getProductListing?.paginatorInfo || {},
      filterableAttributes: categoryResult ? categoryResult?.data?.categories?.data?.[0]?.filterableAttributes : [],
      sortingData: sortingOptions
    };
  }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
