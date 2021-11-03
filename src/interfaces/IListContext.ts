export interface IListContext {
  lists?: Array<IList> | undefined;
  getLists: TGetListsFC;
  getListById: TGetListByIdFC;
  createList: TCreateListFC;
  addPlaceToList: TAddPlaceToListFC;
  deletePlaceFromList: TDeleteFromListFC;
  deleteList: TDDeleteListFC;
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
export interface IDeletePlaceFromList {
  placeId: string;
  listId: string;
}

export type TGetListsFC = () => Promise<any>;
export type TCreateListFC = (payload: ICreateList) => Promise<any>;
export type TAddPlaceToListFC = (payload: IAddPlaceToList) => Promise<any>;
export type TDeleteFromListFC = (payload: IDeletePlaceFromList) => Promise<any>;
export type TGetListByIdFC = (payload: string) => Promise<any>;
export type TDeleteListFC = (payload: string) => Promise<any>;

export const defaultListValue: IListContext = {
  lists: undefined,
  getLists: () => Promise.reject(null),
  createList: () => Promise.reject(null),
  addPlaceToList: () => Promise.reject(null),
  deletePlaceFromList: () => Promise.reject(null),
  getListById: () => Promise.reject(null),
  deleteList: () => Promise.reject(null),
};
