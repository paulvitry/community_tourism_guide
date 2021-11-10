import React, { createContext, useState, useContext } from 'react';
import {
  defaultListValue,
  IAddPlaceToList,
  ICreateList,
  IList,
  IListContext,
  TAddPlaceToListFC,
  TCreateListFC,
  TDeleteFromListFC,
  TDeleteListFC,
  TGetListByIdFC,
  TGetListsFC,
} from '../Interfaces/IListContext';

import firebase from '../Database/firebase';

import { AuthenticationContext } from './../Contexts/AuthenticationContext';
import { AlertContext } from './AlertContext';

export const ListContext = createContext<IListContext>(defaultListValue);

export const ListProvider: React.FC = ({ children }) => {
  const { Alerts } = useContext(AlertContext);
  const [lists, setLists] = useState<Array<IList> | undefined>();
  const { user } = useContext(AuthenticationContext);

  const setList = (data: firebase.firestore.DocumentData, id: string) => {
    const list: IList = {
      title: data.title,
      description: data.description,
      id: id,
      creator: data.creator,
      created_at: data.created_at,
      places: data.palces,
    };
    return list;
  };

  const getLists: TGetListsFC = async () => {
    const snapshot = await firebase
      .firestore()
      .collection('Lists')
      .where('creator', '==', user?.id)
      .get();

    const tmpLists = snapshot.docs.map(doc => {
      return setList(doc.data(), doc.id);
    });
    setLists(tmpLists);
    return tmpLists;
  };

  const getListById: TGetListByIdFC = async payload => {
    const snapshot = await firebase
      .firestore()
      .collection('Lists')
      .doc(payload)
      .get();

    const tmpList = setList(snapshot.data()!, snapshot.id);
    return tmpList;
  };

  const createList: TCreateListFC = async (payload: ICreateList) => {
    console.log('createList');

    const collection = firebase.firestore().collection('Lists');
    await collection
      .doc()
      .set({
        creator: user?.id,
        title: payload.title,
        description: payload.description,
        created_at: Date.now(),
        places: [],
      })
      .catch(e => {
        Alerts.warning({
          title: 'Oops.. There was an error during the creation of the list.',
          message: 'Please try again',
          duration: 4000,
        });
        console.log(e);
      });
    (async () => {
      await getLists();
    })();
    Alerts.success({
      title: 'The list ' + payload.title + ' was created successfuly',
      message: '',
      duration: 4000,
    });
  };

  const addPlaceToList: TAddPlaceToListFC = async (
    payload: IAddPlaceToList,
  ) => {
    const concernedList = lists?.find(list => list.id === payload.listId);
    const isPlaceExists = concernedList?.places!.find(
      place => place === payload.placeId,
    );
    if (isPlaceExists) {
      Alerts.warning({
        title: 'Oops.. The place you want to add is already in this list',
        message: '',
        duration: 4000,
      });
      return;
    }
    concernedList?.places.push(payload.placeId);

    const list = await firebase
      .firestore()
      .collection('Lists')
      .doc(payload.listId);

    await list.set({ ...concernedList }).catch(e => {
      console.log(e);
      Alerts.warning({
        title: 'Oops.. The place you want to add is already in this list',
        message: '',
        duration: 4000,
      });
    });
    Alerts.success({
      title: 'The place as successfuly added to th list',
      message: '',
      duration: 4000,
    });
  };

  const deletePlaceFromList: TDeleteFromListFC = async payload => {
    await getLists();
    const concernedList = lists?.find(list => list.id === payload.listId);
    console.log('---------------------ConcernedList : ', concernedList);
    let newPlaces: string[] | undefined = [];
    if (concernedList!.places.length > 1) {
      newPlaces = concernedList?.places!.filter(place => {
        if (place !== payload.placeId) return place;
      });
    }
    console.log('---------------------New Places: ', newPlaces);
    // concernedList?.places.push(payload.placeId);
    const list = firebase.firestore().collection('Lists').doc(payload.listId);

    await list.set({ ...concernedList, places: newPlaces }).catch(e => {
      console.log(e);
      Alerts.warning({
        title:
          'Oops.. An error occured during the deletion... Please try again',
        message: '',
        duration: 4000,
      });
    });
    Alerts.success({
      title: 'The place was successfuly deleted to th list',
      message: '',
      duration: 4000,
    });
    await getLists();
  };

  const deleteList: TDeleteListFC = async payload => {
    await firebase
      .firestore()
      .collection('Lists')
      .doc(payload)
      .delete()
      .catch(e => {
        console.log(e);
        Alerts.warning({
          title: 'Oops... An arror occured during the deletion of the list.',
          message: '',
          duration: 4000,
        });
      });
    Alerts.success({
      title: 'List deleted successfuly.',
      message: '',
      duration: 4000,
    });
    await getLists();
  };

  return (
    <ListContext.Provider
      value={{
        lists,

        createList,
        getLists,
        getListById,
        addPlaceToList,
        deletePlaceFromList,
        deleteList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
