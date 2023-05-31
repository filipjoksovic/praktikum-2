import {View} from 'react-native';
import {FAB, List, Text, useTheme} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React, {useState} from 'react';
import {IShoppingListResponse} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {error} from 'console';
import {useFocusEffect} from '@react-navigation/native';
import {ShoppingListComponent} from '../../shopping-lists/components/ShoppingListComponent';
import {FamilyListComponent} from '../components/FamilyListComponent';

export interface IFamilyListProps {}
export const FamilyList = (props: IFamilyListProps) => {
  const theme = useTheme();
  const [familyList, setFamilyList] =
    React.useState<IShoppingListResponse | null>();
  const [state, setState] = React.useState({open: false});
  const [listForFab, setListForFab] = useState<IShoppingListResponse | null>(
    null,
  );

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  async function getFamilyList() {
    try {
      const list = await ShoppingListService.getFamilyList();
      console.log(list);
      setFamilyList(prevState => list);
    } catch (e) {
      console.error('FamilyList getFamilyList', e);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log('here');
      console.log('Should get family members');
      setFamilyList(null);
      getFamilyList();
    }, []),
  );

  const handleWholeListPress = () => {};
  const handleWholeListLongPress = () => {};
  const handleSingleListItemLongPress = () => {};

  function handleAddNewItems(e: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  function handleDelete(e: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      {familyList ? (
        <FamilyListComponent
          list={familyList}
          onListPressed={handleWholeListPress}
          onListLongPressed={handleWholeListLongPress}
          onItemLongPressed={handleSingleListItemLongPress}
        />
      ) : (
        <>
          <Text>No shopping list for family</Text>
        </>
      )}
      <FAB.Group
        open={open}
        visible
        label={open ? listForFab && listForFab.shoppingList.name : ''}
        icon={open ? 'close' : 'pencil'}
        actions={[
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed remind'),
          },
          {
            icon: 'trash-can',
            label: 'Delete',
            onPress: handleDelete,
          },
          {
            icon: 'radiobox-marked',
            label: 'Add new items',
            onPress: handleAddNewItems,
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </View>
  );
};
function setState(arg0: {open: any}) {
  throw new Error('Function not implemented.');
}
