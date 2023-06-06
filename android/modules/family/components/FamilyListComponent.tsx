import {List} from 'react-native-paper';
import {
  IListItem,
  IShoppingListResponse,
  ListItemDTOV2,
  ShoppingListDTOV2,
} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListItemComponent} from '../../shopping-lists/components/ShoppingListItemComponent';
import {RefreshControl, ScrollView, View} from 'react-native';
import {FamilyListItemComponent} from './FamilyListItemComponent';
import React from 'react';

export interface IFamilyListComponentProps {
  list: ShoppingListDTOV2;
  onListLongPressed: any;
  onItemLongPressed: any;
  onListPressed: any;
}

export const FamilyListComponent = (props: IFamilyListComponentProps) => {
  const {list} = props;

  console.log('List:', list);

  const itemLongPressed = (item: ListItemDTOV2) => {
    props.onItemLongPressed({listId: list.id, item: item});
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
      {list.items.map(item => (
        <FamilyListItemComponent
          item={item}
          key={item.id}
          onLongPress={itemLongPressed}
        />
      ))}
    </ScrollView>
  );
};
