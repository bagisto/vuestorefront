
import { gql } from '@apollo/client/core';

export async function removeReview(context, params) {

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation deleteReview ($id: ID!) {
            deleteReview (id: $id) {
                status
                message
                reviews {
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
        variables: {
          id: params?.id
        }
      });
  } catch (error) {
    console.log('Error removeReview:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
