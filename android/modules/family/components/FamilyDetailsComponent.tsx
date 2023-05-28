import {View} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import {IFamily} from '../../../models/IFamily';

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
        <Text variant="bodyLarge">Join code: {family.inviteCode}</Text>
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
          Members
        </Text>
      </Surface>
    </View>
  );
};
