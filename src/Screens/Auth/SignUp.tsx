import React, { useState, useContext } from 'react';
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

import { AuthenticationContext } from './../../Contexts/AuthenticationContext';
import { IRegister } from '../../Interfaces/IAuthenticationContext';

import { NavigationProps } from '../../Navigation/Navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'native-base';

type ISignUpProps = NavigationProps<'SignUp'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: 'white',
  
  },
  footer: {
    flex: 0.2,
    alignItems: 'center',
  },
  headerTitle: {
    width: '90%',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    backgroundColor: '#D4D4D4',
    height: 60,
    marginBottom: 10,
    fontSize: 14,
    padding: 10,
  },
  signUp: {
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

export const SignUp: React.FC<ISignUpProps> = ({ navigation }) => {
  const { register } = useContext(AuthenticationContext);
  const [form, setForm] = useState<IRegister>({
    email: '',
    password: '',
    displayName: '',
  });

  const onClick = async () => {
    console.log('sign in callback');
    await register(form);
    console.log('over');
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={['#000000', '#000000', 'white', 'white']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sign Up</Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 0.7 }}>
          <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.content}>
              <TextInput
                label="Email"
                defaultValue={form.email}
                onChangeText={value => setForm({ ...form, email: value })}
                keyboardType="email-address"
              />
              <TextInput
                label="Username"
                defaultValue={form.displayName}
                onChangeText={value => setForm({ ...form, displayName: value })}
              />
              <TextInput
                label="Password"
                defaultValue={form.password}
                onChangeText={value => setForm({ ...form, password: value })}
                secureTextEntry
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <View style={styles.signUp}>
            <Text>Already have an account?</Text>
            <Button
              title="Sign in!"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
          <TouchableHighlight style={styles.actionButton} onPress={onClick}>
            <Text style={styles.actionButtonText}>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
