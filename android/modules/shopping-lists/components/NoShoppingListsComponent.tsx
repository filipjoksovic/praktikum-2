import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {localization} from "../../../resources/localization";

export const NoShoppingListsComponent = () => {
  return (
    <View style={{height: 600, alignItems: 'center', justifyContent: 'center'}}>
      <Text variant="headlineLarge">{localization.SHOPPING_LIST.NO_LISTS_MESSAGE}</Text>
    </View>
  );
};
