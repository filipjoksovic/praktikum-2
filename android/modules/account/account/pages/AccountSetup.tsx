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
import {localization} from '../../../../resources/localization';

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
        <Text variant={'displaySmall'}>
          {localization.ACCOUNT_SETUP.WELCOME_MESSAGE}
        </Text>
        <Text style={{marginBottom: 10}}>
          {localization.ACCOUNT_SETUP.PLEASURE_TO_MEET_YOU_MESSAGE}
        </Text>
        <Text>{localization.ACCOUNT_SETUP.ABOUT_YOURSELF_MESSAGE}</Text>
      </View>
      <View>
        <TextInput
          value={setupState.fname}
          onChangeText={handleFnameUpdate}
          mode={'outlined'}
          placeholder={localization.GLOBAL.FIRST_NAME_LABEL}
          style={{marginVertical: 10}}
        />
        <TextInput
          value={setupState.lname}
          onChangeText={handleLnameUpdate}
          mode={'outlined'}
          placeholder={localization.GLOBAL.LAST_NAME_LABEL}
          style={{marginVertical: 10}}
        />

        <Surface
          theme={{...theme, roundness: 20}}
          style={{borderRadius: 20, padding: 20, marginTop: 20}}>
          <Text>{localization.ACCOUNT.DATE_OF_BIRTH_LABEL}</Text>
          <DatePicker
            date={new Date()}
            androidVariant={'nativeAndroid'}
            mode={'date'}
          />
        </Surface>
      </View>
      <View style={{alignItems: 'center'}}>
        <Button mode={'contained'} style={{marginTop: 20}} onPress={submitData}>
          {localization.GLOBAL.PROCEED_LABEL}
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
