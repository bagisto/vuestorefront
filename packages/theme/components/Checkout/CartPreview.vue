<template>
  <div class="fade">
    <SfHeading
      :title="'Cart Summary'"
      :level="4"
      class="heading sf-heading--no-underline"
      />
      <SfSticky>
        <div style="display: block; align-items:center; justify-content:center; min-height: 12.75rem; background-color: #f2f2f2; padding: 20px 40px;">

          <SfProperty
            class="sf-property--full-width"
            v-if="totals.subtotal"
            key="total_sub-total"
            name="Sub Total"
            :value="$n(totals.subtotal, 'currency')"
            style="margin-top:10px;padding: 10px 0px;" />

          <SfProperty
            class="sf-property--full-width"
            key="total_delivery_charges-total"
            name="Delivery Charges"
            :value="$n(totals.shippingtotal, 'currency')"
            style="margin-top:10px;padding: 10px 0px;" />

          <SfProperty
            class="sf-property--full-width"
            key="total_tax-total"
            name="Tax 0 %"
            :value="`-${$n(totals.taxtotal, 'currency')}`"
            style="margin-top:10px;padding: 10px 0px;" />

          <SfProperty
            v-if="totals.discounttotal"
            class="sf-property--full-width"
            key="total_tax-total"
            name="Applied Discount"
            :value="`-${$n(totals.discounttotal, 'currency')}`"
            style="margin-top:10px;padding: 10px 0px;" />

          <SfProperty
            class="sf-property--full-width"
            v-if="totals.total"
            key="total_grand-total"
            name="Grand Total"
            :value="$n(totals.total, 'currency')"
            style="margin-top:10px;padding: 10px 0px;" />
        </div>
      </SfSticky>
  </div>
</template>

<script>
import {
  SfHeading,
  SfLoader,
  SfSticky,
  SfProperty
} from '@storefront-ui/vue';
import { ref, useRouter } from '@nuxtjs/composition-api';
import { computed } from '@nuxtjs/composition-api';
import { useCart, cartGetters } from '@vue-storefront/bagisto';
export default {
  name: 'CartPreview',
  components: {
    SfHeading,
    SfLoader,
    SfSticky,
    SfProperty
  },
  props: {
    cart: {
      type: Object
    }
  },
  setup (props) {
    const router = useRouter();
    const { loading } = useCart();
    const totals = computed(() => cartGetters.getTotals(props.cart));

    const handleFormSubmit = async () => {
    };

    return {
      router,
      loading,
      totals,
      handleFormSubmit
    };
  }
};
</script>
