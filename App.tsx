import {} from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/Navigation/Navigation';
import { AuthenticationProvider } from './src/Contexts/AuthenticationContext';
import { ImageProvider } from './src/Contexts/ImageContext';
import { PlaceProvider } from './src/Contexts/PlaceContext';
import { ListProvider } from './src/Contexts/ListContext';
import { AlertProvier } from './src/Contexts/AlertContext';
import FlashMessage from 'react-native-flash-message';
// require('dotenv').config();

export default function App() {
  return (
    <SafeAreaProvider>
      <AlertProvier>
        <AuthenticationProvider>
          <ImageProvider>
            <PlaceProvider>

            <ListProvider>
            <Navigation />
            <FlashMessage position="top" />

            </ListProvider>
            </PlaceProvider>
          </ImageProvider>
        </AuthenticationProvider>
      </AlertProvier>
    </SafeAreaProvider>
  );
}
