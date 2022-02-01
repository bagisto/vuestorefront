<template>
  <div id="reviews">
    <SfTabs
      :open-tab="1"
      key="review-list-1"
      class="tab-orphan">
      <SfTab title="Review details">
        <SfLoader
          :class="{ 'loading--review': reviewsLoading }"
          :loading="reviewsLoading"
        >
          <transition-group class="review-list" v-if="reviews.length > 0">
            <div
                v-for="review in reviews"
                :key="review.id">
              <div class="product">
                <div>
                  <SfImage
                    :alt="productGetters.getName(review.product)"
                    :src="productGetters.getCoverImage(review.product).normal"
                    />
                </div>
                <div class="product__additional-info">
                  <p>
                    <SfLink
                      :link="localePath(`/product/${productGetters.getId(review.product)}`)"
                    >
                      {{ productGetters.getName(review.product) }}
                    </SfLink>
                    <SfRating :max="5" :score="review.rating" icon="star" size="20px" />
                    <SfBadge
                      :class="['sf-badge--number ', review.status == 'approved' ? 'color-primary' : review.status == 'pending' ? 'color-warning' : 'color-danger']"
                      >{{ review.status.toUpperCase() }}</SfBadge>
                  </p>
                  <p>
                    <strong>{{ review.title }}</strong>
                  </p>
                  <p>{{ review.comment }}</p>
                </div>
                <div>
                  <SfIcon
                    icon="cross"
                    color="gray"
                    size="14px"
                    role="button"
                    class="smartphone-only"
                    @click="removeReview(review)"
                  />
                  <SfButton
                    class="color-light shipping__button-delete desktop-only"
                    @click="removeReview(review)">
                    {{ $t('Delete') }}
                  </SfButton>
                </div>
              </div>
              <SfDivider />
            </div>
          </transition-group>
        </SfLoader>
        <LazyHydrate on-interaction>
            <SfPagination
              v-if="!reviewsLoading"
              class="products__pagination desktop-only"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="10"
            />
          </LazyHydrate>
      </SfTab>
    </SfTabs>
  </div>
</template>
<script>
import {
  SfTabs,
  SfButton,
  SfIcon,
  SfLoader,
  SfImage,
  SfBadge,
  SfRating,
  SfLink,
  SfDivider,
  SfPagination
} from '@storefront-ui/vue';
import { useReview, reviewGetters, useUser, userGetters, productGetters, facetGetters } from '@vue-storefront/bagisto';
import LazyHydrate from 'vue-lazy-hydration';
import { computed, useRoute } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';

export default {
  name: 'ReviewDetails',
  components: {
    SfTabs,
    SfButton,
    SfIcon,
    SfLoader,
    SfImage,
    SfBadge,
    SfRating,
    SfLink,
    SfDivider,
    SfPagination,
    LazyHydrate
  },
  setup() {
    const route = useRoute();
    const { send: sendNotification} = useUiNotification();
    const { user } = useUser();
    const customerId = computed(() => userGetters.getUserId(user.value));
    const { reviews: productReviews, search: searchReviews, loading: reviewsLoading } = useReview(`customerReviews-${customerId.value}`);

    const reviews = computed(() => reviewGetters.getItems(productReviews.value?.reviews));
    const pagination = computed(() => facetGetters.getPagination(productReviews?.value));

    const removeReview = async (review) => {
      await searchReviews({ review: review, type: 'remove' }).then(() => {
        searchReviews({ input: { customerId: parseInt(customerId.value) }, page: parseInt(route.value?.query?.page) || 1, type: 'search' });
        sendNotification({
          key: 'review_deleted',
          message: 'Review deleted successfully',
          type: 'success',
          title: 'Success!',
          icon: 'check'
        });
      });
    };

    onSSR(async () => {
      await searchReviews({ input: { customerId: parseInt(customerId.value) }, page: parseInt(route.value?.query?.page) || 1, type: 'search' });
    });

    return {
      reviewsLoading,
      reviews,
      removeReview,
      productGetters,
      pagination
    };
  }
};
</script>

<style lang='scss' scoped>
p {
  margin: 5px 0px;
}
.sf-image:not(.sf-image-loaded) {
  position: relative;
}
.product {
  margin: 10px 0px;
  display: inline-flex;
  width: 100%;
}
.product__additional-info {
  width: 65%;
  margin-left: 20px;
}
.sf-badge {
  margin: 5px 0px;
  padding: 5px 15px;
  font-size: 12px;
}
</style>
