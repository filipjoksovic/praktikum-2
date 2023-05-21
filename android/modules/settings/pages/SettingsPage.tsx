import {SafeAreaView} from 'react-native';
import {Avatar, Card, Text, useTheme} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React from 'react';
const AccountIcon = props => <Avatar.Icon {...props} icon="account" />;
const AccountsIcon = props => <Avatar.Icon {...props} icon="family-tree" />;

export const SettingsPage = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        ...LAYOUT.container,
        backgroundColor: theme.colors,
      }}>
      <Text variant={'headlineLarge'} style={{marginBottom: 20}}>
        Settings
      </Text>
      <Card onPress={() => {}}>
        <Card.Title
          title="Account"
          subtitle="Customize your account"
          left={AccountIcon}
        />
      </Card>
      <Card style={{marginTop: 10}} onPress={() => {}}>
        <Card.Title
          title="Family"
          subtitle="See details about your family, add or remove members."
          left={AccountsIcon}
        />
      </Card>
    </SafeAreaView>
  );
};
