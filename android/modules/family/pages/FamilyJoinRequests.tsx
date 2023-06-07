import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FamilyService} from '../../../services/FamilyService';
import {Text, useTheme} from 'react-native-paper';
import {
  FamilyJoinRequest,
  IFamilyJoinRequestProps,
  JoinRequestDTO,
} from '../components/FamilyJoinRequest';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';

export interface IFamilyJoinRequests {}

export const FamilyJoinRequests = (props: IFamilyJoinRequests) => {
  const theme = useTheme();
  const [requests, setRequests] = useState<JoinRequestDTO[]>([]);

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
        {requests && requests.length > 0 ? (
          requests.map(request => (
            <FamilyJoinRequest
              key={request.id}
              request={request}
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          ))
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text variant={'displayLarge'}>¯\_(ツ)_/¯</Text>
            <Text>No join requests for family</Text>
          </View>
        )}
      </View>
    </View>
  );
};
