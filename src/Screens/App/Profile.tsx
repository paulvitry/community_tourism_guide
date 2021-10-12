import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  TouchableHighlight,
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
    width: 70,
    height: 70,
    backgroundColor: 'grey',
  },
});

export const Profile: React.FC<IProfileProps> = ({ navigation }) => {
  const { user, logout, getUser } = useContext(AuthenticationContext);

  const onClick = async () => {
    console.log('logout');
    await logout();
  };

  const onSelectMedias = async () => {
    // const res = await uploadPicture();
    // setPicture(res);
    // setForm({ ...form, uri: res.uri });
  };

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
        <TouchableHighlight
          onPress={onSelectMedias}
          style={{ backgroundColor: 'grey' }}
        >
          <ImageBackground style={styles.imageBackground} source={''}>
            <Text>Select photo(s)</Text>
          </ImageBackground>
        </TouchableHighlight>

        <Text>{user.email}</Text>

        <Button title="logout" onPress={onClick} />
        <Button title="Home" onPress={onClickHome} />
      </View>
      <View style={styles.footer}></View>
    </SafeAreaView>
  );
};
