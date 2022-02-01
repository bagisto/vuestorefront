
type Maybe<T> = T | null;

type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;

  /** The `Long` scalar type represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any;

  /** DateTime is a scalar value that represents an ISO8601 formatted date and time. */
  DateTime: any;

  /** [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) country code. */
  Country: any;

  /** Locale is a scalar value represented as a string language tag. */
  Locale: any;

  /** DateTime is a scalar value that represents an ISO8601 formatted date. */
  Date: any;

  /** Raw JSON value */
  Json: any;

  /** Array */
  Array: any;

  /** Represents a currency. Currencies are identified by their [ISO
   * 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) currency codes.
   */
  Currency: any;

  /** A key that references a resource. */
  KeyReferenceInput: any;

  /** Search filter. It is represented as a string and has th same format as in REST API: "field:filter_criteria" */
  SearchFilter: any;

  /** Search sort */
  SearchSort: any;

  /** YearMonth is a scalar value that represents an ISO8601 formatted year and month. */
  YearMonth: any;

  /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
  BigDecimal: any;

  /** Time is a scalar value that represents an ISO8601 formatted time. */
  Time: any;
};

export type TODO = unknown;

export type Setttings = TODO;

export type Endpoints = TODO;

// Setting Type Section
export type Slider = {
    id: Maybe<Scalars['ID']>;
    title: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    imageUrl: Maybe<Scalars['String']>;
    content: Maybe<Scalars['String']>;
    channelId: Maybe<Scalars['Int']>;
    locale: Maybe<Scalars['String']>;
    sliderPath: Maybe<Scalars['String']>;
    imgPath: Maybe<Scalars['String']>;
}

export type FilterableAttribute = {
    id: Maybe<Scalars['Int']>;
    adminName: Maybe<Scalars['String']>;
    code: Maybe<Scalars['String']>;
    type: Maybe<Scalars['String']>;
    position: Maybe<Scalars['Int']>;
    options: Maybe<Scalars['Array']>;
};

export type FilterCategoryListInput = {
    id: Maybe<Scalars['Int']>;
    status: Maybe<Scalars['Int']>;
    slug: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
    position: Maybe<Scalars['Int']>;
};

export type CategoryTranslation = {
    id: Maybe<Scalars['Int']>;
    name: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    localeId: Maybe<Scalars['Int']>;
    locale: Maybe<Scalars['String']>;
};

export type CategoryBreadcrumbs = {
    name: Maybe<Scalars['String']>;
    slug: Maybe<Scalars['String']>;
    urlPath: Maybe<Scalars['String']>
};

export type Category = {
    id: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    slug: Maybe<Scalars['String']>;
    urlPath: Maybe<Scalars['String']>;
    imageUrl: Maybe<Scalars['String']>;
    metaTitle: Maybe<Scalars['String']>;
    metaDescription: Maybe<Scalars['String']>;
    metaKeywords: Maybe<Scalars['String']>;
    position: Maybe<Scalars['Int']>;
    status: Maybe<Scalars['Boolean']>;
    displayMode: Maybe<Scalars['String']>;
    parentId: Maybe<Scalars['String']>;
    breadcrumbs: [CategoryBreadcrumbs];
    categoryProductMaxPrice: Maybe<Scalars['Float']>;
    filterableAttributes: [FilterableAttribute];
    translations: [CategoryTranslation];
    children: [Category];
    createdAt: Maybe<Scalars['String']>;
    updatedAt: Maybe<Scalars['String']>
};

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type PasswordResetResult = TODO;

export type AttributeFamily = {
    id: Maybe<Scalars['Int']>
    code: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
    status: Maybe<Scalars['Boolean']>;
    isUserDefined: Maybe<Scalars['Boolean']>;
}

export type ProductFlat = {
    id: Maybe<Scalars['Int']>;
    sku: Maybe<Scalars['String']>;
    productNumber: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    shortDescription: Maybe<Scalars['String']>;
    urlKey: Maybe<Scalars['String']>;
    new: Maybe<Scalars['Boolean']>;
    featured: Maybe<Scalars['Boolean']>;
    status: Maybe<Scalars['Boolean']>;
    visibleIndividually: Maybe<Scalars['Boolean']>;
    thumbnail: Maybe<Scalars['String']>;
    price: Maybe<Scalars['Int']>;
    cost: Maybe<Scalars['Int']>;
    specialPrice: Maybe<Scalars['Int']>;
    specialPriceFrom: Maybe<Scalars['String']>;
    specialPriceTo: Maybe<Scalars['String']>;
    weight: Maybe<Scalars['Int']>;
    color: Maybe<Scalars['Int']>;
    colorLabel: Maybe<Scalars['String']>;
    size: Maybe<Scalars['Int']>;
    sizeLabel: Maybe<Scalars['String']>;
    locale: Maybe<Scalars['String']>;
    channel: Maybe<Scalars['String']>;
    productId: Maybe<Scalars['Int']>;
    parentId: Maybe<Scalars['Int']>;
    minPrice: Maybe<Scalars['Int']>;
    maxPrice: Maybe<Scalars['Int']>;
    metaTitle: Maybe<Scalars['String']>;
    metaKeywords: Maybe<Scalars['String']>;
    metaDescription: Maybe<Scalars['String']>;
    width: Maybe<Scalars['Int']>;
    height: Maybe<Scalars['Int']>;
    depth: Maybe<Scalars['Int']>;
    variants: [ProductFlat];
    parent: ProductFlat;
    createdAt: Maybe<Scalars['String']>;
    updatedAt: Maybe<Scalars['String']>;
}

export type Image = {
    id: Maybe<Scalars['Int']>;
    type: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    url: Maybe<Scalars['String']>;
    productId: Maybe<Scalars['Int']>;
};

export type CacheImage = {
    smallImageUrl: Maybe<Scalars['String']>;
    mediumImageUrl: Maybe<Scalars['String']>;
    largeImageUrl: Maybe<Scalars['String']>;
    originalImageUrl: Maybe<Scalars['String']>;
};

export type Video = {
    id: Maybe<Scalars['Int']>;
    type: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    url: Maybe<Scalars['String']>;
    productId: Maybe<Scalars['Int']>;
};

export type CustomerReviewInput = {
    id?: Maybe<Scalars['Int']>;
    sort?: Maybe<Scalars['String']>;
    order?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    rating?: Maybe<Scalars['Int']>;
    customerId?: Maybe<Scalars['Int']>;
    customerName?: Maybe<Scalars['String']>;
    productName?: Maybe<Scalars['String']>;
    productId?: Maybe<Scalars['Int']>;
    status?: Maybe<Scalars['String']>;
};

export type CreateReviewInput = {
    name: Maybe<Scalars['String']>;
    title: Maybe<Scalars['String']>;
    rating: Maybe<Scalars['Int']>;
    comment: Maybe<Scalars['String']>;
    productId: Maybe<Scalars['Int']>;
};

export type ReviewItem = {
    id: Maybe<Scalars['String']>;
    productId: Maybe<Scalars['Int']>;
    customerId: Maybe<Scalars['Int']>;
    customerName: Maybe<Scalars['String']>;
    title: Maybe<Scalars['String']>;
    comment: Maybe<Scalars['String']>;
    rating: Maybe<Scalars['Int']>;
    status: Maybe<Scalars['String']>;
    product: Maybe<Scalars['Array']>;
    createdAt: Maybe<Scalars['String']>;
    updatedAt: Maybe<Scalars['String']>;
};

export type Review = TODO;

export type ProductAdditionalData = {
    id: Maybe<Scalars['String']>;
    code: Maybe<Scalars['String']>;
    label: Maybe<Scalars['String']>;
    value: Maybe<Scalars['String']>;
    admin_name: Maybe<Scalars['String']>;
    type: Maybe<Scalars['String']>;
};

export type ProductPriceHtml = {
    id: Maybe<Scalars['String']>;
    type: Maybe<Scalars['String']>;
    html: Maybe<Scalars['String']>;
    regular: Maybe<Scalars['String']>;
    special: Maybe<Scalars['String']>
};

export type FilterProductListingInput = {
    categorySlug: Maybe<Scalars['String']>;
    search: Maybe<Scalars['String']>;
    price: Maybe<Scalars['String']>;
    order: Maybe<Scalars['String']>;
    sort: Maybe<Scalars['String']>;
};

export type Product = {
    id: Maybe<Scalars['String']>;
    type: Maybe<Scalars['String']>;
    isInWishlist: Maybe<Scalars['Boolean']>;
    attributeFamilyId: Maybe<Scalars['Int']>;
    sku: Maybe<Scalars['String']>;
    parentId: Maybe<Scalars['Int']>;
    createdAt: Maybe<Scalars['String']>;
    updatedAt: Maybe<Scalars['String']>;
    configutableData: Maybe<Scalars['Json']>;
    productFlats: [ProductFlat];
    variants: [Product];
    parent: Product;
    attributeFamily: AttributeFamily;
    additionalData: [ProductAdditionalData];
    categories: [Category];
    images: [Image];
    cacheBaseImage: CacheImage;
    cacheGalleryImages: [CacheImage];
    videos: [Video];
    priceHtml: ProductPriceHtml;
    reviews: [ReviewItem];
    relatedProducts: [Product]
};

export type ProductFilter = {
    id?: Maybe<Scalars['Int']>;
};

export type CreateRegisterInput = {
    firstName: Maybe<Scalars['String']>;
    lastName: Maybe<Scalars['String']>;
    email: Maybe<Scalars['String']>;
    password: Maybe<Scalars['String']>;
    passwordConfirmation: Maybe<Scalars['String']>;
};

export type LoginInput = {
    email: Maybe<Scalars['String']>;
    password: Maybe<Scalars['String']>;
    remember: Maybe<Scalars['Boolean']>;
};

export type UpdateAccountInput = {
    firstName: Maybe<Scalars['String']>;
    lastName: Maybe<Scalars['String']>;
    email: Maybe<Scalars['String']>;
    gender: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    dateOfBirth?: Maybe<Scalars['String']>;
    oldpassword?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    passwordConfirmation?: Maybe<Scalars['String']>;
};

export type ForgotPasswordInput = {
    email: Maybe<Scalars['String']>;
};

export type User = {
  id: Maybe<Scalars['Int']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  gender: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  dateOfBirth: Maybe<Scalars['String']>;
  password: Maybe<Scalars['String']>;
};

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type CreateAddressInput = {
    companyName?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    address1: Maybe<Scalars['String']>;
    address2?: Maybe<Scalars['String']>;
    country: Maybe<Scalars['String']>;
    state: Maybe<Scalars['String']>;
    city: Maybe<Scalars['String']>;
    postcode: Maybe<Scalars['String']>;
    phone: Maybe<Scalars['String']>;
    vatId?: Maybe<Scalars['String']>;
    defaultAddress?: Maybe<Scalars['Boolean']>
};

export type UpdateAddressInput = {
    companyName?: Maybe<Scalars['String']>;
    firstName?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    address1: Maybe<Scalars['String']>;
    address2?: Maybe<Scalars['String']>;
    country: Maybe<Scalars['String']>;
    state: Maybe<Scalars['String']>;
    city: Maybe<Scalars['String']>;
    postcode: Maybe<Scalars['String']>;
    phone: Maybe<Scalars['String']>;
    vatId?: Maybe<Scalars['String']>;
    defaultAddress?: Maybe<Scalars['Boolean']>
};

export type UserShippingAddressItem = {
    id: Maybe<Scalars['Int']>;
    customerId: Maybe<Scalars['Int']>;
    companyName?: Maybe<Scalars['String']>;
    firstName: Maybe<Scalars['String']>;
    lastName: Maybe<Scalars['String']>;
    address1: Maybe<Scalars['String']>;
    address2?: Maybe<Scalars['String']>;
    country: Maybe<Scalars['String']>;
    state: Maybe<Scalars['String']>;
    city: Maybe<Scalars['String']>;
    postcode: Maybe<Scalars['String']>;
    phone: Maybe<Scalars['String']>;
    vatId?: Maybe<Scalars['String']>;
    addressType?: Maybe<Scalars['String']>;
    defaultAddress?: Maybe<Scalars['Boolean']>;
    createdAt?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserShippingAddress = {
    addresses?: [UserShippingAddressItem]
};

export type UserShippingAddressSearchCriteria = {
    addressType?: Maybe<Scalars['Array']>;
};

export type NewAddressInput = {
  companyName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['Int']>;
  saveAsAddress?: Maybe<Scalars['Boolean']>;
  useForShipping?: Maybe<Scalars['Boolean']>;
  additional?: Maybe<Scalars['Json']>;
};

export type SaveShippingAddressInput = {
  currency?: Maybe<Scalars['String']>;
  billingAddressId: Maybe<Scalars['ID']>;
  shippingAddressId: Maybe<Scalars['ID']>;
  billing?: NewAddressInput;
  shipping?: NewAddressInput;
  type: Maybe<Scalars['String']>;
};

export type SaveShippingMethodInput = {
  currency?: Maybe<Scalars['String']>;
  shippingMethod: Maybe<Scalars['String']>;
};

export type PaymentMethodInput = {
  method: Maybe<Scalars['String']>;
  methodTitle?: Maybe<Scalars['String']>;
};

export type SavePaymentMethodInput = {
  currency?: Maybe<Scalars['String']>;
  payment: PaymentMethodInput;
};

export type PaymentMethod = {
    method: Maybe<Scalars['String']>;
    method_title: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    sort: Maybe<Scalars['Int']>;
};

export type BillingAddress = TODO;

export type OrderPaymentAdditional = {
    title: Maybe<Scalars['String']>;
    value: Maybe<Scalars['String']>;
};

export type CartPayment = {
    id: Maybe<Scalars['ID']>;
    method: Maybe<Scalars['String']>;
    methodTitle: Maybe<Scalars['String']>;
    cartId: Maybe<Scalars['ID']>;
    additional?: OrderPaymentAdditional;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ShippingMethod = {
    title: Maybe<Scalars['String']>;
    methods: {
        code: Maybe<Scalars['String']>;
        label: Maybe<Scalars['String']>;
        price: Maybe<Scalars['Float']>;
        formattedPrice: Maybe<Scalars['String']>;
        basePrice: Maybe<Scalars['Float']>;
        formattedBasePrice: Maybe<Scalars['String']>;
    }
};

export type ConfigurableProductInput = {
    attributeId: Maybe<Scalars['Int']>;
    attributeOptionId: Maybe<Scalars['Int']>;
}

export type AddItemToCartInput = {
    isBuyNow?: Maybe<Scalars['Boolean']>;
    productId: Maybe<Scalars['Boolean']>;
    quantity: Maybe<Scalars['Int']>;

    // Used in case of adding Grouped Product to Cart
    selectedConfigurableOption?: Maybe<Scalars['Int']>;
    superAttribute?: [ConfigurableProductInput];
}

export type UpdateItemsQty = {
    cartItemId: Maybe<Scalars['ID']>;
    quantity: Maybe<Scalars['Int']>;
}

export type UpdateItemToCartInput = {
    qty: [UpdateItemsQty];
}

export type ShippingRates = {
    id: Maybe<Scalars['ID']>;
    carrier: Maybe<Scalars['String']>;
    carrierTitle: Maybe<Scalars['String']>;
    method: Maybe<Scalars['String']>;
    methodTitle: Maybe<Scalars['String']>;
    methodDescription?: Maybe<Scalars['String']>;
    price: Maybe<Scalars['Float']>;
    basePrice: Maybe<Scalars['Float']>;
    discountAmount?: Maybe<Scalars['Float']>;
    baseDiscountAmount?: Maybe<Scalars['Float']>;
    cartAddressId: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ShippingAddress = {
    id: Maybe<Scalars['ID']>;
    firstName: Maybe<Scalars['String']>;
    lastName: Maybe<Scalars['String']>;
    addressType?: Maybe<Scalars['String']>;
    customerId?: Maybe<Scalars['ID']>;
    cartId: Maybe<Scalars['ID']>;
    orderId: Maybe<Scalars['String']>;
    companyName?: Maybe<Scalars['String']>;
    address1: Maybe<Scalars['String']>;
    address2?: Maybe<Scalars['String']>;
    postcode: Maybe<Scalars['String']>;
    city: Maybe<Scalars['String']>;
    state: Maybe<Scalars['String']>;
    country: Maybe<Scalars['String']>;
    email: Maybe<Scalars['String']>;
    phone: Maybe<Scalars['String']>;
    defaultAddress?: Maybe<Scalars['Boolean']>;
    vatId?: Maybe<Scalars['String']>;
    additional?: Maybe<Scalars['Json']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    shippingRates?: ShippingRates;
};

export type CartItem = {
    id: Maybe<Scalars['ID']>;
    quantity: Maybe<Scalars['Int']>;
    sku: Maybe<Scalars['String']>;
    type: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
    couponCode: Maybe<Scalars['String']>;
    weight: Maybe<Scalars['Float']>;
    totalWeight: Maybe<Scalars['Float']>;
    baseTotalWeight: Maybe<Scalars['Float']>;
    price: Maybe<Scalars['Float']>;
    basePrice: Maybe<Scalars['Float']>;
    total: Maybe<Scalars['Float']>;
    baseTotal: Maybe<Scalars['Float']>;
    taxPercent: Maybe<Scalars['Float']>;
    taxAmount: Maybe<Scalars['Float']>;
    baseTaxAmount: Maybe<Scalars['Float']>;
    discountPercent: Maybe<Scalars['Float']>;
    discountAmount: Maybe<Scalars['Float']>;
    baseDiscountAmount: Maybe<Scalars['Float']>;
    additional?: Maybe<Scalars['Json']>;
    parentId?: Maybe<Scalars['ID']>;
    productId: Maybe<Scalars['ID']>;
    cartId: Maybe<Scalars['ID']>;
    taxCategoryId?: Maybe<Scalars['ID']>;
    customPrice: Maybe<Scalars['Float']>;
    appliedCartRuleIds?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    product: Product;
};

export type Cart = {
    id: Maybe<Scalars['ID']>;
    customerEmail?: Maybe<Scalars['String']>;
    customerFirstName?: Maybe<Scalars['String']>;
    customerLastName?: Maybe<Scalars['String']>;
    shippingMethod: Maybe<Scalars['String']>;
    couponCode: Maybe<Scalars['String']>;
    isGift: Maybe<Scalars['Boolean']>;
    itemsCount: Maybe<Scalars['Int']>;
    itemsQty: Maybe<Scalars['Int']>;
    exchangeRate: Maybe<Scalars['Float']>;
    globalCurrencyCode: Maybe<Scalars['String']>;
    baseCurrencyCode: Maybe<Scalars['String']>;
    channelCurrencyCode: Maybe<Scalars['String']>;
    cartCurrencyCode: Maybe<Scalars['String']>;
    grandTotal: Maybe<Scalars['Float']>;
    baseGrandTotal: Maybe<Scalars['Float']>;
    subTotal: Maybe<Scalars['Float']>;
    baseSubTotal: Maybe<Scalars['Float']>;
    taxTotal: Maybe<Scalars['Float']>;
    baseTaxTotal: Maybe<Scalars['Float']>;
    discountAmount: Maybe<Scalars['Float']>;
    baseDiscountAmount: Maybe<Scalars['Float']>;
    checkoutMethod: Maybe<Scalars['String']>;
    isGuest: Maybe<Scalars['Boolean']>;
    isActive: Maybe<Scalars['Boolean']>;
    conversionTime: Maybe<Scalars['DateTime']>;
    customerId?: Maybe<Scalars['ID']>;
    channelId: Maybe<Scalars['ID']>;
    appliedCartRuleIds: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    shippingAddress?: ShippingAddress;
    billingAddress?: ShippingAddress;
    selectedShippingRate?: ShippingRates;
    payment: CartPayment;
    items: [CartItem];
};

export type ShippingProvider = {
    success?: Maybe<Scalars['String']>;
    cart: Cart;
    cartTotal: Maybe<Scalars['String']>;
    cartCount: Maybe<Scalars['String']>;
    shippingMethods: [ShippingMethod];
    paymentMethods: [PaymentMethod];
    jumpToSection: Maybe<Scalars['String']>;
};

export type PaymentProvider = {
    success?: Maybe<Scalars['String']>;
    cart: Cart;
    cartTotal: Maybe<Scalars['String']>;
    cartCount: Maybe<Scalars['String']>;
    paymentMethods: [PaymentMethod];
    jumpToSection: Maybe<Scalars['String']>;
};

export type FilterCustomerOrderInput = {
    id?: Maybe<Scalars['Int']>;
    incrementId?: Maybe<Scalars['String']>;
    customerId?: Maybe<Scalars['Int']>;
    baseSubTotal?: Maybe<Scalars['Float']>;
    baseGrandTotal?: Maybe<Scalars['Float']>;
    orderDate?: Maybe<Scalars['String']>;
    channelName?: Maybe<Scalars['String']>;
    status?: Maybe<Scalars['String']>;
}

export type RefundItem = {
    id: Maybe<Scalars['Int']>;
    name: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    sku: Maybe<Scalars['String']>;
    qty: Maybe<Scalars['Int']>;
    price: Maybe<Scalars['Float']>;
    basePrice: Maybe<Scalars['Float']>;
    total: Maybe<Scalars['Float']>;
    baseTotal: Maybe<Scalars['Float']>;
    taxAmount: Maybe<Scalars['Float']>;
    baseTaxAmount: Maybe<Scalars['Float']>;
    discountPercent: Maybe<Scalars['Float']>;
    discountAmount: Maybe<Scalars['Float']>;
    baseDiscountAmount: Maybe<Scalars['Float']>;
    productId: Maybe<Scalars['Int']>;
    productType: Maybe<Scalars['String']>;
    orderItemId: Maybe<Scalars['Int']>;
    refundId: Maybe<Scalars['Int']>;
    parentId: Maybe<Scalars['Int']>;
    additional: Maybe<Scalars['String']>;
    createdAt: Maybe<Scalars['DateTime']>;
    updatedAt: Maybe<Scalars['DateTime']>;
    refund: Maybe<Scalars['Array']>;
    orderItem: Maybe<Scalars['Array']>;
    product: Product;
}

export type Refund = {
    id: Maybe<Scalars['Int']>;
    incrementId: Maybe<Scalars['String']>;
    state: Maybe<Scalars['String']>;
    emailSent: Maybe<Scalars['Int']>;
    totalQty: Maybe<Scalars['Int']>;
    baseCurrencyCode: Maybe<Scalars['String']>;
    channelCurrencyCode: Maybe<Scalars['String']>;
    orderCurrencyCode: Maybe<Scalars['String']>;
    adjustmentRefund: Maybe<Scalars['Float']>;
    baseAdjustmentRefund: Maybe<Scalars['Float']>;
    adjustmentFee: Maybe<Scalars['Float']>;
    baseAdjustmentFee: Maybe<Scalars['Float']>;
    subTotal: Maybe<Scalars['Float']>;
    baseSubTotal: Maybe<Scalars['Float']>;
    grandTotal: Maybe<Scalars['Float']>;
    baseGrandTotal: Maybe<Scalars['Float']>;
    shippingAmount: Maybe<Scalars['Float']>;
    baseShippingAmount: Maybe<Scalars['Float']>;
    taxAmount: Maybe<Scalars['Float']>;
    baseTaxAmount: Maybe<Scalars['Float']>;
    discountPercent: Maybe<Scalars['Float']>;
    discountAmount: Maybe<Scalars['Float']>;
    baseDiscountAmount: Maybe<Scalars['Float']>;
    orderId: Maybe<Scalars['Int']>;
    createdAt: Maybe<Scalars['String']>;
    updatedAt: Maybe<Scalars['String']>;
    items: [RefundItem];
    order: Maybe<Scalars['Array']>;
    success?: Maybe<Scalars['String']>;
}

export type ShipmentItem = {
    id: Maybe<Scalars['Int']>;
    name: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    sku: Maybe<Scalars['String']>;
    qty: Maybe<Scalars['Int']>;
    weight: Maybe<Scalars['Float']>;
    price: Maybe<Scalars['Float']>;
    basePrice: Maybe<Scalars['Float']>;
    total: Maybe<Scalars['Float']>;
    baseTotal: Maybe<Scalars['Float']>;
    productId: Maybe<Scalars['ID']>;
    productType: Maybe<Scalars['String']>;
    orderItemId: Maybe<Scalars['ID']>;
    shipmentId: Maybe<Scalars['ID']>;
    additional: Maybe<Scalars['Json']>;
    createdAt: Maybe<Scalars['DateTime']>;
    updatedAt: Maybe<Scalars['DateTime']>;
};

export type Shipment = {
    id: Maybe<Scalars['Int']>;
    status: Maybe<Scalars['String']>;
    totalQty: Maybe<Scalars['Int']>;
    totalWeight: Maybe<Scalars['Float']>;
    carrierCode: Maybe<Scalars['String']>;
    carrierTitle: Maybe<Scalars['String']>;
    trackNumber: Maybe<Scalars['String']>;
    emailSent: Maybe<Scalars['Int']>;
    customerId: Maybe<Scalars['Int']>;
    customerType: Maybe<Scalars['String']>;
    orderId: Maybe<Scalars['Int']>;
    orderAddressId: Maybe<Scalars['Int']>;
    createdAt: Maybe<Scalars['String']>;
    updatedAt: Maybe<Scalars['String']>;
    inventorySourceId: Maybe<Scalars['Int']>;
    inventorySourceName: Maybe<Scalars['String']>;
    items: [ShipmentItem];
};

export type InvoiceItem = {
    id: Maybe<Scalars['ID']>;
    sku: Maybe<Scalars['String']>;
    type: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    qty: Maybe<Scalars['Int']>;
    price: Maybe<Scalars['Float']>;
    basePrice: Maybe<Scalars['Float']>;
    total: Maybe<Scalars['Float']>;
    baseTotal: Maybe<Scalars['Float']>;
    taxAmount: Maybe<Scalars['Float']>;
    baseTaxAmount: Maybe<Scalars['Float']>;
    productId: Maybe<Scalars['ID']>;
    productType: Maybe<Scalars['String']>;
    orderItemId: Maybe<Scalars['ID']>;
    invoiceId: Maybe<Scalars['ID']>;
    parentId: Maybe<Scalars['Int']>;
    additional: Maybe<Scalars['String']>;
    discountPercent: Maybe<Scalars['Float']>;
    discountAmount: Maybe<Scalars['Float']>;
    baseDiscountAmount: Maybe<Scalars['Float']>;
    createdAt: Maybe<Scalars['DateTime']>;
    updatedAt: Maybe<Scalars['DateTime']>;
    invoice: Maybe<Scalars['Array']>;
    orderItem: Maybe<Scalars['Array']>;
    product: Product;
    children: Maybe<Scalars['Array']>;
};

export type Invoice = {
    id: Maybe<Scalars['Int']>;
    incrementId: Maybe<Scalars['String']>;
    state: Maybe<Scalars['String']>;
    emailSent: Maybe<Scalars['Int']>;
    totalQty: Maybe<Scalars['Int']>;
    baseCurrencyCode: Maybe<Scalars['String']>;
    channelCurrencyCode: Maybe<Scalars['String']>;
    orderCurrencyCode: Maybe<Scalars['String']>;
    subTotal: Maybe<Scalars['Float']>;
    baseSubTotal: Maybe<Scalars['Float']>;
    grandTotal: Maybe<Scalars['Float']>;
    baseGrandTotal: Maybe<Scalars['Float']>;
    shippingAmount: Maybe<Scalars['Float']>;
    baseShippingAmount: Maybe<Scalars['Float']>;
    taxAmount: Maybe<Scalars['Float']>;
    baseTaxAmount: Maybe<Scalars['Float']>;
    discountAmount: Maybe<Scalars['Float']>;
    baseDiscountAmount: Maybe<Scalars['Float']>;
    orderId: Maybe<Scalars['Int']>;
    orderAddressId: Maybe<Scalars['Int']>;
    createdAt: Maybe<Scalars['String']>;
    updatedAt: Maybe<Scalars['String']>;
    transactionId: Maybe<Scalars['String']>;
    items: [InvoiceItem];
    order: Maybe<Scalars['Array']>;
};

export type OrderAddress = {
    id: Maybe<Scalars['Int']>;
    customerId: Maybe<Scalars['Int']>;
    cartId: Maybe<Scalars['Int']>;
    orderId: Maybe<Scalars['Int']>;
    firstName: Maybe<Scalars['String']>;
    lastName: Maybe<Scalars['String']>;
    gender?: Maybe<Scalars['String']>;
    companyName?: Maybe<Scalars['String']>;
    address1: Maybe<Scalars['String']>;
    address2?: Maybe<Scalars['String']>;
    postcode: Maybe<Scalars['String']>;
    city: Maybe<Scalars['String']>;
    state: Maybe<Scalars['String']>;
    country: Maybe<Scalars['String']>;
    email?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    vatId?: Maybe<Scalars['String']>;
    defaultAddress?: Maybe<Scalars['Int']>;
};

export type OrderComment = {
    id: Maybe<Scalars['ID']>;
    comment?: Maybe<Scalars['String']>;
    customerNotified?: Maybe<Scalars['Boolean']>;
    orderId?: Maybe<Scalars['ID']>;
    order?: Maybe<Scalars['Array']>;
}

export type OrderItem = {
    id: Maybe<Scalars['ID']>;
    sku: Maybe<Scalars['String']>;
    type: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
    couponCode: Maybe<Scalars['String']>;
    weight: Maybe<Scalars['Float']>;
    totalWeight: Maybe<Scalars['Float']>;
    qtyOrdered: Maybe<Scalars['Int']>;
    qtyShipped: Maybe<Scalars['Int']>;
    qtyInvoiced: Maybe<Scalars['Int']>;
    qtyCanceled: Maybe<Scalars['Int']>;
    qtyRefunded: Maybe<Scalars['Int']>;
    price: Maybe<Scalars['Float']>;
    basePrice: Maybe<Scalars['Float']>;
    total: Maybe<Scalars['Float']>;
    baseTotal: Maybe<Scalars['Float']>;
    totalInvoiced: Maybe<Scalars['Float']>;
    baseTotalInvoiced: Maybe<Scalars['Float']>;
    amountRefunded: Maybe<Scalars['Float']>;
    baseAmountRefunded: Maybe<Scalars['Float']>;
    discountPercent: Maybe<Scalars['Float']>;
    discountAmount: Maybe<Scalars['Float']>;
    baseDiscountAmount: Maybe<Scalars['Float']>;
    discountInvoiced: Maybe<Scalars['Float']>;
    baseDiscountInvoiced: Maybe<Scalars['Float']>;
    discountRefunded: Maybe<Scalars['Float']>;
    baseDiscountRefunded: Maybe<Scalars['Float']>;
    taxPercent: Maybe<Scalars['Float']>;
    taxAmount: Maybe<Scalars['Float']>;
    baseTaxAmount: Maybe<Scalars['Float']>;
    taxAmountInvoiced: Maybe<Scalars['Float']>;
    baseTaxAmountInvoiced: Maybe<Scalars['Float']>;
    taxAmountRefunded: Maybe<Scalars['Float']>;
    baseTaxAmountRefunded: Maybe<Scalars['Float']>;
    productId: Maybe<Scalars['Int']>;
    productType: Maybe<Scalars['String']>;
    orderId: Maybe<Scalars['Int']>;
    parentId: Maybe<Scalars['Int']>;
    additional: Maybe<Scalars['Json']>;
    createdAt: Maybe<Scalars['DateTime']>;
    updatedAt: Maybe<Scalars['DateTime']>;
    product: Product;
    child: OrderItem;
};

export type Order = {
    id: Maybe<Scalars['Int']>;
    incrementId: Maybe<Scalars['String']>;
    status: Maybe<Scalars['String']>;
    channelName: Maybe<Scalars['String']>;
    isGuest: Maybe<Scalars['Int']>;
    customerEmail: Maybe<Scalars['String']>;
    customerFirstName: Maybe<Scalars['String']>;
    customerLastName: Maybe<Scalars['String']>;
    customerCompanyName: Maybe<Scalars['String']>;
    customerVatId: Maybe<Scalars['String']>;
    shippingMethod: Maybe<Scalars['String']>;
    shippingTitle: Maybe<Scalars['String']>;
    shippingDescription: Maybe<Scalars['String']>;
    couponCode: Maybe<Scalars['String']>;
    isGift: Maybe<Scalars['Int']>;
    totalItemCount: Maybe<Scalars['Int']>;
    totalQtyOrdered: Maybe<Scalars['Int']>;
    baseCurrencyCode: Maybe<Scalars['String']>;
    channelCurrencyCode: Maybe<Scalars['String']>;
    orderCurrencyCode: Maybe<Scalars['String']>;
    grandTotal: Maybe<Scalars['Float']>;
    baseGrandTotal: Maybe<Scalars['Float']>;
    grandTotalInvoiced: Maybe<Scalars['Float']>;
    baseGrandTotalInvoiced: Maybe<Scalars['Float']>;
    grandTotalRefunded: Maybe<Scalars['Float']>;
    baseGrandTotalRefunded: Maybe<Scalars['Float']>;
    subTotal: Maybe<Scalars['Float']>;
    baseSubTotal: Maybe<Scalars['Float']>;
    subTotalInvoiced: Maybe<Scalars['Float']>;
    baseSubTotalInvoiced: Maybe<Scalars['Float']>;
    subTotalRefunded: Maybe<Scalars['Float']>;
    baseSubTotalRefunded: Maybe<Scalars['Float']>;
    discountPercent: Maybe<Scalars['Float']>;
    discountAmount: Maybe<Scalars['Float']>;
    baseDiscountAmount: Maybe<Scalars['Float']>;
    discountInvoiced: Maybe<Scalars['Float']>;
    baseDiscountInvoiced: Maybe<Scalars['Float']>;
    discountRefunded: Maybe<Scalars['Float']>;
    baseDiscountRefunded: Maybe<Scalars['Float']>;
    taxAmount: Maybe<Scalars['Float']>;
    baseTaxAmount: Maybe<Scalars['Float']>;
    taxAmountInvoiced: Maybe<Scalars['Float']>;
    baseTaxAmountInvoiced: Maybe<Scalars['Float']>;
    taxAmountRefunded: Maybe<Scalars['Float']>;
    baseTaxAmountRefunded: Maybe<Scalars['Float']>;
    shippingAmount: Maybe<Scalars['Float']>;
    baseShippingAmount: Maybe<Scalars['Float']>;
    shippingInvoiced: Maybe<Scalars['Float']>;
    baseShippingInvoiced: Maybe<Scalars['Float']>;
    shippingRefunded: Maybe<Scalars['Float']>;
    baseShippingRefunded: Maybe<Scalars['Float']>;
    customerId: Maybe<Scalars['Int']>;
    customerType: Maybe<Scalars['String']>;
    channelId: Maybe<Scalars['Int']>;
    channelType: Maybe<Scalars['String']>;
    cartId: Maybe<Scalars['ID']>;
    appliedCartRuleIds: Maybe<Scalars['String']>;
    shippingDiscountAmount: Maybe<Scalars['Float']>;
    baseShippingDiscountAmount: Maybe<Scalars['Float']>;
    createdAt: Maybe<Scalars['DateTime']>;
    updatedAt: Maybe<Scalars['DateTime']>;
    items: [OrderItem];
    billingAddress: OrderAddress;
    shippingAddress: OrderAddress;
    addresses?: [OrderAddress];
    comments?: [OrderComment]
    shipments?: [Shipment];
    invoices?: [Invoice];
    refunds?: [Refund];
    customer?: User;
    payment?: CartPayment;
    cart?: Cart;
    success?: Maybe<Scalars['String']>;
};

export type CustomerOrder = {
    results: [Order];
    total: Maybe<Scalars['Int']>;
}

export type Store = TODO;

export type AddToWishlistInput = {
    productId: Maybe<Scalars['ID']>;
}

export type FilterWislistInput = {
    id?: Maybe<Scalars['Int']>;
    productId?: Maybe<Scalars['Int']>;
    productName?: Maybe<Scalars['String']>;
    channelId?: Maybe<Scalars['Int']>;
};

export type Wishlist = {
    id: Maybe<Scalars['ID']>;
    channelId: Maybe<Scalars['ID']>;
    productId: Maybe<Scalars['ID']>;
    customerId: Maybe<Scalars['ID']>;
    itemOptions?: Maybe<Scalars['Json']>;
    additional: Maybe<Scalars['Json']>;
    movedToCart: Maybe<Scalars['Boolean']>;
    shared: Maybe<Scalars['Boolean']>;
    timeOfMoving?: Maybe<Scalars['Date']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    customer?: User;
    product: Product;
    channel: Maybe<Scalars['Array']>;
};

export type WishlistItem = TODO;
