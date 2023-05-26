import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {RefreshControl, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {
  IShoppingListsResponse,
  IShoppingListResponse,
  IListItem,
} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {ShoppingListComponent} from './ShoppingListComponent';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

export interface IShoppingListsComponentProps {
  onListRecieved: any;
}

export const ShoppingListsComponent = (props: IShoppingListsComponentProps) => {
  const [shoppingLists, setShoppingLists] = React.useState<
    IShoppingListResponse[]
  >([]);

  const [selectedList, setSelectedList] =
    React.useState<IShoppingListResponse | null>(null);

  const [selectedListItem, setSelectedListItem] = React.useState<{
    listId: string;
    item: IListItem;
  } | null>(null);

  const onRefresh = React.useCallback(() => {
    async function getShoppingLists() {
      try {
        ShoppingListService.getShoppingLists().then(
          (response: IShoppingListsResponse) => {
            console.log('Lists', response);
            setShoppingLists(response.shoppingLists);
          },
        );
      } catch (e) {
        console.log(e);
        setShoppingLists(prevState => []);
      }
    }
    getShoppingLists();
    setRefreshing(false);
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function getShoppingLists() {
      try {
        ShoppingListService.getShoppingLists().then(
          (response: IShoppingListsResponse) => {
            console.log('Lists', response);
            setShoppingLists(response.shoppingLists);
          },
        );
      } catch (e) {
        console.log(e);
        setShoppingLists(prevState => []);
      }
    }
    console.log('focused');
    getShoppingLists();
  }, [isFocused]);

  const hideDialog = () => {
    setIsDialogVisible(prevState => false);
  };
  const handleWholeListLongPress = (list: any) => {
    setSelectedListItem(prevState => null);
    setSelectedList(prevState => list);
    setIsDialogVisible(prevState => true);
  };
  const handleSingleListItemLongPress = (item: any) => {
    setSelectedList(prevState => null);
    setSelectedListItem(prevState => item);
    setIsDialogVisible(prevState => true);
  };
  const dialogDismissed = () => {
    setSelectedListItem(prevState => null);
    setSelectedList(prevState => null);
    setIsDialogVisible(false);
  };
  const dialogConfirmed = async () => {
    setIsDialogVisible(false);
    if (selectedList) {
      if (selectedList.allChecked) {
        console.log('ShoppingListComponent: Should check off whole list');
        try {
          await ShoppingListService.checkOffList(selectedList.shoppingList.id);
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
          await ShoppingListService.checkOffListItem(
            selectedListItem.listId,
            selectedListItem.item.id,
          );
        } catch (e) {
          console.log(
            'ShoppingListsComponent: Error occured when checking off list item',
            e,
          );
        }
      }
      if (!selectedListItem.item.checked) {
        console.log('ShoppingListComponent: Should delete just a list item');
        try {
          await ShoppingListService.deleteListItem(
            selectedListItem.listId,
            selectedListItem.item.id,
          );
        } catch (e) {
          console.log(
            'ShoppingListsComponent: Error occured when checking off list item',
            e,
          );
        }
      }
    }
  };

  const handleWholeListPress = (list: IShoppingListResponse) => {
    console.log('list pressed');
    props.onListRecieved(list);
  };

  return (
    <ScrollView
      style={{height: '100%'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {shoppingLists.map(list => (
        <ShoppingListComponent
          list={list}
          key={list.shoppingList.id}
          wholeListPressedEmitter={handleWholeListPress}
          wholeListLongPressEmitter={handleWholeListLongPress}
          singleListItemLongPressEmitter={handleSingleListItemLongPress}
        />
      ))}

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={dialogDismissed}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            {selectedList && selectedList.allChecked ? (
              <Text variant="bodyMedium">
                Check off whole list? All of the items on{' '}
                {selectedList.shoppingList.name} will be checked off.
              </Text>
            ) : (
              <></>
            )}
            {selectedList && !selectedList.allChecked ? (
              <Text variant="bodyMedium">
                Delete whole list? All of the items on{' '}
                {selectedList.shoppingList.name} will be deleted.
              </Text>
            ) : (
              <></>
            )}
            {selectedListItem && !selectedListItem.item.checked ? (
              <Text variant="bodyMedium">
                Check off {selectedListItem.item.name}?
              </Text>
            ) : (
              <></>
            )}
            {selectedListItem && selectedListItem.item.checked ? (
              <Text variant="bodyMedium">
                Delete {selectedListItem.item.name}?
              </Text>
            ) : (
              <></>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dialogDismissed}>Cancel</Button>
            <Button onPress={dialogConfirmed}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};
