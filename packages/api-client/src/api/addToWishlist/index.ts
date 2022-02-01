
import { gql } from '@apollo/client/core';
import { AddToWishlistInput } from '../../types';

type Variables = {
    input: AddToWishlistInput;
  };

export async function addToWishlist(context, params) {
  const variables: Variables = {
    input: params
  };

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation addToWishlist ($input: AddToWishlistInput!) {
          addToWishlist(input: $input) {
            success
            wishlist {
                id
                channelId
                productId
                customerId
                itemOptions
                additional
                movedToCart
                shared
                timeOfMoving
                createdAt
                updatedAt
                product {
                    id
                    type
                    isInWishlist
                    attributeFamilyId
                    additionalData {
                        id
                        code
                        label
                        value
                        admin_name
                        type
                    }
                    priceHtml {
                        id
                        type
                        html
                        regular
                        special
                    }
                    sku
                    parentId
                    productFlats {
                        id
                        sku
                        productNumber
                        name
                        description
                        shortDescription
                        urlKey
                        status
                        price
                        cost
                        specialPrice
                        specialPriceFrom
                        specialPriceTo
                        weight
                        color
                        colorLabel
                        size
                        sizeLabel
                        locale
                        channel
                        productId
                        parentId
                        minPrice
                        maxPrice
                        metaTitle
                        metaKeywords
                        metaDescription
                        width
                        height
                        depth
                        createdAt
                        updatedAt
                    }
                    cacheBaseImage {
                        smallImageUrl
                        mediumImageUrl
                        largeImageUrl
                        originalImageUrl
                    }
                    cacheGalleryImages {
                        smallImageUrl
                        mediumImageUrl
                        largeImageUrl
                        originalImageUrl
                    }
                    reviews {
                        id
                        title
                        rating
                        comment
                        status
                        productId
                        customerId
                        customerName
                        createdAt
                        updatedAt
                    }
                }
            }
          }
        }`,
        variables: variables
      });
  } catch (error) {
    console.log('Error addToWishlist:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
