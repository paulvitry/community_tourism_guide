export interface IPlaceContext {
  places: Array<IPlace> | undefined;
  getPlaces: TGetPlacesFC;
  createPlace: TCreatePlaceFC;
}

export interface IPlace {
  title: string;
  description: string;
  picture: string;
  creator: string;
  coordinate: { latitude: number; longitude: number };

}

export type TGetPlacesFC = () => Promise<any>;
export type TCreatePlaceFC = (payload: IPlace) => Promise<any>;

export const defaultPlaceValue: IPlaceContext = {
  places: undefined,
  getPlaces: () => Promise.reject(null),
  createPlace: () => Promise.reject(null),
};
