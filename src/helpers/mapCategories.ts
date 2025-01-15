import { Category, CategoryListElement } from '../types';

const FIND_NUMBER_REGEXP = /\d+/g;

export const mapCategories = (
  data: Category[],
  setOnHome?: (id: number) => void,
  isLowerLevel?: boolean
): CategoryListElement[] => {
  const mappedCategories = data.map((category) => {
    const getOrder = (elemId: number, elemTitle?: string): number => {
      const titlesNum = elemTitle && elemTitle.match(FIND_NUMBER_REGEXP);
      return titlesNum && titlesNum[0] ? parseInt(titlesNum[0]) : elemId;
    };

    const hasTitleId =
      category.Title && !!category.Title.match(FIND_NUMBER_REGEXP);
    if (hasTitleId && setOnHome) {
      setOnHome(category.id);
    }

    return {
      children: category.children.length
        ? mapCategories(category.children, setOnHome, true)
        : [],
      image: category.MetaTagDescription,
      showOnHome: isLowerLevel ? false : hasTitleId,
      id: category.id,
      name: category.name,
      order: getOrder(category.id, category.Title),
    };
  });

  return mappedCategories.sort((a, b) => a.order - b.order);
};
