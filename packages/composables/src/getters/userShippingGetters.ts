import { UserShippingGetters } from '@vue-storefront/core';
import type {
  UserShippingAddress as Address,
  UserShippingAddressItem as AddressItem,
  UserShippingAddressSearchCriteria
} from '@vue-storefront/bagisto-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAddresses(shipping: Address, criteria?: UserShippingAddressSearchCriteria): AddressItem[] {
  if (!shipping) {
    return [];
  }

  const addresses = [];
  if (shipping.addresses && shipping.addresses.length > 0) {
    for (const address of shipping.addresses) {
      if (Array.isArray(criteria?.addressType) && criteria?.addressType.indexOf(address.addressType) !== -1) {
        addresses.push(address);
      }
      if (!criteria) {
        addresses.push(address);
      }
    }
  }

  return addresses;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDefault(shipping: Address): AddressItem {
  if (!shipping) {
    return null;
  }

  const defaultAddress = [];
  if (shipping.addresses && shipping.addresses.length > 0) {
    for (const address of shipping.addresses) {
      if (address.defaultAddress === true) {
        defaultAddress.push(address);
      }
    }
  }

  return defaultAddress?.[0] || null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotal(shipping: Address): number {
  const totalAddresses = getAddresses(shipping);

  return totalAddresses.length || 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPostCode(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.postcode || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStreetName(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.address1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStreetNumber(address: AddressItem): string {
  if (!address) {
    return '';
  }
  return address?.address2;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCity(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.city || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFirstName(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.firstName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getLastName(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.lastName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCountry(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.country || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPhone(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.phone || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getEmail(address: AddressItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProvince(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.state || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCompanyName(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.companyName || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTaxNumber(address: AddressItem): string {
  if (!address) {
    return '';
  }

  return address?.vatId || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(address: AddressItem): number {
  if (!address) {
    return null;
  }

  return address?.id || null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getApartmentNumber(address: AddressItem): string | number {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isDefault(address: AddressItem): boolean {
  if (!address) {
    return false;
  }

  return address?.defaultAddress || false;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formattedAddress(address: AddressItem): string {
  if (!address) {
    return '';
  }
  const formattedAddress = [];
  formattedAddress.push(getStreetName(address));
  formattedAddress.push(getStreetNumber(address));
  formattedAddress.push(getCity(address));
  formattedAddress.push(getProvince(address));
  formattedAddress.push(getCountry(address));

  return formattedAddress.join(',') || '';
}

export const userShippingGetters: UserShippingGetters<Address, AddressItem> = {
  getAddresses,
  getDefault,
  getTotal,
  getPostCode,
  getStreetName,
  getStreetNumber,
  getCity,
  getFirstName,
  getLastName,
  getCountry,
  getPhone,
  getEmail,
  getProvince,
  getCompanyName,
  getTaxNumber,
  getId,
  getApartmentNumber,
  isDefault
};
