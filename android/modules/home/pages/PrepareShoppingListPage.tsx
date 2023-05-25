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
  const createList = (
    shoppingListName: string,
    shoppingListItems: string[],
  ) => {
    ShoppingListService.createList({
      name: shoppingListName,
      items: shoppingListItems,
    }).then(result => setIsCreating(true));
  };

  return (
    <ScrollView
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      {isCreating ? (
        <ShoppingListTranscriptPage />
      ) : (
        <>
          <CreateShoppingListPage
            shoppingList={shoppingItems}
            cancelListCreate={cancel}
            createList={createList}
          />
        </>
      )}
    </ScrollView>
  );
};
