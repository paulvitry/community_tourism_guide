import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ImageContext } from '../Contexts/ImageContext';
import { ListContext } from '../Contexts/ListContext';
import { PlaceContext } from '../Contexts/PlaceContext';
import { IPlace } from '../Interfaces/IPlaceContext';
import { NavigationParamList } from '../Navigation/Navigation';

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
    width: '15%',
    alignItems: 'flex-end',
  },
  texts: {
    width: '85%',
  },
  editButton: {
    padding: 5,
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

interface IPlaceListItemProps {
  placeId?: string;
  data?: IPlace;
  key: number;
  navigation: NativeStackNavigationProp<NavigationParamList>;
  canEdit?: boolean;
  listId?: string;
  setShouldReload?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlaceListItem: React.FC<IPlaceListItemProps> = ({
  placeId = null,
  navigation,
  data = null,
  canEdit = false,
  listId = undefined,
  setShouldReload = undefined,
}) => {
  const [image, setImage] = useState(null);
  const [place, setPlace] = useState<IPlace | null>(data);
  const { getImage } = useContext(ImageContext);
  const { getPlaceById, deletePlace } = useContext(PlaceContext);
  const { deletePlaceFromList } = useContext(ListContext);

  useEffect(() => {
    if (!place) {
      (async () => {
        setPlace(await getPlaceById(placeId!));
      })();
    }
    if (place?.picture && !image) {
      (async () => {
        setImage(await getImage({ path: 'images', url: place!.picture }));
      })();
    }
  });

  const handleClick = () => {
    navigation.navigate('PlaceDetails', { data: place! });
  };

  const renderEdit = () => {
    return (
      <View style={styles.actionView}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('CreatePlace', { data: place! })}
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
                },
              },
            ])
          }
        >
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDeleteFromList = () => {
    return (
      <View style={styles.actionView}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            Alert.alert('Are you sure you want to delete from list?', '', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: async () => {
                  await deletePlaceFromList({
                    placeId: place?.id!,
                    listId: listId!,
                  });
                  setShouldReload!(true);
                },
              },
            ])
          }
        >
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={() => handleClick()} style={styles.container}>
      <Image style={styles.image} source={{ uri: image! }} />
      {place?.title ? (
        <View style={styles.content}>
          <View style={styles.texts}>
            <Text style={styles.title}>{place?.title}</Text>
            <Text style={styles.description}>{place?.description}</Text>
            {place?.categories && (
              <View style={styles.badges}>
                {place?.categories!.map((category, index) => {
                  return (
                    <View key={index} style={styles.badge}>
                      <Text style={{ color: 'white' }}>{category}</Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {listId && renderDeleteFromList()}
          {canEdit && renderEdit()}
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.texts}>
            {
              'We cannot find this place anymore...\nIt was certainly suppressed by author'
            }
          </Text>
          {listId && renderDeleteFromList()}
        </View>
      )}
    </TouchableOpacity>
  );
};
