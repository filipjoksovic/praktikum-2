import {List} from 'react-native-paper';
import React from 'react';
import {ShoppingListItemComponent} from './ShoppingListItemComponent';
import {
  IListItem,
  IShoppingList,
  ListItemDTOV2,
} from '../../../models/IShoppingListsResponseDTO';

export interface IShoppingListComponentProps {
  list: IShoppingList;
  onListLongPressed: any;
  onItemLongPressed: any;
  onListPressed: any;
}

export const ShoppingListComponent = (props: IShoppingListComponentProps) => {
  const {list} = props;
  // console.log(list);

  const itemLongPressed = (item: IListItem) => {
    props.onItemLongPressed({listId: list.id, item: item});
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
      title={list.name ? list.name : 'No name'}
      titleStyle={{
        textDecorationStyle: 'solid',
      }}>
      {list.itemList &&
        list.itemList.map(item => (
          <ShoppingListItemComponent
            item={item}
            key={item.id}
            onLongPress={itemLongPressed}
          />
        ))}
    </List.Accordion>
  );
};
