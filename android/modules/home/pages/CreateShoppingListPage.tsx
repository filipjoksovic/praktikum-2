import {ScrollView, View} from 'react-native';
import {useEffect, useState} from 'react';
import {TYPO} from '../../../resources/styles/STYLESHEET';
import {ShoppingListItem} from '../components/ShoppingListItem';
import {CustomButton} from '../../shared/components/CustomButton';
import {
  Button,
  Divider,
  IconButton,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import React from 'react';
import {localization} from '../../../resources/localization';

export interface ICreateShoppingListPageProps {
  shoppingList: string[];
  cancelListCreate: () => void;
  createPersonalList: (param1: string, param2: string[]) => void;
  createFamilyList: (param1: string, param2: string[]) => void;
}

export const CreateShoppingListPage = (props: ICreateShoppingListPageProps) => {
  const theme = useTheme();
  const [shoppingList, setShoppingList] = useState(props.shoppingList);
  const [shoppingListName, setShoppingListName] = useState('');
  const [listPrivacyValue, setListPrivacyValue] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);
  const [newItem, setNewItem] = React.useState('');
  const removeItem = (item: string) => {
    console.log(shoppingList);
    setShoppingList(prevState => prevState.filter(i => i !== item));
  };

  const handleCreateConfirm = () => {
    if (listPrivacyValue === 'per') {
      props.createPersonalList(shoppingListName, shoppingList);
    }
    if (listPrivacyValue === 'fam') {
      props.createFamilyList(shoppingListName, shoppingList);
    }
  };
  const addNewItem = () => {
    console.log('adding new item');
    setShoppingList(prevState => [newItem, ...prevState]);
  };

  return (
    <View style={{height: '100%'}}>
      <Text variant={'headlineLarge'}>{localization.GLOBAL.SUCCESS_LABEL}</Text>

      <Text variant={'bodyMedium'}>
        {localization.SHOPPING_LIST.CREATE.DATA_PROCESS_SUCCESS_MESSAGE}
      </Text>
      {!isAdding && (
        <View>
          <SegmentedButtons
            value={listPrivacyValue}
            onValueChange={setListPrivacyValue}
            style={{marginTop: 20}}
            buttons={[
              {
                value: 'fam',
                label: 'Family',
                icon: 'home',
              },
              {
                value: 'per',
                label: 'Personal',
                icon: 'account',
              },
            ]}
          />
          {listPrivacyValue === 'fam' && (
            <Text
              variant={'bodySmall'}
              style={{textAlign: 'center', marginTop: 10}}>
              {localization.SHOPPING_LIST.CREATE.ONE_LIST_PER_FAMILY_MESSAGE}
            </Text>
          )}
          {listPrivacyValue === 'per' && (
            <View>
              <TextInput
                label={'Name'}
                style={{marginTop: 10}}
                theme={{...theme, roundness: 20}}
                mode={'outlined'}
                value={shoppingListName}
                onChangeText={setShoppingListName}
              />
            </View>
          )}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{marginVertical: 20}} variant={'bodyLarge'}>
          Shopping items
        </Text>
        <IconButton
          icon={isAdding ? 'check' : 'plus'}
          iconColor={theme.colors.primary}
          mode="contained-tonal"
          onPress={() => {
            setIsAdding(prevState => !prevState);
          }}
        />
      </View>
      {isAdding && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <TextInput
            mode="outlined"
            label={localization.GLOBAL.ITEM_NAME_LABEL}
            style={{flex: 1}}
            onChangeText={setNewItem}
          />
          <IconButton
            icon={'plus'}
            iconColor={theme.colors.primary}
            mode="contained-tonal"
            onPress={addNewItem}
          />
        </View>
      )}
      <ScrollView style={{margin: -12}} contentContainerStyle={{padding: 12}}>
        {shoppingList.map((item, index) => {
          return (
            <View key={index}>
              <ShoppingListItem
                key={index}
                shoppingItem={item}
                onRemoveItem={removeItem}
              />
              <Divider />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
          marginTop: 10,
        }}>
        <Button onPress={props.cancelListCreate} mode={'outlined'}>
          Cancel
        </Button>
        <Button mode={'contained'} onPress={handleCreateConfirm}>
          Confirm
        </Button>
      </View>
    </View>
  );
};
