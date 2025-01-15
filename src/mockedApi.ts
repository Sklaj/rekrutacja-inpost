import { INPUT } from './input';
import { Category } from './types';

export const getCategories = async (): Promise<{ data: Category[] }> => ({
  data: INPUT,
});
