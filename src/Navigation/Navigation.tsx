import React, { useContext, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
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
import { SelectCategories } from '../Screens/App/SelectCategories';
import { ModifyUsername } from '../Screens/App/ModifyUsername';
import { ICreatePlace, IEditPlace, IPlace } from '../Interfaces/IPlaceContext';
import { IList } from '../Interfaces/IListContext';

interface INavigationProps {}

export type NavigationParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  Home: undefined;
  Profile: undefined;
  // | { coordinate: { longitude: number; latitude: number } 
  CreatePlace: undefined | { data: IPlace, type: 'edit' | 'coordinate' | 'none' };
  List: undefined;
  ListDetails: { list: IList };
  PlaceDetails: { data: IPlace };
  UserPlaces: undefined;
  UserLikes: undefined;
  SelectCategories: {
    form: ICreatePlace | IEditPlace;
    setForm: React.Dispatch<React.SetStateAction<ICreatePlace | IEditPlace>>;
  };
  ModifyUsername: undefined;
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
          <Stack.Screen name="SelectCategories" component={SelectCategories} />
          <Stack.Screen name="ModifyUsername" component={ModifyUsername} />
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
