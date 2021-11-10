import React, { createContext, useContext, useState } from 'react';
import {
  defaultCategoryValue,
  ICategory,
  ICategoryContext,
  TCreateCategoryFC,
  TGetCategoriesFC,
} from '../Interfaces/ICategoryContext';

import firebase from '../Database/firebase';
import { AuthenticationContext } from './AuthenticationContext';
import { AlertContext } from './AlertContext';

export const CategoryContext =
  createContext<ICategoryContext>(defaultCategoryValue);

export const CategoryProvider: React.FC = ({ children }) => {
  const { Alerts } = useContext(AlertContext);
  const [categories, setCategories] = useState<Array<ICategory>>();
  const { user } = useContext(AuthenticationContext);
  const [userCategories] = useState<Array<ICategory>>();

  const setCategory = (data: firebase.firestore.DocumentData, id: string) => {
    const cat: ICategory = {
      id: id,
      title: data.title,
      creator: data.creator,
    };
    return cat;
  };

  const getCategories: TGetCategoriesFC = async () => {
    console.log('getCategories');
    const tmpCategories = await (
      await firebase.firestore().collection('Categories').get()
    ).docs.map(doc => {
      return setCategory(doc.data(), doc.id);
    });
    console.log('tmpCategories: ', tmpCategories);
    (async () => {
      setCategories(undefined);
      setCategories(tmpCategories);
    })();
    return tmpCategories;
  };

  const createCategory: TCreateCategoryFC = async payload => {
    const collection = firebase.firestore().collection('Categories');
    await collection
      .doc()
      .set({
        creator: user?.id,
        title: payload,
      })
      .catch(e => {
        console.log(e);
        Alerts.warning({
          title: 'Oops.. Something went wrong during the creation.',
          message: '',
          duration: 4000,
        });
      });
    Alerts.success({
      title: 'Category created successfuly',
      message: '',
      duration: 4000,
    });
    (async () => {
      setCategories(undefined);
      await getCategories();
    })();
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        userCategories,

        createCategory,
        getCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
