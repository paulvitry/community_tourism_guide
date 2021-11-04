import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { IPlace } from '../../Interfaces/IPlaceContext';
import { PlaceDetailsView } from '../../Components/PlaceDetailsView';
import { AntDesign } from '@expo/vector-icons';

type IPlaceDetailsProps = NavigationProps<'PlaceDetails'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    width: '100%',
    position: 'absolute',
    alignItems: 'flex-end',
    padding: 10,
  },
});

export const PlaceDetails: React.FC<IPlaceDetailsProps> = ({
  navigation,
  route,
}) => {
  const [place, setPlace] = useState<IPlace | undefined>(undefined);

  const onClickBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log('useEffect params -> ', route.params);
    if (!place) {
      setPlace(route.params?.data);
    }
  }, []);

  return (
    <View style={styles.container}>
      <PlaceDetailsView place={place!} />
      <SafeAreaView
        style={styles.actions}
      >
        <AntDesign name="arrowleft" size={24} color="white" onPress={onClickBack} />
      </SafeAreaView>
    </View>
  );
};
