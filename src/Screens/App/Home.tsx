import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { NavigationProps } from '../../Navigation/Navigation';

import { AuthenticationContext } from '../../Contexts/AuthenticationContext';

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
});

export const Home: React.FC<IHomeProps> = ({}) => {
  const { logout } = useContext(AuthenticationContext);
  const [markers, setMarkers] = useState([
    {
      latlng: { latitude: 48.864716, longitude: 2.349014 },
      title: 'paris',
      description: 'description',
    },
  ]);

  const onClick = async () => {
    console.log('logout');
    await logout();
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <SafeAreaView style={styles.container}>
        <Text>Home</Text>
        <Button title="logout" onPress={onClick} />
      </SafeAreaView>
    </View>
  );
};
