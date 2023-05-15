import {StyleSheet, Text, TextInput, View} from 'react-native';
import {INPUTS, TYPO} from '../../../resources/styles/STYLESHEET';
import {useState} from 'react';
import NamedStyles = StyleSheet.NamedStyles;

export interface ICustomTextInputProps {
  labelText: string;
  value: string;
  name: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  textContentType?: //TODO make separate type
  | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined;
  onChangeEmit: (data: {name: string; value: string}) => any;
  style?: object;
}

export const CustomTextInput = (props: ICustomTextInputProps) => {
  const {
    labelText,
    style,
    onChangeEmit,
    name,
    autoCapitalize,
    textContentType,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const changeIsFocused = () => {
    setIsFocused(prevState => !prevState);
  };

  const handleTextChange = (value: string) => {
    setValue(prevState => value);
    if (onChangeEmit) {
      onChangeEmit({name, value});
    }
  };

  return (
    <View
      style={{...style, ...{width: '100%', backgroundColor: 'transparent'}}}>
      <Text style={TYPO.heading_four}>{labelText}</Text>
      <TextInput
        style={{
          ...INPUTS.text_input,
          borderColor: !isFocused ? '#D9D9D9' : '#c9c9c9',
        }}
        onFocus={changeIsFocused}
        onBlur={changeIsFocused}
        onChangeText={handleTextChange}
        value={value}
        autoCapitalize={autoCapitalize ?? 'sentences'}
        textContentType={textContentType ?? 'emailAddress'}
      />
    </View>
  );
};
