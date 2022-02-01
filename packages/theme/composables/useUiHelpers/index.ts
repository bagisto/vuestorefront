import { getCurrentInstance } from '@nuxtjs/composition-api';
import { useRoute, useRouter } from '@nuxtjs/composition-api';

const nonFilters = ['page', 'itemsPerPage'];

const getContext = () => {
  const vm = getCurrentInstance();
  return vm.root.proxy;
};

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : query[curr]
  };
};

const getFiltersDataFromUrl = (context, onlyFilters) => {
  const { query } = context.$router.history.current;

  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

const useUiHelpers = () => {
  const route = useRoute();
  const router = useRouter();
  const { query } = route.value;

  const context = getContext();

  const getFacetsFromURL = () => {
    const { query, params } = context.$router.currentRoute;
    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(query.page as string, 10) || 1,
      filters: getFiltersDataFromUrl(context, true),
      itemsPerPage: parseInt(query.itemsPerPage as string, 12) || 10
    };
  };

  // eslint-disable-next-line
  const getCatLink = (category: any): string => {

    if (category?.urlPath) {
      return `/category/${category.urlPath}`;
    }

    if (category?.slug) {
      return `/category/${category.slug}`;
    }

    return '';
  };

  // eslint-disable-next-line
  const changeSorting = (sort) => {

    return router.push(sort);
  };

  // eslint-disable-next-line
  const changeFilters = (filters) => {
    const filterString = [];
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key) && ['sort', 'order'].includes(key)) {
        filterString.push(key + '=' + query[key]);
      }
    }

    for (const key in filters) {
      if (filters[key].length > 0) {
        filterString.push(key + '=' + filters[key].join(','));
      }
    }

    return router.push(filterString.length ? '?' + filterString.join('&') : '');
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
  };

  // eslint-disable-next-line
  const setTermForUrl = (term: string) => {
  };

  // eslint-disable-next-line
  const isFacetPrice = (facet): boolean => {

    return facet.code === 'price' || false;
  };

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {

    return facet.code === 'color' || false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {

    return false;
  };

  const getSearchTermFromUrl = () => {
  };

  const getCategorySlugFromUrl = () => {
    const { params } = context.$router.currentRoute;

    return Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);
  };

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetPrice,
    isFacetCheckbox,
    getSearchTermFromUrl,
    getCategorySlugFromUrl
  };
};

export default useUiHelpers;
