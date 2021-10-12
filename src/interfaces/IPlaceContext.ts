export interface IPlaceContext {
  getPlaces: TGetPlacesFC;
  createPlace: TCreatePLaceFC;
}

export interface IPlace {
  title: string;
  decription: string;
  uri: string;
  creator: string;
  coordinate: { latitude: number; longitude: nuber };

}

export type TGetPlacesFC = () => Promise<any>;
export type TCreatePlaceFC = (payload: IPlace) => Promise<any>;

export const defaultPlaceValue: IPlaceContext = {
  getPlaces: () => Promise.reject(null),
  createPlace: () => Promise.reject(null),
};
