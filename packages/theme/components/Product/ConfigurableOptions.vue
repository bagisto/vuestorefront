<template>
    <div class="attributes">
      <div
        :key="index"
        v-for='(attribute, index) in childAttributes'
        class="attribute"
        >
          <ValidationProvider rules="required" v-slot="{ errors }">
            <SfComponentSelect
              :label="attribute.label"
              :name="['super_attribute[' + attribute.id + ']']"
              :id="['attribute_' + attribute.id]"
              v-model="formData.superAttribute[attribute.id]"
              :required="true"
              :disabled="false"
              :persistent="false"
              :valid="!errors[0]"
              class="form__element"
              :error-message="errors[0]"
              cancelLabel=""
              @change="configure(attribute, $event)"
            >
              <SfComponentSelectOption
              :key="index"
              v-for="(option, index) in attribute.options"
              :value="option.id"
              >
                <SfProductOption :label="option.label" :color="option.label" />
              </SfComponentSelectOption>
            </SfComponentSelect>
          </ValidationProvider>
      </div>
    </div>
</template>

<script>
import {
  SfComponentSelect,
  SfProductOption,
  SfSelect
} from '@storefront-ui/vue';
import { ref, computed } from '@nuxtjs/composition-api';
import { productGetters } from '@vue-storefront/bagisto';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'ConfigurableOptions',
  props: ['product', 'formData'],
  components: {
    SfComponentSelect,
    SfProductOption,
    SfSelect,
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    config: {},

    childAttributes: [],

    selectedProductId: '',

    simpleProduct: null,

    galleryImages: []
  }),
  setup(props) {
    const configurableData = computed(() => productGetters.getConfigurableData(props.product)).value;

    const configAttributes = configurableData?.configAttributes || [];

    return {
      configurableData: configurableData?.configData || [],
      configAttributes
    };
  },
  mounted() {
    this.getConfigurableConfig(this.configurableData);
  },
  methods: {
    getConfigurableConfig (configutableData) {
      this.config = configutableData;

      this.prepareData();
    },

    prepareData () {
      let attributes = ref([]);
      let attribute = ref({});
      this.galleryImages = this.product.cacheGalleryImages.slice(0);

      const configData = {...this.config};

      let childAttributes = this.childAttributes;
      attributes = configData.attributes.slice();
      let index = attributes.length;

      while (index--) {
        attribute = attributes[index];

        attribute.options = [];

        if (index) {
          attribute.disabled = true;
        } else {
          this.fillSelect(attribute);
        }

        attribute = Object.assign(attribute, {
          childAttributes: childAttributes.slice(),
          prevAttribute: attributes[index - 1],
          nextAttribute: attributes[index + 1]
        });

        childAttributes.unshift(attribute);
      }
    },

    fillSelect (attribute) {
      const options = this.getAttributeOptions(attribute.id);

      let prevOption = null;
      let index = 0;
      let i = null;
      let j = null;

      this.clearSelect(attribute);

      attribute.options = [];

      if (attribute.prevAttribute) {
        prevOption = attribute.prevAttribute.options[attribute.prevAttribute.selectedIndex];
      }

      if (options) {
        for (i = 0; i < options.length; i++) {
          let allowedProducts = [];
          if (prevOption) {
            for (j = 0; j < options[i].products.length; j++) {
              if (prevOption.products && prevOption.products.indexOf(options[i].products[j]) > -1) {
                allowedProducts.push(options[i].products[j]);
              }
            }
          } else {
            allowedProducts = options[i].products.slice();
          }

          if (allowedProducts.length > 0) {
            options[i].allowedProducts = allowedProducts;

            attribute.options[index] = options[i];

            index++;
          }
        }
      }
    },

    getAttributeOptions (attributeId) {
      let optionsData = {};

      this.configAttributes.forEach(attribute => {
        if (parseInt(attribute.id) === parseInt(attributeId)) {
          optionsData = attribute.options;
        }
      });

      return optionsData;
    },

    clearSelect (attribute) {
      if (! attribute)
        return;

      if (! attribute.swatch_type || attribute.swatch_type === '' || attribute.swatch_type === 'dropdown') {
        const element = document.getElementById('attribute_' + attribute.id);

        if (element) {
          element.selectedIndex = '0';
        }
      } else {
        const elements = document.getElementsByName('super_attribute[' + attribute.id + ']');

        elements.forEach(element => {
          element.checked = false;
        });
      }
    },

    configure (attribute, value) {
      this.simpleProduct = this.getSelectedProductId(attribute, value);

      if (value) {
        attribute.selectedIndex = this.getSelectedIndex(attribute, value);

        if (attribute.nextAttribute) {
          attribute.nextAttribute.disabled = false;
          this.fillSelect(attribute.nextAttribute);
          this.resetChildren(attribute.nextAttribute);
        } else {
          this.formData['selectedConfigurableOption'] = attribute.options[attribute.selectedIndex].allowedProducts[0];
        }
      } else {
        attribute.selectedIndex = 0;
        this.resetChildren(attribute);
        this.clearSelect(attribute.nextAttribute);
      }
      this.reloadPrice();
      this.changeProductImages();
    },

    resetChildren (attribute) {
      if (attribute.childAttributes) {
        attribute.childAttributes.forEach(set => {
          set.selectedIndex = 0;
          set.disabled = true;
        });
      }
    },

    getSelectedIndex (attribute, value) {
      let selectedIndex = 0;
      attribute.options.forEach((option, index) => {
        if (parseInt(option.id) === parseInt(value)) {
          selectedIndex = index;
        }
      });

      return selectedIndex;
    },

    getSelectedProductId (attribute, value) {
      const options = attribute.options;
      let matchedOptions = [];

      matchedOptions = options.filter(option => {
        return parseInt(option.id) === parseInt(value);
      });

      if (matchedOptions[0] !== undefined && matchedOptions[0].allowedProducts !== undefined) {
        return matchedOptions[0].allowedProducts[0];
      }
      return undefined;
    },

    reloadPrice () {
      let selectedOptionCount = 0;
      this.childAttributes.forEach(attribute => {
        if (attribute.selectedIndex) {
          selectedOptionCount++;
        }
      });

      const priceElement = document.querySelector('.sf-price__regular');
      if (this.childAttributes.length === selectedOptionCount) {
        const index = this.config.variantPrices.findIndex(price => parseInt(price.id) === parseInt(this.simpleProduct));
        if (this.config.variantPrices[index] && this.config.variantPrices[index].id) {
          priceElement.innerHTML = this.config.variantPrices[index].finalPrice.formatedPrice;
        }
      } else {
        priceElement.innerHTML = this.config.regularPrice.formatedPrice;
      }
    },

    changeProductImages () {
      let self = this;
      this.product.cacheGalleryImages.splice(0, this.product.cacheGalleryImages.length);

      if (this.simpleProduct) {
        const index = this.config.variantImages.findIndex(image => parseInt(image.id) === parseInt(this.simpleProduct));

        if (this.config.variantImages[index] && this.config.variantImages[index].images && this.config.variantImages[index].images[0]) {
          self.product.cacheGalleryImages.unshift(this.config.variantImages[index].images[0]);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
    .attributes {
        display: block;
        width: 100%;

        .attribute {
            margin-bottom: 20px;

            > label {
                display: block;
                font-weight: 700;
                font-size: 12px;
                color: rgba(0, 0, 0, 0.56);
                margin-bottom: 16px;
            }

            &.has-error {
                .control-error {
                    color: #ff6472;
                    display: block;
                    margin-top: 5px;
                }
            }

            .swatch-container {
                display: inline-block;

                .swatch {
                    display: inline-block;
                    margin-right: 8px;
                    min-width: 44px;
                    height: 32px;

                    span {
                        min-width: 44px;
                        height: 32px;
                        float: left;
                        line-height: 32px;
                        text-align: center;
                        cursor: pointer;
                        padding: 0 10px;
                        background: #F5F5F5;
                        font-size: 14px;
                        font-weight: 600;
                        color: #000000;
                    }

                    img {
                        width: 48px;
                        height: 48px;
                        border: 1px solid rgba(0, 0, 0, 0.12);
                        border-radius: 3px;
                        cursor: pointer;
                        background: #F5F5F5;
                    }

                    input:checked + span, input:checked + img {
                        border: 1px solid #000000;
                        background: #000000;
                        color: #fff;
                    }

                    input {
                        display: none;
                    }
                }

                .no-options {
                    color: #ff6472;
                }
            }

            &.color {
                .swatch-container {
                    .swatch {
                        min-width: 48px;
                        height: 48px;

                        span {
                            min-width: 46px;
                            height: 46px;
                            border: 1px solid rgba(0, 0, 0, 0.12);
                        }
                    }
                }
            }
        }
    }
</style>