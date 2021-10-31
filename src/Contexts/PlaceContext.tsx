import React, { createContext, useState } from 'react';
import {
  defaultPlaceValue,
  IPlaceContext,
} from '../Interfaces/IPlaceContext';

import firebase from '../Database/firebase';
import { TTakePictureFC } from '../Interfaces/IImageContext';
// import { AlertContext } from './AlertContext';

export const PlaceContext = createContext<IPlaceContext>(defaultPlaceValue);

export const PlaceProvider: React.FC = ({ children }) => {
  //   const { Alerts } = useContext(AlertContext);
  const [places, setPlaces] = useState<Array<any>>();

  const getPlaces: TTakePictureFC = async () => {
    console.log('getPlaces');
    const tmpPlaces = await (
      await firebase.firestore().collection('Places').get()
    ).docs.map(doc => doc.data());
    setPlaces(tmpPlaces);
    return tmpPlaces;
  };

  const createPlace: TTakePictureFC = async payload => {
    console.log('createPlace');
    const path = payload.uri.split('/')[payload.uri.split('/').length - 1];

    const response = await fetch(payload.uri);
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
        coordinate: payload.coordinate,
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
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
