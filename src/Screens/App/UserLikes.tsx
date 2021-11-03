import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { PlaceListItem } from '../../Components/PlaceListItem';
import { PlaceContext } from '../../Contexts/PlaceContext';
import { LikeContext } from '../../Contexts/LikeContext';
import { AntDesign } from '@expo/vector-icons';
// import firebase from '../../database/firebase';

const ACTION_BTN_BG = '#000000';

type IUserLikesProps = NavigationProps<'List'>;

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
});

export const UserLikes: React.FC<IUserLikesProps> = ({ navigation, route }) => {
  const { userLikes, getUserLikes } = useContext(LikeContext);
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const [form, setForm] = useState({ title: null, description: null });
  // const [lists, setLists] = useState();

  const onClickBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('useEffect params -> ', route.params);
    (async () => {
      await getUserLikes();
    })();
  }, []);

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#000000', '#000000', 'white', 'white']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>{'Likes'}</Text>
            <View style={styles.headerActions}>
            <AntDesign
              style={{ marginLeft: 15 }}
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
            {userLikes ? (
              userLikes?.map((like, index: number) => {
                if (like.postType === 'place') {
                  console.log('userPLaces should map : ', userLikes);

                  return (
                    <PlaceListItem
                      placeId={like.postId}
                      key={index}
                      navigation={navigation}
                    />
                  );
                } else if (like.postType === 'list') {
                  return <View />;
                }
              })
            ) : (
              <View>
                {console.log('should display text')}
                <Text>{"You didn't like anything yet"}</Text>
              </View>
            )}
            {/* <View style={styles.bgShape} /> */}

            <View style={{ height: 40 }} />
          </View>
          {/* {createListModal()} */}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
