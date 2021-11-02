import React, { useContext, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { AuthenticationContext } from '../Contexts/AuthenticationContext';

import { SignIn } from '../Screens/Auth/SignIn';
import { SignUp } from '../Screens/Auth/SignUp';
import { ResetPassword } from '../Screens/Auth/ResetPassword';
import { Home } from '../Screens/App/Home';
import { Profile } from '../Screens/App/Profile';
import { CreatePlace } from '../Screens/App/CreatePlace';
import { List } from '../Screens/App/List';
import { ListDetails } from '../Screens/App/ListDetails';
import { PlaceDetails } from '../Screens/App/PlaceDetails';
import { UserPlaces } from '../Screens/App/UserPlaces';
import { UserLikes } from '../Screens/App/UserLikes';

interface INavigationProps {}

export type NavigationParamList = {
  SignIn: React.FC;
  SignUp: React.FC;
  ResetPassword: React.FC;
  Home: React.FC;
  Profile: React.FC;
  CreatePlace: React.FC;
  List: React.FC;
  ListDetails: React.FC;
  PlaceDetails: React.FC;
  UserPlaces: React.FC;
  UserLikes: React.FC;
};

// type TabParamList = {
//   Home: React.FC;
//   Profile: React.FC;

// };

export type NavigationProps<T extends keyof NavigationParamList> = {
  navigation: NativeStackNavigationProp<NavigationParamList, T>;
  route: RouteProp<NavigationParamList, T>;
};

const Stack = createNativeStackNavigator<NavigationParamList>();
// const Tab = createBottomTabNavigator<TabParamList>();
// const HomeStack = createNativeStackNavigator<>();

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
        // <Tab.Navigator
        //   initialRouteName="Home"
        //   screenOptions={{
        //     header: () => null,
        //   }}
        // >
        //   <Tab.Screen name="Home" component={Home} />
        //   <Tab.Screen name="Profile" component={Profile} />
        // </Tab.Navigator>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: () => null,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="CreatePlace" component={CreatePlace} />
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="ListDetails" component={ListDetails} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
          <Stack.Screen name="UserPlaces" component={UserPlaces} />
          <Stack.Screen name="UserLikes" component={UserLikes} />
        </Stack.Navigator>
      ) : (
        // <Stack.Navigator
        //   initialRouteName="Home"
        //   screenOptions={{
        //     header: () => null,
        //   }}
        // >
        //   <Stack.Screen name="Home" component={Home} />
        //   <Stack.Screen name="CreatePlace" component={CreatePlace} />
        // </Stack.Navigator>
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
