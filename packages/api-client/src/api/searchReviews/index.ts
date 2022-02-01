
import { gql } from '@apollo/client/core';

import { CustomerReviewInput } from '../../types';

type Variables = {
  first: 10,
  page: 1,
  input?: CustomerReviewInput,
};
export async function searchReviews(context, params) {

  const variables: Variables = {
    first: params?.itemsPerPage || 10,
    page: params?.page || 1,
    input: params?.input
  };

  try {
    return await context.client
      .query({
        query: gql`
        query reviewsList ($input: CustomerReviewInput, $first: Int = 10, $page: Int = 1) {
          reviewsList (input: $input, first: $first, page: $page) {
                paginatorInfo {
                  count
                  currentPage
                  lastPage
                  total
                }
                data {
                  id
                  title
                  rating
                  comment
                  status
                  productId
                  customerId
                  customerName
                  product {
                    id
                    type
                    attributeFamilyId
                    sku
                    parentId
                    createdAt
                    updatedAt
                    productFlats {
                        id
                        sku
                        name
                        description
                        shortDescription
                        urlKey
                        locale
                    }
                    cacheBaseImage {
                        smallImageUrl
                        mediumImageUrl
                        largeImageUrl
                        originalImageUrl
                    }
                  }
                  createdAt
                  updatedAt
                }
            }
        }`,
        variables: variables
      });
  } catch (error) {
    console.log('Error searchReviews:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
