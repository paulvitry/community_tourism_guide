import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  Share,
  ScrollView,
} from 'react-native';
import { AlertContext } from '../Contexts/AlertContext';
import { ImageContext } from '../Contexts/ImageContext';
import { LikeContext } from '../Contexts/LikeContext';
import { IPlace } from '../Interfaces/IPlaceContext';
import { AddToListModal } from './AddToListModal';

interface IPlaceDetailsViewProps {
  place: IPlace;
  setAllowDragging?: React.Dispatch<React.SetStateAction<boolean>>;
}

const styles = StyleSheet.create({
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
    backgroundColor: 'grey',
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
  text: {
    marginLeft: 10,
  },
  scrollView: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
  },
  badges: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  badge: {
    height: 30,
    borderRadius: 15,
    backgroundColor: 'grey',
    padding: 5,
    paddingHorizontal: 10,
    margin: 1,
  },
});

export const PlaceDetailsView: React.FC<IPlaceDetailsViewProps> = ({
  place,
  setAllowDragging = undefined,
}) => {
  const [image, setImage] = useState(null);
  const { getImage } = useContext(ImageContext);
  const { Alerts } = useContext(AlertContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { isLiked, like, unlike } = useContext(LikeContext);
  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  // const { addPlaceToList, lists, getLists } = useContext(ListContext);
  // const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (place?.id) {
      (async () => {
        setLiked(await isLiked(place?.id));
      })();
    }
    if (place?.picture) {
      (async () => {
        setImage(await getImage({ path: 'images', url: place!.picture }));
      })();
    }
  });

  const openGps = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${place?.coordinate.latitude},${place?.coordinate.longitude}`;
    const label = place?.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.canOpenURL(url!).then(supported => {
      if (supported) {
        Linking.openURL(url!);
      } else {
        Alerts.warning({
          title: "Oops... We can't open the url",
          message: '',
          duration: 4000,
        });
      }
    });
  };

  const openPhone = () => {
    if (!place?.phone) {
      Alerts.warning({
        title: 'Oops... It looks like there is no phone number.',
        message: '',
        duration: 4000,
      });
      return;
    }
    Linking.canOpenURL(`tel:${place?.phone}`).then(supported => {
      if (supported) {
        Linking.openURL(`tel:${place?.phone}`);
      } else {
        Alerts.warning({
          title: 'Oops... It looks like it is a bad phone number.',
          message: '',
          duration: 4000,
        });
      }
    });
  };

  const openWebsite = () => {
    if (!place?.website) {
      console.log('no websiter');
      Alerts.warning({
        title: 'Oops... It looks like there is no website.',
        message: '',
        duration: 4000,
      });
      return;
    }

    let url = '';
    if (place?.website.includes('http')) url = place?.website;
    else url = 'http://' + place?.website;

    Linking.canOpenURL(`${url}`).then(supported => {
      if (supported) {
        Linking.openURL(`${url}`);
      } else {
        Alerts.warning({
          title: "Oops... We can't open the url",
          message: '',
          duration: 4000,
        });
      }
    });
  };

  const openShare = async () => {
    await Share.share({
      message: `${place?.title!}\n${place?.description!}\nAddress: ${place
        ?.location?.line1!}, ${place?.location?.city!} ${place?.location
        ?.postalCode!}, ${place?.location
        ?.country!}\nWebsite: ${place?.website!}\nPhone: ${place?.phone!}\nlat: ${
        place?.coordinate.latitude
      }\nlng: ${place?.coordinate.longitude}\n`,
    });
  };

  const handleLike = async () => {
    await like({ postId: place?.id!, postType: 'place' });
    setLiked(undefined);
    setLiked(await isLiked(place?.id!));
  };

  const handleUnlike = async () => {
    await unlike(place?.id!);
    setLiked(undefined);
    setLiked(await isLiked(place?.id!));
  };

  return (
    <View style={styles.container}>
      {place! && (
        <View>
          <Image style={styles.image} source={{ uri: image! }} />
          <ScrollView
            style={styles.scrollView}
            onTouchStart={() => {
              console.log('begin scroll');
              if (setAllowDragging !== undefined)
                setAllowDragging!(false);
            }}
            onTouchEnd={() => {
              if (setAllowDragging !== undefined)
                setAllowDragging!(true);
            }}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{place.title}</Text>
              <Text>{place.description}</Text>
            </View>
            <View style={styles.divider} />

            {place?.categories && (
              <View style={styles.content}>
                <View style={styles.badges}>
                  {place?.categories!.map((category, index) => {
                    return (
                      <View key={index} style={styles.badge}>
                        <Text style={{ color: 'white' }}>{category}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.contentAction}>
              <TouchableOpacity style={styles.action} onPress={openGps}>
                <Entypo name="direction" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} onPress={openShare}>
                <Entypo name="share" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.action}
                onPress={() => (liked ? handleUnlike() : handleLike())}
              >
                {liked ? (
                  <Entypo name="heart" size={24} color="blue" />
                ) : (
                  <Entypo name="heart-outlined" size={24} color="blue" />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.action} onPress={openPhone}>
                <Entypo name="phone" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.action}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Entypo name="add-to-list" size={24} color="blue" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            
            <View style={styles.content}>
              <TouchableOpacity style={styles.infos} onPress={openGps}>
                <Entypo name="location-pin" size={24} color="blue" />
                <Text style={styles.text}>
                  {place?.location
                    ? place?.location?.line1 +
                      ', ' +
                      place?.location?.city +
                      ' ' +
                      place?.location?.postalCode +
                      ', ' +
                      place?.location?.country
                    : 'No address was filled.'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infos}>
                <Entypo name="clock" size={24} color="blue" />
                <Text style={styles.text}>Open Hours</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infos} onPress={openWebsite}>
                <AntDesign name="earth" size={24} color="blue" />
                <Text style={styles.text}>
                  {place?.website ? place?.website : 'No website was filled.'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.infos} onPress={openPhone}>
                <Entypo name="phone" size={24} color="blue" />
                <Text style={styles.text}>
                  {place?.phone ? place?.phone : 'No phone number was filled.'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 100, width: '100%' }} />
            <View style={{ height: 100, width: '100%' }} />

            <View style={styles.divider} />
            <View style={{ height: 100, width: '100%' }} />
          </ScrollView>
          <AddToListModal
            place={place}
            visible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      )}
    </View>
  );
};
