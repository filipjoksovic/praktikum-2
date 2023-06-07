import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FamilyService} from '../../../services/FamilyService';
import {Text, useTheme} from 'react-native-paper';
import {
  FamilyJoinRequest,
  IFamilyJoinRequestProps,
} from '../components/FamilyJoinRequest';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';

export interface IFamilyJoinRequests {}

export const FamilyJoinRequests = (props: IFamilyJoinRequests) => {
  const theme = useTheme();
  const [requests, setRequests] = useState<IFamilyJoinRequestProps[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const joinRequests = await FamilyService.getFamilyJoinRequests();
      setRequests(joinRequests);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    await FamilyService.approveFamilyJoinRequest(id);
    setRequests(requests.filter(request => request.id !== id));
  };

  const handleDeny = async (id: string) => {
    await FamilyService.denyFamilyJoinRequest(id);
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <View
      style={{
        ...LAYOUT.container,
        backgroundColor: theme.colors.background,
      }}>
      <View>
        <Text>Family join requests</Text>
        {requests && requests.length > 0 ? (
          requests.map(request => (
            <FamilyJoinRequest
              key={request.id}
              {...request}
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          ))
        ) : (
          <Text>No join requests for family</Text>
        )}
      </View>
    </View>
  );
};
