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
import {localization} from '../../../resources/localization';

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
        text={localization.FAMILY.EDIT_FAMILY_LABEL}
        navigationLink="Edit"
        iconName="pen"
        onPress={() => navigation.navigate('Edit')}
      />
      <FamilyLink
        text={localization.FAMILY.JOIN_REQUESTS_LABEL}
        navigationLink="JoinRequests"
        iconName="clock"
        onPress={() => navigation.navigate('JoinRequests')}
      />
      <FamilyLink
        text={localization.FAMILY.MEMBERS_LABEL}
        navigationLink="Members"
        iconName="users"
        onPress={() => navigation.navigate('Members')}
      />

      <FamilyLink
        text={localization.FAMILY.SHOPPING_LIST_LABEL}
        navigationLink="FamilyList"
        iconName="shopping-cart"
        onPress={() => navigation.navigate('FamilyList')}
      />
    </View>
  );
};
