import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import { NavigationProps } from '../../Navigation/Navigation';

type IResetPasswordProps = NavigationProps<'ResetPassword'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const ResetPassword: React.FC<IResetPasswordProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Forgotten Password</Text>
      <Button title="Retour" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};
