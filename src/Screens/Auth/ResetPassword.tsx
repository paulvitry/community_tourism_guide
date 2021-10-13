import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  // TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from '../../Components/TextInput';

import { AuthenticationContext } from '../../Contexts/AuthenticationContext';

import { NavigationProps } from '../../Navigation/Navigation';

type IResetPasswordProps = NavigationProps<'ResetPassword'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    flex: 0.1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    flex: 0.7,
    padding: '5%',
    justifyContent: 'center',
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
  },
  headerTitle: {
    width: '90%',
    fontSize: 32,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#D4D4D4',
    height: 60,
    marginBottom: 10,
    fontSize: 14,
    padding: 10,
  },
  goBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    height: 40,
  },

  actionButton: {
    width: '90%',
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export const ResetPassword: React.FC<IResetPasswordProps> = ({
  navigation,
}) => {
  const { resetPassword } = useContext(AuthenticationContext);

  const [setEmail] = useState<string>(null);
  const [values] = useState<IReset>({
    email: 'community-tourism@yopmail.com',
  });

  const onClick = async () => {
    console.log('sign in callback');
    await resetPassword(values);
    console.log('over');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reset password</Text>
      </View>

      <View style={styles.content}>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.textInput}
            label="Email"
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.footer}>
        <View style={styles.goBack}>
          <Button
            title="Go back!"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
        <TouchableHighlight style={styles.actionButton} onPress={onClick}>
          <Text style={styles.actionButtonText}>Reset Password</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
