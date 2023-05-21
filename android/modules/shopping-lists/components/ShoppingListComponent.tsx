import {Checkbox, List, Surface, Text} from 'react-native-paper';
import {Pressable} from 'react-native';
import React from 'react';
import {IShoppingListsResponseDTO} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListsComponent} from './ShoppingListsComponent';
import {ShoppingListItemComponent} from './ShoppingListItemComponent';

export interface IShoppingListComponentProps {
  list: IShoppingListsResponseDTO;
}

export const ShoppingListComponent = (props: IShoppingListComponentProps) => {
  const {list} = props;
  console.log(list);
  return (
    <List.Accordion
      left={props => <List.Icon {...props} icon="cart" />}
      title={list.name ? list.name : 'No name'}>
      {list.itemList.map(item => (
        <ShoppingListItemComponent item={item} />
      ))}
    </List.Accordion>
  );
};
