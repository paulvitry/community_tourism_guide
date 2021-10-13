import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { AuthenticationContext } from '../../Contexts/AuthenticationContext';
// import firebase from '../../database/firebase';

type IProfileProps = NavigationProps<'Profile'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flex: 0.1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    flex: 0.7,
    padding: '5%',
    // alignItems: 'center',
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
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
});

export const Profile: React.FC<IProfileProps> = ({ navigation }) => {
  const { user, logout, getUser } = useContext(AuthenticationContext);

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
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Button title="back" onPress={onClickHome} />
        </View>
      </View>

      <View style={styles.content}>
        {/* <TouchableHighlight onPress={onSelectMedias} style={styles.uploadImage}>
          <ImageBackground style={styles.imageBackground} source={''}>
            <Text>Select photo(s)</Text>
          </ImageBackground>
        </TouchableHighlight> */}

        <Text style={styles.headerTitle}>
          Welcome {user.displayName ? user.displayName : '...'}
        </Text>
        {!user.displayName ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Let us know how you want to be called</Text>
            <TextInput
              style={styles.textInput}
              placeholder={
                form.displayName ? form.displayName : 'Enter username'
              }
              onChangeText={value => setForm({ ...form, displayName: value })}
              keyboardType="default"
            />
          </View>
        ) : (
          <View>
            <Text>{user.email}</Text>

            <Button title="logout" onPress={onClick} />
            <Button title="Home" onPress={onClickHome} />
          </View>
        )}
      </View>
      <View style={styles.footer}></View>
    </SafeAreaView>
  );
};
