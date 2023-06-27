import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {IconButton, Surface, Text, useTheme} from 'react-native-paper';
import {FamilyService} from '../../../services/FamilyService';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import {IFamilyMember} from '../../../models/IFamilyMember';
import {FamilyMember} from '../components/FamilyMember';
import {AuthService} from '../../../services/AuthService';
import {User} from '../../../models/User';
import {localization} from '../../../resources/localization';

export interface IFamilyMembersProps {}
export const FamilyMembers = ({navigation}) => {
  const theme = useTheme();
  const [familyMembers, setFamilyMembers] = React.useState<IFamilyMember[]>([]);
  const [user, setUser] = useState<User | null>(null);
  async function getFamilyMembers() {
    try {
      const members = await FamilyService.getFamilyMembers();
      const user = await AuthService.getUser();
      setFamilyMembers(members);
      setUser(user);
    } catch (err) {
      console.error('getFamilyForUser FamilyMembers', err);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log('here');
      console.log('Should get family members');
      setFamilyMembers([]);
      getFamilyMembers();
    }, []),
  );
  const handleRemove = async (member: IFamilyMember) => {
    await FamilyService.removeFamilyMember(member);
    getFamilyMembers();
  };

  return (
    <View
      style={{
        ...LAYOUT.container,
        backgroundColor: theme.colors.background,
      }}>
      <Surface
        style={{
          paddingVertical: 10,
          borderRadius: 20,
          marginBottom: 10,
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
          {localization.FAMILY.MEMBERS_LABEL}
        </Text>
      </Surface>
      {familyMembers && familyMembers.length > 1 && (
        <Text style={{textAlign: 'center'}}>
          {localization.FAMILY.MEMBERS_LABEL.DESCRIPTIVE_MESSAGE}
        </Text>
      )}
      {familyMembers && familyMembers.length > 1 ? (
        <View>
          <FlatList
            style={{margin: -12}}
            contentContainerStyle={{padding: 12}}
            data={familyMembers}
            renderItem={({item}) =>
              user &&
              item.id !== user.id && (
                <FamilyMember member={item} onRemove={handleRemove} />
              )
            }
          />
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text variant={'displayLarge'}>¯\_(ツ)_/¯</Text>
          <Text style={{textAlign: 'center'}}>
            {localization.FAMILY.MEMBERS.EMPTY_FAMILY_LABEL}
          </Text>
          <Text style={{textAlign: 'center'}}>
            {localization.FAMILY.MEMBERS.SHARE_FAMILY_CODE_MESSAGE}
          </Text>
        </View>
      )}
    </View>
  );
};
