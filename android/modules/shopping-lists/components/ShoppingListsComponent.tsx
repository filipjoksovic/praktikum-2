import {
  Button,
  Checkbox,
  Dialog,
  List,
  Portal,
  Surface,
  Text,
} from 'react-native-paper';
import {Pressable, RefreshControl, ScrollView, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  IShoppingListsResponse,
  IShoppingListResponse,
  IListItem,
} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {ShoppingListComponent} from './ShoppingListComponent';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

export const ShoppingListsComponent = () => {
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
      console.log('ShoppingListComponent: Should check off whole list');
      try {
        await ShoppingListService.checkOffList(selectedList.shoppingList.id);
      } catch (e) {
        console.log(
          'ShoppingListComponent: Error occured when checking off whole lsit',
          e,
        );
      }
    } else if (selectedListItem) {
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
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {shoppingLists.map(list => (
        <ShoppingListComponent
          list={list}
          key={list.shoppingList.id}
          wholeListLongPressEmitter={handleWholeListLongPress}
          singleListItemLongPressEmitter={handleSingleListItemLongPress}
        />
      ))}

      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={dialogDismissed}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            {selectedList ? (
              <Text variant="bodyMedium">
                Check off whole list? All of the items on{' '}
                {selectedList.shoppingList.name} will be checked off.
              </Text>
            ) : (
              <></>
            )}
            {selectedListItem ? (
              <Text variant="bodyMedium">
                Check off {selectedListItem.item.name}?
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
