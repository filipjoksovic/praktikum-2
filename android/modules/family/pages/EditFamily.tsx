import {View} from 'react-native';
import {
  Button,
  IconButton,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React from 'react';
import {FamilyService} from '../../../services/FamilyService';
import {useFocusEffect} from '@react-navigation/native';
import {IFamily} from '../../../models/IFamily';
import {localization} from '../../../resources/localization';

export interface IEditFamilyProps {}

export const EditFamily = ({navigation}) => {
  const theme = useTheme();
  const [family, setFamily] = React.useState<IFamily | null>(null);
  const [name, setName] = React.useState('');
  const [inviteCode, setInviteCode] = React.useState('');
  const getFamily = async () => {
    try {
      const userFamily = await FamilyService.getFamilyForUser();
      console.log('userFamily', userFamily);
      setFamily(userFamily);
      setName(userFamily.name);
      setInviteCode(userFamily.inviteCode);
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
      if (!family) {
        return;
      }
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
    setInviteCode(newCode.toUpperCase());
  };
  return (
    <View
      style={{...LAYOUT.container, backgroundColor: theme.colors.background}}>
      <Surface
        style={{
          paddingVertical: 10,
          borderRadius: 20,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <IconButton
          size={32}
          icon={'arrow-left'}
          onPress={() => navigation.goBack()}
        />
        <Text variant={'headlineSmall'}>
          {localization.FAMILY.EDIT_FAMILY_LABEL}
        </Text>
      </Surface>
      <View>
        <Text>{localization.FAMILY.FAMILY_NAME_LABEL}</Text>
        <TextInput
          placeholder={localization.FAMILY.FAMILY_NAME_LABEL}
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
          <Text>{localization.FAMILY.JOIN_CODE_LABEL}</Text>
          <TextInput
            placeholder={localization.FAMILY.JOIN_CODE_LABEL}
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
