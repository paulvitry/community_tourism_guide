import React from 'react';
import {
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { FormControl, Input } from 'native-base';

interface ITextInputProps {
  label: string;
  onChangeText: React.Dispatch<React.SetStateAction<any>>;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  helper?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  placeholder?: string;
  defaultValue?: string;
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
  },
});

export const TextInput: React.FC<ITextInputProps> = ({
  label,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  helper = undefined,
  isRequired = false,
  isInvalid = false,
  errorMessage = undefined,
  placeholder = undefined,
  defaultValue = undefined,
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} style={styles.textInput}>
      <FormControl.Label _text={{ bold: true }}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </FormControl.Label>
      <Input
        placeholder={placeholder ? placeholder : 'Enter ' + label.toLowerCase()}
        onChangeText={value => onChangeText(value)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        size="lg"
        defaultValue={defaultValue}
      />
      {helper && (
        <FormControl.HelperText _text={{ fontSize: 'xs' }}>
          {helper}
        </FormControl.HelperText>
      )}
      <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
        {errorMessage!}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

{
  /* <View>
      <Text>{label.charAt(0).toUpperCase() + label.slice(1)}</Text>
      <TI
        placeholder={('Enter ' + label.toLowerCase())}
        onChangeText={onChangeText}
        style={styles.textInput}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View> */
}
