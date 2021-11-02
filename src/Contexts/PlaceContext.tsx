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
    (async () => {
      setPlaces(undefined);
      setPlaces(tmpPlaces);
    })();
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

  const createPlace: TCreatePlaceFC = async (payload, setStep) => {
    setStep('Start creating new place...');
    setStep('Uploading image...');
    const path =
      payload.picture!.split('/')[payload.picture!.split('/').length - 1];

    const response = await fetch(payload.picture!);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('images/' + path);

    await ref.put(blob);
    setStep('Image uploaded.');
    setStep('Fetch collection...');
    const collection = firebase.firestore().collection('Places');
    setStep('Collection fetched.');
    setStep('Creating document...');
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

    setStep('Document created.');
    setStep('Fetch places...');
    (async () => {
      setPlaces(undefined);
      await getPlaces();
    })();
    setStep('Places fetched.');

    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // console.log('collection = ', collection);
    // await getPlaces();
    console.log('yeah');
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

  const editPlace: TEditPlaceFC = async (payload, setStep) => {
    setStep('Start editing place...');
    let path = payload?.picture;
    await firebase
      .firestore()
      .collection('Places')
      .doc(payload.id)
      .get()
      .then(async doc => {
        if (doc?.data()?.picture !== payload.picture) {
          setStep('Fetching new image');
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
          setStep('Uplading new image...');

          await ref.put(blob);
          setStep('Image uploaded.');
        }
      });
    setStep('Editing document');
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
    setStep('Document edited.');
    setStep('Fetching places...');
    (async () => {
      setUserPlaces(undefined);
      await getUserPlaces();
    })();
    setStep('Places fetched.');
    return snapshot;
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
