import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Alert,
  CheckBox,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { CategoryContext } from '../../Contexts/CategoryContext';
import { TextInput } from '../../Components/TextInput';
import { Checkbox } from 'native-base';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { NavigationProps } from '../../Navigation/Navigation';

const ACTION_BTN_BG = '#000000';

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
  scrollView: {
    flex: 0.9,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: '5%',
    backgroundColor: 'white',
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
    color: 'white',
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
    borderRadius: 5,
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
  actionButtonDisabled: {
    width: '90%',
    height: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topFooter: {
    height: 40,
    marginBottom: 20,
  },
  loading: {
    flexDirection: 'row',
  },
  loadingText: {
    color: 'black',
    marginLeft: 10,
  },
  touchableImage: {
    backgroundColor: 'grey',
    marginBottom: 10,
    borderRadius: 5,
  },
  touchableImageEmpty: {
    backgroundColor: 'grey',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
  },
  textError: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
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

type ISelectCategoriesProps = NavigationProps<'SelectCategories'>;

export const SelectCategories: React.FC<ISelectCategoriesProps> = ({
  navigation,
  route,
}) => {
  // const [form, setForm] = useState<ISelectCategories | IEditPlace>({
  //   id: undefined,
  //   title: undefined,
  //   description: undefined,
  //   picture: undefined,
  //   creator: undefined,
  //   latitude: undefined,
  //   longitude: undefined,
  //   line1: undefined,
  //   city: undefined,
  //   postalCode: undefined,
  //   country: undefined,
  //   website: undefined,
  //   phone: undefined,
  // });
  const { categories, getCategories, createCategory } =
    useContext(CategoryContext);
  const [selectedCategories, setSelectedCategories] = useState(
    route.params?.form?.categories,
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>();

  const onBackClick = async () => {
    navigation.goBack();
  };

  const renderModal = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <ScrollView>
            <View style={mstyles.centeredView}>
              <View style={mstyles.modalView}>
                <View style={mstyles.header}>
                  <Text style={mstyles.headerTitle}>New category</Text>
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
                      label={'Category name'}
                      onChangeText={setNewCategory}
                    />
                  </View>
                  <View style={mstyles.space} />
                  <TouchableHighlight
                    style={{
                      ...mstyles.openButton,
                      backgroundColor: ACTION_BTN_BG,
                    }}
                    disabled={!newCategory}
                    onPress={async () => {
                      setModalVisible(!modalVisible);
                      console.log('creation');
                      await createCategory(newCategory!);
                    }}
                  >
                    <Text style={mstyles.textStyle}>Create</Text>
                  </TouchableHighlight>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </KeyboardAvoidingView>
    );
  };

  useEffect(() => {
    (async () => {
      await getCategories();
      // setSelectedCategories(route.params?.form.categories);
    })();
  }, []);

  const onClick = async () => {
    route.params?.setForm!({
      ...route.params?.form!,
      categories: selectedCategories!,
    });
    navigation.goBack();
  };

  useEffect(() => {
    console.log(route.params);
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
            <Text style={styles.headerTitle}>{'Select Categories'}</Text>
            <AntDesign
              style={{ marginLeft: 15 }}
              name="plus"
              size={24}
              color="white"
              onPress={() => setModalVisible(true)}
            />
            <AntDesign
              style={{ marginLeft: 15 }}
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => onBackClick()}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView style={styles.scrollView}>
            <View style={styles.content}>
              <Checkbox.Group
                onChange={setSelectedCategories}
                value={selectedCategories}
              >
                {categories !== undefined && categories.length > 0 ? (
                  categories.map((category, index) => {
                    console.log('it display categories');
                    console.log('selected categories: ', selectedCategories);
                    return (
                      <View key={index} style={{ marginBottom: 15 }}>
                        <Checkbox
                          // style={styles.checkbox}
                          value={category.title}
                          // onValueChange={setChecked}
                          // color={isChecked ? '#4630EB' : undefined}
                        >
                          {category.title}
                        </Checkbox>
                      </View>
                    );
                  })
                ) : (
                  <View style={{}}>
                    {console.log('should display non cat')}
                    <Text style={{}}>There is no category yet.</Text>
                  </View>
                )}
              </Checkbox.Group>
            </View>

            <View style={styles.footer}>
              <View style={styles.topFooter}></View>
              <TouchableHighlight style={styles.actionButton} onPress={onClick}>
                <Text style={styles.actionButtonText}>OK</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
          {renderModal()}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};
