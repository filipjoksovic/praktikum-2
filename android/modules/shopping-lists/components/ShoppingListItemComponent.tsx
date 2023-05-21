import {Checkbox, Surface, Text} from 'react-native-paper';
import {Pressable} from 'react-native';
import React from 'react';
import {IShoppingListItem} from '../../../models/IShoppingListsResponseDTO';

export interface IShoppingListItemComponentProps {
  item: IShoppingListItem;
}
export const ShoppingListItemComponent = (
  props: IShoppingListItemComponentProps,
) => {
  const {item} = props;
  return (
    <Pressable>
      <Surface
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderRadius: 20,
          marginTop: 10,
        }}>
        <Checkbox status={'checked'} />
        <Text>{item.name}</Text>
      </Surface>
    </Pressable>
  );
};
