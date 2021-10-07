import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { SignIn } from '../Screens/Auth/SignIn';
import { SignUp } from '../Screens/Auth/SignUp';
import { ResetPassword } from '../Screens/Auth/ResetPassword';

interface INavigationProps {}

type NavigationParamList = {
  SignIn: React.FC;
  SignUp: React.FC;
  ResetPassword: React.FC;
};

export type NavigationProps<T extends keyof NavigationParamList> = {
  navigation: StackNavigationProp<NavigationParamList, T>;
  route: RouteProp<NavigationParamList, T>;
};

const AuthStack = createNativeStackNavigator<NavigationParamList>();

export const Navigation: React.FC<INavigationProps> = () => (
  <NavigationContainer>
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        header: () => null,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    </AuthStack.Navigator>
  </NavigationContainer>
);
