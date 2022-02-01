import {
  Context,
  useReviewFactory,
  UseReviewFactoryParams
} from '@vue-storefront/core';
import type { Review } from '@vue-storefront/bagisto-api';
import type {
  UseReviewSearchParams as SearchParams,
  UseReviewAddParams as AddParams
} from '../types';

const params: UseReviewFactoryParams<Review, SearchParams, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params) => {
    console.log('Mocked: useReview.searchReviews');
    switch (params.type) {
      case 'search':
        const productReviewResults = await context.$bagisto.api.searchReviews(params);

        return {
          reviews: productReviewResults?.data?.reviewsList?.data || null,
          pagination: productReviewResults?.data?.reviewsList?.paginatorInfo || null
        };
        break;
      case 'remove':
        const removeResults = await context.$bagisto.api.removeReview(params?.review);

        return removeResults?.data?.deleteReview;
        break;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params: AddParams) => {
    console.log('Mocked: useReview.addReview');
    const createReviewResults = await context.$bagisto.api.createProductReview(params);

    return createReviewResults?.data?.createReview?.success || null;
  }
};

export const useReview = useReviewFactory<Review, SearchParams, AddParams>(params);
