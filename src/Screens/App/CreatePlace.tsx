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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    flex: 0.1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollView: {
    flex: 0.9,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: '5%',
  },
  footer: {
    height: 200,
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
    line1: undefined,
    city: undefined,
    postalCode: undefined,
    country: undefined,
    website: undefined,
    phone: undefined,
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
    if (route.params?.coordinate!) {
      setForm({
        ...form,
        creator: user?.id,
        longitude: route.params.coordinate.longitude,
        latitude: route.params.coordinate.latitude,
      });
    } else {
      setForm({ ...form, creator: user?.id });
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
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
      <ScrollView style={styles.scrollView}>
        
          <View style={styles.content}>
            <TextInput
              label="Title"
              onChangeText={value => setForm({ ...form, title: value })}
              keyboardType="default"
              isRequired
            />

            <TextInput
              label="Description"
              onChangeText={value => setForm({ ...form, description: value })}
              keyboardType="default"
            />

            <Text style={{ fontWeight: 'bold' }}>
              Select photo<Text style={{ color: 'red', fontWeight: 'normal' }}>*</Text>
            </Text>
            <TouchableHighlight
              onPress={onSelectMedias}
              style={{ backgroundColor: 'grey' }}
            >
              <ImageBackground
                style={styles.imageBackground}
                source={selectedPicture!}
              ></ImageBackground>
            </TouchableHighlight>

            <TextInput
              label="Latitude"
              onChangeText={value => setForm({ ...form, latitude: value })}
              keyboardType="default"
              isRequired
            />
            <TextInput
              label="Longitude"
              onChangeText={value => setForm({ ...form, longitude: value })}
              keyboardType="default"
              isRequired
            />
            <TextInput
              label="Line1"
              onChangeText={value => setForm({ ...form, line1: value })}
              keyboardType="default"
            />
            <TextInput
              label="City"
              onChangeText={value => setForm({ ...form, city: value })}
              keyboardType="default"
            />
            <TextInput
              label="Postal Code"
              onChangeText={value => setForm({ ...form, postalCode: value })}
              keyboardType="default"
            />
            <TextInput
              label="Country"
              onChangeText={value => setForm({ ...form, country: value })}
              keyboardType="default"
            />
            <TextInput
              label="website"
              onChangeText={value => setForm({ ...form, website: value })}
              keyboardType="default"
            />
            <TextInput
              label="phone number"
              onChangeText={value => setForm({ ...form, phone: value })}
              keyboardType="default"
            />

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
      </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};
