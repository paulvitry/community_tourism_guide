import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput as TI,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ImageContext } from '../Contexts/ImageContext';
import { PlaceContext } from '../Contexts/PlaceContext';
import { IPlace } from '../Interfaces/IPlaceContext';
import { NavigationParamList } from '../Navigation/Navigation';

const ACTION_BTN_BG = '#748B6F';

interface IPlaceListItemProps {
  placeId: string;
  key: number;
  navigation: NativeStackNavigationProp<NavigationParamList>
}

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
});

export const PlaceListItem: React.FC<IPlaceListItemProps> = ({
  placeId,
  navigation,
}) => {
  const [image, setImage] = useState(null);
  const [place, setPlace] = useState<IPlace | null>(null);
  const { getImage } = useContext(ImageContext);
  const { getPlaceById } = useContext(PlaceContext);
  // const { addPlaceToList, lists, getLists } = useContext(ListContext);
  // const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!place) {
      (async () => {
        setPlace(await getPlaceById(placeId));
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

  return (
    <TouchableOpacity
      onPress={() => handleClick()}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: image! }} />
      <View style={styles.content}>
      <Text style={styles.title}>{place?.title}</Text>
      <Text style={styles.description}>{place?.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
