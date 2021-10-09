import React, { useState, useContext } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProps } from '../../Navigation/Navigation';

import { AuthenticationContext } from '../../Contexts/AuthenticationContext';
import { IAuth } from './../../interfaces/IAuthenticationContext';
// import { getAuth, linkWithPopup, GoogleAuthProvider } from 'firebase/auth';
// const provider = new GoogleAuthProvider();

type ISignInProps = NavigationProps<'SignIn'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export const SignIn: React.FC<ISignInProps> = ({ navigation }) => {
  const { login } = useContext(AuthenticationContext);
  const [values] = useState<IAuth>({
    email: 'community-tourism@yopmail.com',
    password: 'password',
  });

  const onClick = async () => {
    console.log('login');
    await login(values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>SignIn</Text>
      <Button title="Email password signIn" onPress={onClick} />

      <Button title="sign up" onPress={() => navigation.navigate('SignUp')} />

      <Button
        title="forgotten password"
        onPress={() => navigation.push('ResetPassword')}
      />
    </SafeAreaView>
  );
};
