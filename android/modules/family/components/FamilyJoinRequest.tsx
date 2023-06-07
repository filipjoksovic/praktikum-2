import React from 'react';
import { Button, Card, Text } from 'react-native-paper';

export interface IFamilyJoinRequestProps {
  id: string;
  familyId: string;
  inviteCode: string;
  userId: string;
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
}

export const FamilyJoinRequest = (props: IFamilyJoinRequestProps) => {
  const { id, familyId, inviteCode, userId, onApprove, onDeny } = props;

  return (
    <Card style={{ padding: 10, marginTop: 10 }}>
      <Text>ID: {id}</Text>
      <Text>Family ID: {familyId}</Text>
      <Text>Invite Code: {inviteCode}</Text>
      <Text>User ID: {userId}</Text>
      <Card.Actions>
        <Button onPress={() => onApprove(id)}>Approve</Button>
        <Button onPress={() => onDeny(id)}>Deny</Button>
      </Card.Actions>
    </Card>
  );
};
