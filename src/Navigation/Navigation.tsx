import React, { useContext, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthenticationContext } from '../Contexts/AuthenticationContext';

import { SignIn } from '../Screens/Auth/SignIn';
import { SignUp } from '../Screens/Auth/SignUp';
import { ResetPassword } from '../Screens/Auth/ResetPassword';
import { Home } from '../Screens/App/Home';

interface INavigationProps {}

type NavigationParamList = {
  SignIn: React.FC;
  SignUp: React.FC;
  ResetPassword: React.FC;
  Home: React.FC;
};

export type NavigationProps<T extends keyof NavigationParamList> = {
  navigation: StackNavigationProp<NavigationParamList, T>;
  route: RouteProp<NavigationParamList, T>;
};

const Stack = createNativeStackNavigator<NavigationParamList>();

export const Navigation: React.FC<INavigationProps> = () => {
  const { user, autolog } = useContext(AuthenticationContext);

  useEffect(() => {
    (async () => {
      await autolog();
    })();
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: () => null,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            header: () => null,
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
