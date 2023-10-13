import {isEmpty} from 'lodash';

import foods from './../data/foods';

export const getCategories = () => {
  const result = foods;
  return result;
};
export const getSubCategories = categoryId => {
  const result = foods.find(_f => _f.id === categoryId);
  return result;
};
export const getFoods = subCategoryId => {
  for (let i = 0; i < foods.length; i++) {
    const subCategories = foods[i].subCategories;

    const result = subCategories.find(_f => _f.id === subCategoryId);
    if (!isEmpty(result)) return result;
  }
};
export const getFood = id => {
  for (let i = 0; i < foods.length; i++) {
    const subCategories = foods[i].subCategories;

    for (let j = 0; j < subCategories.length; j++) {
      const foods = subCategories[j].foods;

      const result = foods.find(_f => _f.id === id);
      if (!isEmpty(result)) return result;
    }
  }
};
