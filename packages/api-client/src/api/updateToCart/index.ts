
import { gql } from '@apollo/client/core';
import { UpdateItemToCartInput } from '../../types';

type Variables = {
    input: UpdateItemToCartInput;
  };

export async function updateToCart(context, params) {
  const variables: Variables = {
    input: params
  };

  try {
    return await context.client
      .mutate({
        mutation: gql`
        mutation updateItemToCart ($input: UpdateItemToCartInput!) {
          updateItemToCart(input: $input) {
            status
            message
            cart {
                id
                customerEmail
                customerFirstName
                customerLastName
                shippingMethod
                couponCode
                isGift
                itemsCount
                itemsQty
                exchangeRate
                globalCurrencyCode
                baseCurrencyCode
                channelCurrencyCode
                cartCurrencyCode
                grandTotal
                baseGrandTotal
                subTotal
                baseSubTotal
                taxTotal
                baseTaxTotal
                discountAmount
                baseDiscountAmount
                checkoutMethod
                isGuest
                isActive
                conversionTime
                customerId
                channelId
                appliedCartRuleIds
                createdAt
                updatedAt
                selectedShippingRate {
                    id
                    carrier
                    carrierTitle
                    method
                    methodTitle
                    methodDescription
                    price
                    basePrice
                    discountAmount
                    baseDiscountAmount
                    cartAddressId
                }
                shippingAddress {
                    id
                    firstName
                    lastName
                    addressType
                    customerId
                    cartId
                    orderId
                    firstName
                    lastName
                    gender
                    companyName
                    address1
                    address2
                    postcode
                    city
                    state
                    country
                    email
                    phone
                    defaultAddress
                    vatId
                    additional
                    createdAt
                    updatedAt
                    shippingRates {
                        id
                        carrier
                        carrierTitle
                        method
                        methodTitle
                        methodDescription
                        price
                        basePrice
                        discountAmount
                        baseDiscountAmount
                        cartAddressId
                        createdAt
                        updatedAt
                    }
                }
                billingAddress {
                    id
                    firstName
                    lastName
                    addressType
                    customerId
                    cartId
                    orderId
                    firstName
                    lastName
                    gender
                    companyName
                    address1
                    address2
                    postcode
                    city
                    state
                    country
                    email
                    phone
                    defaultAddress
                    vatId
                    additional
                    createdAt
                    updatedAt
                }
                payment {
                    id
                    method
                    methodTitle
                    cartId
                    createdAt
                    updatedAt
                }
                items {
                    id
                    quantity
                    sku
                    type
                    name
                    couponCode
                    weight
                    totalWeight
                    baseTotalWeight
                    price
                    basePrice
                    total
                    baseTotal
                    taxPercent
                    taxAmount
                    baseTaxAmount
                    discountPercent
                    discountAmount
                    baseDiscountAmount
                    additional
                    parentId
                    productId
                    cartId
                    taxCategoryId
                    customPrice
                    appliedCartRuleIds
                    createdAt
                    updatedAt
                    product {
                        id
                        type
                        attributeFamilyId
                        sku
                        parentId
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
                        priceHtml {
                            id
                            type
                            html
                            regular
                            special
                        }
                    }
                }
            }
          }
        }`,
        variables: variables
      });
  } catch (error) {
    console.log('Error updateToCart:');
    console.log(error);
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
}
