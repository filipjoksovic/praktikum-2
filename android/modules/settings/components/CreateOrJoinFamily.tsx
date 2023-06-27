import {AuthService} from '../../../services/AuthService';
import {View} from 'react-native';
import {Button, IconButton, SegmentedButtons, Surface, Text, TextInput, useTheme,} from 'react-native-paper';
import {localization} from '../../../resources/localization';
import React, {useState} from 'react';
import {FamilyService} from '../../../services/FamilyService';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import {IFamily} from '../../../models/IFamily';
import {useFocusEffect} from '@react-navigation/native';
import {User} from "../../../models/User";

export const CreateOrJoinFamily = () => {
  const [user, setUser] = useState<User | null>(null);
  const theme = useTheme();
  const [activeMode, setActiveMode] = React.useState('create');
  const [familyName, setFamilyName] = React.useState('');
  const [inviteCode, setInviteCode] = useState('');

  const getUser = async () => {
    const userLs = await AuthService.getUser();
    setUser(userLs);
  };
  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, []),
  );
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
  const recreateCode = () => {
    //create a string in a XXXX-XXXX format
    const newCode =
      Math.random().toString(36).substr(2, 4) +
      '-' +
      Math.random().toString(36).substr(2, 4);
    setInviteCode(newCode.toUpperCase());
  };

  const createFamily = async () => {
    try {
      const family = (await FamilyService.createFamily({
        name: familyName,
        inviteCode: inviteCode,
      })) as IFamily;
      if (user) {
        await AuthService.updateUser({...user, familyId: family.id});
      }
    } catch (error) {
      console.log('ERror when creating family');
    }
  };
  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      <Text variant={'headlineLarge'} style={{marginBottom: 20}}>
        {localization.GLOBAL.FAMILY_LABEL}
      </Text>
      <SegmentedButtons
        value={activeMode}
        onValueChange={setActiveMode}
        buttons={[
          {
            icon: 'pen',
            value: 'create',
            label: localization.GLOBAL.CREATE_LABEL,
          },
          {
            icon: 'door',
            value: 'join',
            label: localization.GLOBAL.JOIN_LABEL,
          },
        ]}
      />
      {activeMode === 'join' && (
        <Surface style={{marginTop: 20, padding: 20, borderRadius: 20}}>
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

      {activeMode === 'create' && (
        <Surface style={{marginTop: 20, padding: 20, borderRadius: 20}}>
          <TextInput
            value={familyName}
            label={localization.FAMILY.FAMILY_NAME_LABEL}
            mode={'outlined'}
            onChangeText={text => setFamilyName(text)}
          />

          <View
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
            }}>
            <TextInput
              value={inviteCode}
              style={{flex: 1}}
              label={localization.FAMILY.JOIN_CODE_LABEL}
              mode={'outlined'}
              onChangeText={text => setInviteCode(text)}
            />
            <IconButton
              icon={'dice-multiple'}
              mode={'contained'}
              onPress={recreateCode}
            />
          </View>
          <Button
            style={{marginTop: 20}}
            mode={'contained'}
            onPress={createFamily}>
            {localization.GLOBAL.CREATE_FAMILY}
          </Button>
        </Surface>
      )}
    </View>
  );
};
