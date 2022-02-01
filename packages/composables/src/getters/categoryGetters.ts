import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { useRoute } from '@nuxtjs/composition-api';
import type { Category } from '@vue-storefront/bagisto-api';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(category: Category): string | null {
  if (!category) {
    return null;
  }
  return category?.id || null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category: Category): AgnosticCategoryTree {
  
  return {
    label: '',
    slug: '',
    items: [],
    isCurrent: false
  };
}

function getBreadcrumbs(category: Category): AgnosticBreadcrumb[] {
  const breadcrumbs = [];
  if (!category) {
    return [];
  }

  breadcrumbs.push({ text: 'Home', link: '/' });
  if (category?.breadcrumbs) {
    for (const [key, value] of Object.entries(category?.breadcrumbs)) {
      breadcrumbs.push({
        text: value.name,
        link: `/category/${value.urlPath || value.slug}`
      } as AgnosticBreadcrumb);
    }
  }

  return breadcrumbs;
}

export const categoryGetters: CategoryGetters<Category> = {
  getTree,
  getBreadcrumbs,
  getId
};
