import {
  FacetsGetters,
  FacetSearchResult,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import type { Facet, FacetSearchCriteria } from '@vue-storefront/bagisto-api';
import { categoryGetters } from './categoryGetters';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticFacet[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGrouped(params, criteria?: FacetSearchCriteria): AgnosticGroupedFacet[] {
  if (!params || !params?.data || !params?.data?.filterableAttributes) {
    return [];
  }

  const filters = [];
  const categoryDetail = params?.data?.categoryDetail?.data?.categories?.data?.[0];
  const filterableAttributes = params?.data?.filterableAttributes;

  for (const key in filterableAttributes) {
    if (Object.prototype.hasOwnProperty.call(filterableAttributes, key)) {
      const attribute = filterableAttributes[key];
      if (attribute.code === 'price') {
        attribute.maxPrice = categoryDetail.categoryProductMaxPrice;
      }
      filters.push(attribute);
    }
  }

  return filters;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params): AgnosticSort {
  if (!params || !params?.data || !params?.data) {
    return {
      options: [],
      selected: ''
    } as AgnosticSort;
  }

  const selectedSort = [];
  if (params?.input?.filters) {
    for (const key in params?.input?.filters) {
      if (Object.prototype.hasOwnProperty.call(params?.input?.filters, key) && ['sort', 'order'].includes(key)) {
        selectedSort.push(key + '=' + params?.input?.filters[key]);
      }
    }
  }

  return {
    options: params?.data?.sortingData || [],
    selected: selectedSort.length ? '?' + selectedSort.join('&') : ''
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryTree(params): AgnosticCategoryTree {
  const categoryDetail = params?.categoryDetail?.data?.categories?.data?.[0];

  return {
    label: categoryDetail?.name || '',
    slug: categoryDetail?.slug || '',
    items: categoryDetail?.children || null,
    isCurrent: true,
    count: categoryDetail?.productCount || 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProducts(params): any {

  return params?.items || [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPagination(params): AgnosticPagination {

  return {
    currentPage: params?.pagination?.currentPage || 1,
    totalPages: params?.pagination?.lastPage || 1,
    totalItems: params?.pagination?.total || 1,
    itemsPerPage: params?.pagination?.count || 10,
    pageOptions: []
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(params): AgnosticBreadcrumb[] {

  const category = params?.categoryDetail?.data?.categories?.data?.[0] || [];
  return categoryGetters.getBreadcrumbs(category);
}

export const facetGetters: FacetsGetters<Facet, FacetSearchCriteria> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};
