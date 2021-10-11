import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProps } from '../../Navigation/Navigation';
import { NightMode } from './../../styling/map/NightMode';
import { AuthenticationContext } from '../../Contexts/AuthenticationContext';

console.log(NightMode);
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

export const Home: React.FC<IHomeProps> = ({}) => {
  const { logout } = useContext(AuthenticationContext);
  const [markers] = useState([
    {
      latlng: { latitude: 48.864716, longitude: 2.349014 },
      title: 'paris',
      description: 'description',
    },
  ]);

  const onClickCreateSpot = () => {
    console.log('create new spot');

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
        userInterfaceStyle='dark'
        showsUserLocation={true}
        showsScale={true}
        showsCompass={true}
        showsMyLocationButton={true}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
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
