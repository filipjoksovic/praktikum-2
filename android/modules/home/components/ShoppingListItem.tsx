import {View} from 'react-native';
import React from 'react';
import {IconButton, List, useTheme,} from 'react-native-paper';

export interface IShoppingListItem {
  shoppingItem: string;
  onRemoveItem: (item: string) => any;
}

export const ShoppingListItem = (props: IShoppingListItem) => {
  const theme = useTheme();
  const {shoppingItem, onRemoveItem} = props;

  return (
    // <Surface theme={theme} style={{marginBottom: 20, borderRadius: 20}}>
    <View>
      <List.Item
        title={shoppingItem}
        theme={{...theme, roundness: 20}}
        style={{paddingRight: 5}}
        onPress={() => {}}
        onLongPress={() => {}}
        left={props => <List.Icon {...props} icon="cart" />}
        right={props => (
          <IconButton
            {...props}
            onPress={() => {
              onRemoveItem(shoppingItem);
            }}
            icon="delete"
          />
        )}
      />
    </View>
    // </Surface>
  );
};
