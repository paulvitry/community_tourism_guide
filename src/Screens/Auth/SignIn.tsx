import React, {  } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProps } from '../../Navigation/Navigation';

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
  return (
    <SafeAreaView style={styles.container}>
      <Text>SignIn</Text>
      <Button title="sign up" onPress={() => navigation.navigate('SignUp')} />
      <Button
        title="forgotten password"
        onPress={() => navigation.push('ResetPassword')}
      />
    </SafeAreaView>
  );
};
