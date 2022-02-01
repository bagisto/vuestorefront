<template>
  <SfTabs :open-tab="1">
    <SfTab title="My orders">
      <div v-if="currentOrder">
        <SfButton class="sf-button--text all-orders" @click="currentOrder = null">All Orders</SfButton>
        <div class="highlighted highlighted--total" style="width: 60%; float:right;margin-top:10px">
          <SfProperty
            name="Order ID"
            :value="`#${orderGetters.getId(currentOrder)}`"
            class="sf-property--value-in-middle property"
            style="margin-bottom: 5px;"
          />
          <SfProperty
            name="Date"
            :value="orderGetters.getDate(currentOrder)"
            class="sf-property--value-in-middle property"
            style="margin-bottom: 5px;"
          />
          <SfProperty
            name="Status"
            :value="orderGetters.getStatus(currentOrder)"
            class="sf-property--value-in-middle property"
            style="margin-bottom: 5px;"
          />
          <SfDivider/>
          <SfProperty
            name="Sub Total"
            :value="$n(currentOrder.subTotal, 'currency')"
            class="sf-property--value-in-middle property"
            style="margin: 10px 0px 5px 0px;" />
          <SfProperty
            name="Shipping And Handling"
            :value="$n(currentOrder.shippingAmount, 'currency')"
            class="sf-property--value-in-middle property"
            style="margin-bottom: 5px;" />
          <SfProperty
            v-if="currentOrder.baseDiscountAmount > 0"
            name="Discount"
            :value="` - ${$n(currentOrder.discountAmount, 'currency')}`"
            class="sf-property--value-in-middle property"
            style="margin-bottom: 5px;" />
          <SfProperty
            name="Total"
            :value="$n(orderGetters.getPrice(currentOrder), 'currency')"
            class="sf-property--value-in-middle property"
            style="margin-bottom: 5px;" />
        </div>
        <SfTable class="products">
          <SfTableHeading>
            <SfTableHeader class="products__name">{{ $t('Product') }}</SfTableHeader>
            <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
            <SfTableHeader>{{ $t('Price') }}</SfTableHeader>
            <SfTableHeader>{{ 'Total' }}</SfTableHeader>
          </SfTableHeading>
          <SfTableRow v-for="(item, i) in orderGetters.getItems(currentOrder)" :key="i">
            <SfTableData class="products__name">
              <nuxt-link :to="'/product/'+orderGetters.getItemSku(item)">
                {{orderGetters.getItemName(item)}}
              </nuxt-link>
            </SfTableData>
            <SfTableData>{{orderGetters.getItemQty(item)}}</SfTableData>
            <SfTableData>{{$n(orderGetters.getItemPrice(item), 'currency')}}</SfTableData>
            <SfTableData>{{$n(orderGetters.getItemSubTotal(item), 'currency')}}</SfTableData>
          </SfTableRow>
        </SfTable>
        <SfDivider/>

        <div style="display: inline-flex; width:100%;margin-bottom:10px;">
          <SfSticky style="width:50%">
            <div style="display: block; align-items:center; justify-content:center; min-height: 5.75rem; background-color: #f2f2f2; padding: 20px 40px;height: auto;">

              <SfHeading
                :title="'Shipping Method'"
                :level="4"
                class="heading sf-heading--no-underline"
                style="text-align:left;"
                />
              <SfProperty
                class="sf-property--large"
                v-if="currentOrder.shippingMethod"
                key="total_sub-total"
                :name="currentOrder.shippingTitle"
                :value="$n(currentOrder.shippingAmount, 'currency')"
                style="margin-top:10px;padding: 10px 0px;" />
            </div>
          </SfSticky>
          <SfSticky style="width:50%">
            <div style="display: block; align-items:center; justify-content:center; min-height: 5.75rem; background-color: #f2f2f2; padding: 20px 40px;height: auto;">
              <SfHeading
                :title="'Payment Method'"
                :level="4"
                class="heading sf-heading--no-underline"
                style="text-align:left;"
                />
                <p style="margin-top:10px;padding: 10px 0px;">
                  {{ currentOrder.payment.methodTitle }}
                </p>
                <p
                  v-if="currentOrder.payment.additional.title"
                  style="margin:0; padding: 0;">
                    <strong>{{ currentOrder.payment.additional.title }}</strong>
                </p>
                <p
                  v-if="currentOrder.payment.additional.value"
                  style="margin:0; padding: 0;">
                    {{ currentOrder.payment.additional.value }}
                </p>
            </div>
          </SfSticky>
        </div>
        <SfDivider/>

        <div style="display: inline-flex; width:100%">
          <SfSticky style="width:50%" v-if="currentOrder.billingAddress.id">
            <div style="display: block; align-items:center; justify-content:center; height: 12.75rem; background-color: #f2f2f2; padding: 20px 40px;">

              <SfHeading
                :title="'Billing Address'"
                :level="4"
                class="heading sf-heading--no-underline"
                style="text-align:left;"
                />
                <p
                  v-if="currentOrder.billingAddress.companyName"
                  style="margin-top:10px;padding: 10px 0px 0px;">
                    {{ currentOrder.billingAddress.companyName }}
                </p>
                <p style="margin:0; padding:0;">
                    <strong>{{ currentOrder.billingAddress.firstName }} {{ currentOrder.billingAddress.lastName }}</strong>
                </p>
                <p style="margin:0; padding:0;"
                  v-if="currentOrder.billingAddress.email">
                    <i>{{ currentOrder.billingAddress.email }}</i>
                </p>
                <p style="margin:0; padding:0;">
                    {{ currentOrder.billingAddress.address1 }}, {{ currentOrder.billingAddress.address2 }}
                </p>
                <p style="margin:0; padding:0;">
                    {{ currentOrder.billingAddress.city }}, {{ currentOrder.billingAddress.state }}, {{ currentOrder.billingAddress.country }}
                </p>
                <p style="margin:0; padding:0;"
                    v-if="currentOrder.billingAddress.phone">
                    {{ 'Contact No: ' }}{{ currentOrder.billingAddress.phone }}
                </p>
            </div>
          </SfSticky>
          <SfSticky style="width:50%">
            <div style="display: block; align-items:center; justify-content:center; height: 12.75rem; background-color: #f2f2f2; padding: 20px 40px;">

              <SfHeading
                :title="'Shipping Address'"
                :level="4"
                class="heading sf-heading--no-underline"
                style="text-align:left;"
                />
                <p
                  v-if="currentOrder.shippingAddress.companyName"
                  style="margin-top:10px;padding: 10px 0px 0px;">
                    {{ currentOrder.shippingAddress.companyName }}
                </p>
                <p style="margin:0; padding:0;">
                    <strong>{{ currentOrder.shippingAddress.firstName }} {{ currentOrder.shippingAddress.lastName }}</strong>
                </p>
                <p style="margin:0; padding:0;"
                  v-if="currentOrder.shippingAddress.email">
                    <i>{{ currentOrder.shippingAddress.email }}</i>
                </p>
                <p style="margin:0; padding:0;">
                    {{ currentOrder.shippingAddress.address1 }}, {{ currentOrder.shippingAddress.address2 }}
                </p>
                <p style="margin:0; padding:0;">
                    {{ currentOrder.shippingAddress.city }}, {{ currentOrder.shippingAddress.state }}, {{ currentOrder.shippingAddress.country }}
                </p>
                <p style="margin:0; padding:0;"
                    v-if="currentOrder.shippingAddress.phone">
                    {{ 'Contact No: ' }}{{ currentOrder.shippingAddress.phone }}
                </p>
            </div>
          </SfSticky>
        </div>
      </div>
      <div v-else>
        <p class="message">
          {{ $t('Details and status orders') }}
        </p>
        <div v-if="totalOrders === 0" class="no-orders">
          <p class="no-orders__title">{{ $t('You currently have no orders') }}</p>
          <SfButton class="no-orders__button">{{ $t('Start shopping') }}</SfButton>
        </div>
        <div v-else>
          <p>Total orders - {{ totalOrders }}</p>
          <SfTable class="orders">
            <SfTableHeading>
              <SfTableHeader
                v-for="tableHeader in tableHeaders"
                :key="tableHeader"
                >{{ tableHeader }}</SfTableHeader>
              <SfTableHeader class="orders__element--right" />
            </SfTableHeading>
            <SfTableRow v-for="order in orders" :key="orderGetters.getId(order)">
              <SfTableData v-e2e="'order-number'">{{ orderGetters.getId(order) }}</SfTableData>
              <SfTableData>{{ orderGetters.getDate(order) }}</SfTableData>
              <SfTableData>{{ $n(orderGetters.getPrice(order), 'currency') }}</SfTableData>
              <SfTableData>
                <span :class="getStatusTextClass(order)">{{ orderGetters.getStatus(order) }}</span>
              </SfTableData>
              <SfTableData class="orders__view orders__element--right">
                <SfButton class="sf-button--text desktop-only" @click="currentOrder = order">
                  {{ $t('View details') }}
                </SfButton>
              </SfTableData>
            </SfTableRow>
          </SfTable>
          <LazyHydrate on-interaction>
            <SfPagination
              v-if="!orderLoading"
              class="products__pagination desktop-only"
              v-show="pagination.totalPages > 1"
              :current="pagination.currentPage"
              :total="pagination.totalPages"
              :visible="10"
            />
          </LazyHydrate>
        </div>
      </div>
    </SfTab>
    <SfTab title="Returns">
      <p class="message">
        This feature is not implemented yet! Please take a look at
        <br />
        <SfLink class="message__link" href="#">https://github.com/DivanteLtd/vue-storefront/issues</SfLink>
        for our Roadmap!
      </p>
    </SfTab>
  </SfTabs>
</template>

<script>
import {
  SfTabs,
  SfTable,
  SfButton,
  SfHeading,
  SfDivider,
  SfProperty,
  SfSticky,
  SfLink,
  SfPagination
} from '@storefront-ui/vue';
import { computed, useRoute, ref } from '@nuxtjs/composition-api';
import { useUserOrder, orderGetters, facetGetters } from '@vue-storefront/bagisto';
import { AgnosticOrderStatus } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'PersonalDetails',
  components: {
    SfTabs,
    SfTable,
    SfButton,
    SfHeading,
    SfDivider,
    SfProperty,
    SfSticky,
    SfLink,
    LazyHydrate,
    SfPagination
  },
  setup() {
    const route = useRoute();
    const { orders, search, loading: orderLoading } = useUserOrder();
    const currentOrder = ref(null);

    onSSR(async () => {
      await search({ page: parseInt(route.value?.query?.page) || 1 });
    });

    const tableHeaders = [
      'Order ID',
      'Payment date',
      'Amount',
      'Status'
    ];

    const getStatusTextClass = (order) => {
      const status = orderGetters.getStatus(order);
      switch (status) {
        case AgnosticOrderStatus.Open:
          return 'text-warning';
        case AgnosticOrderStatus.Pending:
          return 'text-warning';
        case 'Processing':
          return 'text-information';
        case AgnosticOrderStatus.Complete:
          return 'text-success';
        case AgnosticOrderStatus.Cancelled:
          return 'text-danger';
        default:
          return '';
      }
    };

    return {
      tableHeaders,
      orderLoading,
      orders: computed(() => orderGetters.getItems(orders.value)),
      totalOrders: computed(() => orderGetters.getOrdersTotal(orders.value)),
      getStatusTextClass,
      orderGetters,
      currentOrder,
      pagination: orders.value?.pagination ? computed(() => facetGetters.getPagination(orders?.value)) : ''
    };
  }
};
</script>

<style lang='scss' scoped>
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--primary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17,5rem;
    }
  }
}
.orders {
  @include for-desktop {
    &__element {
      &--right {
        --table-column-flex: 1;
        text-align: right;
      }
    }
  }
}
.all-orders {
  --button-padding: var(--spacer-base) 0;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);
  &__link {
    color: var(--c-primary);
    font-weight: var(--font-weight--medium);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-size--sm);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size--sm);
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
  }
}
.products {
  --table-column-flex: 1;
  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);
  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);
  &:last-child {
    margin-bottom: 0;
  }
  ::v-deep .sf-property__name {
    white-space: nowrap;
  }
  ::v-deep .sf-property__value {
    text-align: right;
  }
  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);
    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
  }
}

</style>
