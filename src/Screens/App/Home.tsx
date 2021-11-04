import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { NavigationProps } from '../../Navigation/Navigation';
import { NightMode } from '../../Styling/Map/NightMode';
import { ImageContext } from '../../Contexts/ImageContext';
import { PlaceContext } from '../../Contexts/PlaceContext';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { PlaceDetailsView } from '../../Components/PlaceDetailsView';
import {
  ICreatePlace,
  IFilterPlace,
  IPlace,
} from '../../Interfaces/IPlaceContext';
import { AddToListModal } from '../../Components/AddToListModal';
import { LikeContext } from '../../Contexts/LikeContext';
import { MapViewComponent } from '../../Components/MapView';
import { PlaceListItem } from '../../Components/PlaceListItem';
import { style } from 'styled-system';
import { TextInput } from '../../Components/TextInput';
import { Checkbox } from 'native-base';
import { CategoryContext } from '../../Contexts/CategoryContext';

type IHomeProps = NavigationProps<'Home'>;

const ACTION_BTN_BG = '#000000';

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
  overlayActionContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  overlayContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    padding: 10,
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
  scrollView: {
    flex: 1,
  },
  filter: {
    height: 42,
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    marginVertical: 40,
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  filterText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionFilter: {
    padding: 5,
    borderRadius: 20,
    height: 40,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTextFilter: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export const Home: React.FC<IHomeProps> = ({ navigation }) => {
  const { places, getPlaces } = useContext(PlaceContext);
  const { getImage } = useContext(ImageContext);
  const [selectedMarker, setSelectedMarker] = useState<IPlace>();
  const [slidingUpPanel, setSlidingUpPanel] = useState<SlidingUpPanel>();
  const [allowDragging, setAllowDragging] = useState(true);
  const [isMapView, setIsMapView] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const { categories, getCategories } = useContext(CategoryContext);
  const [selectedCategories, setSelectedCategories] = useState();
  const [filterForm, setFilterForm] = useState<IFilterPlace>({
    title: undefined,
    latitude: undefined,
    longitude: undefined,
    line1: undefined,
    city: undefined,
    postalCode: undefined,
    country: undefined,
    phone: undefined,
    categories: [],
  });
  let animValue = new Animated.Value(0);

  const fetchData = async () => {
    await getPlaces();
  };

  useEffect(() => {
    (async () => {
      await fetchData();
      await getCategories();
    })();
  }, []);

  const onClickProfile = async () => {
    navigation.navigate('Profile');
  };

  const onClickList = () => {
    navigation.navigate('List');
  };

  const onClickAddPlace = () => {
    navigation.navigate('CreatePlace');
  };

  const renderSlidingUpPanel = () => {
    const { width, height } = Dimensions.get('window');
    return (
      <SlidingUpPanel
        ref={(c: SlidingUpPanel) => setSlidingUpPanel(c)}
        animatedValue={animValue}
        snappingPoints={[300, 600]}
        backdropOpacity={0.1}
        allowDragging={allowDragging}
      >
        <View style={{ flex: 1 }}>
          <PlaceDetailsView
            place={selectedMarker!}
            // setAllowDragging={setAllowDragging!}
            // setModalVisible={setModalVisible}
          />
        </View>
      </SlidingUpPanel>
    );
  };

  const renderActions = () => {
    return (
      <SafeAreaView style={styles.overlayActionContainer}>
        <View style={styles.headActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setIsFiltering(false);
              onClickProfile();
            }}
          >
            <EvilIcons name="user" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setIsFiltering(!isFiltering)}
          >
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setIsFiltering(false);
              setIsMapView(!isMapView);
            }}
          >
            <Ionicons
              name={isMapView ? 'list' : 'map'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setIsFiltering(false);
              onClickAddPlace();
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderFilterView = () => {
    return (
      <SafeAreaView style={styles.overlayContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView style={{ flex: 1 }}>
            <Text style={styles.filterTitle}>
              What are you searching for...?
            </Text>
            <Checkbox.Group
              onChange={cats =>
                setFilterForm({ ...filterForm, categories: cats })
              }
              value={filterForm.categories}
            >
              {categories !== undefined && categories.length > 0 ? (
                categories.map((category, index) => {
                  return (
                    <View key={index} style={{ marginBottom: 15 }}>
                      <Checkbox value={category.title}>
                        {category.title}
                      </Checkbox>
                    </View>
                  );
                })
              ) : (
                <View style={{}}>
                  {console.log('should display non cat')}
                  <Text style={{}}>There is no category yet.</Text>
                </View>
              )}
            </Checkbox.Group>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.filter}>
          <TouchableOpacity
            style={styles.actionFilter}
            onPress={async () => {
              console.log('------------------> Hello world from Home/filter');
              console.log('filterFrom=', filterForm);
              setIsFiltering(false);
              await getPlaces(filterForm);
            }}
          >
            <Text style={styles.actionTextFilter}>Filter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      {isMapView ? (
        <View>
          <MapViewComponent
            setSelectedMarker={setSelectedMarker}
            slidingUpPanel={slidingUpPanel!}
            navigation={navigation}
          />
          {renderSlidingUpPanel()}
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollViewContent}>
            {places?.map((place, index) => {
              return (
                <PlaceListItem
                  data={place}
                  key={index}
                  navigation={navigation}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
      {isFiltering && renderFilterView()}
      {renderActions()}
    </View>
  );
};
