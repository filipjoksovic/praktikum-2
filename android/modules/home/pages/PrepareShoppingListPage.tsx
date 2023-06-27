import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {CreateShoppingListPage} from './CreateShoppingListPage';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {useFocusEffect} from '@react-navigation/native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import AudioService from '../../../services/AudioService';
import {ShoppingListTranscriptPage} from './ShoppingListTranscriptPage';
import {SnackBarStore} from '../../shared/state/SnackBarStore';
import {localization} from '../../../resources/localization';

export const PrepareShoppingListPage = () => {
  const audioRecorderPlayer = AudioService.getInstance().audioRecorderPlayer;
  const theme = useTheme();
  const [isCreating, setIsCreating] = useState(true);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [shoppingListPrompt, setShoppingListPrompt] = useState(
    'We need some milk, oranges, apples and bananas today.',
  );

  const cancel = () => {
    console.log('Cancelling');
    setIsCreating(true);
    setShoppingItems([]);
  };
  const createPersonalList = async (
    shoppingListName: string,
    shoppingListItems: string[],
  ) => {
    try {
      await ShoppingListService.createListForUser({
        name: shoppingListName,
        items: shoppingListItems,
      });
      setIsCreating(true);
      setShoppingItems([]);
      SnackBarStore.update(s => {
        return {
          isOpen: true,
          text: localization.SHOPPING_LIST.CREATE.CREATE_SUCCESS_MESSAGE,
        };
      });
    } catch (err) {
      console.error('createList error', err);
      SnackBarStore.update(s => {
        return {
          isOpen: true,
          text: localization.SHOPPING_LIST.CREATE.CREATE_FAIL_MESSAGE,
        };
      });
    }
  };
  const transcriptReceived = (transcript: any) => {
    setShoppingItems(prevState => transcript);
  };
  const createFamilyList = async (
    shoppingListName: string,
    shoppingListItems: string[],
  ) => {
    try {
      await ShoppingListService.createListForFamily({
        name: shoppingListName,
        items: shoppingListItems,
      });
      setIsCreating(true);
      setShoppingItems([]);
      SnackBarStore.update(s => {
        return {
          isOpen: true,
          text: localization.SHOPPING_LIST.CREATE
            .CREATE_FAMILY_LIST_SUCCESS_MESSAGE,
        };
      });
    } catch (err) {
      console.error('createList error', err);
      SnackBarStore.update(s => {
        return {
          isOpen: true,
          text: localization.SHOPPING_LIST.CREATE
            .CREATE_FAMILY_LIST_FAIL_MESSAGE,
          err,
        };
      });
    }
  };

  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      {shoppingItems.length === 0 ? (
        <ShoppingListTranscriptPage onReceiveTranscript={transcriptReceived} />
      ) : (
        <>
          <CreateShoppingListPage
            shoppingList={shoppingItems}
            cancelListCreate={cancel}
            createPersonalList={createPersonalList}
            createFamilyList={createFamilyList}
          />
        </>
      )}
    </View>
  );
};
