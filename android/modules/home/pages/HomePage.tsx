import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {INPUTS, LAYOUT, TYPO} from '../../../resources/styles/STYLESHEET';
import {CustomButton} from '../../shared/components/CustomButton';
import {useState} from 'react';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {CreateShoppingListPage} from './CreateShoppingListPage';

export const HomePage = () => {
  const [isCreating, setIsCreating] = useState(true);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [shoppingListPrompt, setShoppingListPrompt] = useState(
    'We need some milk, oranges, apples and bananas today.',
  );
  const processShoppingList = async () => {
    console.log('Prompt:', shoppingListPrompt);
    try {
      const result = await ShoppingListService.createRequest({
        prompt: shoppingListPrompt,
      });
      console.log(result);

      setIsCreating(false);
      setShoppingItems(result.summary);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <SafeAreaView style={LAYOUT.container}>
      {isCreating ? (
        <>
          <Text style={TYPO.heading_two}>Welcome</Text>
          <Text style={TYPO.paragraph}>
            You can start recording your voice and when you're finished, the
            data will be sent for processing, making your shopping list
          </Text>
          <TextInput
            style={{...INPUTS.textarea, marginTop: 20}}
            value={shoppingListPrompt}
            onChangeText={setShoppingListPrompt}
            multiline={true}
            numberOfLines={20}
            textAlignVertical={'top'}
          />
          <CustomButton
            text={'Process'}
            style={{marginTop: 20}}
            onPressHandler={processShoppingList}
          />
        </>
      ) : (
        <>
          <CreateShoppingListPage shoppingList={shoppingItems} />
        </>
      )}
    </SafeAreaView>
  );
};
