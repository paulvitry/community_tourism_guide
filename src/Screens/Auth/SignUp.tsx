import React, { useState, useContext } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthenticationContext } from './../../Contexts/AuthenticationContext';
import { IAuth } from './../../interfaces/IAuthenticationContext';

import { NavigationProps } from '../../Navigation/Navigation';

type ISignUpProps = NavigationProps<'SignUp'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const SignUp: React.FC<ISignUpProps> = ({ navigation }) => {
  const { register } = useContext(AuthenticationContext);
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
      <Text>SignUp</Text>
      <Button title="Email password signup" onPress={onClick} />
      <Button title="Log in!" onPress={() => navigation.navigate('SignIn')} />
    </SafeAreaView>
  );
};
