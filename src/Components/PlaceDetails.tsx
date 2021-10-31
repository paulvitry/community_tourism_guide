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

const ACTION_BTN_BG = '#748B6F';

interface IPlaceDetailsProps {
  place: IPlace | undefined;
  setAllowDragging: React.Dispatch<React.SetStateAction<boolean>>;
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
  //list styles
  list: {
    width: '100%',
    minHeight: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  listTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listDescription: {
    color: 'grey',
  },
});

const mStyles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 52,
    maxHeight: '90%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 26,
  },
  space: {
    height: 30,
  },
});

export const PlaceDetails: React.FC<IPlaceDetailsProps> = ({ place, setAllowDragging }) => {
  const [image, setImage] = useState(null);
  const { getImage } = useContext(ImageContext);
  const { addPlaceToList, lists, getLists } = useContext(ListContext);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!lists) {
      (async () => {
        await getLists();
      })();
    }
    if (place?.picture) {
      (async () => {
        setImage(await getImage({ path: 'images', url: place!.picture }));
      })();
    }
  });

  const handleAddToList = async (listId: string, placeId: string) => {
    console.log('add to list');

    addPlaceToList({ listId, placeId });
    setModalVisible(false);
    setAllowDragging(true);
  };

  const selectListModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        style={mStyles.modal}
      >
        <View style={mStyles.centeredView}>
          <View style={mStyles.modalView}>
            <View style={mStyles.header}>
              <Text style={mStyles.headerTitle}>Add to list</Text>
              <TouchableHighlight
                style={mStyles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setAllowDragging(true);
                }}
              >
                <Entypo name="cross" size={24} color="white" />
              </TouchableHighlight>
            </View>
            <View style={mStyles.space} />
            <ScrollView style={{ width: '100%' }}>
              <View style={{ width: '100%' }}>
                {lists?.map((list: IList, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleAddToList(list.id, place?.id!)}
                      style={styles.list}
                    >
                      <View style={styles.listTitleRow}>
                        <Text style={styles.listTitle}>{list.title}</Text>
                        <AntDesign name="right" size={24} color="black" />
                      </View>

                      <Text style={styles.listDescription}>
                        {list.description}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={mStyles.space} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

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
                setAllowDragging(false);
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

            {/* <Text></Text>
                <Text>site web</Text>
                <Text>Telephone</Text>
                <Text>Email</Text> */}
          </View>
          <View style={styles.divider} />
        </View>
      )}
      {selectListModal()}
    </View>
  );
};
