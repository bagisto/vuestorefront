
import { gql } from "@apollo/client/core";

export async function getProductDetail(context, params) {

    try {
        return await context.client
        .query({
            query: gql`
            query product ($id: ID) {
                product(id: $id) {
                    id
                    type
                    isInWishlist
                    attributeFamilyId
                    sku
                    parentId
                    configutableData {
                        attributes {
                            id
                            code
                            label
                            swatchType
                            options {
                                id
                                label
                                swatchType
                                products 
                            }
                        }
                        index {
                            id
                            attributeOptionIds {
                                attributeId
                                attributeOptionId
                            }
                        }
                        variantPrices {
                            id
                            regularPrice {
                                price
                                formatedPrice
                            }
                            finalPrice {
                                price
                                formatedPrice
                            }
                        }
                        variantImages {
                            id
                            images {
                                smallImageUrl
                                mediumImageUrl
                                largeImageUrl
                                originalImageUrl
                            }
                        }
                        variantVideos {
                            id
                            videos
                        }
                        chooseText
                        regularPrice {
                            price
                            formatedPrice
                        }
                    }
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
                    variants {
                        id
                        type
                        attributeFamilyId
                        sku
                        parentId
                    }
                    parent {
                        id
                        type
                        attributeFamilyId
                        sku
                        parentId
                    }
                    attributeFamily {
                        id
                        code
                        name
                        status
                        isUserDefined
                    }
                    attributeValues {
                        id
                        productId
                        attributeId
                        locale
                        channel
                        textValue
                        booleanValue
                        integerValue
                        floatValue
                        dateTimeValue
                        dateValue
                        jsonValue
                        attribute {
                            id
                            code
                            adminName
                            type
                        }
                    }
                    superAttributes {
                        id
                        code
                        adminName
                        type
                        position
                    }
                    additionalData {
                        id
                        code
                        label
                        value
                        admin_name
                        type
                    }
                    categories {
                        id
                        name
                        description
                        slug
                        urlPath
                        imageUrl
                        metaTitle
                        metaDescription
                        metaKeywords
                        position
                        status
                        displayMode
                        parentId
                        filterableAttributes {
                            id
                            adminName
                            code
                            type
                            position
                        }
                        translations {
                            id
                            name
                            description
                            localeId
                            locale
                        }
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
                id: params.id
            }
        });

    } catch (error) {
        console.log('Error getProductDetail:');
        console.log(error);
        throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
    }
}
