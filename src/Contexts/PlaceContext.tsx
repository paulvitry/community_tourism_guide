import React, { createContext, useState } from 'react';
import {
  defaultPlaceValue,
  IPlace,
  IPlaceContext,
  TCreatePlaceFC,
  TGetPlaceByIdFC,
  TGetPlacesFC,
} from '../Interfaces/IPlaceContext';

import firebase from '../Database/firebase';
import { TTakePictureFC } from '../Interfaces/IImageContext';
// import { AlertContext } from './AlertContext';

export const PlaceContext = createContext<IPlaceContext>(defaultPlaceValue);

export const PlaceProvider: React.FC = ({ children }) => {
  //   const { Alerts } = useContext(AlertContext);
  const [places, setPlaces] = useState<Array<IPlace>>();

  const getPlaces: TGetPlacesFC = async () => {
    console.log('getPlaces');
    const tmpPlaces = await (
      await firebase.firestore().collection('Places').get()
    ).docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    setPlaces(tmpPlaces);
    return tmpPlaces;
  };

  const getPlaceById: TGetPlaceByIdFC = async (payload: string) => {
    const snapshot = await firebase.firestore().collection('Places').doc(payload).get();
    const place: IPlace = { ...snapshot.data(), id: snapshot.id };
    console.log('place: ', place);

    // const doc = snapshot.docs.map(doc => {
    //   return { ...doc.data(), id: doc.id };
    // });
    return place;
  };

  const createPlace: TCreatePlaceFC = async payload => {
    console.log('createPlace');
    console.log(payload);
    const path =
      payload.picture!.split('/')[payload.picture!.split('/').length - 1];

    const response = await fetch(payload.picture!);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('images/' + path);

    ref.put(blob);

    const collection = await firebase.firestore().collection('Places');
    await collection
      .doc()
      .set({
        creator: payload.creator,
        title: payload.title,
        description: payload.description,
        picture: path,
        coordinate: {
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
        line1: payload.line1,
        city: payload.city,
        postalCode: payload.postalCode,
        country: payload.country,
        website: payload.website,
        phone: payload.phone,
        created_at: Date.now(),
      })
      .catch(e => {
        console.log(e);
      });

    (async () => {
      await getPlaces();
    })();

    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // console.log('collection = ', collection);
    // await getPlaces();
    console.log('yeah');
  };

  return (
    <PlaceContext.Provider
      value={{
        places,

        createPlace,
        getPlaces,
        getPlaceById,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
