import {View} from 'react-native';
import {FAB, Portal, Searchbar, Text, useTheme} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React, {useState} from 'react';
import {ShoppingListsComponent} from '../components/ShoppingListsComponent';
import {MiniRecorderComponent} from '../components/MiniRecorderComponent';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {SnackBarStore} from '../../shared/state/SnackBarStore';
import {useFocusEffect} from '@react-navigation/native';
import {ShoppingListStore} from '../../shared/state/ShoppingListsStore';
import DatePicker from 'react-native-date-picker';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {LoaderStore} from '../../shared/state/LoaderStore';
import {localization} from '../../../resources/localization';

export const ShoppingListsPage = () => {
  const theme = useTheme();
  const shoppingLists = ShoppingListStore.useState(s => s.shoppingLists);
  const loaderState = LoaderStore.useState();
  async function getShoppingLists() {
    console.log('Updated shopping lists');
    const lists = await ShoppingListService.getShoppingLists();
    ShoppingListStore.update(s => {
      return {...s, shoppingLists: lists};
    });
  }
  useFocusEffect(
    React.useCallback(() => {
      getShoppingLists();
    }, []),
  );

  const listForFab = ShoppingListStore.useState(s => s.activeShoppingList);

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
      const deleted = await ShoppingListService.deleteList(listForFab.id);
      ShoppingListStore.update(s => {
        return {
          ...s,
          shoppingLists: {
            ...shoppingLists,
            shoppingLists: shoppingLists.filter(list => list.id !== deleted.id),
          },
          activeShoppingList: null,
        };
      });
      SnackBarStore.update(() => {
        return {
          isOpen: true,
          text: localization.SHOPPING_LIST.LIST_DELETED_SUCCESS_MESSAGE,
        };
      });
    } catch (err) {
      console.log('ShoppingListsPage error', err);
    }
  };

  const transcriptReceived = async (transcript: string) => {
    LoaderStore.update(s => {
      return {
        ...s,
        isLoading: true,
        text: localization.LOADER.ROBOTS_PROCESSING_LIST_MESSAGE,
      };
    });
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
        LoaderStore.update(s => {
          return {
            ...s,
            isLoading: false,
            text: '',
          };
        });
        throw new Error('No summary found');
      }
      const updatedList = await ShoppingListService.addListItems(
        listForFab.id,
        result.summary,
      );
      console.log(updatedList);
      getShoppingLists();
      LoaderStore.update(s => {
        return {
          ...s,
          isLoading: false,
          text: '',
        };
      });
    } catch (err) {
      console.log('Error:', err);
      LoaderStore.update(s => {
        return {
          ...s,
          isLoading: false,
          text: '',
        };
      });
      SnackBarStore.update(() => {
        return {
          isOpen: true,
          text: localization.SHOPPING_LIST.ADD_ITEMS_FAIL_MESSAGE,
        };
      });
      setTimeout(() => {
        SnackBarStore.update(() => {
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
        title: localization.NOTIFICATIONS.LOOK_AT_FAMILY_LIST_TITLE,
        body:
          localization.NOTIFICATIONS.LOOK_AT_FAMILY_LIST_NOTIFICATION_PART_1 +
          listForFab?.name +
          localization.NOTIFICATIONS.LOOK_AT_FAMILY_LIST_NOTIFICATION_PART_2,
        android: {
          channelId: 'default',
          smallIcon: 'ic_stat_name',
        },
      },
      trigger,
    );
    SnackBarStore.update(() => {
      return {
        isOpen: true,
        text: localization.SNACKBAR.REMINDER_CREATED_MESSAGE,
      };
    });

    setTimeout(() => {
      SnackBarStore.update(() => {
        return {isOpen: false, text: ''};
      });
    }, 1000);
  }

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (text: string) => {
    setSearchQuery(text);
    console.log('Search query', searchQuery);
  };

  return (
    <View
      style={{
        ...LAYOUT.container,
        backgroundColor: theme.colors.background,
        height: '100%',
        flexDirection: 'column',
      }}>
      <Text variant={'headlineLarge'} style={{marginBottom: 10}}>
        {localization.GLOBAL.SHOPPING_LISTS}
      </Text>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        mode={'bar'}
      />
      <ShoppingListsComponent
        searchQuery={searchQuery}
        listChanged={() => {
          getShoppingLists();
        }}
      />
      {listForFab ? (
        <FAB.Group
          open={open}
          visible
          label={open ? listForFab && listForFab.name : ''}
          icon={open ? 'close' : 'pencil'}
          actions={[
            {
              icon: 'bell',
              label: localization.GLOBAL.REMIND_LABEL,
              onPress: () => setOpenPicker(true),
            },
            {
              icon: 'trash-can',
              label: localization.SHOPPING_LIST.DELETE_LIST_ITEM,
              onPress: handleDelete,
            },
            {
              icon: 'radiobox-marked',
              label: localization.GLOBAL.ADD_NEW_ITEMS,
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
