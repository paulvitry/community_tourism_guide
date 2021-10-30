import React from 'react';
import { StyleSheet, View, Text, TextInput as TI, KeyboardTypeOptions } from 'react-native';

interface ITextInputProps {
  label: string;
  onChangeText: React.Dispatch<React.SetStateAction<any>>;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#D4D4D4',
    height: 60,
    marginBottom: 10,
    fontSize: 14,
    padding: 10,
  },
});

export const TextInput: React.FC<ITextInputProps> = ({
  label,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  return (
    <View>
      <Text>{label.charAt(0).toUpperCase() + label.slice(1)}</Text>
      <TI
        placeholder={('Enter ' + label.toLowerCase())}
        onChangeText={onChangeText}
        style={styles.textInput}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
