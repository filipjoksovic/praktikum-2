import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {RecorderPage} from './RecorderPage';
import {SnackBarStore} from '../../shared/state/SnackBarStore';
import {Dimensions} from 'react-native';
import {LoaderStore} from '../../shared/state/LoaderStore';
import {localization} from "../../../resources/localization";

export interface IShoppingListTranscriptPage {
  onReceiveTranscript: any;
}
export const ShoppingListTranscriptPage = (
  props: IShoppingListTranscriptPage,
) => {
  const theme = useTheme();
  const loaderState = LoaderStore.useState();
  const [shoppingListPrompt, setShoppingListPrompt] = useState('');
  const windowHeight = Dimensions.get('window').height;

  const processShoppingList = async () => {
    console.log('text:', shoppingListPrompt);
    try {
      LoaderStore.update(s => {
        return {
          ...s,
          isLoading: true,
          text: localization.LOADER.ROBOTS_PROCESSING_LIST_MESSAGE,
        };
      });
      const result = await ShoppingListService.createRequest({
        text: shoppingListPrompt,
      });
      console.log(result);
      if (!result.summary) {
        throw new Error('No summary found');
      }
      LoaderStore.update(s => {
        return {
          ...s,
          isLoading: false,
          text: '',
        };
      });
      SnackBarStore.update(() => {
        return {isOpen: true, text: localization.SNACKBAR.DATA_PARSE_SUCCESS};
      });

      props.onReceiveTranscript(result.summary);
    } catch (err) {
      console.log('Error:', err);
      SnackBarStore.update(() => {
        return {isOpen: true, text: localization.SNACKBAR.DATA_PARSE_FAIL};
      });
      setTimeout(() => {
        SnackBarStore.update(() => {
          return {isOpen: false, text: ''};
        });
      }, 3000);
    }
  };

  const cancelListProcessing = () => {
    setShoppingListPrompt(() => '');
  };

  return (
    <View style={{height: '100%'}}>
      {shoppingListPrompt ? (
        <>
          <Text variant={'headlineMedium'}>{localization.TRANSCRIPTION.TRANSCRIPT_COMPLETE_MESSAGE}</Text>
          <Text variant={'labelLarge'}>
            {localization.TRANSCRIPTION.TRANSCRIPT_COMPLETE_DESCRIPTIVE_MESSAGE}
          </Text>
          <TextInput
            style={{marginTop: 20, maxHeight: windowHeight / 3}} // Limit the height of TextInput to a third of the window height
            value={shoppingListPrompt}
            onChangeText={setShoppingListPrompt}
            multiline={true}
            numberOfLines={20}
            textAlignVertical={'top'}
          />
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <Button
              mode={'contained'}
              style={{marginTop: 20}}
              onPress={processShoppingList}>
              Process
            </Button>
            <Button
              mode={'contained'}
              style={{marginTop: 20}}
              onPress={cancelListProcessing}>
              Abort
            </Button>
          </View>
        </>
      ) : (
        <RecorderPage onTranscriptReceived={setShoppingListPrompt} />
      )}
    </View>
  );
};
