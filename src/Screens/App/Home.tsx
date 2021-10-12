import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProps } from '../../Navigation/Navigation';
import { NightMode } from './../../styling/map/NightMode';
import { AuthenticationContext } from '../../Contexts/AuthenticationContext';
import { PlaceContext } from '../../Contexts/PlaceContext';
// import firebase from '../../database/firebase';

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
  const { places, getPlaces } = useContext(PlaceContext);
  // const [markers, setMarkers] = useState();

  const fetchData = async () => {
    await getPlaces();
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  const onClickCreateSpot = () => {
    console.log('create new spot');
    navigation.navigate('CreatePlace');
  };

  const onClick = async () => {
    console.log('logout');
    await logout();
  };

  const onClickProfile = async () => {
    navigation.navigate('Profile');
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
        {console.log('component refreshed')}
        {console.log('places ->', places?.length)}
        {places?.map((marker, index) => {
          
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          );
        })}
      </MapView>
      <SafeAreaView style={styles.overlayContainer}>
        <Text>Home</Text>
        <Button title="logout" onPress={onClick} />
        <Button title="Create new spot!" onPress={onClickCreateSpot} />
        <Button title="profile" onPress={onClickProfile} />
      </SafeAreaView>
    </View>
  );
};
