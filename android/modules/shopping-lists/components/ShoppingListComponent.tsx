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
  wholeListPressedEmitter: any;
}

export const ShoppingListComponent = (props: IShoppingListComponentProps) => {
  const {list} = props;
  console.log(list);
  return (
    <List.Accordion
      onPress={() => {
        props.wholeListPressedEmitter(list);
      }}
      onLongPress={() => {
        props.wholeListLongPressEmitter(list);
      }}
      left={props => <List.Icon {...props} icon="cart" />}
      title={list.shoppingList.name ? list.shoppingList.name : 'No name'}
      titleStyle={{
        textDecorationLine: !list.allChecked ? 'line-through' : 'none',
        textDecorationStyle: 'solid',
      }}>
      {list.shoppingList.itemList.map(item => (
        <List.Item
          title={item.name}
          key={item.id}
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
