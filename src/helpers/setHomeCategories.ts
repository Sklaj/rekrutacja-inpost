import { CategoryListElement } from '../types';

const MIN_CATEGORIES_TO_SHOW_ON_HOME = 5;

export const setHomeCategories = (
  dataMapped: CategoryListElement[],
  toShowOnHome: number[]
): CategoryListElement[] => {
  if (dataMapped.length <= MIN_CATEGORIES_TO_SHOW_ON_HOME) {
    dataMapped.map((a) => (a.showOnHome = true));
    //added another condition below, looked like this loops should not run twice when category list length is lower than 5
  } else if (
    dataMapped.length > MIN_CATEGORIES_TO_SHOW_ON_HOME &&
    toShowOnHome.length > 0
  ) {
    dataMapped.forEach((b) => (b.showOnHome = toShowOnHome.includes(b.id)));
  } else {
    dataMapped.forEach((c, index) => (c.showOnHome = index < 3));
  }
  return dataMapped;
};
