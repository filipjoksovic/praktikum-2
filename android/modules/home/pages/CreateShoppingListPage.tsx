import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useState} from 'react';
import {TYPO} from '../../../resources/styles/STYLESHEET';
import {ShoppingListItem} from '../components/ShoppingListItem';
import {CustomButton} from '../../shared/components/CustomButton';

export interface ICreateShoppingListPageProps {
  shoppingList: string[];
}
export const CreateShoppingListPage = (props: ICreateShoppingListPageProps) => {
  const {shoppingList} = props;
  console.log('Shopping list', shoppingList);
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
        {shoppingList.map(item => {
          return <ShoppingListItem shoppingItem={item} />;
        })}
      </ScrollView>
      <CustomButton text={'Confirm'} />
    </SafeAreaView>
  );
};
