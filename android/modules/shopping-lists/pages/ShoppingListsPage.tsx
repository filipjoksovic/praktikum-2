import {Pressable, RefreshControl, ScrollView, View} from 'react-native';
import {
  Button,
  Checkbox,
  Divider,
  List,
  Menu,
  SegmentedButtons,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React, {useEffect} from 'react';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {IShoppingListsResponseDTO} from '../../../models/IShoppingListsResponseDTO';
import ListItem from 'react-native-paper/lib/typescript/src/components/List/ListItem';
import {ListContextSelectorComponent} from '../components/ListContextSelectorComponent';
import {ShoppingListsComponent} from '../components/ShoppingListsComponent';

export const ShoppingListsPage = () => {
  const theme = useTheme();

  return (
    <ScrollView
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      <Text variant={'headlineLarge'} style={{marginBottom: 10}}>
        Shopping lists
      </Text>
      <ListContextSelectorComponent />
      <ShoppingListsComponent />
    </ScrollView>
  );
};
