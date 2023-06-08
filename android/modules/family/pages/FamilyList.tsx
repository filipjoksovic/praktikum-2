import {ActivityIndicator, View} from 'react-native';
import {
  FAB,
  IconButton,
  MD2Colors,
  Portal,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React, {useState} from 'react';
import {ShoppingListDTOV2} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {useFocusEffect} from '@react-navigation/native';
import {FamilyListComponent} from '../components/FamilyListComponent';
import {MiniRecorderComponent} from '../../shopping-lists/components/MiniRecorderComponent';
import DatePicker from 'react-native-date-picker';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import {SnackBarStore} from '../../shared/state/SnackBarStore';
import {LoaderStore} from '../../shared/state/LoaderStore';

export interface IFamilyListProps {}

export const FamilyList = ({navigation}) => {
  const theme = useTheme();
  const [familyList, setFamilyList] =
    React.useState<ShoppingListDTOV2 | null>();
  const [state, setState] = React.useState({open: false});
  const [listForFab, setListForFab] = useState<ShoppingListDTOV2 | null>(null);
  const [recorderVisible, setRecorderVisible] = React.useState(false);
  const loaderState = LoaderStore.useState();

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  async function getFamilyList() {
    try {
      const list: ShoppingListDTOV2 = await ShoppingListService.getFamilyList();
      console.log('Family list', list);
      setFamilyList(list);
    } catch (e) {
      console.error('FamilyList getFamilyList', e);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      try {
        console.log('here');
        console.log('Should get family members');
        setFamilyList(null);
        getFamilyList();
      } catch (e) {
        console.log('get family members', e);
      }
    }, []),
  );

  const handleWholeListPress = () => {};
  const handleWholeListLongPress = () => {};
  const handleSingleListItemLongPress = () => {};

  const handleAddNewItems = () => {
    console.log('Pressed record');
    setRecorderVisible(true);
  };

  const transcriptReceived = async (transcript: string) => {
    LoaderStore.update(s => {
      return {
        ...s,
        isLoading: true,
        text: 'Transcript received. Processing data...',
      };
    });

    console.log('text:', transcript);
    try {
      const result = await ShoppingListService.createRequest({
        text: transcript,
      });
      console.log('Result', result);
      console.log(result.summary);
      if (!result.summary) {
        LoaderStore.update(s => {
          return {...s, isLoading: false, text: ''};
        });
        throw new Error('No items detected');
      }
      const updatedList = await ShoppingListService.addFamilyListItems(
        result.summary,
      );
      console.log(updatedList);

      LoaderStore.update(s => {
        return {...s, isLoading: false, text: ''};
      });
    } catch (err) {
      console.log('Error:', err);
      LoaderStore.update(s => {
        return {...s, isLoading: false, text: ''};
      });
      SnackBarStore.update(() => {
        return {isOpen: true, text: "Couldn't add items"};
      });
      setTimeout(() => {
        SnackBarStore.update(() => {
          return {isOpen: false, text: ''};
        });
      }, 3000);
    }
  };
  const recordingCancelled = () => {
    setRecorderVisible(false);
  };

  const [date, setDate] = React.useState(new Date());
  const [openPicker, setOpenPicker] = React.useState(false);

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
        body: 'This is a reminder to look at your family list',
        android: {
          channelId: 'default',
          smallIcon: 'ic_stat_name',
        },
      },
      trigger,
    );
    SnackBarStore.update(() => {
      return {isOpen: true, text: 'Reminder created'};
    });

    setTimeout(() => {
      SnackBarStore.update(() => {
        return {isOpen: false, text: ''};
      });
    }, 1000);
  }

  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      <Surface
        style={{
          paddingVertical: 10,
          borderRadius: 20,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <IconButton
          size={32}
          icon={'arrow-left'}
          onPress={() => navigation.goBack()}
        />
        <Text variant={'headlineSmall'}>Join requests</Text>
      </Surface>
      {familyList && familyList.items && familyList.items.length > 0 ? (
        <FamilyListComponent
          list={familyList}
          onListPressed={handleWholeListPress}
          onListLongPressed={handleWholeListLongPress}
          onItemLongPressed={handleSingleListItemLongPress}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text variant={'displayLarge'}>¯\_(ツ)_/¯</Text>
          <Text style={{textAlign: 'center'}}>
            Your shopping list is currently empty. Go to the recorder page to
            add some items
          </Text>
        </View>
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
            onPress: () => setOpenPicker(true),
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
            onRecordingCancelled={recordingCancelled}
            recordingStopped={() => {
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
