import React, { useContext } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProps } from '../../Navigation/Navigation';

import { AuthenticationContext } from '../../Contexts/AuthenticationContext';


type IHomeProps = NavigationProps<'Home'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export const Home: React.FC<IHomeProps> = ({  }) => {
  const { logout } = useContext(AuthenticationContext);

  const onClick = async () => {
    console.log('logout');
    await logout();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <Button title="logout" onPress={onClick}/>
      
    </SafeAreaView>
  );
};
