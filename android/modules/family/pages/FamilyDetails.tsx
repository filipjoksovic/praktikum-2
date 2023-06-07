import {Link} from '@react-navigation/native';
import {Touchable, View} from 'react-native';
import {
  Button,
  Divider,
  Text,
  useTheme,
  IconButton,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FamilyLink} from '../components/FamilyLink';

export interface IFamilyDetails {}
export const FamilyDetails = ({navigation}) => {
  const theme = useTheme();
  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      <Text variant="headlineLarge" style={{marginBottom: 20}}>
        Family Details
      </Text>
      <FamilyLink
        text="Edit family"
        navigationLink="Edit"
        iconName="pen"
        onPress={() => navigation.navigate('Edit')}
      />
      <FamilyLink
        text="Join requests"
        navigationLink="JoinRequests"
        iconName="clock"
        onPress={() => navigation.navigate('JoinRequests')}
      />
      <FamilyLink
        text="Family members"
        navigationLink="Members"
        iconName="users"
        onPress={() => navigation.navigate('Members')}
      />

      <FamilyLink
        text="Shopping list"
        navigationLink="FamilyList"
        iconName="shopping-cart"
        onPress={() => navigation.navigate('FamilyList')}
      />
    </View>
  );
};
