import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {CreateShoppingListPage} from './CreateShoppingListPage';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {useFocusEffect} from '@react-navigation/native';

export const PrepareShoppingListPage = () => {
  const theme = useTheme();
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

  const cancel = () => {
    console.log('Cancelling');
    setIsCreating(true);
    setShoppingItems([]);
  };
  const createList = (
    shoppingListName: string,
    shoppingListItems: string[],
  ) => {
    ShoppingListService.createList({
      name: shoppingListName,
      items: shoppingListItems,
    }).then(result => setIsCreating(true));
  };
  return (
    <SafeAreaView
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      {isCreating ? (
        <>
          <Text variant={'headlineLarge'}>Welcome</Text>
          <Text variant={'labelLarge'}>
            You can start recording your voice and when you're finished, the
            data will be sent for processing, making your shopping list
          </Text>
          <TextInput
            style={{marginTop: 20}}
            value={shoppingListPrompt}
            onChangeText={setShoppingListPrompt}
            multiline={true}
            numberOfLines={20}
            textAlignVertical={'top'}
          />
          <Button
            mode={'contained'}
            style={{marginTop: 20}}
            onPress={processShoppingList}>
            Process
          </Button>
        </>
      ) : (
        <>
          <CreateShoppingListPage
            shoppingList={shoppingItems}
            cancelListCreate={cancel}
            createList={createList}
          />
        </>
      )}
    </SafeAreaView>
  );
};
