export interface IListContext {
  
}

export interface IList {
  title: string;
  decription?: string;
}

export type TGetListsFC = () => Promise<any>;
export type TCreateListFC = (payload: IList) => Promise<any>;

export const defaultListValue: IListContext = {
  getLists: () => Promise.reject(null),
  createList: () => Promise.reject(null),
};
