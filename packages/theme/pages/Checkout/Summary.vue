<template>
  <div>
    <SfHeading
      :level="3"
      title="Order Summary"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfTable class="sf-table--bordered table desktop-only">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">{{ $t('Item') }}</SfTableHeader>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="table__header"
          :class="{ table__description: tableHeader === 'Description', table__image: tableHeader === 'Variants' }"
        >
          {{ tableHeader }}
        </SfTableHeader>
      </SfTableHeading>
      <SfTableRow
        v-for="(item, index) in cartItems"
        :key="index"
        class="table__row"
      >
        <SfTableData class="table__image">
          <SfImage
            :src="cartGetters.getItemImage(item).small"
            :alt="cartGetters.getItemName(item)"
            />
        </SfTableData>
        <SfTableData class="table__data table__description">
          <div class="product-sku" v-if="item.type == 'configurable'">
          <SfProperty
            v-for="(attribute, key) in cartGetters.getItemAttributes(item, ['Color', 'Size'])"
            :key="key"
            :name="key"
            :value="attribute"
          />
          </div>
          <div class="product-sku" v-else> - </div>
        </SfTableData>
        <SfTableData class="table__data table__description">
          <div class="product-title">{{ cartGetters.getItemName(item) }}</div>
          <div class="product-sku">{{ cartGetters.getItemSku(item) }}</div>
        </SfTableData>
        <SfTableData class="table__data">{{ cartGetters.getItemQty(item) }}</SfTableData>
        <SfTableData class="table__data price">
          <SfPrice
            :regular="$n(cartGetters.getItemPrice(item).regular, 'currency')"
            :special="cartGetters.getItemPrice(item).special && $n(cartGetters.getItemPrice(item).special, 'currency')"
            class="product-price"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <div class="summary">
      <div class="summary__group">
        <div class="summary__total">
          <SfProperty
            name="Subtotal"
            :value="$n(totals.special > 0 ? totals.special : totals.subtotal, 'currency')"
            class="sf-property--full-width property"
          />
        </div>

        <SfDivider />

        <SfProperty
          name="Total price"
          :value="$n(totals.total, 'currency')"
          class="sf-property--full-width sf-property--large summary__property-total"
        />

        <SfProperty
          v-if="selctedShippingRate"
          :name="`Shipping Method (${selctedShippingRate.methodTitle})`"
          :value="$n(selctedShippingRate.price, 'currency')"
          class="sf-property--large summary__property-total"
        />

        <SfProperty
          v-if="selctedPaymentMethod"
          name="Payment Method"
          :value="selctedPaymentMethod.toUpperCase()"
          class="sf-property--large summary__property-total"
        />

        <SfCheckbox v-e2e="'terms'" v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              {{ $t('I agree to') }} <SfLink href="#"> {{ $t('Terms and conditions') }}</SfLink>
            </div>
          </template>
        </SfCheckbox>

        <div v-e2e="'payment-summary-buttons'" class="summary__action">
          <SfButton
            type="button"
            class="sf-button color-secondary summary__back-button"
            @click="router.push('/checkout/billing')"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            :disabled="loading || !terms"
            class="summary__action-button"
            @click="processOrder"
          >
            {{ $t('Make an order') }}
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfDivider,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion,
  SfLink,
  SfAddressPicker
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { ref, computed, useRouter } from '@nuxtjs/composition-api';
import { useMakeOrder, useCart, cartGetters, orderGetters } from '@vue-storefront/bagisto';
import { useUiNotification} from '~/composables';

export default {
  name: 'OrderSummary',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfDivider,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion,
    SfLink,
    SfAddressPicker
  },
  setup(props, context) {
    const router = useRouter();
    const terms = ref(false);
    const { cart, load, setCart } = useCart();
    const { order, make, loading } = useMakeOrder();
    const { send: sendNotification} = useUiNotification();

    onSSR(async () => {
      await load();
    });

    const selctedShippingRate = cart.value?.selectedShippingRate || {};
    const selctedPaymentMethod = cart.value?.payment?.method || '';
    const processOrder = async () => {
      await make().then(() => {
        if (order.value) {
          const thankYouPath = { name: 'thank-you', query: { orderId: orderGetters.getId(order.value) }};
          router.push(context.root.localePath(thankYouPath));
          sendNotification({
            key: 'order_saved',
            message: 'Success: Order placed successfully.',
            type: 'success',
            title: 'Success!',
            icon: 'check'
          });
        } else {
          sendNotification({
            key: 'order_root',
            message: 'Some error occured in placing order, try again.',
            type: 'danger',
            title: 'Error!',
            icon: 'cross'
          });
          router.push('/');
        }
        setCart(null);
      });
    };

    return {
      router,
      selctedShippingRate,
      selctedPaymentMethod,
      terms,
      loading,
      cartItems: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      tableHeaders: ['Variants', 'Description', 'Quantity', 'Amount'],
      cartGetters,
      processOrder
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.table {
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: center;
      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
}
.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.product-price {
  --price-font-size: var(--font-size--base);
}
.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }
  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }
  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color:  var(--c-white);
    &:hover {
      color:  var(--c-white);
    }
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.property {
  margin: 0 0 var(--spacer-sm) 0;
  &__name {
    color: var(--c-text-muted);
  }
}
.accordion {
  margin: 0 0 var(--spacer-xl) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}
.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: var(--font-weight--normal);
  }
}
</style>
