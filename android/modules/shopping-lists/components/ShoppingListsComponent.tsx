import {Checkbox, List, Surface, Text} from 'react-native-paper';
import {Pressable, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {IShoppingListsResponseDTO} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {ShoppingListComponent} from './ShoppingListComponent';

export const ShoppingListsComponent = () => {
  const [shoppingLists, setShoppingLists] = React.useState<
    IShoppingListsResponseDTO[]
  >([]);
  useEffect(() => {
    async function getShoppingLists() {
      try {
        ShoppingListService.getShoppingLists().then(lists => {
          console.log(lists);
          lists.forEach(list => console.log(list));
          setShoppingLists(lists);
        });
      } catch (e) {
        console.log(e);
      }
    }
    getShoppingLists();
  }, []);
  return (
    <ScrollView>
      {shoppingLists.map(list => (
        <ShoppingListComponent list={list} />
      ))}
    </ScrollView>
  );
};
