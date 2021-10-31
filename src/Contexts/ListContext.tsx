import React, { createContext, useState, useContext } from 'react';
import { defaultListValue, IAddPlaceToList, ICreateList, IList, IListContext, TAddPlaceToListFC, TCreateListFC, TGetListsFC } from '../Interfaces/IListContext';

import firebase from '../Database/firebase';
import { AuthenticationContext } from './../Contexts/AuthenticationContext';
// import { AlertContext } from './AlertContext';

export const ListContext = createContext<IListContext>(defaultListValue);

export const ListProvider: React.FC = ({ children }) => {
  //   const { Alerts } = useContext(AlertContext);
  const [lists, setLists] = useState<Array<IList> | undefined>();
  const { user } = useContext(AuthenticationContext);

  const getLists: TGetListsFC = async () => {
    console.log('getLists');

    const tmpLists = await (
      await firebase.firestore().collection('Lists').get()
    ).docs.map(doc => { return ({ ...doc.data(), id: doc.id }); });

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
      })
      .catch(e => {
        console.log(e);
      });
    (async () => {
      await getLists();
    })();
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // console.log('collection = ', collection);
    // await getLists();
    console.log('yeah');
  };

  const addPlaceToList: TAddPlaceToListFC = async (payload: IAddPlaceToList) => {
    console.log('add place to list inside context');

    const concernedList = lists?.find(list => list.id === payload.listId);
    concernedList.places.find(place => place.id === payload.placeId);

    // If already in list Alert already in list
    // If not add to places

  }

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
