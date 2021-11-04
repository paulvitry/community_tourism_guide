import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  // TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from '../../Components/TextInput';

import { AuthenticationContext } from '../../Contexts/AuthenticationContext';

import { NavigationProps } from '../../Navigation/Navigation';

type IModifyUsernameProps = NavigationProps<'ModifyUsername'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    flex: 0.7,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    flex: 0.2,
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
  goBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    height: 40,
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
});

export const ModifyUsername: React.FC<IModifyUsernameProps> = ({
  navigation,
}) => {
  const { user, updateUsername } = useContext(AuthenticationContext);
  const [username, setUsername] = useState<string>();

  const onBackClick = async () => {
    navigation.goBack();
  };

  const onClick = async () => {
    await updateUsername(username!);
    onBackClick();
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#000000', '#000000', 'white', 'white']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Modify Username</Text>
            <AntDesign
              style={{ marginLeft: 15 }}
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => onBackClick()}
            />
          </View>
        </View>

        <View style={styles.content}>
          <KeyboardAvoidingView>
            <TextInput
              label="Username"
              onChangeText={setUsername}
              placeholder={user?.displayName}
              defaultValue={user?.displayName}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={styles.footer}>
          <View style={styles.goBack}></View>
          <TouchableHighlight style={styles.actionButton} onPress={onClick}>
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
