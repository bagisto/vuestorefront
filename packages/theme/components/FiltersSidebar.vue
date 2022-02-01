<template>
  <div id="filters">
    <SfSidebar
      :visible="isFilterSidebarOpen"
      title="Filters"
      class="sidebar-filters"
      @close="toggleFilterSidebar"
    >
      <div class="filters desktop-only">
        <div v-for="(facet, i) in facets" :key="i">
          <SfHeading
            :level="4"
            :title="facet.adminName"
            class="filters__title sf-heading--left"
            :key="`filter-title-${facet.id}`"
          />
          <div
            v-if="isFacetPrice(facet)"
            class="filters__colors"
            id="filters__price_range"
            :key="`${facet.id}-price-range`"
          >
            <SfRange
              v-model="rangeValue"
              :disabled="false"
              :config="{
                start: rangeValue,
                range: {'min':0, 'max':facet.maxPrice},
                step: 1,
                connect: true,
                direction: 'ltr',
                orientation: 'horizontal',
                behaviour: 'tap-drag',
                tooltips: true,
                keyboardSupport: true,
                format: {
                  to: function(value){return new Intl.NumberFormat('de-DE',{style:'currency', currency:'USD'}).format(value)},
                  from: function(value){return new Intl.NumberFormat('de-DE',{style:'currency', currency:'USD'}).formatToParts(value)[0].value}
                }
              }"
              @change="() => selectFilter(facet, null)"
            />
          </div>
          <div
            v-else-if="isFacetColor(facet)"
            class="filters__colors"
            :key="`${facet.id}-colors`"
          >
            <SfColor
              v-for="option in facet.options"
              :key="`${facet.id}-${option.id}`"
              :color="option.adminName"
              :selected="isFilterSelected(facet, option)"
              class="filters__color"
              @click="() => selectFilter(facet, option)"
            />
          </div>
          <div v-else>
            <SfFilter
              v-for="option in facet.options"
              :key="`${facet.id}-${option.id}`"
              :label="option.adminName"
              :selected="isFilterSelected(facet, option)"
              class="filters__item"
              @change="() => selectFilter(facet, option)"
            />
          </div>
        </div>
      </div>
      <SfAccordion class="filters smartphone-only">
        <div v-for="(facet, i) in facets" :key="i">
          <SfAccordionItem
            :key="`filter-title-${facet.id}`"
            :header="facet.adminName"
            class="filters__accordion-item"
          >
            <div
              v-if="isFacetPrice(facet)"
              class="filters__colors"
              id="filters__price_range"
              :key="`${facet.id}-price-range`"
            >
              <SfRange
                v-model="rangeValue"
                :disabled="false"
                :config="{
                  start: rangeValue,
                  range: {'min':0, 'max':facet.maxPrice},
                  step: 1,
                  connect: true,
                  direction: 'ltr',
                  orientation: 'horizontal',
                  behaviour: 'tap-drag',
                  tooltips: true,
                  keyboardSupport: true,
                  format: {
                    to: function(value){return new Intl.NumberFormat('en-US',{style:'currency', currency:'USD'}).format(value)},
                    from: function(value){return new Intl.NumberFormat('de-DE',{style:'currency', currency:'USD'}).formatToParts(value)[0].value}
                  }
                }"
                @change="() => selectFilter(facet, null)"
              />
            </div>
            <div
              v-else-if="isFacetColor(facet)"
              class="filters__colors"
              :key="`${facet.id}-colors`"
            >
              <SfColor
                v-for="option in facet.options"
                :key="`${facet.id}-${option.id}`"
                :color="option.adminName"
                :selected="isFilterSelected(facet, option)"
                class="filters__color"
                @click="() => selectFilter(facet, option)"
              />
            </div>
            <div v-else>
              <SfFilter
                v-for="option in facet.options"
                :key="`${facet.id}-${option.id}`"
                :label="option.adminName"
                :selected="isFilterSelected(facet, option)"
                class="filters__item"
                @change="() => selectFilter(facet, option)"
              />
            </div>
          </SfAccordionItem>
        </div>
      </SfAccordion>
      <template #content-bottom>
        <div class="filters__buttons">
          <SfButton
            class="sf-button--full-width"
            @click="applyFilters"
          >
            {{ $t('Done') }}
          </SfButton
          >
          <SfButton
            class="sf-button--full-width filters__button-clear"
            @click="clearFilters"
          >
            {{ $t('Clear all') }}
          </SfButton
          >
        </div>
      </template>
    </SfSidebar>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfHeading,
  SfFilter,
  SfAccordion,
  SfColor,
  SfRange
} from '@storefront-ui/vue';

import { ref, computed, onMounted, useRoute } from '@nuxtjs/composition-api';
import { useFacet, facetGetters } from '@vue-storefront/bagisto';
import { useUiHelpers, useUiState } from '~/composables';
import Vue from 'vue';

export default {
  name: 'FiltersSidebar',
  components: {
    SfButton,
    SfSidebar,
    SfFilter,
    SfAccordion,
    SfColor,
    SfHeading,
    SfRange
  },
  setup(props, context) {
    const route = useRoute();
    const { query } = route.value;
    const { changeFilters, isFacetColor, isFacetPrice } = useUiHelpers();
    const { toggleFilterSidebar, isFilterSidebarOpen } = useUiState();
    const { result } = useFacet();

    const facets = computed(() => facetGetters.getGrouped(result.value, ['color', 'size']));
    const selectedFilters = ref({});
    let rangeValue = [0, 0];

    const setSelectedFilters = () => {
      if (!facets.value.length || Object.keys(selectedFilters.value).length) return;
      for (const key in facets.value) {
        const facetCode = facets.value[key].code;
        if (query[facetCode]) {
          if (facetCode === 'price') {
            rangeValue = query[facetCode].split(',');
          }
          selectedFilters.value[facetCode] = query[facetCode].split(',');
        }
      }
    };

    const isFilterSelected = (facet, option) => (selectedFilters.value[facet.code] || []).includes(option.id);

    const selectFilter = (facet, option) => {
      if (!selectedFilters.value[facet.code]) {
        Vue.set(selectedFilters.value, facet.code, []);
      }

      if (facet.code === 'price' && !option) {
        const priceRange = {min: 0, max: 0};
        const lowerPrice = document.getElementsByClassName('noUi-handle-lower');
        for (let index = 0; index < lowerPrice.length; index++) {
          const element = lowerPrice[index];
          if (element.getAttribute('aria-valuenow') !== '0.0') {
            priceRange.min = element.getAttribute('aria-valuenow');
          }
          if (element.getAttribute('aria-valuemax') !== '0.0') {
            priceRange.max = element.getAttribute('aria-valuemax');
          }
        }
        rangeValue = [parseFloat(priceRange.min), parseFloat(priceRange.max)];
        selectedFilters.value[facet.code] = rangeValue;
      } else {
        if (selectedFilters.value[facet.code].find(f => f === option.id)) {
          selectedFilters.value[facet.code] = selectedFilters.value[facet.code].filter(f => f !== option.id);
          return;
        }

        selectedFilters.value[facet.code].push(option.id);
      }
    };

    const clearFilters = () => {
      toggleFilterSidebar();
      rangeValue = [0, 0];
      selectedFilters.value = {};
      changeFilters(selectedFilters.value);
    };

    const applyFilters = () => {
      toggleFilterSidebar();
      changeFilters(selectedFilters.value);
    };

    onMounted(() => {
      context.root.$scrollTo(context.root.$el, 2000);
      setSelectedFilters();
    });

    if (query.price) {
      const priceMinMaxRange = query.price.split(',');
      for (const key in priceMinMaxRange) {
        if (Object.hasOwnProperty.call(priceMinMaxRange, key)) {
          rangeValue[key] = parseInt(priceMinMaxRange[key]);
        }
      }
    }

    return {
      facets,
      isFacetColor,
      isFacetPrice,
      rangeValue,
      selectFilter,
      isFilterSelected,
      isFilterSidebarOpen,
      toggleFilterSidebar,
      clearFilters,
      applyFilters
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar-filters {
  --overlay-z-index: 3;
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-size--xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__colors {
    display: flex;
      padding-left: var(--spacer-sm);
    @include for-desktop {
      padding-left: 0;
    }
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-base) var(--spacer-xs) 0;
  }
  &__chosen {
    color: var(--c-text-muted);
    font-weight: var(--font-weight--normal);
    font-family: var(--font-family--secondary);
    position: absolute;
    right: var(--spacer-xl);
  }
  &__item {
    --radio-container-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    --radio-background: transparent;
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
.sf-color {
  --color-size: var(--spacer-base);
}
</style>
