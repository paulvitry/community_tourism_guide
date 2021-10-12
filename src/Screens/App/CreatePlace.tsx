import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { ImageContext } from './../../Contexts/ImageContext';
import { AuthenticationContext } from './../../Contexts/AuthenticationContext';
// import { ImageBrowser } from 'expo-image-picker-multiple';
import firebase from '../../database/firebase';

type ICreatePlaceProps = NavigationProps<'CreatePlace'>;
// interface ICreatePlaceProps {
//   navigation: StackNavigationProp<NavigationParamList, T>;
//   route: RouteProp<NavigationParamList, T>;
//   params: any
//   // setOpenProfil: React.Dispatch<React.SetStateAction<boolean>>
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  alignItems: 'center',
    // justifyContent: 'center',
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
  textInput: {
    backgroundColor: '#D4D4D4',
    height: 60,
    marginBottom: 10,
    fontSize: 14,
    padding: 10,
  },
  imageBackground: {
    width: '100%',
    maxWidth: 600,
    height: 300,
    backgroundColor: 'grey',
  },
  actionButton: {
    width: '90%',
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 24,
  },
  topFooter: {
    height: 40,
    marginBottom: 20,
  },
});

export const CreatePlace: React.FC<ICreatePlaceProps> = ({
  navigation,
  route,
}) => {
  // const [form, setForm] = useState({ title: null, description: '', uri: '' });
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [picture, setPicture] = useState<string>(null);
  const { uploadPicture } = useContext(ImageContext);
  const { user } = useContext(AuthenticationContext);
  const onBackClick = async () => {
    navigation.navigate('Home');
  };
  const onSelectMedias = async () => {
    const res = await uploadPicture();
    console.log('res = ', res);
    setPicture(res);
    console.log('in select media');
  };

  const onClick = async () => {
    console.log('publish');
    const path = picture.uri.split('/')[picture.uri.split('/').length - 1];
    
    const response = await fetch(picture.uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('images/' + path);

    ref.put(blob);

    const collection = await firebase.firestore().collection('Places');
    await collection
      .doc()
      .set({
        creator: user.id,
        title: title,
        description: description,
        picture: path,
        coordinate: route.params.coordinate,
        created_at: Date.now(),
      })
      .catch(e => {
        consoe.log(e);
      });

    navigation.navigate('Home');
  };

  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Create Place</Text>
          <Button title="back" onPress={onBackClick} />
        </View>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter the title of the place"
          onChangeText={setTitle}
          keyboardType="default"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Enter the description of the place"
          onChangeText={setDescription}
          keyboardType="default"
        />

        <TouchableHighlight
          onPress={onSelectMedias}
          style={{ backgroundImage: picture, backgroundColor: 'grey' }}
        >
          <ImageBackground style={styles.imageBackground} source={picture}>
            <Text>Select photo(s)</Text>
          </ImageBackground>
        </TouchableHighlight>

        {/* <ImageBrowser
          max={4}
          // onChange={(num, onSubmit) => {}}
          // callback={callback => {}}
        /> */}
      </View>

      <View style={styles.footer}>
        <View style={styles.topFooter}></View>
        <TouchableHighlight style={styles.actionButton} onPress={onClick}>
          <Text style={styles.actionButtonText}>Publish</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
