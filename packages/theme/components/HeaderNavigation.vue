<template>
  <SfLoader
      :class="{ 'loading--home--category': loading }"
      :loading="loading"
    >
    <div class="sf-header__navigation desktop" v-if="!isMobile">
      <SfHeaderNavigationItem
        v-for="(category, index) in categories"
        :key="index"
        class="nav-item"
        v-e2e="`app-header-url_${category}`"
        :label="category.name"
        :link="localePath(`/category/${category.urlPath}`)"
      />
    </div>
    <SfModal v-else :visible="isMobileMenuOpen">
      <SfHeaderNavigationItem
        v-for="(category, index) in categories"
        :key="index"
        class="nav-item"
        v-e2e="`app-header-url_${category}`"
      >
        <template #mobile-navigation-item>
          <SfMenuItem
            :label="category.name"
            class="sf-header-navigation-item__menu-item"
            :link="localePath(`/category/${category.urlPath}`)"
            @click="toggleMobileMenu"
          />
        </template>
      </SfHeaderNavigationItem>
    </SfModal>
  </SfLoader>
</template>

<script>
import { SfMenuItem, SfModal, SfLoader } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCategory } from '@vue-storefront/bagisto';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'HeaderNavigation',
  components: {
    SfMenuItem,
    SfModal,
    SfLoader
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();
    const { categories, search: searchCategory, loading } = useCategory();

    onSSR(async () => {
      await searchCategory({ apiType: 'categoryTree' });
    });

    return {
      categories: categories?.value.slice(0, 5),
      isMobileMenuOpen,
      toggleMobileMenu,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}
</style>
