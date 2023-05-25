import {Checkbox, List, Surface, Text} from 'react-native-paper';
import {Pressable} from 'react-native';
import React from 'react';
import {ShoppingListsComponent} from './ShoppingListsComponent';
import {ShoppingListItemComponent} from './ShoppingListItemComponent';
import {IShoppingListResponse} from '../../../models/IShoppingListsResponseDTO';

export interface IShoppingListComponentProps {
  list: IShoppingListResponse;
  wholeListLongPressEmitter: any;
  singleListItemLongPressEmitter: any;
}

export const ShoppingListComponent = (props: IShoppingListComponentProps) => {
  const {list} = props;
  console.log(list);
  return (
    <List.Accordion
      onLongPress={() => {
        props.wholeListLongPressEmitter(list);
      }}
      left={props => <List.Icon {...props} icon="cart" />}
      title={list.shoppingList.name ? list.shoppingList.name : 'No name'}>
      {list.shoppingList.itemList.map(item => (
        <List.Item
          title={item.name}
          titleStyle={{
            textDecorationLine: item.checked ? 'line-through' : 'none',
            textDecorationStyle: 'solid',
          }}
          onLongPress={() => {
            props.singleListItemLongPressEmitter({
              listId: list.shoppingList.id,
              item: item,
            });
          }}
        />
      ))}
    </List.Accordion>
  );
};
