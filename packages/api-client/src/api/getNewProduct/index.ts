
import { gql } from "@apollo/client/core";

export async function getNewProduct(context, params) {

    try {
        return await context.client
        .query({
            query: gql`
            query newProducts ($count: Int = 10) {
                newProducts(count: $count) {
                    id
                    type
                    isInWishlist
                    attributeFamilyId
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
                    priceHtml {
                        id
                        type
                        html
                        regular
                        special
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
            }`,
            variables: {
                count: params.limit
            }
        });

    } catch (error) {
        console.log('Error getNewProduct:');
        console.log(error);
        throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
    }
}
