import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import type { Category } from '@vue-storefront/bagisto-api';
import type {
  UseCategorySearchParams as SearchParams
} from '../types';

const params: UseCategoryFactoryParams<Category, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categorySearch: async (context: Context, { customQuery, ...params }) => {
    console.log('Mocked: useCategory.categorySearch');
    switch (params.apiType) {
      case 'categoryBySlug':
        const categoriesResult = await context.$bagisto.api.getCategories(params);

        return categoriesResult?.data?.categories?.data;
        break;
      case 'categoryTree':
        const categoryTreeResults = await context.$bagisto.api.getCategoryTree(params);

        return categoryTreeResults?.data?.homeCategories;
        break;
    }
  }
};

export const useCategory = useCategoryFactory<Category, SearchParams>(params);
