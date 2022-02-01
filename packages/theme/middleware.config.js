module.exports = {
  integrations: {
    bagisto: {
      location: '@vue-storefront/bagisto-api/server',
      configuration: {
        api: {
          domain: process.env.BAGISTO_DOMAIN
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
