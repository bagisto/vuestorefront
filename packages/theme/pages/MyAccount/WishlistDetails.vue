<template>
  <SfTabs
      :open-tab="1"
      key="wishlist-list-1"
      class="tab-orphan">
    <SfTab title="Wishlist Details">
      <SfLoader
        :class="{ 'loading--wishlist': wishlistLoading }"
        :loading="wishlistLoading"
      >
        <transition-group class="review-list" v-if="wishlists.length > 0">
          <div
              v-for="wishlist in wishlists"
              :key="wishlist.id">
            <div
              class="product">
              <div>
                <SfImage
                  :alt="productGetters.getName(wishlist.product)"
                  :src="productGetters.getCoverImage(wishlist.product).normal"
                  />
              </div>
              <div class="product__additional-info">
                <p>
                  <SfLink
                    :link="localePath(`/product/${productGetters.getId(wishlist.product)}`)"
                  >
                    {{ productGetters.getName(wishlist.product) }}
                  </SfLink>
                  <SfRating
                    :max="5"
                    :score="productGetters.getAverageRating(wishlist.product)"
                    icon="star"
                    size="20px" />
                </p>
                <p>
                  <strong>{{ productGetters.getRegularPrice(wishlist.product) }}</strong>
                </p>
              </div>
              <div>
                <SfIcon
                  icon="heart_fill"
                  color="gray"
                  size="2.25rem"
                  role="button"
                  class="smartphone-only"
                  @click="removeProductFromWishlist(wishlist)"
                />
                <SfButton
                  class="color-danger shipping__button-delete desktop-only"
                  @click="removeProductFromWishlist(wishlist)">
                  {{ 'Remove' }}
                </SfButton>
              </div>
            </div>
            <SfDivider />
          </div>
        </transition-group>
      </SfLoader>
      <LazyHydrate on-interaction>
        <SfPagination
          v-if="!wishlistLoading"
          class="products__pagination desktop-only"
          v-show="pagination.totalPages > 1"
          :current="pagination.currentPage"
          :total="pagination.totalPages"
          :visible="10"
        />
      </LazyHydrate>
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs, SfCheckbox, SfButton, SfLink, SfLoader, SfDivider, SfPagination, SfIcon, SfImage, SfRating } from '@storefront-ui/vue';
import { computed, useRoute } from '@nuxtjs/composition-api';
import { useWishlist, wishlistGetters, productGetters, facetGetters } from '@vue-storefront/bagisto';
import LazyHydrate from 'vue-lazy-hydration';
import { onSSR } from '@vue-storefront/core';
import { useUiNotification } from '~/composables';

export default {
  name: 'WishlistDetails',
  components: {
    SfTabs,
    SfCheckbox,
    SfButton,
    SfLink,
    SfLoader,
    SfDivider,
    SfPagination,
    SfIcon,
    SfImage,
    SfRating,
    LazyHydrate
  },
  setup() {
    const route = useRoute();
    const { send: sendNotification} = useUiNotification();
    const { load: loadWishlist, addItem: addItemToWishlist, isInWishlist, removeItem, wishlist, loading: wishlistLoading } = useWishlist();

    const wishlists = computed(() => wishlistGetters.getItems(wishlist.value));
    const pagination = computed(() => facetGetters.getPagination(wishlist?.value));

    const removeProductFromWishlist = (productItem) => {
      const productsInWhishlist = computed(() => wishlistGetters.getItems(wishlist.value));
      const product = productsInWhishlist.value.find(wishlistProduct => wishlistProduct.product.sku === productItem.product.sku);

      if (product) {
        removeItem({ product }).then(() => {
          loadWishlist({customQuery: { page: parseInt(route.value?.query?.page) || 1 }});
          sendNotification({
            key: 'wishlist_item_deleted',
            message: 'Product removed from wishlist successfully',
            type: 'success',
            title: 'Success!',
            icon: 'check'
          });
        });
      }
    };

    onSSR(async () => {
      await loadWishlist({customQuery: { page: parseInt(route.value?.query?.page) || 1 }});
    });

    return {
      productGetters,
      wishlistLoading,
      wishlists,
      pagination,
      addItemToWishlist,
      isInWishlist,
      removeProductFromWishlist
    };
  }
};
</script>

<style lang='scss' scoped>
.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}
.form {
  &__element {
    margin: 0 0 var(--spacer-base) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__checkbox-group {
    margin: 0 0 var(--spacer-xl) 0;
  }
  &__title {
    margin: 0 0 var(--spacer-base) 0;
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17.5rem;
    }
  }
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
}
.notice {
  margin: var(--spacer-base) 0 0 0;
  font-size: var(--font-size--xs);
  &__link {
  color: var(--c-primary);
  text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
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

</style>
