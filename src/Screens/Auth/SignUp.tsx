import React, {  } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProps } from '../../Navigation/Navigation';

type ISignUpProps = NavigationProps<'SignUp'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const SignUp: React.FC<ISignUpProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SignUp</Text>
      <Button title="Log in!" onPress={() => navigation.navigate('SignIn')} />
    </SafeAreaView>
  );
};
