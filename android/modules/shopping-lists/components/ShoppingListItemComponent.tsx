import {Checkbox, List, Surface, Text} from 'react-native-paper';
import {Pressable} from 'react-native';
import React from 'react';
import {IListItem} from '../../../models/IShoppingListsResponseDTO';

export interface IShoppingListItemComponentProps {
  item: IListItem;
  onLongPress: (item: IListItem) => void;
  onPress?: (item: IListItem) => void;
}
export const ShoppingListItemComponent = (
  props: IShoppingListItemComponentProps,
) => {
  const {item} = props;
  return (
    <List.Item
      title={item.name}
      key={item.id}
      titleStyle={{
        textDecorationLine: item.checked ? 'line-through' : 'none',
        textDecorationStyle: 'solid',
      }}
      onLongPress={() => {
        props.onLongPress(item);
      }}
    />
  );
};
