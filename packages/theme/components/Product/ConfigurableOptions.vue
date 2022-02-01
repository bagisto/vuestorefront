<template>
    <div class="attributes">

                  {{ product.configutableData[0] }}
    </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { productGetters } from '@vue-storefront/bagisto';

export default {
  name: 'ConfigurableOptions',
  props: ['product', 'formData'],
  data: () => ({
    config: {},

    childAttributes: [],

    selectedProductId: '',

    simpleProduct: null,

    galleryImages: []
  }),
  setup(props) {
    const configurableData = computed(() => productGetters.getConfigurableData(props.product)).value;

    return {
      configurableData
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
      this.galleryImages = this.product.images.slice(0);
console.log('Configutable');

      var config = this.config;

      var childAttributes = this.childAttributes,
          attributes = config.attributes.slice(),
          index = attributes.length,
          attribute;
console.log(attributes);

      while (index--) {
        attribute = attributes[index];

        attribute.options = [];

        if (index) {
          attribute.disabled = true;
        } else {
          this.fillSelect(attribute);
        }

        const objectA = attribute;
        const objectB = {
          childAttributes: childAttributes.slice(),
          prevAttribute: attributes[index - 1],
          nextAttribute: attributes[index + 1]
        };

        attribute = {...objectA, ...objectB};

        childAttributes.unshift(attribute);
      }
    },

    fillSelect (attribute) {
      var options = this.getAttributeOptions(attribute.id),
          prevOption,
          index = 1,
          allowedProducts,
          i,
          j;

      // this.clearSelect(attribute);

      attribute.options = [{ id: '', label: this.config.chooseText, products: [] }];

      if (attribute.prevAttribute) {
        prevOption = attribute.prevAttribute.options[attribute.prevAttribute.selectedIndex];
      }
console.log(options);
      // if (options) {
      //   for (i = 0; i < options.length; i++) {
      //     allowedProducts = [];

      //     if (prevOption) {
      //       for (j = 0; j < options[i].products.length; j++) {
      //         if (prevOption.products && prevOption.products.indexOf(options[i].products[j]) > -1) {
      //           allowedProducts.push(options[i].products[j]);
      //         }
      //       }
      //     } else {
      //       allowedProducts = options[i].products.slice(0);
      //     }

      //     if (allowedProducts.length > 0) {
      //       options[i].allowedProducts = allowedProducts;

      //       attribute.options[index] = options[i];

      //       index++;
      //     }
      //   }
      // }
    },

    getAttributeOptions (attributeId) {
      let self = this;
      let options;
console.log(this.configurableData);
      this.config.attributes.forEach(attribute => {
        if (parseInt(attribute.id) === parseInt(attributeId)) {
          options = attribute.options;
        }
      });

      return options;
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

        elements.forEach(function(element) {
          element.checked = false;
        });
      }
    },
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