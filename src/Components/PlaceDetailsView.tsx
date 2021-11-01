import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput as TI,
  KeyboardTypeOptions,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { ImageContext } from '../Contexts/ImageContext';
import { ListContext } from '../Contexts/ListContext';
import { IList } from '../Interfaces/IListContext';
import { IPlace } from '../Interfaces/IPlaceContext';
import { AddToListModal } from './AddToListModal';

const ACTION_BTN_BG = '#748B6F';

interface IPlaceDetailsViewProps {
  place: IPlace | undefined;
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
});

export const PlaceDetailsView: React.FC<IPlaceDetailsViewProps> = ({
  place,
}) => {
  const [image, setImage] = useState(null);
  const { getImage } = useContext(ImageContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const { addPlaceToList, lists, getLists } = useContext(ListContext);
  // const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (place?.picture) {
      (async () => {
        setImage(await getImage({ path: 'images', url: place!.picture }));
      })();
    }
  });

  return (
    <View style={styles.container}>
      {place! && (
        <View>
          <Image style={styles.image} source={{ uri: image! }} />
          <View style={styles.content}>
            <Text style={styles.title}>{place.title}</Text>
            <Text>{place.description}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.contentAction}>
            <TouchableOpacity style={styles.action}>
              <Entypo name="direction" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <Entypo name="share" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <Entypo name="heart-outlined" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <Entypo name="phone" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                setModalVisible(true);
                // setAllowDragging(false);
              }}
            >
              <Entypo name="add-to-list" size={24} color="blue" />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.content}>
            <TouchableOpacity style={styles.infos}>
              <Entypo name="location-pin" size={24} color="blue" />
              <Text>Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infos}>
              <Entypo name="clock" size={24} color="blue" />
              <Text>Open Hours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infos}>
              <AntDesign name="earth" size={24} color="blue" />
              <Text>Web site</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.infos}>
              <Entypo name="phone" size={24} color="blue" />
              <Text>Phone</Text>
            </TouchableOpacity>
            <Text>{place.id}</Text>

            {/* <Text></Text>
                <Text>site web</Text>
                <Text>Telephone</Text>
                <Text>Email</Text> */}
          </View>
          <View style={styles.divider} />
          <AddToListModal
            place={place}
            visible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      )}

      {/* {selectListModal()} */}
    </View>
  );
};
