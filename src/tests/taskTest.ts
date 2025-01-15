import test from 'ava';

import { CORRECT } from '../correctResult';
import { getCategories } from '../mockedApi';
import { categoryTree } from '../task';

//1. Not too familiar with AVA testing lib, but looks like deepEqual is covering our needs.
//  if not we can always JSON.stringify both values to compare and check it with t.is()
//2. Wasn't sure if I should add more test, so I focused on task itself
test('check if categoryTree is returning correct value', async (t) => {
  const result = await categoryTree(getCategories);
  t.deepEqual(result, CORRECT);
});
