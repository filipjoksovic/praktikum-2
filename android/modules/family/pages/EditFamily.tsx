import {View} from 'react-native';
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React from 'react';
import {FamilyService} from '../../../services/FamilyService';
import {useFocusEffect} from '@react-navigation/native';

export interface IEditFamilyProps {}

export const EditFamily = (props: IEditFamilyProps) => {
  const theme = useTheme();
  const [family, setFamily] = React.useState(null);
  const [name, setName] = React.useState('');
  const [inviteCode, setInviteCode] = React.useState('');
  const getFamily = async () => {
    try {
      const userFamily = await FamilyService.getFamilyForUser();
      console.log('userFamily', userFamily);
      setFamily(prevState => userFamily);
      setName(prevState => userFamily.name);
      setInviteCode(prevState => userFamily.inviteCode);
    } catch (error) {
      console.log('error occurred when getting user family', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('here');
      console.log('Should get family for used');
      setFamily(null);
      getFamily();
    }, []),
  );

  const saveFamily = async () => {
    try {
      await FamilyService.updateFamily(family.id, {
        name: name,
        inviteCode: inviteCode,
      });
    } catch (error) {
      console.log('error occurred when updating family', error);
    }
  };
  const recreateCode = () => {
    //create a string in a XXXX-XXXX format
    const newCode =
      Math.random().toString(36).substr(2, 4) +
      '-' +
      Math.random().toString(36).substr(2, 4);
    setInviteCode(prevState => newCode.toUpperCase());
  };
  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      <View>
        <Text>Family name</Text>
        <TextInput
          placeholder={'Family name'}
          mode={'outlined'}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 20,
        }}>
        <View style={{flex: 1}}>
          <Text>Invite code</Text>
          <TextInput
            placeholder={'Invite code'}
            mode={'outlined'}
            value={inviteCode}
            onChangeText={setInviteCode}
          />
        </View>
        <IconButton
          icon={'dice-multiple'}
          mode={'contained'}
          onPress={recreateCode}
        />
      </View>
      <Button style={{marginTop: 20}} onPress={saveFamily} mode={'contained'}>
        Save
      </Button>
    </View>
  );
};
