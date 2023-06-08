import {
  ListItemDTOV2,
  ShoppingListDTOV2,
} from '../../../models/IShoppingListsResponseDTO';
import {RefreshControl, ScrollView} from 'react-native';
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
    <ScrollView style={{margin: -12}} contentContainerStyle={{padding: 12}}>
      {list.items.map(item => (
        <FamilyListItemComponent
          listId={list.id}
          item={item}
          key={item.id}
          onLongPress={itemLongPressed}
        />
      ))}
    </ScrollView>
  );
};
