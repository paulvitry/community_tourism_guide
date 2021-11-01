import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../../Navigation/Navigation';
import { IPlace } from '../../Interfaces/IPlaceContext';
import { PlaceDetailsView } from '../../Components/PlaceDetailsView';

type IPlaceDetailsProps = NavigationProps<'PlaceDetails'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
      <PlaceDetailsView place={place} />
      <SafeAreaView style={{  width: '100%', position: 'absolute', alignItems: 'flex-end', padding: 10 }}>
      <Button
        title="back"
        onPress={onClickBack}
      />
      </SafeAreaView>
    </View>
  );
};
