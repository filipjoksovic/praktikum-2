import {View} from 'react-native';
import {Text} from 'react-native-paper';

export const NoShoppingListsComponent = () => {
  return (
    <View style={{height: 600, alignItems: 'center', justifyContent: 'center'}}>
      <Text variant="headlineLarge">No Shopping lists</Text>
    </View>
  );
};
