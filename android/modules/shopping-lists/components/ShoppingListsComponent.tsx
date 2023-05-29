import {
  ActivityIndicator,
  Button,
  Dialog,
  MD2Colors,
  Portal,
  Text,
} from 'react-native-paper';
import {RefreshControl, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  IShoppingListsResponse,
  IShoppingListResponse,
  IListItem,
} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {ShoppingListComponent} from './ShoppingListComponent';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {NoShoppingListsComponent} from './NoShoppingListsComponent';
import {ISnackBarStore, SnackBarStore} from '../../shared/state/SnackBarStore';
import {ShoppingListStore} from '../../shared/state/ShoppingListsStore';

export interface IShoppingListsComponentProps {}

export const ShoppingListsComponent = (props: IShoppingListsComponentProps) => {
  const shoppingLists = ShoppingListStore.useState(
    s => s.shoppingLists.shoppingLists,
  );
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
    ShoppingListStore.update(s => {
      return {...s, selectedListItem: item};
    });
    ShoppingListStore.update(s => {
      return {...s, selectedList: null};
    });
    setIsDialogVisible(prevState => true);
  };

  const dialogDismissed = () => {
    ShoppingListStore.update(s => {
      return {
        ...selectedList,
        selectedListItem: undefined,
        selectedList: undefined,
      };
    });
    setIsDialogVisible(false);
  };

  const dialogConfirmed = async () => {
    setIsDialogVisible(false);
    if (selectedList) {
      console.log('SelectedList:', selectedList);
      console.log(selectedList.shoppingList.itemList.length > 0);
      if (
        !selectedList.allChecked &&
        selectedList.shoppingList.itemList.length > 0
      ) {
        console.log('ShoppingListComponent: Should check off whole list');
        try {
          const editedList = await ShoppingListService.completeList(
            selectedList.shoppingList.id,
          );
          console.log('CHECK OFF WHOLE LIST RESPONSE:', editedList);
          const newShoppingLists: IShoppingListResponse[] = shoppingLists.map(
            shoppingList =>
              shoppingList.shoppingList.id === editedList.shoppingList.id
                ? editedList
                : shoppingList,
          );
          console.log('new shopping lists', newShoppingLists);
          ShoppingListStore.update(s => {
            return {
              ...s,
              shoppingLists: {
                ...s.shoppingLists,
                shoppingLists: newShoppingLists,
              },
            };
          });
        } catch (e) {
          console.log(
            'ShoppingListComponent: Error occured when checking off whole lsit',
            e,
          );
        }
      } else {
        console.log('ShoppingListComponent: Should delete whole list');
        try {
          await ShoppingListService.deleteList(selectedList.shoppingList.id);
          const newList = shoppingLists.filter(
            list => list.shoppingList.id !== selectedList.shoppingList.id,
          );
          ShoppingListStore.update(s => {
            return {
              ...s,
              shoppingLists: {...s.shoppingLists, shoppingLists: newList},
            };
          });
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
          const newShoppingLists = shoppingLists.map(shoppingList =>
            shoppingList.shoppingList.id === editedList.shoppingList.id
              ? editedList
              : shoppingList,
          );
          ShoppingListStore.update(s => {
            {
              return {
                ...s,
                shoppingLists: {
                  ...s.shoppingLists,
                  shoppingLists: newShoppingLists,
                },
              };
            }
          });
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
          let foundList = shoppingLists.find(
            list => list.shoppingList.id === selectedListItem.listId,
          );
          if (foundList) {
            const foundItems = foundList?.shoppingList.itemList.filter(
              item => item.id !== selectedListItem.item.id,
            );
            foundList = {
              ...foundList,
              shoppingList: {...foundList?.shoppingList, itemList: foundItems},
            };
            const updated = shoppingLists.map(list =>
              list.shoppingList.id === foundList?.shoppingList.id
                ? foundList
                : list,
            );
            ShoppingListStore.update(s => {
              return {
                ...s,
                shoppingLists: {
                  ...s.shoppingLists,
                  shoppingLists: updated,
                },
              };
            });
          }
        } catch (e) {
          console.log(
            'ShoppingListsComponent: Error occured when deleting list item',
            e,
          );
          e.stack;
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
    <ScrollView
      style={{height: '100%', marginTop: 20}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {shoppingLists ? (
        shoppingLists.map(list => (
          <ShoppingListComponent
            list={list}
            key={list.shoppingList.id}
            onListPressed={handleWholeListPress}
            onListLongPressed={handleWholeListLongPress}
            onItemLongPressed={handleSingleListItemLongPress}
          />
        ))
      ) : (
        <NoShoppingListsComponent />
      )}

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={dialogDismissed}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            {selectedList &&
            !selectedList.allChecked &&
            selectedList.shoppingList.itemList.length > 0 ? (
              <Text variant="bodyMedium">
                Check off whole list? All of the items on{' '}
                {selectedList.shoppingList.name} will be checked off.
              </Text>
            ) : (
              <></>
            )}
            {(selectedList && selectedList.allChecked) ||
            selectedList?.shoppingList.itemList.length === 0 ? (
              <Text variant="bodyMedium">
                Delete whole list? All of the items on{' '}
                {selectedList.shoppingList.name} will be deleted.
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
