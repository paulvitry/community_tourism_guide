import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { ListContext } from '../../Contexts/ListContext';
import { TextInput } from '../../Components/TextInput';
import { IList } from '../../Interfaces/IListContext';

const ACTION_BTN_BG = '#000000';

type IListProps = NavigationProps<'List'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1,

    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: ACTION_BTN_BG,

    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%',
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  headerActions: {
    flexDirection: 'row',
  },

  bgShape: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    backgroundColor: ACTION_BTN_BG,
    height: 80,
    width: '100%',
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
  },

  scrollView: {
    flex: 0.9,
    backgroundColor: 'white',
  },

  list: {
    width: '90%',
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
  action: {
    marginLeft: 15,
  },
});

const mstyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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

export const List: React.FC<IListProps> = ({ navigation }) => {
  const { lists, getLists, createList } = useContext(ListContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    title: undefined,
    description: undefined,
  });

  const onClickHome = () => {
    navigation.navigate('Home');
  };

  const onClickAdd = () => {
    setModalVisible(true);
  };

  const handleListClick = (list: IList) => {
    console.log(list);
    navigation.navigate('ListDetails', { list: list });
  };

  useEffect(() => {
    (async () => {
      await getLists();
    })();
  }, []);

  const createListModal = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={mstyles.centeredView}>
            <View style={mstyles.modalView}>
              <View style={mstyles.header}>
                <Text style={mstyles.headerTitle}>New list</Text>
                <TouchableHighlight
                  style={mstyles.closeButton}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Entypo name="cross" size={24} color="white" />
                </TouchableHighlight>
              </View>
              <View style={mstyles.space} />
              <ScrollView style={{ width: '100%' }}>
                <View style={{ width: '100%' }}>
                  <TextInput
                    label={'list name'}
                    onChangeText={text => setForm({ ...form, title: text })}
                  />
                  <TextInput
                    label={'description'}
                    onChangeText={text =>
                      setForm({ ...form, description: text })
                    }
                  />
                </View>
                <View style={mstyles.space} />
                <TouchableHighlight
                  style={{
                    ...mstyles.openButton,
                    backgroundColor: ACTION_BTN_BG,
                  }}
                  disabled={!form.title}
                  onPress={async () => {
                    setModalVisible(!modalVisible);
                    console.log('creation');
                    await createList(form!);
                  }}
                >
                  <Text style={mstyles.textStyle}>Create</Text>
                </TouchableHighlight>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#000000', '#000000', 'white', 'white']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Lists</Text>
            <View style={styles.headerActions}>
              <AntDesign
                style={styles.action}
                name="plus"
                size={24}
                color="white"
                onPress={() => onClickAdd()}
              />
              <AntDesign
                style={styles.action}
                name="arrowleft"
                size={24}
                color="white"
                onPress={() => onClickHome()}
              />
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {lists?.length !== 0 ? (
              lists?.map((list: IList, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleListClick(list)}
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
              })
            ) : (
              <Text>{"You don't have any list yet..."}</Text>
            )}
            {/* <View style={styles.bgShape} /> */}

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>

        {createListModal()}
      </SafeAreaView>
    </LinearGradient>
  );
};
