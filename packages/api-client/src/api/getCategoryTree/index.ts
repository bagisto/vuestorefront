
import { gql } from '@apollo/client/core';

export async function getCategoryTree(context, params) {

    try {
        return await context.client
        .query({
            query: gql`
            query homeCategories ($categoryId: Int, $categorySlug: String = "") {
                homeCategories(categoryId: $categoryId, categorySlug: $categorySlug) {
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
                    breadcrumbs {
                        name
                        slug
                        urlPath
                    }
                    translations {
                        id
                        name
                        description
                        localeId
                        locale
                    }
                    children {
                        id
                        name
                        description
                        slug
                        urlPath
                        imageUrl
                        position
                        status
                        productCount
                        children {
                            id
                            name
                            description
                            slug
                            urlPath
                            imageUrl
                            position
                            status
                            productCount
                        }
                    }
                    createdAt
                    updatedAt
                }
            }`,
            variables: {
                categoryId: params?.categoryId || null,
                categorySlug: params?.categorySlug || ''
            }
        });

    } catch (error) {
        console.log('Error getCategoryTree:');
        console.log(error);
        throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
    }
}
