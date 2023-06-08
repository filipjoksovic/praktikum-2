import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {RefreshControl, ScrollView} from 'react-native';
import React from 'react';
import {
  IShoppingList,
  IShoppingListResponse,
} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {ShoppingListComponent} from './ShoppingListComponent';
import {NoShoppingListsComponent} from './NoShoppingListsComponent';
import {ShoppingListStore} from '../../shared/state/ShoppingListsStore';

export interface IShoppingListsComponentProps {
  listChanged: any;
  searchQuery: string;
}

export const ShoppingListsComponent = (props: IShoppingListsComponentProps) => {
  const shoppingLists = ShoppingListStore.useState(s => s.shoppingLists);
  const selectedList = ShoppingListStore.useState(s => s.selectedList);
  const selectedListItem = ShoppingListStore.useState(s => s.selectedListItem);

  const onRefresh = React.useCallback(() => {}, []);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const handleWholeListLongPress = (list: any) => {
    ShoppingListStore.update(s => {
      return {...s, selectedListItem: undefined};
    });
    ShoppingListStore.update(s => {
      return {...s, selectedList: list};
    });
    setIsDialogVisible(prevState => true);
  };

  const handleSingleListItemLongPress = (item: any) => {
    try {
      ShoppingListStore.update(s => {
        return {...s, selectedListItem: item};
      });
      ShoppingListStore.update(s => {
        return {...s, selectedList: null};
      });
      setIsDialogVisible(prevState => true);
    } catch {
      console.log('shopping list selection failed');
    }
  };

  const dialogDismissed = () => {
    try {
      ShoppingListStore.update(s => {
        return {
          ...s, //fixed
          selectedListItem: undefined,
          selectedList: undefined,
        };
      });
      setIsDialogVisible(false);
    } catch {
      console.log('shopping list selection failed');
    }
  };

  const dialogConfirmed = async () => {
    setIsDialogVisible(false);
    if (selectedList) {
      console.log('SelectedList:', selectedList);
      console.log(selectedList.itemList.length > 0);
      if (!isListChecked(selectedList) && selectedList.itemList.length > 0) {
        console.log('ShoppingListComponent: Should check off whole list');
        try {
          const editedList = await ShoppingListService.completeList(
            selectedList.id,
          );
          console.log('CHECK OFF WHOLE LIST RESPONSE:', editedList);
          const newShoppingLists: IShoppingListResponse[] = shoppingLists.map(
            shoppingList =>
              shoppingList.id === editedList.shoppingList.id
                ? editedList
                : shoppingList,
          );
          console.log('new shopping lists', newShoppingLists);
          props.listChanged();
        } catch (e) {
          console.log(
            'ShoppingListComponent: Error occured when checking off whole lsit',
            e,
          );
        }
      } else {
        console.log('ShoppingListComponent: Should delete whole list');
        try {
          await ShoppingListService.deleteList(selectedList.id);
          props.listChanged();
        } catch (e) {
          console.log(
            'ShoppingListComponent: Error occured when checking off whole lsit',
            e,
          );
        }
      }
    } else if (selectedListItem) {
      if (!selectedListItem.item.checked) {
        console.log('ShoppingListComponent: Should check off just a list item');
        try {
          const editedList = await ShoppingListService.checkOffListItem(
            selectedListItem.listId,
            selectedListItem.item.id,
          );
          console.log('CHECK OFF LIST ITEM RESPONSE:', editedList);
          props.listChanged();
        } catch (e) {
          console.log(
            'ShoppingListsComponent: Error occured when checking off list item',
            e,
          );
        }
      }
      if (selectedListItem.item.checked) {
        console.log('ShoppingListComponent: Should delete just a list item');
        try {
          await ShoppingListService.deleteListItem(
            selectedListItem.listId,
            selectedListItem.item.id,
          );

          const lists = shoppingLists;
          const list = lists.find(list => list.id === selectedListItem.listId);
          props.listChanged();
        } catch (e) {
          console.log(
            'ShoppingListsComponent: Error occured when deleting list item',
            e,
          );
        }
      }
    }
  };

  const handleWholeListPress = (list: IShoppingListResponse) => {
    console.log('list pressed');
    ShoppingListStore.update(s => {
      return {...s, activeShoppingList: list};
    });
  };

  return (
    <ScrollView style={{height: '100%', marginTop: 20}}>
      {shoppingLists ? (
        shoppingLists.map(
          list =>
            list.name
              .toLowerCase()
              .includes(props.searchQuery.toLowerCase()) && (
              <ShoppingListComponent
                list={list}
                key={list.id}
                onListPressed={handleWholeListPress}
                onListLongPressed={handleWholeListLongPress}
                onItemLongPressed={handleSingleListItemLongPress}
              />
            ),
        )
      ) : (
        <NoShoppingListsComponent />
      )}

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={dialogDismissed}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            {selectedList &&
            !isListChecked(selectedList) &&
            selectedList.itemList.length > 0 ? (
              <Text variant="bodyMedium">
                Check off whole list? All of the items on {selectedList.name}{' '}
                will be checked off.
              </Text>
            ) : (
              <></>
            )}
            {(selectedList && isListChecked(selectedList)) ||
            selectedList?.itemList.length === 0 ? (
              <Text variant="bodyMedium">
                Delete whole list? All of the items on {selectedList.name} will
                be deleted.
              </Text>
            ) : (
              <></>
            )}
            {selectedListItem &&
            selectedListItem.item &&
            !selectedListItem.item.checked ? (
              <Text variant="bodyMedium">
                Check off {selectedListItem.item.name}?
              </Text>
            ) : (
              <></>
            )}
            {selectedListItem &&
            selectedListItem.item &&
            selectedListItem.item.checked ? (
              <Text variant="bodyMedium">
                Delete {selectedListItem.item.name}?
              </Text>
            ) : (
              <></>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dialogDismissed}>No</Button>
            <Button onPress={dialogConfirmed}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export const isListChecked = (list: IShoppingList) => {
  return list.itemList.every(item => item.checked);
};
