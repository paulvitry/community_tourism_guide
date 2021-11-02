import React, { createContext, useContext, useState } from 'react';
import {
  defaultPlaceValue,
  IPlace,
  IPlaceContext,
  TCreatePlaceFC,
  TDeletePlaceFC,
  TEditPlaceFC,
  TGetPlaceByIdFC,
  TGetPlacesFC,
  TGetUserPlacesFC,
} from '../Interfaces/IPlaceContext';

import firebase from '../Database/firebase';
import { AuthenticationContext } from './AuthenticationContext';
import { AlertContext } from './AlertContext';
import { Alert } from 'react-native';

export const PlaceContext = createContext<IPlaceContext>(defaultPlaceValue);

export const PlaceProvider: React.FC = ({ children }) => {
  const { Alerts } = useContext(AlertContext);
  const [places, setPlaces] = useState<Array<IPlace>>();
  const { user } = useContext(AuthenticationContext);
  const [userPlaces, setUserPlaces] = useState<Array<IPlace>>();

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
    const snapshot = await firebase
      .firestore()
      .collection('Places')
      .doc(payload)
      .get();
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
        description: payload.description || null,
        picture: path,
        coordinate: {
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
        location: {
          line1: payload.line1 || null,
          city: payload.city || null,
          postalCode: payload.postalCode || null,
          country: payload.country || null,
        },
        website: payload.website || null,
        phone: payload.phone || null,
        created_at: Date.now(),
      })
      .catch(e => {
        console.log(e);
        Alerts.warning({
          title: 'Oops.. Something went wrong during the creation.',
          message: '',
          duration: 4000,
        });
      });

    (async () => {
      await getPlaces();
    })();

    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // console.log('collection = ', collection);
    // await getPlaces();
    console.log('yeah');
  };

  const editPlace: TEditPlaceFC = async payload => {
    let path = payload?.picture;
    await firebase
      .firestore()
      .collection('Places')
      .doc(payload.id)
      .get()
      .then(async doc => {
        if (doc?.data()?.picture !== payload.picture) {
          path =
            payload?.picture?.split('/')[
              payload.picture!.split('/').length - 1
            ];

          const response = await fetch(payload.picture!);
          const blob = await response.blob();

          var ref = firebase
            .storage()
            .ref()
            .child('images/' + path);

          ref.put(blob);
        }
      });

    const snapshot = await firebase
      .firestore()
      .collection('Places')
      .doc(payload.id)
      .update({
        creator: payload.creator,
        title: payload.title,
        description: payload.description,
        picture: path,
        coordinate: {
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
        location: {
          line1: payload?.line1 || null!,
          city: payload?.city || null,
          postalCode: payload?.postalCode || null,
          country: payload?.country || null,
        },
        website: payload.website || null,
        phone: payload.phone || null,
        updated_at: Date.now(),
      })
      .catch(e => {
        console.log(e);
        Alerts.warning({
          title: 'Oops.. Something went wrong during the edition.',
          message: '',
          duration: 4000,
        });
      })
      .then(() => {
        Alerts.success({
          title: 'Edit successfuly.',
          message: '',
          duration: 4000,
        });
      });
    return snapshot;
  };

  const getUserPlaces: TGetUserPlacesFC = async () => {
    const snapshot = await firebase
      .firestore()
      .collection('Places')
      .where('creator', '==', user?.id)
      .get();

    const tmpPlaces: IPlace = snapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    console.log('tmpPlaces = ', tmpPlaces);
    setUserPlaces(tmpPlaces);
    return tmpPlaces;
  };

  const deletePlace: TDeletePlaceFC = async payload => {
    const snapshot = await firebase
      .firestore()
      .collection('Places')
      .doc(payload)
      .delete()
      .then(() => {
        Alerts.success({
          title: 'Place deleted successfuly',
          message: '',
          duration: 4000,
        });
      })
      .catch(e => {
        console.log(e);
        Alerts.warning({
          title: 'Oops... An error occured during the deletion',
          message: '',
          duration: 4000,
        });
      });
    (async () => {
      setUserPlaces(undefined);
      await getUserPlaces();
    })();
    return snapshot;
  };

  return (
    <PlaceContext.Provider
      value={{
        places,
        userPlaces,

        createPlace,
        getPlaces,
        getPlaceById,
        getUserPlaces,
        editPlace,
        deletePlace,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
};
