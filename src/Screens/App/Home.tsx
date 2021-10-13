import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProps } from '../../Navigation/Navigation';
import { NightMode } from './../../styling/map/NightMode';
import { ImageContext } from '../../Contexts/ImageContext';
import { PlaceContext } from '../../Contexts/PlaceContext';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

type IHomeProps = NavigationProps<'Home'>;

const ACTION_BTN_BG = '#748B6F';

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
  headActions: {
    // flexDirection: 'row',
    // padding: 10,
    alignItems: 'flex-end',
    // justifyContent: 'space-between',
  },
  actionButton: {
    margin: 10,
    height: 50,
    width: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACTION_BTN_BG,
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
    height: 250,
  },
  content: {
    padding: 10,
    minHeight: 100,
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
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    borderWidth: 2,
    borderColor: 'blue',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  infos: {
    flexDirection: 'row',
    minHeight: 50,
    alignItems: 'center',
  },
});

export const Home: React.FC<IHomeProps> = ({ navigation }) => {
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

  const onClickProfile = async () => {
    navigation.navigate('Profile');
  };

  // const onStartAnimation = async () => {
  //   await Animated.timing(animValue, {
  //     toValue: 300,
  //     duration: 500,
  //     useNativeDriver: false,
  //   }).start();
  // };

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
                <TouchableOpacity style={pstyles.action}>
                  <Entypo name="direction" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={pstyles.action}>
                  <Entypo name="share" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={pstyles.action}>
                  <Entypo name="heart-outlined" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={pstyles.action}>
                  <Entypo name="phone" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={pstyles.action}>
                  <Entypo name="add-to-list" size={24} color="blue" />
                </TouchableOpacity>
              </View>
              <View style={pstyles.divider} />
              <View style={pstyles.content}>
                <TouchableOpacity style={pstyles.infos}>
                  <Entypo name="location-pin" size={24} color="blue" />
                  <Text>Address</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pstyles.infos}>
                  <Entypo name="clock" size={24} color="blue" />
                  <Text>Open Hours</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pstyles.infos}>
                  <AntDesign name="earth" size={24} color="blue" />
                  <Text>Web site</Text>
                </TouchableOpacity>
                <TouchableOpacity style={pstyles.infos}>
                  <Entypo name="phone" size={24} color="blue" />
                  <Text>Phone</Text>
                </TouchableOpacity>

                {/* <Text></Text>
                <Text>site web</Text>
                <Text>Telephone</Text>
                <Text>Email</Text> */}
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
                if (animValue !== panelRef) slidingUpPanel.show(350);
              }}
            />
          );
        })}
      </MapView>
      {renderSlidingUpPanel()}

      <SafeAreaView style={styles.overlayContainer}>
        <View style={styles.headActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onClickProfile}
          >
            <EvilIcons name="user" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onClickProfile}
          >
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};
