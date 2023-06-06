import {Checkbox, Divider, List, Surface, Text} from 'react-native-paper';
import {Pressable, View} from 'react-native';
import React from 'react';
import {
  IListItem,
  ListItemDTOV2,
} from '../../../models/IShoppingListsResponseDTO';

export interface IFamilyListItemComponentProps {
  item: ListItemDTOV2;
  onLongPress: (item: ListItemDTOV2) => void;
  onPress?: (item: ListItemDTOV2) => void;
}

export const FamilyListItemComponent = (
  props: IFamilyListItemComponentProps,
) => {
  const {item} = props;
  return (
    <View>
      <Surface style={{borderRadius: 20, marginTop: 10}}>
        <List.Item
          title={() => {
            return (
              <View>
                <Text variant="bodyMedium">{item.name}</Text>
                <Text variant="bodySmall">
                  Added by:{' '}
                  {(item.addedBy.name && ' ' && item.addedBy.surname) ||
                    item.addedBy.email}
                </Text>
              </View>
            );
          }}
          key={item.id}
          titleStyle={{
            textDecorationLine: item.checked ? 'line-through' : 'none',
            textDecorationStyle: 'solid',
          }}
          onLongPress={() => {
            props.onLongPress(item);
          }}
        />
      </Surface>
    </View>
  );
};
