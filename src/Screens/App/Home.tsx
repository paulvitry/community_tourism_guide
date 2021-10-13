import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProps } from '../../Navigation/Navigation';
import { NightMode } from './../../styling/map/NightMode';
import { AuthenticationContext } from '../../Contexts/AuthenticationContext';
import { ImageContext } from '../../Contexts/ImageContext';
import { PlaceContext } from '../../Contexts/PlaceContext';
import SlidingUpPanel from 'rn-sliding-up-panel';
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
    width: '100%',
    position: 'absolute',
  },
});

const pstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  contentAction: {
    padding: 10,
    flexDirection: 'row',
  },
});

export const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const { logout } = useContext(AuthenticationContext);
  const { places, getPlaces } = useContext(PlaceContext);
  const { getImage } = useContext(ImageContext);
  const [selectedMarker, setSelectedMarker] = useState(null);
  // const [markers, setMarkers] = useState();
  const [slidingUpPanel, setSlidingUpPanel] = useState();
  const [image, setImage] = useState(null);
  // const [animValue] = useState(new Animated.Value(0));
  const panelRef = new Animated.Value(300);
  let animValue = new Animated.Value(0);

  const fetchData = async () => {
    await getPlaces();
  };

  useEffect(() => {
    (async () => {
      // setMarkers(await getPlaces());
      console.log('useEffect');
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

  const onStartAnimation = async () => {
    await Animated.timing(animValue, {
      toValue: 300,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const renderSlidingUpPanel = () => {
    return (
      <SlidingUpPanel
        ref={c => setSlidingUpPanel(c)}
        animatedValue={animValue}
        snappingPoints={[300, 600]}
        backdropOpacity={0.1}
      >
        <View style={pstyles.container}>
          {selectedMarker! && (
            <View>
              <Image style={pstyles.image} source={{ uri: image }} />
              <View style={pstyles.content}>
                <Text style={pstyles.title}>{selectedMarker.title}</Text>
                <Text>{selectedMarker.description}</Text>
              </View>
              <View style={pstyles.divider} />
              <View style={pstyles.contentAction}>
                <Text>Direction</Text>
                <Text>partager</Text>
                <Text>J'aime</Text>
                <Text>Apl</Text>
                <Text>Ajouter a ma liste</Text>
              </View>
              <View style={pstyles.divider} />
              <View style={pstyles.content}>
                <Text>Address</Text>
                <Text>Open Hours</Text>
                <Text>site web</Text>
                <Text>Telephone</Text>
                <Text>Email</Text>
              </View>
              <View style={pstyles.divider} />
            </View>
          )}
        </View>
      </SlidingUpPanel>
    );
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
        {/* {console.log('component refreshed')}
        {console.log('places ->', places?.length)} */}
        {places?.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={async () => {
                setSelectedMarker(null);
                setImage(
                  await getImage({ path: 'images', url: marker.picture }),
                );
                setSelectedMarker(marker);
                console.log(animValue, ' && ', panelRef);
                if (animValue !== panelRef) slidingUpPanel.show(500);
              }}
            />
          );
        })}
      </MapView>
      {renderSlidingUpPanel()}

      {/* <SafeAreaView style={styles.overlayContainer}> */}
      {/* <Button title="logout" onPress={onClick} />
        <Button title="Create new spot!" onPress={onClickCreateSpot} /> */}
      {/* <Button title="profile" onPress={onClickProfile} />
      </SafeAreaView> */}
    </View>
  );
};
