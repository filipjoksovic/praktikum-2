import {Checkbox, List, Surface, Text} from 'react-native-paper';
import {Pressable} from 'react-native';
import React from 'react';
import {ShoppingListsComponent} from './ShoppingListsComponent';
import {ShoppingListItemComponent} from './ShoppingListItemComponent';
import {
  IListItem,
  IShoppingListResponse,
} from '../../../models/IShoppingListsResponseDTO';

export interface IShoppingListComponentProps {
  list: IShoppingListResponse;
  onListLongPressed: any;
  onItemLongPressed: any;
  onListPressed: any;
}

export const ShoppingListComponent = (props: IShoppingListComponentProps) => {
  const {list} = props;
  // console.log('list');

  const itemLongPressed = (item: IListItem) => {
    props.onItemLongPressed({listId: list.shoppingList.id, item: item});
  };

  return (
    <List.Accordion
      onPress={() => {
        props.onListPressed(list);
      }}
      onLongPress={() => {
        props.onListLongPressed(list);
      }}
      left={props => <List.Icon {...props} icon="cart" />}
      title={list.shoppingList.name ? list.shoppingList.name : 'No name'}
      titleStyle={{
        textDecorationLine: list.allChecked ? 'line-through' : 'none',
        textDecorationStyle: 'solid',
      }}>
      {list.shoppingList.itemList.map(item => (
        <ShoppingListItemComponent
          item={item}
          key={item.id}
          onLongPress={itemLongPressed}></ShoppingListItemComponent>
      ))}
    </List.Accordion>
  );
};
