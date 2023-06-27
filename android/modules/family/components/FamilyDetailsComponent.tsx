import React from 'react';
import {View} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import {IFamily} from '../../../models/IFamily';
import {localization} from '../../../resources/localization';

export interface IFamilyDetailsComponentProps {
  family: IFamily;
}

export const FamilyDetailsComponent = (props: IFamilyDetailsComponentProps) => {
  const {family} = props;
  return (
    <View>
      <Surface
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}>
        <Text variant="headlineMedium">{family.name}</Text>
        <Text variant="bodyLarge">
          {localization.FAMILY.JOIN_CODE_LABEL} {family.inviteCode}
        </Text>
      </Surface>
      <Surface
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}>
        <Text
          variant="bodyLarge"
          style={{
            verticalAlign: 'middle',
          }}>
          {localization.FAMILY.MEMBERS_LABEL}
        </Text>
      </Surface>
    </View>
  );
};
