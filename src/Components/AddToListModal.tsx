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
import { AntDesign, Entypo } from '@expo/vector-icons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { ImageContext } from '../Contexts/ImageContext';
import { ListContext } from '../Contexts/ListContext';
import { IList } from '../Interfaces/IListContext';
import { IPlace } from '../Interfaces/IPlaceContext';

const ACTION_BTN_BG = '#748B6F';

interface IAddToListModalProps {
  place: IPlace | undefined;
  visible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const mStyles = StyleSheet.create({
  modal: {
    height: '100%',
    width: '100%',
    elevation: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 52,
    maxHeight: '85%',
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

export const AddToListModal: React.FC<IAddToListModalProps> = ({
  place,
  visible,
  setModalVisible,
}) => {
  const { addPlaceToList, lists, getLists } = useContext(ListContext);
  //   const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!lists) {
      (async () => {
        await getLists();
      })();
    }
  });

  const handleAddToList = async (listId: string, placeId: string) => {
    console.log('add to list');

    addPlaceToList({ listId, placeId });
    setModalVisible(false);
    // setAllowDragging(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
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
                // setAllowDragging(true);
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
                    style={mStyles.list}
                  >
                    <View style={mStyles.listTitleRow}>
                      <Text style={mStyles.listTitle}>{list.title}</Text>
                      <AntDesign name="right" size={24} color="black" />
                    </View>

                    <Text style={mStyles.listDescription}>
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
