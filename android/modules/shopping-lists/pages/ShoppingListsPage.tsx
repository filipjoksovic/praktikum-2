import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {
  Button,
  FAB,
  MD2Colors,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React, {useCallback, useEffect, useState} from 'react';
import {ListContextSelectorComponent} from '../components/ListContextSelectorComponent';
import {ShoppingListsComponent} from '../components/ShoppingListsComponent';
import {MiniRecorderComponent} from '../components/MiniRecorderComponent';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {
  IShoppingList,
  IShoppingListResponse,
} from '../../../models/IShoppingListsResponseDTO';
import {SnackBarStore} from '../../shared/state/SnackBarStore';
import {useFocusEffect} from '@react-navigation/native';
import {ShoppingListStore} from '../../shared/state/ShoppingListsStore';
import DatePicker from 'react-native-date-picker';
import {DatePickerModal} from 'react-native-paper-dates';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

export const ShoppingListsPage = () => {
  const theme = useTheme();
  const shoppingLists = ShoppingListStore.useState(s => s.shoppingLists);

  useFocusEffect(
    React.useCallback(() => {
      async function getShoppingLists() {
        console.log('Updated shopping lists');
        const lists = await ShoppingListService.getShoppingLists();
        ShoppingListStore.update(s => {
          return {...s, shoppingLists: lists};
        });
      }
      getShoppingLists();
    }, []),
  );

  const listForFab = ShoppingListStore.useState(s => s.activeShoppingList);

  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = React.useState({open: false});
  const [recorderVisible, setRecorderVisible] = React.useState(false);

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  const handleAddNewItems = () => {
    console.log('Pressed record');
    setRecorderVisible(true);
  };
  const handleDelete = async () => {
    try {
      if (!listForFab) {
        return;
      }
      const deleted = await ShoppingListService.deleteList(
        listForFab?.shoppingList.id,
      );
      ShoppingListStore.update(s => {
        return {
          ...s,
          shoppingLists: {
            ...shoppingLists,
            shoppingLists: shoppingLists.shoppingLists.filter(
              list => list.shoppingList.id !== deleted.id,
            ),
          },
          activeShoppingList: null,
        };
      });
      SnackBarStore.update(s => {
        return {isOpen: true, text: 'List successfully deleted'};
      });
    } catch (err) {
      console.log('ShoppingListsPage error', err);
    }
  };

  const transcriptReceived = async (transcript: string) => {
    setIsLoading(true);
    console.log('List for fab', listForFab);
    if (!listForFab) {
      return;
    }
    console.log('text:', transcript);
    try {
      const result = await ShoppingListService.createRequest({
        text: transcript,
      });
      console.log(result.summary);
      if (!result.summary) {
        setIsLoading(false);
        throw new Error('No summary found');
      }
      const updatedList = await ShoppingListService.addListItems(
        listForFab.shoppingList.id,
        result.summary,
      );
      console.log(updatedList);
      ShoppingListStore.update(s => {
        return {
          ...s,
          shoppingLists: {
            ...s.shoppingLists,
            shoppingLists: shoppingLists.shoppingLists.map(list =>
              list.shoppingList.id === updatedList.shoppingList.id
                ? updatedList
                : list,
            ),
          },
        };
      });
      setIsLoading(false);
    } catch (err) {
      console.log('Error:', err);
      setIsLoading(false);
      SnackBarStore.update(s => {
        return {isOpen: true, text: 'Error adding items'};
      });
      setTimeout(() => {
        SnackBarStore.update(s => {
          return {isOpen: false, text: ''};
        });
      }, 3000);
    }
  };

  const [date, setDate] = React.useState(new Date());
  const [openPicker, setOpenPicker] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpenPicker(false);
  }, [setOpenPicker]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpenPicker(false);
      setDate(params.date);
    },
    [setOpenPicker, setDate],
  );
  const createReminder = async (date: Date) => {
    await notifee.requestPermission();

    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    onCreateTriggerNotification(date);
  };

  async function onCreateTriggerNotification(date: Date) {
    console.log('Creating notification');
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'List reminder',
        body: `This is a reminder to look at your ${listForFab?.shoppingList.name} list`,
        android: {
          channelId: 'default',
          smallIcon: 'ic_stat_name',
        },
      },
      trigger,
    );
    SnackBarStore.update(s => {
      return {isOpen: true, text: 'Reminder created'};
    });

    setTimeout(() => {
      SnackBarStore.update(s => {
        return {isOpen: false, text: ''};
      });
    }, 1000);
  }
  return (
    <View
      style={{
        ...LAYOUT.container,
        backgroundColor: theme.colors.background,
        height: '100%',
        flexDirection: 'column',
      }}>
      <Text variant={'headlineLarge'} style={{marginBottom: 10}}>
        Shopping lists
      </Text>
      {isLoading && (
        <ActivityIndicator
          style={{marginTop: 20}}
          size={'large'}
          animating={true}
          color={MD2Colors.amber900}
        />
      )}

      <ShoppingListsComponent />
      {listForFab ? (
        <FAB.Group
          open={open}
          visible
          label={open ? listForFab && listForFab.shoppingList.name : ''}
          icon={open ? 'close' : 'pencil'}
          actions={[
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => setOpenPicker(true),
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
      ) : (
        <></>
      )}
      {recorderVisible && (
        <Portal>
          <MiniRecorderComponent
            onTranscriptReceived={transcriptReceived}
            recordingStopped={() => {
              setRecorderVisible(false);
            }}
            onRecordingCancelled={() => {
              setRecorderVisible(false);
            }}
            recorderVisible={recorderVisible}
          />
        </Portal>
      )}

      <DatePicker
        modal
        open={openPicker}
        mode={'datetime'}
        date={date}
        onConfirm={date => {
          setDate(date);
          setOpenPicker(false);
          createReminder(date);
        }}
        onCancel={() => {
          setOpenPicker(false);
        }}
      />
    </View>
  );
};
