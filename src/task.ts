import { Category } from './mockedApi';

export interface CategoryListElement {
  children: CategoryListElement[];
  image: string;
  showOnHome: boolean;
  id: number;
  name: string;
  order: number;
}

const FIND_NUMBER_REGEXP = /\d+/g;
const MIN_CATEGORIES_TO_SHOW_ON_HOME = 5;

//Was checking possibilities of passing input data type as an argument for categoryTree
// but that solution creates number of issues in data handling and mapping which is
// heavily related to data structure

export const categoryTree = async (
  getData: () => Promise<{ data: Category[] }>
): Promise<CategoryListElement[]> => {
  const res = await getData();
  if (!res.data) {
    return [];
  }

  const toShowOnHome: number[] = [];
  const setShowOnHome = (id: number) => {
    toShowOnHome.push(id);
  };

  //Few assumptions in below function:
  // 1. Assumed that showOnHome value should be happening only on highest level of nesting and doesn't depend on Title containing '#'.
  //  That's why added argument if it's on lower level to prevent adding showOnHome:true when there's a number in Title filed on lower levels.
  //  In case we would need hash to set toShowOnHome.
  //  const hasHashTitle = category.Title && category.Title.includes('#');
  //  if(hasHashTitle && setOnHome) {
  //     setOnHome(category.id);
  //  }
  // 2. Decided to keep getOrder() inside mapCategories() to not mess name space. If we would like to use it else where or test it separately
  //  then it should be moved to other file, probably in directory like 'helpers' or 'utils'.
  // 3. Wanted to keep mapCategories() as a pure function that's why there's also setShowOnHome passed as an argument.
  //  in this shape mapCategories() could be also passed to categoryTree() as an argument, so we can have categoryTree() as an abstract
  //  which is just using functions passed as an argument.

  const mapCategories = (
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
      if (hasTitleId && setShowOnHome) {
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

  const setHomeCategories = (
    dataMapped: CategoryListElement[],
    onHome: number[]
  ): CategoryListElement[] => {
    if (dataMapped.length <= MIN_CATEGORIES_TO_SHOW_ON_HOME) {
      dataMapped.map((a) => (a.showOnHome = true));
      //added another condition below, looked like this loops should not run twice when category list length is lower than 5
    } else if (
      dataMapped.length > MIN_CATEGORIES_TO_SHOW_ON_HOME &&
      onHome.length > 0
    ) {
      dataMapped.forEach((b) => (b.showOnHome = toShowOnHome.includes(b.id)));
    } else {
      dataMapped.forEach((c, index) => (c.showOnHome = index < 3));
    }
    return dataMapped;
  };

  const result = mapCategories(res.data, setShowOnHome);
  return setHomeCategories(result, toShowOnHome);
};
