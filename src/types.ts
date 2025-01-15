export interface Category {
  id: number;
  name: string;
  hasChildren: boolean;
  url: string;
  Title: string;
  MetaTagDescription: string;
  children: Category[];
}

export interface CategoryListElement {
  children: CategoryListElement[];
  image: string;
  showOnHome: boolean;
  id: number;
  name: string;
  order: number;
}
