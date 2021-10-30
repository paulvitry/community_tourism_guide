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
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { ListContext } from '../../Contexts/ListContext';
import { TextInput } from '../../Components/TextInput';
import { IList } from '../../interfaces/IListContext';
// import firebase from '../../database/firebase';

const ACTION_BTN_BG = '#748B6F';

type IListDetailsProps = NavigationProps<'List'>;

interface IListDetailsRoute {
	list: IList;
}

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
});

export const ListDetails: React.FC<IListDetailsProps> = ({ navigation, route }) => {
  //   const { lists, getLists, createList } = useContext(ListContext);
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const [form, setForm] = useState({ title: null, description: null });
  // const [lists, setLists] = useState();

  const [list, setList] = useState<IList | undefined>(undefined);

  const onClicBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('useEffect params -> ', route.params);
    setList(route.params?.list);
    (async () => {
      //   await getLists();
      // await setLists(await getLists());
      console.log('hey');
    })();
  }, []);

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#748B6F', '#748B6F', 'white', 'white']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>{list?.title}</Text>
            <View style={styles.headerActions}>
              <Button title="back" onPress={onClicBack} />
            </View>
          </View>
        </View>
        <View style={styles.content}>
          {/* {lists?.map((list: IList, index: number) => {
            return (
              <TouchableOpacity key={index} onPress={() => handleListClick} style={styles.list}>
                <View style={styles.listTitleRow}>
                  <Text style={styles.listTitle}>{list.title}</Text>
                  <AntDesign name="right" size={24} color="black" />
                </View>

                <Text style={styles.listDescription}>{list.description}</Text>

              </TouchableOpacity>
            );
          })} */}
          {/* <View style={styles.bgShape} /> */}

          <View style={{ height: 40 }} />
        </View>
        <View style={styles.footer}></View>
        {/* {createListModal()} */}
      </SafeAreaView>
    </LinearGradient>
  );
};
