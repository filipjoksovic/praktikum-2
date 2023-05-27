import {ScrollView, View} from 'react-native';
import {useEffect, useState} from 'react';
import {TYPO} from '../../../resources/styles/STYLESHEET';
import {ShoppingListItem} from '../components/ShoppingListItem';
import {CustomButton} from '../../shared/components/CustomButton';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';

export interface ICreateShoppingListPageProps {
  shoppingList: string[];
  cancelListCreate: () => void;
  createList: (param1: string, param2: string[]) => void;
}

export const CreateShoppingListPage = (props: ICreateShoppingListPageProps) => {
  //TODO refactor state, possibly use different page
  const theme = useTheme();
  const [shoppingList, setShoppingList] = useState(props.shoppingList);
  const [shoppingListName, setShoppingListName] = useState('');
  const removeItem = (item: string) => {
    console.log(shoppingList);
    setShoppingList(prevState => prevState.filter(i => i !== item));
  };
  return (
    <View style={{height: '100%'}}>
      <Text variant={'headlineLarge'}>Success!</Text>

      <Text variant={'bodyMedium'}>
        Your data has been successfully processed. You can go over the list one
        more time, to confirm your choices, and then create the list.
      </Text>
      <TextInput
        label={'Name'}
        style={{marginTop: 20}}
        theme={{...theme, roundness: 20}}
        mode={'outlined'}
        value={shoppingListName}
        onChangeText={setShoppingListName}
      />
      <Text style={{marginVertical: 20}} variant={'bodyLarge'}>
        Shopping items
      </Text>

      <ScrollView>
        {props.shoppingList.map(item => {
          return (
            <ShoppingListItem
              key={item}
              shoppingItem={item}
              onRemoveItem={removeItem}
            />
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
        }}>
        <Button onPress={props.cancelListCreate} mode={'outlined'}>
          Cancel
        </Button>
        <Button
          mode={'contained'}
          onPress={() => {
            props.createList(shoppingListName, props.shoppingList);
          }}>
          Confirm
        </Button>
      </View>
    </View>
  );
};
