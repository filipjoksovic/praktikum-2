import {View} from 'react-native';
import {Button, Surface, Text, TextInput, useTheme} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import {FamilyService} from '../../../services/FamilyService';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {IFamily} from '../../../models/IFamily';
import {LocalStorageService} from '../../../services/LocalStorageService';
import {FamilyDetailsComponent} from '../components/FamilyDetailsComponent';
import {createStackNavigator} from '@react-navigation/stack';
import {EditFamily} from './EditFamily';
import {FamilyJoinRequests} from './FamilyJoinRequests';
import {FamilyMembers} from './FamilyMembers';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FamilyDetails} from './FamilyDetails';
import {FamilyList} from './FamilyList';

const TopTab = createMaterialTopTabNavigator();

function TopBarNavigation() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Requests" component={FamilyJoinRequests} />
      <TopTab.Screen name="EditFamily" component={EditFamily} />
      <TopTab.Screen name="Members" component={FamilyMembers} />
    </TopTab.Navigator>
  );
}

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
      console.log('Should get family for used');
      setFamily(null);
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
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.tertiary,
        },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Details"
        component={FamilyDetails}
        options={{headerShown: false, title: 'Family details'}}
      />
      <Stack.Screen
        name="Edit"
        component={EditFamily}
        options={{title: 'Edit family'}}
      />
      <Stack.Screen
        name="JoinRequests"
        component={FamilyJoinRequests}
        options={{title: 'Join requests'}}
      />
      <Stack.Screen
        name="Members"
        component={FamilyMembers}
        options={{title: 'Family Members'}}
      />
      <Stack.Screen
        name="FamilyList"
        component={FamilyList}
        options={{title: 'Shopping list'}}
      />
    </Stack.Navigator>
  );
};
