import React, { createContext } from 'react';
import {
  defaultImageValue,
  IImageContext,
  TTakePictureFC,
  TUploadPictureFC,
} from './../interfaces/IImageContext';
// import { AlertContext } from './AlertContext';
import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const ImageContext = createContext<IImageContext>(defaultImageValue);

export const ImageProvider: React.FC = ({ children }) => {
  //   const { Alerts } = useContext(AlertContext);

  const takePicture: TTakePictureFC = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });
    if (result.cancelled) {
    }
    return result;
  };
  const uploadPicture: TUploadPictureFC = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
      // base64: false,
      // allowsMultipleSelection: true,
    });

    if (result.cancelled) {
    }
    return result;
  };

  return (
    <ImageContext.Provider
      value={{
        uploadPicture,
        takePicture,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
