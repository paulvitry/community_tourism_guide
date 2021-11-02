export interface IPlaceContext {
  places: Array<IPlace> | undefined;
  userPlaces: Array<IPlace> | undefined;
  getPlaces: TGetPlacesFC;
  createPlace: TCreatePlaceFC;
  editPlace: TEditPlaceFC;
  getPlaceById: TGetPlaceByIdFC;
  getUserPlaces: TGetUserPlacesFC;
  deletePlace: TDeletePlaceFC;
}

export interface IPlace {
  id: string;
  title: string;
  description: string;
  picture: string;
  creator: string;
  coordinate: { latitude: number; longitude: number };
  location: {
    line1: string | undefined;
    city: string | undefined;
    postalCode: string | undefined;
    country: string | undefined;
  };
  website: string | undefined;
  phone: string | undefined;
}

export interface ICreatePlace {
  title: string | undefined;
  description: string | undefined;
  picture: string | undefined;
  creator: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  line1: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;
  website: string | undefined;
  phone: string | undefined;
}

export interface IEditPlace {
  id: string;
  title: string | undefined;
  description: string | undefined;
  picture: string | undefined;
  creator: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  line1: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;
  website: string | undefined;
  phone: string | undefined;
  updated_at: string | undefined;
  created_at: Date;
}

export type TGetPlacesFC = () => Promise<any>;
export type TCreatePlaceFC = (payload: ICreatePlace, setStep: React.Dispatch<React.SetStateAction<string>>) => Promise<any>;
export type TEditPlaceFC = (payload: IEditPlace, setStep: React.Dispatch<React.SetStateAction<string>>) => Promise<any>;
export type TGetPlaceByIdFC = (payload: string) => Promise<any>;
export type TGetUserPlacesFC = () => Promise<any>;
export type TDeletePlaceFC = (payload: string) => Promise<any>;

export const defaultPlaceValue: IPlaceContext = {
  places: undefined,
  userPlaces: undefined,
  getPlaces: () => Promise.reject(null),
  getPlaceById: () => Promise.reject(null),
  createPlace: () => Promise.reject(null),
  editPlace: () => Promise.reject(null),
  getUserPlaces: () => Promise.reject(null),
  deletePlace: () => Promise.reject(null),
};
