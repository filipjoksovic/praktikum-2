import {Pressable, Text} from 'react-native';
import {BUTTONS} from '../../../resources/styles/STYLESHEET';

export interface ICustomButtonProps {
  text: string;
  style?: object;
  onPressHandler?: (param: any) => any; // TODO look into generics
  onLongPressHandler?: (param: any) => any; //TODO look into generics
}

export const CustomButton = (props: ICustomButtonProps) => {
  const {text, style} = props;

  const handleOnPress = () => {
    //TODO implement
  };
  const handleOnLongPress = () => {
    //TODO implement
  };

  return (
    <Pressable style={{...BUTTONS.primary, ...style}}>
      <Text
        style={BUTTONS.primary.text}
        onPress={handleOnPress}
        onLongPress={handleOnLongPress}>
        {text}
      </Text>
    </Pressable>
  );
};
