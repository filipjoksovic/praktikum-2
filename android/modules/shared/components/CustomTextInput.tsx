import {Text, TextInput, View} from 'react-native';
import {INPUTS, TYPO} from '../../../resources/styles/STYLESHEET';
import {useState} from 'react';

export interface ICustomTextInputProps {
  labelText: string;
}

export const CustomTextInput = (props: ICustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const {labelText} = props;

  const changeIsFocused = () => {
    setIsFocused(prevState => !prevState);
  };

  return (
    <View style={{width: '100%', backgroundColor: 'transparent'}}>
      <Text style={TYPO.heading_four}>{labelText}</Text>
      <TextInput
        style={{
          ...INPUTS.text_input,
          borderColor: !isFocused ? '#D9D9D9' : '#c9c9c9',
        }}
        onFocus={changeIsFocused}
        onBlur={changeIsFocused}
      />
    </View>
  );
};
