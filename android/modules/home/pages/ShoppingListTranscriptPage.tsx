import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {ShoppingListService} from '../../../services/ShoppingListService';
import {RecorderPage} from './RecorderPage';

export interface IShoppingListTranscriptPage {
  onReceiveTranscript: any;
}
export const ShoppingListTranscriptPage = (
  props: IShoppingListTranscriptPage,
) => {
  const theme = useTheme();
  const [shoppingListPrompt, setShoppingListPrompt] = useState(
    'We need some milk, oranges, apples and bananas today.',
  );

  // Additional state for recording
  const [isRecording, setIsRecording] = useState(false);

  const processShoppingList = async () => {
    console.log('text:', shoppingListPrompt);
    try {
      const result = await ShoppingListService.createRequest({
        text: shoppingListPrompt,
      });
      console.log(result);

      setIsCreating(false);
      // setShoppingItems(result.summary);
      props.onReceiveTranscript(result.summary);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const [isCreating, setIsCreating] = useState(true);
  const [shoppingItems, setShoppingItems] = useState([]);

  const cancelListProcessing = () => {
    setShoppingListPrompt(prevState => '');
  };

  return (
    <ScrollView>
      {shoppingListPrompt ? (
        <>
          <Text variant={'headlineLarge'}>Welcome</Text>
          <Text variant={'labelLarge'}>
            You can start recording your voice and when you're finished, the
            data will be sent for processing, making your shopping list
          </Text>
          <TextInput
            style={{marginTop: 20}}
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
        <RecorderPage
          onTranscriptReceived={setShoppingListPrompt}></RecorderPage>
      )}
    </ScrollView>
  );
};
