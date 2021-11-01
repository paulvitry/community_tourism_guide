import React, { createContext, useState, useContext } from 'react';
import {
  defaultListValue,
  IAddPlaceToList,
  ICreateList,
  IList,
  IListContext,
  TAddPlaceToListFC,
  TCreateListFC,
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

  const getLists: TGetListsFC = async () => {
    console.log('getLists');

    const snapshot = await firebase
      .firestore()
      .collection('Lists')
      .where('creator', '==', user?.id)
      .get();

    const tmpLists = snapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });

    setLists(tmpLists);
    console.log('lists: ', tmpLists);
    return tmpLists;
  };

  const createList: TCreateListFC = async (payload: ICreateList) => {
    console.log('createList');

    const collection = await firebase.firestore().collection('Lists');
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
        title: 'Oops.. The place you want to addd is already in this list',
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

  return (
    <ListContext.Provider
      value={{
        lists,

        createList,
        getLists,
        addPlaceToList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
