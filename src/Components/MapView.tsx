import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { PlaceContext } from '../Contexts/PlaceContext';
import { IPlace } from '../Interfaces/IPlaceContext';
import { NavigationParamList } from '../Navigation/Navigation';
import { NightMode } from '../Styling/Map/NightMode';

const styles = StyleSheet.create({
  MapView: {
    marginBottom: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

interface IMapViewComponentProps {
  setSelectedMarker: React.Dispatch<React.SetStateAction<IPlace | undefined>>;
  slidingUpPanel: SlidingUpPanel;
  navigation: NativeStackNavigationProp<NavigationParamList, 'Home'>;
}

export const MapViewComponent: React.FC<IMapViewComponentProps> = ({
  setSelectedMarker,
  slidingUpPanel,
  navigation,
}) => {
  const { places, getPlaces } = useContext(PlaceContext);
  let animValue = new Animated.Value(0);
  const panelRef = new Animated.Value(300);

  return (
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
        console.log(e);
        navigation.navigate('CreatePlace', {
          coordinate: e.nativeEvent.coordinate,
        });
      }}
    >
      {places?.map((marker: any, index: number) => {
        return (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={async () => {
              setSelectedMarker(undefined);
              setSelectedMarker(marker);
              console.log(animValue, ' && ', panelRef);
              if (animValue !== panelRef) slidingUpPanel?.show(350);
            }}
          />
        );
      })}
    </MapView>
  );
};
