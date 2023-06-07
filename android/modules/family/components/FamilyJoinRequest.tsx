import React from 'react';
import {Button, Card, Text} from 'react-native-paper';

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
          'No first name' + ' ' + (request.surname || 'No last name')}
      </Text>
      <Text>{request.email}</Text>
      <Text>{new Date(request.createdAt.split('[')[0]).toDateString()}</Text>
      <Card.Actions>
        <Button onPress={() => onApprove(request.id)}>Approve</Button>
        <Button onPress={() => onDeny(request.id)}>Deny</Button>
      </Card.Actions>
    </Card>
  );
};
