import {} from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/Navigation/Navigation';
import { AuthenticationProvider } from './src/Contexts/AuthenticationContext';
import { ImageProvider } from './src/Contexts/ImageContext';
import { PlaceProvider } from './src/Contexts/PlaceContext';
import { ListProvider } from './src/Contexts/ListContext';
import { AlertProvier } from './src/Contexts/AlertContext';
import { LikeProvider } from './src/Contexts/LikeContext';
import { CategoryProvider } from './src/Contexts/CategoryContext';
import FlashMessage from 'react-native-flash-message';
import { NativeBaseProvider } from 'native-base';
// require('dotenv').config();

export default function App() {
  return (
    <SafeAreaProvider>
      <AlertProvier>
        <AuthenticationProvider>
          <ImageProvider>
            <LikeProvider>
              <PlaceProvider>
                <ListProvider>
                  <CategoryProvider>
                  <NativeBaseProvider>
                    <Navigation />
                    <FlashMessage position="top" />
                  </NativeBaseProvider>
                  </CategoryProvider>
                </ListProvider>
              </PlaceProvider>
            </LikeProvider>
          </ImageProvider>
        </AuthenticationProvider>
      </AlertProvier>
    </SafeAreaProvider>
  );
}
