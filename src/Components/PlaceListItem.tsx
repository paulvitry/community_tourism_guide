import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput as TI,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { ImageContext } from '../Contexts/ImageContext';
import { PlaceContext } from '../Contexts/PlaceContext';
import { IPlace } from '../Interfaces/IPlaceContext';
import { NavigationParamList } from '../Navigation/Navigation';

const ACTION_BTN_BG = '#748B6F';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '90%',
    marginTop: 10,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: 'grey',
  },
  content: {
    padding: 10,
    minHeight: 70,
    // width: '80%',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: 'grey',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  actionView: {
    // flex: 1,
    width: '20%',
    alignItems: 'flex-end',
  },
  texts: {
    width: '80%',
  },
  editButton: {
    padding: 5,
  },
});

interface IPlaceListItemProps {
  placeId?: string;
  data?: IPlace;
  key: number;
  navigation: NativeStackNavigationProp<NavigationParamList>;
  canEdit?: boolean;
}

export const PlaceListItem: React.FC<IPlaceListItemProps> = ({
  placeId = null,
  navigation,
  data = null,
  canEdit = false,
}) => {
  const [image, setImage] = useState(null);
  const [place, setPlace] = useState<IPlace | null>(data);
  const { getImage } = useContext(ImageContext);
  const { getPlaceById, deletePlace, getUserPlaces } = useContext(PlaceContext);
  // const { addPlaceToList, lists, getLists } = useContext(ListContext);
  // const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('item place: ', place);
    if (!place) {
      (async () => {
        setPlace(await getPlaceById(placeId!));
      })();
    }

    if (place?.picture && !image) {
      console.log('should set image');
      (async () => {
        setImage(await getImage({ path: 'images', url: place!.picture }));
      })();
    }
  });

  const handleClick = () => {
    navigation.navigate('PlaceDetails', { data: place! });
  };

  return (
    <TouchableOpacity onPress={() => handleClick()} style={styles.container}>
      <Image style={styles.image} source={{ uri: image! }} />
      <View style={styles.content}>
        <View style={styles.texts}>
          <Text style={styles.title}>{place?.title}</Text>
          <Text style={styles.description}>{place?.description}</Text>
        </View>
        {canEdit && (
          <View style={styles.actionView}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate('CreatePlace', { data: place! })
              }
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                Alert.alert('Are you sure you want to delete this place?', '', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: async () => {
                      console.log('over');
                      await deletePlace(place?.id!);
                      await getUserPlaces();
                    },
                  },
                ])
              }
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
