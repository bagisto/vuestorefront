
import { gql } from "@apollo/client/core";

export async function getSlider(context, params) {
    
    try {
        return await context.client
        .query({
            query: gql`
            query sliders {
                sliders {
                    id
                    title
                    path
                    imageUrl
                    content
                    channelId
                    locale
                    sliderPath
                    imgPath
                }
            }`
        });

    } catch (error) {
        console.log("error");
        console.log(error);
        throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
    }
}