import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {TYPO} from '../../../resources/styles/STYLESHEET';
import {ShoppingListItem} from '../components/ShoppingListItem';
import {CustomButton} from '../../shared/components/CustomButton';

export interface ICreateShoppingListPageProps {
  shoppingList: string[];
  cancelListCreate: () => void;
  createList: () => void;
}

export const CreateShoppingListPage = (props: ICreateShoppingListPageProps) => {
  //TODO refactor state
  const [shoppingList, setShoppingList] = useState(props.shoppingList);
  useEffect(() => {
    console.log('UseEffect called');
    console.log(props.shoppingList);

    // setShoppingList(prevState => props.shoppingList);
  }, []);
  console.log(props.shoppingList);

  console.log(shoppingList);
  const removeItem = (item: string) => {
    console.log(shoppingList);
    setShoppingList(prevState => prevState.filter(i => i !== item));
  };
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Text style={TYPO.heading_four}>Success!</Text>

      <Text style={TYPO.paragraph}>
        Your data has been successfully processed. You can go over the list one
        more time, to confirm your choices, and then create the list.
      </Text>
      <Text style={{...TYPO.paragraph, marginVertical: 20}}>
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
      <CustomButton
        text={'Confirm'}
        style={{marginBottom: 10}}
        onPressHandler={props.createList}
      />
      <CustomButton text={'Cancel '} onPressHandler={props.cancelListCreate} />
    </SafeAreaView>
  );
};
