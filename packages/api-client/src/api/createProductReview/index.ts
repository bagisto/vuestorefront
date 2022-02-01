
import { gql } from '@apollo/client/core';
import { CreateReviewInput } from '../../types';

type Variables = {
    input?: CreateReviewInput;
  };

export async function createProductReview(context, params) {
    const inputFilters = {
        name: params?.name,
        title: params?.title,
        comment: params?.comment,
        rating: params?.rating,
        productId: params?.productId
    };

    const variables: Variables = {
        input: inputFilters
    };

    try {
        return await context.client
        .mutate({
            mutation: gql`
            mutation createReview ($input: CreateReviewInput!) {
                createReview(input: $input) {
                    success
                    review {
                        id
                        title
                        rating
                        comment
                        status
                        createdAt
                        updatedAt
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
                                new
                                featured
                                status
                                visibleIndividually
                                thumbnail
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
                        }
                    }
                }
            }`,
            variables: variables
        });
    } catch (error) {
        console.log('Error getProductList:');
        console.log(error);
        throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
    }
}
