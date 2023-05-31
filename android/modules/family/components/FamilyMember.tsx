import {
  Button,
  Card,
  IconButton,
  Surface,
  Text,
  Tooltip,
} from 'react-native-paper';
import {IFamilyMember} from '../../../models/IFamilyMember';

export interface IFamilyMemberProps {
  member: IFamilyMember;
  onRemove: (member: IFamilyMember) => void;
  onViewDetails: (member: IFamilyMember) => void;
}

export const FamilyMember = (props: IFamilyMemberProps) => {
  const {member} = props;
  return (
    <Card style={{padding: 10, marginTop: 10}} onPress={() => {}}>
      <Text>{member.name || 'No name'}</Text>
      <Text>{member.surname || 'No last name'}</Text>
      <Text>{member.email}</Text>
      <Card.Actions>
        <Tooltip title="View details">
          <IconButton
            icon="account-eye"
            size={24}
            onPress={() => {
              props.onRemove(member);
            }}
            mode="contained"
          />
        </Tooltip>
        <Tooltip title="Remove from family">
          <IconButton
            icon="account-remove"
            size={24}
            onPress={() => {
              props.onViewDetails(member);
            }}
            mode="contained"
          />
        </Tooltip>
      </Card.Actions>
    </Card>
  );
};
