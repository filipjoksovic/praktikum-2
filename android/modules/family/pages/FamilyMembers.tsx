import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {FamilyService} from '../../../services/FamilyService';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import {IFamilyMember} from '../../../models/IFamilyMember';
import {FamilyMember} from '../components/FamilyMember';
import {ListViewComponent} from 'react-native';
import {AuthService} from '../../../services/AuthService';
import {User} from '../../../models/User';

export interface IFamilyMembersProps {}
export const FamilyMembers = (props: IFamilyMembersProps) => {
  const theme = useTheme();
  const [familyMembers, setFamilyMembers] = React.useState<IFamilyMember[]>([]);
  const [user, setUser] = useState<User | null>(null);
  async function getFamilyMembers() {
    try {
      const members = await FamilyService.getFamilyMembers();
      const user = await AuthService.getUser();
      setFamilyMembers(prevState => members);
      setUser(prevState => user);
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
  const handleViewDetails = (member: IFamilyMember) => {};

  return (
    <View
      style={{
        ...LAYOUT.container,
        backgroundColor: theme.colors.background,
      }}>
      <Text>
        Here you can see family members who can create, update and edit the
        shopping list and its items.
      </Text>
      <View>
        <FlatList
          style={{margin: -12}}
          contentContainerStyle={{padding: 12}}
          data={familyMembers}
          renderItem={({item}) =>
            user &&
            item.id !== user.id && (
              <FamilyMember
                member={item}
                onRemove={handleRemove}
                onViewDetails={handleViewDetails}
              />
            )
          }
        />
      </View>
    </View>
  );
};
