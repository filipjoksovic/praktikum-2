import {Checkbox, Divider, List, Surface, Text} from 'react-native-paper';
import {Pressable, View} from 'react-native';
import React from 'react';
import {IListItem} from '../../../models/IShoppingListsResponseDTO';

export interface IFamilyListItemComponentProps {
  item: IListItem;
  onLongPress: (item: IListItem) => void;
  onPress?: (item: IListItem) => void;
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
                <Text variant="bodySmall">Added by: username</Text>
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
