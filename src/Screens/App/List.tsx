import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { ListContext } from '../../Contexts/ListContext';
import { TextInput } from '../../Components/TextInput';
// import firebase from '../../database/firebase';

const ACTION_BTN_BG = '#748B6F';

type IListProps = NavigationProps<'List'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: ,
  },
  header: {
    width: '100%',
    flex: 0.1,

    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: ACTION_BTN_BG,

    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    flex: 0.7,
    backgroundColor: 'white',
    alignItems: 'center',
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
  const [form, setForm] = useState({ title: null, description: null });
  // const [lists, setLists] = useState();

  const onClickHome = () => {
    navigation.navigate('Home');
  };

  const onClickAdd = () => {
    console.log('add');
    setModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      await getLists();
      // await setLists(await getLists());
      console.log('hey');
    })();
  }, []);

  const createListModal = () => {
    return (
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
                  onChangeText={text => setForm({ ...form, description: text })}
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
                  await createList(form);
                }}
              >
                <Text style={mstyles.textStyle}>Create</Text>
              </TouchableHighlight>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#748B6F', '#748B6F', 'white', 'white']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Lists</Text>
            <View style={styles.headerActions}>
              <Button title="back" onPress={onClickHome} />
              <Button title="add" onPress={onClickAdd} />
            </View>
          </View>
        </View>
        <View style={styles.content}>
          {lists?.map((list, index) => {
            return <Text key={index}>{list.title}</Text>;
          })}
          {/* <View style={styles.bgShape} /> */}

          <View style={{ height: 40 }} />
        </View>
        <View style={styles.footer}></View>
        {createListModal()}
      </SafeAreaView>
    </LinearGradient>
  );
};
