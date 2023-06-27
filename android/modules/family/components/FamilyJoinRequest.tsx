import React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {localization} from '../../../resources/localization';

export interface JoinRequestDTO {
  id: string;
  name: string;
  surname: string;
  email: string;
  familyName: string;
  creatorId: string;
  userId: string;
  createdAt: string;
}

export interface IFamilyJoinRequestProps {
  request: JoinRequestDTO;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
}

export const FamilyJoinRequest = (props: IFamilyJoinRequestProps) => {
  const {onApprove, onDeny} = props;
  const {request} = props;

  return (
    <Card style={{paddingHorizontal: 15, paddingVertical: 10, marginTop: 10}}>
      <Text>
        {request.name ||
          localization.USER.NO_FIRST_NAME_LABEL +
            ' ' +
            (request.surname || localization.USER.NO_LAST_NAME_LABEL)}
      </Text>
      <Text>{request.email}</Text>
      <Text>{new Date(request.createdAt.split('[')[0]).toDateString()}</Text>
      <Card.Actions>
        <Button onPress={() => onApprove(request.id)}>
          {localization.GLOBAL.APPROVE_LABEL}
        </Button>
        <Button onPress={() => onDeny(request.id)}>
          {localization.GLOBAL.DENY_LABEL}
        </Button>
      </Card.Actions>
    </Card>
  );
};
