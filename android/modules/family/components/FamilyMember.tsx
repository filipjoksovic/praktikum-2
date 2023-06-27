import {
  Button,
  Card,
  IconButton,
  Surface,
  Text,
  Tooltip,
} from 'react-native-paper';
import {IFamilyMember} from '../../../models/IFamilyMember';
import {localization} from "../../../resources/localization";

export interface IFamilyMemberProps {
  member: IFamilyMember;
  onRemove: (member: IFamilyMember) => void;
}

export const FamilyMember = (props: IFamilyMemberProps) => {
  const {member} = props;
  return (
    <Card style={{padding: 10, marginTop: 10}} onPress={() => {}}>
      <Text>{member.name || localization.USER.NO_FIRST_NAME_LABEL}</Text>
      <Text>{member.surname || localization.USER.NO_LAST_NAME_LABEL}</Text>
      <Text>{member.email}</Text>
      <Card.Actions>
        <Tooltip title={localization.FAMILY.REMOVE_FROM_FAMILY}>
          <IconButton
            icon="account-remove"
            size={24}
            onPress={() => {
              props.onRemove(member);
            }}
            mode="contained"
          />
        </Tooltip>
      </Card.Actions>
    </Card>
  );
};
