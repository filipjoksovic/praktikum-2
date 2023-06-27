import {View} from 'react-native';
import {
  Avatar,
  Button,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React, {useState} from 'react';
import {AuthService} from '../../../services/AuthService';
import {FamilyService} from '../../../services/FamilyService';
import {useFocusEffect} from '@react-navigation/native';
import {User} from '../../../models/User';
import {localization} from '../../../resources/localization';

export const SettingsPage = ({navigation}) => {
  const theme = useTheme();
  const [user, setUser] = React.useState<User | null>(null);

  const getUser = async () => {
    try {
      const user = await AuthService.getUser();
      console.log('[SettingsPage]: User', user);
      setUser(user);
    } catch (e) {
      console.log('[SettingsPage]: Error occurred when getting user', e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, []),
  );
  const [inviteCode, setInviteCode] = useState('');

  const logout = async () => {
    try {
      await AuthService.logout();
      navigation.navigate('Login');
    } catch (e) {
      console.log('[SettingsPage]: Error occurred when logging out', e);
    }
  };

  const sendJoinRequest = async () => {
    try {
      await FamilyService.sendJoinRequest(inviteCode);
    } catch (e) {
      console.log(
        '[SettingsPage]: Error occurred when sending join request',
        e,
      );
    }
  };

  const updateUser = async () => {
    try {
      await AuthService.updateUser(user);
    } catch (e) {
      console.log('[SettingsPage]: Error occurred when updating user', e);
    }
  };

  return (
    user && (
      <View
        style={{
          ...LAYOUT.container,
          backgroundColor: theme.colors.background,
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text variant={'headlineLarge'} style={{marginBottom: 20}}>
            {localization.GLOBAL.SETTINGS_LABEL}
          </Text>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Avatar.Text
              label={
                user.name && user.surname ? user.name[0] + user.surname[0] : 'U'
              }
              style={{height: 150, width: 150, borderRadius: 10000}}
            />
          </View>

          <View style={{gap: 10}}>
            <View style={{flexDirection: 'row', gap: 20}}>
              <TextInput
                style={{flex: 1}}
                placeholder={localization.GLOBAL.FIRST_NAME_LABEL}
                label={localization.GLOBAL.FIRST_NAME_LABEL}
                mode={'outlined'}
                onChangeText={text => {
                  setUser({...user, name: text});
                }}
                value={user.name}
              />
              <TextInput
                style={{flex: 1}}
                placeholder={localization.GLOBAL.LAST_NAME_LABEL}
                onChangeText={text => {
                  setUser({...user, surname: text});
                }}
                label={localization.GLOBAL.LAST_NAME_LABEL}
                mode={'outlined'}
                value={user.surname}
              />
            </View>

            <TextInput
              placeholder={localization.GLOBAL.EMAIL_LABEL}
              label={localization.GLOBAL.EMAIL_LABEL}
              mode={'outlined'}
              value={user.email}
            />

            {!user.familyId && (
              <Surface style={{marginTop: 10, padding: 20, borderRadius: 20}}>
                <TextInput
                  value={inviteCode}
                  label={localization.FAMILY.JOIN_CODE_LABEL}
                  mode={'outlined'}
                  onChangeText={text => setInviteCode(text)}
                />
                <Button onPress={sendJoinRequest}>
                  {localization.FAMILY.SEND_REQUEST_LABEL}
                </Button>
              </Surface>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}>
          <Button onPress={updateUser} mode={'contained'}>
            {localization.GLOBAL.SAVE_LABEL}
          </Button>
          <Button onPress={logout} mode={'outlined'}>
            {localization.GLOBAL.LOGOUT_LABEL}
          </Button>
        </View>
      </View>
    )
  );
};
