import {Button, Text, View} from 'react-native';
// @ts-ignore
import Voice from '@react-native-community/voice';

function VoiceRecorderComponent(): JSX.Element {
  // useEffect(() => {}, []);
  Voice.onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
  };
  Voice.onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
  };
  Voice.onSpeechResults = (e: any) => {
    console.log(e);
  };
  return (
    <View>
      <Text>VoiceRecorderComponent</Text>
      <Button title="Start recording" onPress={() => {Voice.start("en-US")}} />
      <Button title="End recording" onPress={() => {Voice.stop()}} />
    </View>
  );
}

export default VoiceRecorderComponent;
