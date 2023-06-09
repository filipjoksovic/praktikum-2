import {
  Pressable,
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {
  Card,
  Divider,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface IFamilyLinkProps {
  text: string;
  iconName: string;
  navigationLink: string;
  onPress: any;
}

export const FamilyLink = (props: IFamilyLinkProps) => {
  const {text, iconName, navigationLink} = props;
  const theme = useTheme();
  return (
    <Card
      style={{
        marginVertical: 5,
        borderRadius: 10,
      }}
      onPress={() => {
        props.onPress(navigationLink);
      }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
          <Icon name={iconName} size={24} color={theme.colors.tertiary} />
          <Text>{text}</Text>
        </View>
        <Icon name="chevron-right" />
      </View>
    </Card>
  );
};
