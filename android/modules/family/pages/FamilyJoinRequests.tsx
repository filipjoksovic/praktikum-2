import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FamilyService} from '../../../services/FamilyService';
import {IconButton, Surface, Text, useTheme} from 'react-native-paper';
import {
  FamilyJoinRequest,
  IFamilyJoinRequestProps,
  JoinRequestDTO,
} from '../components/FamilyJoinRequest';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import {localization} from '../../../resources/localization';

export interface IFamilyJoinRequests {}

export const FamilyJoinRequests = (
  {navigation},
  props: IFamilyJoinRequests,
) => {
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
      <Surface
        style={{
          paddingVertical: 10,
          borderRadius: 20,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <IconButton
          size={32}
          icon={'arrow-left'}
          onPress={() => navigation.goBack()}
        />
        <Text variant={'headlineSmall'}>
          {localization.FAMILY.JOIN_REQUESTS_LABEL}
        </Text>
      </Surface>
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
            <Text>{localization.FAMILY.NO_JOIN_REQUESTS_LABEL}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
