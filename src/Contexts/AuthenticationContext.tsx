import React, { createContext, useState, useContext } from 'react';

import firebase from '../Database/firebase';
import { IUser } from '../Interfaces/IUser';
import {
  defaultAuthenticationValue,
  IAuthenticationContext,
  TGetUserFC,
  TLoginFC,
  TLogoutFC,
  TRegisterFC,
  TResetPasswordFC,
  IReset,
  TUpdateUsernameFC,
} from '../Interfaces/IAuthenticationContext';
import { AlertContext } from './AlertContext';
// import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticationContext = createContext<IAuthenticationContext>(
  defaultAuthenticationValue,
);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { Alerts } = useContext(AlertContext);

  const getUser: TGetUserFC = async () => {
    const tmpuser = firebase.auth().currentUser;

    return tmpuser ? tmpuser : null;
  };

  const login: TLoginFC = async payload => {
    console.log('login');
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(async () => {
        const newUser = await getUser();
        console.log(newUser);
        setUser({
          id: newUser.uid,
          displayName: newUser.displayName,
          email: newUser.email,
          photoURL: newUser.photoURL,
        });
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            email: newUser.email,
            password: payload.password,
            displayName: newUser.displayName,
            photoURL: newUser.photoURL,
          }),
        );
        Alerts.success({
          title: 'Successful authentication',
          message: 'Welcome back !',
          duration: 8000,
        });
      })
      .catch(error => {
        console.log(error);
        Alerts.warning({
          title: error.message,
          message: '',
          duration: 8000,
        });
      });
  };

  const autolog = async () => {
    const tmpUser = await AsyncStorage.getItem('user');
    if (tmpUser !== null) {
      await login({
        email: JSON.parse(tmpUser!).email,
        password: JSON.parse(tmpUser!).password,
      });
    }
  };

  const register: TRegisterFC = async (payload) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(async () => {
        const tmpuser = await getUser();
        console.log('Account created, user: ', tmpuser);
        tmpuser?.updateProfile({ displayName: payload.displayName });
        Alerts.success({
          title: 'Successful Registration',
          message: '',
        });
      })
      .catch(error => {
        console.log(error);
        Alerts.warning({
          title: error.message,
          message: '',
        });
      });
  };

  const logout: TLogoutFC = async () => {
    await firebase
      .auth()
      .signOut()
      .then(async () => {
        setUser(undefined);
        Alerts.success({
          title: 'See you soon !',
          message: '',
        });
      })
      .catch(error => {
        Alerts.warning({
          title: error.message,
          message: '',
        });
      });
  };

  const updateUsername: TUpdateUsernameFC = async payload => {
    const tmpUser = await getUser();
    tmpUser
      ?.updateProfile({ displayName: payload })
      .then(async () => {
        Alerts.success({
          title: 'Username successfully updated',
          message: '',
          duration: 4000,
        });
        setUser(await getUser());
      })
      .catch(() => {
        Alerts.warning({
          title: "Oops... It looks like your username was'nt update",
          message: '',
          duration: 4000,
        });
      });
  };

  // const takepicture: TTakePictureFC = async () => {
  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [5, 5],
  //     quality: 1,
  //   });

  //   if (result.cancelled) {

  //   }
  //   return result;

  // };
  // const uploadpicture: TUploadPictureFC = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [5, 5],
  //     quality: 1,
  //   });

  //   if (result.cancelled) {

  //   }
  //   return result;

  // };

  const resetpassword: TResetPasswordFC = async (payload: IReset) => {
    await firebase
      .auth()
      .sendPasswordResetEmail(payload.email)
      .then(() => {
        Alerts.success({
          title: 'Email succesfully sent',
          message: 'Open your recent mail to reset your password',
        });
      })
      .catch(error => {
        Alerts.warning({
          title: error.message,
          message: '',
        });
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,

        autolog,
        login,
        register,
        logout,
        resetpassword,
        updateUsername,
        // uploadpicture,
        // takepicture,
        getUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
