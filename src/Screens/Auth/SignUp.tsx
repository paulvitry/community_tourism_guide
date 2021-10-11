import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthenticationContext } from './../../Contexts/AuthenticationContext';
import { IAuth } from './../../interfaces/IAuthenticationContext';

import { NavigationProps } from '../../Navigation/Navigation';

type ISignUpProps = NavigationProps<'SignUp'>;

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
  content: {
    flex: 0.7,
    padding: '5%',
    justifyContent: 'center',
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
  },
  headerTitle: {
    width: '90%',
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
  signUp: {
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

export const SignUp: React.FC<ISignUpProps> = ({ navigation }) => {
  const { register } = useContext(AuthenticationContext);

  const [setEmail] = useState<string>(null);
  const [setPassword] = useState<string>(null);
  const [values] = useState<IAuth>({
    email: 'community-tourism@yopmail.com',
    password: 'password',
  });

  const onClick = async () => {
    console.log('sign in callback');
    await register(values);
    console.log('over');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SignUp</Text>
      </View>

      <View style={styles.content}>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            onChangeText={setPassword}
            secureTextEntry
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.footer}>
        <View style={styles.signUp}>
          <Text>Already have an account?</Text>
          <Button
            title="Sign in!"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
        <TouchableHighlight style={styles.actionButton} onPress={onClick}>
          <Text style={styles.actionButtonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
