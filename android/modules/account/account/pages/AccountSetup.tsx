import {View} from 'react-native';
import {
  LAYOUT,
  STYLESHEET,
  TYPO,
} from '../../../../resources/styles/STYLESHEET';
import DatePicker from 'react-native-date-picker';
import React from 'react';
import {
  Button,
  Snackbar,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {AuthService} from '../../../../services/AuthService';

export const AccountSetup = () => {
  const [visible, setVisible] = React.useState(false);
  const [snackbarLabel, setSnackbarLabel] = React.useState('');

  const [setupState, setSetupState] = React.useState({
    fname: '',
    lname: '',
    dob: new Date(),
  });
  const theme = useTheme();

  const handleFnameUpdate = (value: string) => {
    setSetupState(prevState => {
      return {...prevState, fname: value};
    });
  };
  const handleLnameUpdate = (value: string) => {
    setSetupState(prevState => {
      return {...prevState, lname: value};
    });
  };
  const submitData = () => {
    AuthService.setupAccount({
      firstName: setupState.fname,
      lastName: setupState.lname,
      dob: setupState.dob,
    })
      .then(response => {})
      .catch(error => {
        setSnackbarLabel(error.message);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 2000);
      });
  };
  const onDismissSnackBar = () => {};
  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      <View>
        <Text variant={'displaySmall'}>Welcome to WishList!</Text>
        <Text style={{marginBottom: 10}}>It's a pleasure to meet you.</Text>
        <Text>
          Though, before you begin using the application, we'll need you to tell
          us a bit about yourself
        </Text>
      </View>
      <View>
        <TextInput
          value={setupState.fname}
          onChangeText={handleFnameUpdate}
          mode={'outlined'}
          placeholder={'First name'}
          style={{marginVertical: 10}}
        />
        <TextInput
          value={setupState.lname}
          onChangeText={handleLnameUpdate}
          mode={'outlined'}
          placeholder={'Last name'}
          style={{marginVertical: 10}}
        />

        <Surface
          theme={{...theme, roundness: 20}}
          style={{borderRadius: 20, padding: 20, marginTop: 20}}>
          <Text>Date of birth</Text>
          <DatePicker
            date={new Date()}
            androidVariant={'nativeAndroid'}
            mode={'date'}
          />
        </Surface>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button mode={'contained'} style={{marginTop: 20}} onPress={submitData}>
          Proceed
        </Button>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}>
        {snackbarLabel}
      </Snackbar>
    </View>
  );
};
