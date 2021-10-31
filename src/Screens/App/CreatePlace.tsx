import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  // TextInput,
  TouchableHighlight,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { ImageContext } from './../../Contexts/ImageContext';
import { PlaceContext } from './../../Contexts/PlaceContext';
import { AuthenticationContext } from './../../Contexts/AuthenticationContext';
import { ICreatePlace } from '../../Interfaces/IPlaceContext';
// import { ImageBrowser } from 'expo-image-picker-multiple';
import { TextInput } from '../../Components/TextInput';

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
  const [form, setForm] = useState<ICreatePlace>({
    title: undefined,
    description: undefined,
    picture: undefined,
    creator: undefined,
    latitude: undefined,
    longitude: undefined,
  });
  // const [title, setTitle] = useState<string>();
  // const [description, setDescription] = useState<string>();
  const [selectedPicture, setSelectedPicture] = useState<ImageSourcePropType>();
  const { uploadPicture } = useContext(ImageContext);
  const { createPlace, getPlaces } = useContext(PlaceContext);
  const { user } = useContext(AuthenticationContext);
  const onBackClick = async () => {
    navigation.navigate('Home');
  };
  const onSelectMedias = async () => {
    const res = await uploadPicture();
    setSelectedPicture(res);
    setForm({ ...form, picture: res.uri });
  };

  useEffect(() => {
    setForm({ ...form, creator: user!.id });
    if (route.params.coordinate) {
      setForm({
        ...form,
        longitude: route.params.coordinate.longitude,
        latitude: route.params.coordinate.latitude,
      });
    }
  }, []);

  const onClick = async () => {
    await createPlace(form);
    await getPlaces();
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
          label="Title"
          onChangeText={value => setForm({ ...form, title: value })}
          keyboardType="default"
        />

        <TextInput
          label="Description"
          onChangeText={value => setForm({ ...form, description: value })}
          keyboardType="default"
        />

        <TouchableHighlight
          onPress={onSelectMedias}
          style={{ backgroundColor: 'grey' }}
        >
          <ImageBackground style={styles.imageBackground} source={selectedPicture!}>
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
