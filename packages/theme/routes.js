const path = require('path');

export function getRoutes(themeDir = __dirname) {
  return [{
    name: 'bg-home',
    path: '/',
    component: path.resolve(themeDir, 'pages/Home.vue'),
  },
  {
    name: 'bg-product',
    path: '/product/:id/',
    component: path.resolve(themeDir, 'pages/Product.vue'),
  },
  {
    name: 'bg-category',
    path: '/category/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
    component: path.resolve(themeDir, 'pages/Category.vue'),
  },
  {
    name: 'bg-my-account',
    path: '/my-account/:pageName?',
    component: path.resolve(themeDir, 'pages/MyAccount.vue'),
  },
  {
    name: 'bg-checkout',
    path: '/checkout',
    component: path.resolve(themeDir, 'pages/Checkout.vue'),
    children: [
      // {
      //   path: 'user-account',
      //   name: 'bg-user-account',
      //   component: path.resolve(themeDir, 'pages/Checkout/UserAccount.vue'),
      // },
      {
        path: 'shipping',
        name: 'bg-shipping',
        component: path.resolve(themeDir, 'pages/Checkout/Shipping.vue'),
      },
      {
        path: 'billing',
        name: 'bg-billing',
        component: path.resolve(themeDir, 'pages/Checkout/Billing.vue'),
      },
      {
        path: 'summery',
        name: 'bg-summary',
        component: path.resolve(themeDir, 'pages/Checkout/Summary.vue'),
      },
      {
        path: 'thank-you',
        name: 'bg-thank-you',
        component: path.resolve(themeDir, 'pages/Checkout/ThankYou.vue'),
      },
      // {
      //   path: 'external-thank-you',
      //   name: 'bg-external-thank-you',
      //   component: path.resolve(themeDir, 'pages/Checkout/ExternalCheckoutThankYou.vue')
      // }
    ]
  },
  // {
  //   name: 'bg-reset-password',
  //   path: '/reset-password',
  //   alias: '/customer/account/createPassword',
  //   component: path.resolve(themeDir, 'pages/ResetPassword.vue'),
  // },
  // {
  //   name: 'bg-page',
  //   path: '/:slug+',
  //   component: path.resolve(themeDir, 'pages/Page.vue'),
  // },
  ];
}
