import {ActivityIndicator, GestureResponderEvent, View} from 'react-native';
import {FAB, List, MD2Colors, Portal, Text, useTheme} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React, {useState} from 'react';
import {
  IShoppingListResponse,
  ShoppingListDTOV2,
} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {error} from 'console';
import {useFocusEffect} from '@react-navigation/native';
import {ShoppingListComponent} from '../../shopping-lists/components/ShoppingListComponent';
import {FamilyListComponent} from '../components/FamilyListComponent';
import {MiniRecorderComponent} from '../../shopping-lists/components/MiniRecorderComponent';
import {ShoppingListStore} from '../../shared/state/ShoppingListsStore';

export interface IFamilyListProps {}

export const FamilyList = (props: IFamilyListProps) => {
  const theme = useTheme();
  const [familyList, setFamilyList] =
    React.useState<ShoppingListDTOV2 | null>();
  const [state, setState] = React.useState({open: false});
  const [listForFab, setListForFab] = useState<ShoppingListDTOV2 | null>(null);
  const [recorderVisible, setRecorderVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  async function getFamilyList() {
    try {
      const list: ShoppingListDTOV2 = await ShoppingListService.getFamilyList();
      console.log('Family list', list);
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

  const handleAddNewItems = () => {
    console.log('Pressed record');
    setRecorderVisible(true);
  };

  function handleDelete(e: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  const transcriptReceived = async (transcript: string) => {
    setIsLoading(true);

    console.log('text:', transcript);
    try {
      const result = await ShoppingListService.createRequest({
        text: transcript,
      });
      console.log('Result', result);
      console.log(result.summary);
      const updatedList = await ShoppingListService.addFamilyListItems(
        // listForFab.shoppingList.id,
        result.summary,
      );
      console.log(updatedList);
      // ShoppingListStore.update(s => {
      //   return {
      //     ...s,
      //     shoppingLists: {
      //       ...s.shoppingLists,
      //       shoppingLists: shoppingLists.shoppingLists.map(list =>
      //         list.shoppingList.id === updatedList.shoppingList.id
      //           ? updatedList
      //           : list,
      //       ),
      //     },
      //   };
      // });
      setIsLoading(false);
    } catch (err) {
      console.log('Error:', err);
      setIsLoading(false);
    }
  };
  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      {isLoading && (
        <ActivityIndicator
          style={{marginTop: 20}}
          size={'large'}
          animating={true}
          color={MD2Colors.amber900}
        />
      )}
      {familyList && familyList.items && familyList.items.length > 0 ? (
        <FamilyListComponent
          list={familyList}
          onListPressed={handleWholeListPress}
          onListLongPressed={handleWholeListLongPress}
          onItemLongPressed={handleSingleListItemLongPress}
        />
      ) : (
        <>
          <Text>
            Your shopping list is currently empty. Go to the recorder page to
            add some items
          </Text>
        </>
      )}
      <FAB.Group
        open={open}
        visible
        label={open ? listForFab && listForFab.name : ''}
        icon={open ? 'close' : 'pencil'}
        actions={[
          {
            icon: 'bell',
            label: 'Remind',
            onPress: () => console.log('Pressed remind'),
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
      {recorderVisible && (
        <Portal>
          <MiniRecorderComponent
            onTranscriptReceived={transcriptReceived}
            recordingStopped={() => {
              setRecorderVisible(false);
            }}
            recorderVisible={recorderVisible}
          />
        </Portal>
      )}
    </View>
  );
};

function setState(arg0: {open: any}) {
  throw new Error('Function not implemented.');
}
