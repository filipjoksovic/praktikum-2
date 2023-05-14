import {Pressable, Text} from 'react-native';
import {BUTTONS} from '../../../resources/styles/STYLESHEET';

export interface ICustomButtonProps {
  text: string;
  style?: object;
  onPressHandler?: (param?: any) => any; // TODO look into generics
  onLongPressHandler?: (param: any) => any; //TODO look into generics
}

export const CustomButton = (props: ICustomButtonProps) => {
  const {text, style} = props;

  const handleOnPress = () => {
    //TODO implement
    if (props.onPressHandler) {
      props.onPressHandler();
    }
  };
  const handleOnLongPress = () => {
    //TODO implement
  };

  return (
    <Pressable
      onPress={handleOnPress}
      onLongPress={handleOnLongPress}
      style={{...BUTTONS.primary, ...style}}>
      <Text style={BUTTONS.primary.text}>{text}</Text>
    </Pressable>
  );
};
