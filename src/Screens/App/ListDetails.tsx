import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { IList } from '../../Interfaces/IListContext';
import { PlaceListItem } from '../../Components/PlaceListItem';
import { ListContext } from '../../Contexts/ListContext';
import { AntDesign } from '@expo/vector-icons';

const ACTION_BTN_BG = '#000000';

type IListDetailsProps = NavigationProps<'ListDetails'>;

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
  scrollView: {
    flex: 0.9,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
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
  action: {
    marginLeft: 15,
  },
});

export const ListDetails: React.FC<IListDetailsProps> = ({
  navigation,
  route,
}) => {
  const [list, setList] = useState<IList | undefined>(undefined);
  const { getListById, deleteList } = useContext(ListContext);
  const [shouldReload, setShouldReload] = useState(true);

  const onClickBack = () => {
    navigation.goBack();
  };

  const handleDelete = async () => {
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
          await deleteList(list?.id!);
          onClickBack();
        },
      },
    ]);
  };

  useEffect(() => {
    if (shouldReload) {
      (async () => {
        console.log('useEffect params -> ');
        const tmpValue = await getListById(route.params?.list?.id);
        setList(undefined);
        setList(tmpValue);
        setShouldReload(false);
        console.log('value resssssssset --------------------------->');
      })();
    }
  }, [shouldReload]);

  return (
    <LinearGradient
      colors={['#000000', '#000000', 'white', 'white']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>{list?.title}</Text>
            <View style={styles.headerActions}>
              <AntDesign
                style={styles.action}
                name="delete"
                size={24}
                color="white"
                onPress={() => handleDelete()}
              />
              <AntDesign
              style={styles.action}
                name="arrowleft"
                size={24}
                color="white"
                onPress={() => onClickBack()}
              />
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {list?.places.map((place: string, index: number) => {
              return (
                <PlaceListItem
                  placeId={place}
                  key={index}
                  navigation={navigation}
                  listId={list.id}
                  setShouldReload={setShouldReload}
                />
              );
            })}
            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
