import {List} from 'react-native-paper';
import {
  IListItem,
  IShoppingListResponse,
} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListItemComponent} from '../../shopping-lists/components/ShoppingListItemComponent';
import {RefreshControl, ScrollView, View} from 'react-native';
import {FamilyListItemComponent} from './FamilyListItemComponent';
import React from 'react';

export interface IFamilyListComponentProps {
  list: IShoppingListResponse;
  onListLongPressed: any;
  onItemLongPressed: any;
  onListPressed: any;
}

export const FamilyListComponent = (props: IFamilyListComponentProps) => {
  const {list} = props;
  // console.log('list');

  const itemLongPressed = (item: IListItem) => {
    props.onItemLongPressed({listId: list.shoppingList.id, item: item});
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={{margin: -12}}
      contentContainerStyle={{padding: 12}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {list.shoppingList.itemList.map(item => (
        <FamilyListItemComponent
          item={item}
          key={item.id}
          onLongPress={itemLongPressed}></FamilyListItemComponent>
      ))}
    </ScrollView>
  );
};
