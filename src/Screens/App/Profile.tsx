import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { AuthenticationContext } from '../../Contexts/AuthenticationContext';
import { ImageContext } from '../../Contexts/ImageContext';
// import firebase from '../../database/firebase';

const ACTION_BTN_BG = '#748B6F';

type IProfileProps = NavigationProps<'Profile'>;

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
  },

  imageBackground: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadImage: {
    backgroundColor: 'grey',
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'black',
  },
  textInput: {
    backgroundColor: '#D4D4D4',
    height: 60,
    marginBottom: 10,
    fontSize: 14,
    padding: 10,
    width: '100%',
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
  profilePicture: {
    height: 150,
    width: 150,
    borderRadius: 30,
    backgroundColor: 'grey',
    marginTop: -55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'darkgrey',
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
  },
  actionButton: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: ACTION_BTN_BG,
    height: 50,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textActions: {
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
    // fontWeight: 'bold',
  },
});

export const Profile: React.FC<IProfileProps> = ({ navigation }) => {
  const { user, logout, getUser, resetpassword } = useContext(
    AuthenticationContext,
  );
  const { updateProfilePicture, uploadPicture, getImage } =
    useContext(ImageContext);
  const [image, setImage] = useState();

  const [form, setForm] = useState({ displayName: user.displayName });

  const onClick = async () => {
    console.log('logout');
    await logout();
  };

  // const onSelectMedias = async () => {
  //   // const res = await uploadPicture();
  //   // setPicture(res);
  //   // setForm({ ...form, uri: res.uri });
  // };

  const onClickHome = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    (async () => {
      await getUser();
      console.log('use effect: ', user);
      setImage(await getImage({ path: 'profile/', url: user.photoURL }));
    })();
  }, []);

  const handleImage = async () => {
    const res = await uploadPicture();
    const path = res.uri.split('/')[res.uri.split('/').length - 1];
    await updateProfilePicture({
      path: 'profile/' + path,
      url: res.uri,
    });
    setImage(res.uri);
  };

  const handleResetPwd = async () => {
    await resetpassword({ email: user.email });
  };

  const renderActions = () => {
    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        {/* <View style={styles.divider} /> */}
        <TouchableOpacity style={styles.actionButton}>
          <Entypo name="pencil" size={24} color="white" />
          <Text style={styles.textActions}>Modify username</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleResetPwd}>
          <Entypo name="key" size={24} color="white" />
          <Text style={styles.textActions}>Reset password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="logout" size={24} color="white" />
          <Text style={styles.textActions}>Logout</Text>
        </TouchableOpacity>
      </View>
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
            <Text style={styles.headerTitle}>Profile</Text>
            <Button title="back" onPress={onClickHome} />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.bgShape} />
          <TouchableOpacity style={styles.profilePicture} onPress={handleImage}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{user.displayName}</Text>
          <View style={{ height: 40 }} />
          {renderActions()}
        </View>
        <View style={styles.footer}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};
