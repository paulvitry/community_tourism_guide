export interface IListContext {
  lists?: Array<IList> | undefined;
  getLists: TGetListsFC;
  createList: TCreateListFC;
  addPlaceToList: TAddPlaceToListFC;
}

export interface ICreateList {
  title: string;
  description?: string;
}

export interface IList {
  title: string;
  description?: string;
  id: string;
  creator: string;
  created_at: Date;
  places: string[];
}

export interface IAddPlaceToList {
  placeId: string;
  listId: string;
}

export type TGetListsFC = () => Promise<any>;
export type TCreateListFC = (payload: ICreateList) => Promise<any>;
export type TAddPlaceToListFC = (payload: IAddPlaceToList) => Promise<any>;

export const defaultListValue: IListContext = {
  lists: undefined,
  getLists: () => Promise.reject(null),
  createList: () => Promise.reject(null),
  addPlaceToList: () => Promise.reject(null),
};
