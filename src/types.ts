export interface CategoryListElement {
  children: CategoryListElement[];
  image: string;
  showOnHome: boolean;
  id: number;
  name: string;
  order: number;
}
