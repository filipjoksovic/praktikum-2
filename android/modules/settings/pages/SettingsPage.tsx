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

  return (
    user && (
      <View
        style={{
          ...LAYOUT.container,
          backgroundColor: theme.colors.background,
        }}>
        <Text variant={'headlineLarge'} style={{marginBottom: 20}}>
          Settings
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
              placeholder={'First name'}
              label={'First name'}
              mode={'outlined'}
              value={user.name}
            />
            <TextInput
              style={{flex: 1}}
              placeholder={'Last name'}
              label={'Last name'}
              mode={'outlined'}
              value={user.surname}
            />
          </View>

          <TextInput
            placeholder={'Email'}
            label={'Email'}
            mode={'outlined'}
            value={user.email}
          />
        </View>
        {!user.familyId && (
          <Surface style={{marginTop: 10, padding: 20, borderRadius: 20}}>
            <TextInput
              value={inviteCode}
              label={'Family invite code'}
              mode={'outlined'}
              onChangeText={text => setInviteCode(text)}
            />
            <Button onPress={sendJoinRequest}>Send Family Join Request</Button>
          </Surface>
        )}

        <Button onPress={logout}>Logout</Button>
      </View>
    )
  );
};
