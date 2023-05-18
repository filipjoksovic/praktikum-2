import {Button, SafeAreaView, Text, View} from 'react-native';
import {useState} from 'react';
import {STYLESHEET, TYPO} from '../../../resources/styles/STYLESHEET';
import {CustomButton} from '../../shared/components/CustomButton';

export interface IShoppingListItem {
  shoppingItem: string;
}
export const ShoppingListItem = (props: IShoppingListItem) => {
  const {shoppingItem} = props;
  return (
    <View
      style={{
        backgroundColor: STYLESHEET.colors.primary,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={TYPO.paragraph}>{shoppingItem}</Text>

      <Button title={'delete'} />
    </View>
  );
};
