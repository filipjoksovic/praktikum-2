import {
  Checkbox,
  Divider,
  IconButton,
  List,
  Surface,
  Text,
} from 'react-native-paper';
import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {
  IListItem,
  ListItemDTOV2,
} from '../../../models/IShoppingListsResponseDTO';
import {ShoppingListService} from '../../../services/ShoppingListService';

export interface IFamilyListItemComponentProps {
  item: ListItemDTOV2;
  listId: string;
  onLongPress: (item: ListItemDTOV2) => void;
  onPress?: (item: ListItemDTOV2) => void;
}

export const FamilyListItemComponent = (
  props: IFamilyListItemComponentProps,
) => {
  const [item, setItem] = useState(props.item);
  const changeCheckStatus = () => {
    setItem(prevState => ({...prevState, checked: !prevState.checked}));
    ShoppingListService.checkOffListItem(props.listId, item.id);
  };

  const deleteItem = async () => {
    await ShoppingListService.deleteListItem(props.listId, item.id);
    setItem(prevState => null);
  };
  return (
    item !== null && (
      <View>
        <Surface style={{borderRadius: 20, marginTop: 10}}>
          <List.Item
            title={() => {
              return (
                <View>
                  <Text
                    variant="bodyMedium"
                    style={{
                      textDecorationLine: item.checked
                        ? 'line-through'
                        : 'none',
                    }}>
                    {item.name}
                  </Text>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              width: '100%',
              justifyContent: 'flex-end',
            }}>
            {!item.checked && (
              <>
                <IconButton
                  mode={'contained'}
                  icon={!item.checked ? 'check' : 'cancel'}
                  onPress={changeCheckStatus}
                />
                <IconButton
                  icon={'pen'}
                  mode={'contained'}
                  onPress={() => {}}
                />
              </>
            )}
            <IconButton
              mode={'contained'}
              icon={'trash-can'}
              onPress={deleteItem}
            />
          </View>
        </Surface>
      </View>
    )
  );
};
