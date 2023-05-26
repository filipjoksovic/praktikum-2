import {View} from 'react-native';
import {Button, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import {FamilyService} from '../../../services/FamilyService';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {IFamily} from '../../../models/IFamily';
import {LocalStorageService} from '../../../services/LocalStorageService';

export const FamilyPage = () => {
  const theme = useTheme();
  const [family, setFamily] = React.useState<IFamily | null>(null);
  const [name, setName] = React.useState('');
  const [inviteCode, setInviteCode] = React.useState('');
  const getFamilyForUser = async () => {
    try {
      console.log('Getting family');
      const userFamily = await FamilyService.getFamilyForUser();
      setFamily(userFamily);
    } catch (err) {
      console.log('error occurred when getting user family', err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('here');
      getFamilyForUser();
    }, []),
  );

  const createFamily = async () => {
    try {
      const family = await FamilyService.createFamily({
        name: name,
        inviteCode: inviteCode,
      });
      if (family.id) {
        await LocalStorageService.setUserFamilyId(family.id);
      }
      setFamily(prevState => {
        return family;
      });
    } catch (err) {
      console.log('createFamily FamilyPage failed', err);
    }
  };

  return (
    <View
      style={{
        ...theme,
        ...LAYOUT.container,
        backgroundColor: theme.colors.background,
      }}>
      <Surface
        style={{paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20}}>
        <Text variant={'headlineLarge'}>Family</Text>
        <Text variant={'bodyMedium'}>
          Here you can see details about your family.
        </Text>
        <Text variant={'bodyMedium'}>
          If you're not in one already, you can join it using a code provided to
          you by a member
        </Text>
      </Surface>

      {family ? (
        <>
          <Surface
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}>
            <Text variant="headlineMedium">{family.name}</Text>
          </Surface>
          <Surface
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                height: '50%',
                verticalAlign: 'middle',
              }}>
              W.I.P
            </Text>
          </Surface>
        </>
      ) : (
        <>
          <View style={{marginTop: 20}}>
            <Surface
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <Text>Create a family</Text>
              <TextInput
                label={'Name'}
                value={name}
                style={{marginTop: 10}}
                onChangeText={setName}
                mode="outlined"></TextInput>
              <TextInput
                label={'Joining code'}
                mode="outlined"
                value={inviteCode}
                onChangeText={setInviteCode}
                style={{marginTop: 10}}></TextInput>

              <Text
                variant={'bodySmall'}
                style={{textAlign: 'center', marginTop: 10}}>
                By creating this family, other users will be able to join in and
                participate in creating family shopping lists.
              </Text>
              <Button
                style={{marginTop: 20}}
                mode="contained"
                onPress={createFamily}>
                Create family
              </Button>
            </Surface>
          </View>
        </>
      )}
    </View>
  );
};
