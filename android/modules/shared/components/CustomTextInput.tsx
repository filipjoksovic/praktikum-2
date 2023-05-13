import {Text, TextInput, View} from 'react-native';
import {INPUTS, TYPO} from '../../../resources/styles/STYLESHEET';
import {useState} from 'react';

export interface ICustomTextInputProps {
  labelText: string;
  value: string;
  name: string;
  onChangeEmit: (data: {name: string; value: string}) => any;
}

export const CustomTextInput = (props: ICustomTextInputProps) => {
  const {labelText, onChangeEmit, name} = props;

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
    <View style={{width: '100%', backgroundColor: 'transparent'}}>
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
      />
    </View>
  );
};
