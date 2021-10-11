import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProps } from '../../Navigation/Navigation';
import { NightMode } from './../../styling/map/NightMode';
import { AuthenticationContext } from '../../Contexts/AuthenticationContext';
import firebase from '../../database/firebase';

type IHomeProps = NavigationProps<'Home'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  alignItems: 'center',
    // justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlayContainer: {
    flex: 1,
    top: 0,
    position: 'absolute',
    left: 0,
  },
});

export const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const { logout } = useContext(AuthenticationContext);

  const [markers, setMarkers] = useState<Array<any>>();

  const fetchPlaces = async () => {
    console.log('fetch places');
    const tmpMarkers = (
      await firebase.firestore().collection('Places').get()
    ).docs.map(doc => doc.data());
    setMarkers(tmpMarkers);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const onClickCreateSpot = () => {
    console.log('create new spot');
    navigation.navigate('CreatePlace');
  };

  const onClick = async () => {
    console.log('logout');
    await logout();
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={NightMode}
        provider={PROVIDER_GOOGLE}
        userInterfaceStyle="dark"
        showsUserLocation={true}
        showsScale={true}
        showsCompass={true}
        showsMyLocationButton={true}
        onLongPress={e => {
          navigation.navigate('CreatePlace', {
            coordinate: e.nativeEvent.coordinate,
          });
        }}
      >
        {markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <SafeAreaView style={styles.overlayContainer}>
        <Text>Home</Text>
        <Button title="logout" onPress={onClick} />
        <Button title="Create new spot!" onPress={onClickCreateSpot} />
      </SafeAreaView>
    </View>
  );
};
