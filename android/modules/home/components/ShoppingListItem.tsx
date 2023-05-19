import {Button, Pressable, SafeAreaView, Text, View} from 'react-native';
import {useState} from 'react';
import {STYLESHEET, TYPO} from '../../../resources/styles/STYLESHEET';
import {CustomButton} from '../../shared/components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface IShoppingListItem {
  shoppingItem: string;
  onRemoveItem: (item: string) => any;
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

      <Pressable onPress={props.onRemoveItem}>
        <Icon name={'times'} color={'red'} size={30} />
      </Pressable>
    </View>
  );
};
