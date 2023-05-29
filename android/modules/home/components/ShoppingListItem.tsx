import {Modal, Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import {STYLESHEET, TYPO} from '../../../resources/styles/STYLESHEET';
import {CustomButton} from '../../shared/components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Avatar,
  Card,
  IconButton,
  Button,
  MD3Colors,
  Surface,
  TextInput,
  useTheme,
  Portal,
  List,
  Divider,
} from 'react-native-paper';
import {inspect} from 'util';

export interface IShoppingListItem {
  shoppingItem: string;
  onRemoveItem: (item: string) => any;
}

export const ShoppingListItem = (props: IShoppingListItem) => {
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const {shoppingItem, onRemoveItem} = props;
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    // <Surface theme={theme} style={{marginBottom: 20, borderRadius: 20}}>
    <View>
      <List.Item
        title={shoppingItem}
        theme={{...theme, roundness: 20}}
        style={{paddingRight: 5}}
        onPress={() => {}}
        onLongPress={() => {}}
        left={props => <List.Icon {...props} icon="cart" />}
        right={props => (
          <IconButton
            {...props}
            onPress={() => {
              onRemoveItem(shoppingItem);
            }}
            icon="delete"
          />
        )}
      />
    </View>
    // </Surface>
  );
};
