
import { gql } from "@apollo/client/core";
import { FilterWislistInput } from '../../types';

type Variables = {
    first: 10,
    page: 1,
    input?: FilterWislistInput
  };

export async function getWishlist(context, params) {
  const variables: Variables = {
    first: params?.itemsPerPage || 10,
    page: params?.page || 1,
    input: params?.input
  };

  try {
    return await context.client
      .query({
        query: gql`
        query wishlists ($input: FilterWislistInput, $first: Int = 10, $page: Int = 1) {
            wishlists(input: $input, first: $first, page: $page) {
                paginatorInfo {
                    count
                    currentPage
                    lastPage
                    total
                }
                data {
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
    console.log('Error getWishlist:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
