<template>
  <div id="product">
    <SfLoader
      :class="{ 'loading--product': productDataIsLoading }"
      :loading="productDataIsLoading"
    >
      <div>
        <SfBreadcrumbs
          class="breadcrumbs desktop-only"
          :breadcrumbs="breadcrumbs"
        />

        <div class="product">
          <LazyHydrate when-idle>
            <SfGallery :images="productGallery" class="product__gallery" />
          </LazyHydrate>
          <div class="product__info">
            <div class="product__header">
              <SfHeading
                :title="productGetters.getName(product)"
                :level="3"
                class="sf-heading--no-underline sf-heading--left"
              />
              <SfIcon
                icon="drag"
                size="xxl"
                color="var(--c-text-disabled)"
                class="product__drag-icon smartphone-only"
              />
            </div>
            <div class="product__price-and-rating">
              <SfPrice
                :regular="productGetters.getRegularPrice(product)"
                :special="productGetters.getSpecialPrice(product)"
              />
              <div>
                <div class="product__rating">
                  <SfRating
                    :score="averageRating"
                    :max="5"
                  />
                  <a v-if="!!totalReviews" href="#" class="product__count">
                    ({{ totalReviews }})
                  </a>
                </div>
                <SfButton class="sf-button--text" @click="changeTab(2)">{{ $t('Read all reviews') }}</SfButton>
              </div>
            </div>
            <div>
                <div class="product__description desktop-only">
                  <span v-html="productGetters.getShortDescription(product)"></span>
                </div>
                <SfButton class="sf-button--text desktop-only product__guide">
                  {{ $t('Size guide') }}
                </SfButton>
                <div>
                  <ConfigurableOptions
                    v-if="product.type == 'configurable'"
                    :product="product"
                    :form-data="formData" />
                </div>
                <SfAddToCart
                  v-e2e="'product_add-to-cart'"
                  :stock="stock"
                  v-model="qty"
                  :disabled="loading"
                  :canAddToCart="stock > 0"
                  class="product__add-to-cart"
                  @click="addItemToCart({ product, quantity: parseInt(qty) })"
                />
            </div>
            <LazyHydrate when-idle>
              <SfTabs id="tabs" :open-tab="openTab" class="product__tabs" @click:tab="changeTab">
                <SfTab title="Description">
                  <div class="product__description">
                    {{ productGetters.getDescription(product) }}
                  </div>
                </SfTab>

                <SfTab title="Read reviews">
                  <div v-show="reviewsLoading">
                    <SfLoader />
                  </div>
                  <SfReview
                    v-for="review in reviews"
                    v-show="!reviewsLoading"
                    :key="reviewGetters.getReviewId(review)"
                    :author="reviewGetters.getReviewAuthor(review)"
                    :date="reviewGetters.getReviewDate(review)"
                    :message="reviewGetters.getReviewMessage(review)"
                    :max-rating="5"
                    :rating="reviewGetters.getReviewRating(review)"
                    :char-limit="250"
                    read-more-text="Read more"
                    hide-full-text="Read less"
                    class="product__review"
                  />
                  <div
                    v-show="!reviewsLoading"
                    id="addReview"
                  >
                    <AddProductReview/>
                  </div>
                </SfTab>

                <SfTab
                  title="Additional Information"
                  class="product__additional-info"
                >
                  <div class="product__additional-info">
                    <div v-if="productGetters.getNumber(product)">
                      <p class="product__additional-info__title">{{ "Product Number" }}</p>
                      <p>{{ productGetters.getNumber(product) }}</p>
                    </div>
                    <div
                      v-for="additional in productGetters.getAdditionalData(product)"
                      :key="`product-${additional.id}`"
                    >
                      <p class="product__additional-info__title">{{ additional.label }}</p>
                      <p>{{ additional.value }}</p>
                    </div>

                    <p class="product__additional-info__title">{{ $t('Instruction1') }}</p>
                    <p class="product__additional-info__paragraph">
                      {{ $t('Instruction2') }}
                    </p>

                    <p class="product__additional-info__paragraph">
                      {{ $t('Instruction3') }}
                    </p>
                    <p>{{ careInstructions }}</p>

                  </div>
                </SfTab>
              </SfTabs>
            </LazyHydrate>
          </div>
        </div>

        <LazyHydrate v-if="relatedProducts.length > 0" when-visible>
          <RelatedProducts
            :products="relatedProducts"
            :loading="false"
            title="Match it with"
          />
        </LazyHydrate>

      </div>
    </SfLoader>
    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate>

  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfLoader,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor
} from '@storefront-ui/vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import ConfigurableOptions from '~/components/Product/ConfigurableOptions.vue';
import RelatedProducts from '~/components/Product/RelatedProducts.vue';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import { ref, computed, useRoute } from '@nuxtjs/composition-api';
import AddProductReview from '~/components/AddProductReview.vue';
import { useProduct, productGetters, useCart, useReview, reviewGetters } from '@vue-storefront/bagisto';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';
import { useUiNotification} from '~/composables';

export default {
  name: 'Product',
  transition: 'fade',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  setup() {
    const route = useRoute();
    const qty = ref(1);
    const openTab = ref(1);
    const id = computed(() => route.value.params.id);
    const formData = ref({
      productId: id,
      quantity: qty,
      isBuyNow: 0,
      superAttribute: {},
      selectedConfigurableOption: 0
    });
    const { send: sendNotification} = useUiNotification();

    const { products, search, loading: productLoading } = useProduct(`productDetail-${id}`);
    const { products: relatedProductList, search: searchRelatedProduct, loading: relatedLoading } = useProduct(`relatedProducts-${id}`);
    const { reviews: productReviews, search: searchReviews, loading: reviewsLoading } = useReview(`productReviews-${id}`);

    const { addItem, loading } = useCart();

    onSSR(async () => {
      await search({ typeListing: 'productDetail', id: id.value });
      await searchReviews({ input: { productId: parseInt(id.value), status: 'approved' }, type: 'search'});
      await searchRelatedProduct({ typeListing: 'relatedProduct', productId: id.value });
    });

    const product = computed(() => productGetters.getFiltered(products.value, { master: true}));
    const productDataIsLoading = computed(() => productLoading.value && !productGetters.getName(product.value));
    const relatedProducts = computed(() => productGetters.getFiltered(relatedProductList.value, { master: true}));

    const reviews = computed(() => reviewGetters.getItems(productReviews.value?.reviews));
    const totalReviews = computed(() => reviewGetters.getTotalReviews(productReviews.value?.reviews));
    const averageRating = computed(() => reviewGetters.getAverageRating(productReviews.value?.reviews));

    const breadcrumbs = computed(() => {
      const productCategories = product.value.categories;
      return productGetters.getBreadcrumbs(
        product.value,
        Array.isArray(productCategories) ? [...productCategories].pop() : []
      );
    });

    const productGallery = computed(() => productGetters.getGallery(product.value).map(img => ({
      mobile: { url: img.normal },
      desktop: { url: img.big },
      big: { url: img.big },
      alt: productGetters.getName(product.value, { master: true})
    })));

    const changeTab = (tabNumber, callback) => {
      document
        .querySelector('#tabs')
        .scrollIntoView({ behavior: 'smooth', block: 'end' });
      openTab.value = tabNumber;
      if (callback && typeof callback === 'function') callback();
    };

    return {
      loading,
      product,
      productLoading,
      productDataIsLoading,
      formData,
      relatedProducts,
      relatedLoading,
      breadcrumbs,
      productGallery,
      productGetters,
      reviews,
      reviewsLoading,
      totalReviews,
      averageRating,
      reviewGetters,
      changeTab,
      openTab,
      qty,
      addItem,
      sendNotification
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfLoader,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    LazyHydrate,
    MobileStoreBanner,
    AddProductReview,
    ConfigurableOptions
  },
  data() {
    return {
      stock: 5,
      properties: [
        {
          name: 'Product Code',
          value: '578902-00'
        },
        {
          name: 'Category',
          value: 'Pants'
        },
        {
          name: 'Material',
          value: 'Cotton'
        },
        {
          name: 'Country',
          value: 'Germany'
        }
      ],
      detailsIsActive: false,
      brand:
          'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
    };
  },
  methods: {
    async addItemToCart(productData) {
      const productName = this.productGetters.getName(productData.product);
      await this.addItem(productData).then(() => {
        this.sendNotification({
          key: 'item_added',
          title: 'Product added to cart!',
          message: `Success: ${productName} added to cart successfully.`,
          icon: 'check',
          type: 'success'
        });
        this.qty = 1;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
