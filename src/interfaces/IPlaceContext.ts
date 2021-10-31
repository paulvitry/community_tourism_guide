export interface IPlaceContext {
  places: Array<IPlace> | undefined;
  getPlaces: TGetPlacesFC;
  createPlace: TCreatePlaceFC;
}

export interface IPlace {
  id: string;
  title: string;
  description: string;
  picture: string;
  creator: string;
  coordinate: { latitude: number; longitude: number };
}

export interface ICreatePlace {
  title: string | undefined;
  description: string | undefined;
  picture: string | undefined;
  creator: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
}

export type TGetPlacesFC = () => Promise<any>;
export type TCreatePlaceFC = (payload: ICreatePlace) => Promise<any>;

export const defaultPlaceValue: IPlaceContext = {
  places: undefined,
  getPlaces: () => Promise.reject(null),
  createPlace: () => Promise.reject(null),
};
