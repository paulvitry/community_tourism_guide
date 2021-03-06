import React, { useState, useContext } from 'react';
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

import { NavigationProps } from '../../Navigation/Navigation';

import { AuthenticationContext } from '../../Contexts/AuthenticationContext';
import { IAuth } from '../../Interfaces/IAuthenticationContext';
import { LinearGradient } from 'expo-linear-gradient';
// import { getAuth, linkWithPopup, GoogleAuthProvider } from 'firebase/auth';
// const provider = new GoogleAuthProvider();

type ISignInProps = NavigationProps<'SignIn'>;

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
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
  },
  headerTitle: {
    width: '90%',
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
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    height: 40,
  },
  forgottenPassword: {
    fontSize: 12,
    alignItems: 'flex-end',
  },
  forgottenPasswordText: {
    color: 'blue',
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

export const SignIn: React.FC<ISignInProps> = ({ navigation }) => {
  const { login } = useContext(AuthenticationContext);
  const [values, setValues] = useState<IAuth>({
    email: '',
    password: '',
  });

  const onClick = async () => {
    console.log('login');
    await login(values);
  };
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#000000', '#000000', 'white', 'white']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sign In</Text>
        </View>

        <View style={styles.content}>
          <KeyboardAvoidingView>
            <TextInput
              label="Email"
              defaultValue={values.email}
              onChangeText={value => setValues({ ...values, email: value })}
              keyboardType="email-address"
            />
            <TextInput
              label="Password"
              defaultValue={values.password}
              onChangeText={value => setValues({ ...values, password: value })}
              secureTextEntry
            />

            <TouchableHighlight
              underlayColor="#DDDDDD"
              style={styles.forgottenPassword}
              onPress={() => navigation.push('ResetPassword')}
            >
              <Text style={styles.forgottenPasswordText}>
                Forgotten password?
              </Text>
            </TouchableHighlight>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.footer}>
          <View style={styles.signUp}>
            <Text>No account yet?</Text>
            <Button
              title="Sign up!"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
          <TouchableHighlight style={styles.actionButton} onPress={onClick}>
            <Text style={styles.actionButtonText}>Sign In</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
