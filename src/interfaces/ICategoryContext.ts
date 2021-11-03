export interface ICategoryContext {
  categories: Array<ICategory> | undefined;
  userCategories: Array<ICategory> | undefined;
  getCategories: TGetCategoriesFC;
  createCategory: TCreateCategoryFC;
}

export interface ICategory {
  id: string;
  title: string;
  creator: string;
}

export interface ICreateCategory {
  title: string;
  creator: string;
}

export type TGetCategoriesFC = () => Promise<any>;
export type TCreateCategoryFC = (payload: string) => Promise<any>;


export const defaultCategoryValue: ICategoryContext = {
  categories: undefined,
  userCategories: undefined,
  getCategories: () => Promise.reject(null),
  createCategory: () => Promise.reject(null),
};
