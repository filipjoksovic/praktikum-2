import {StyleSheet, View} from 'react-native';
import {FAB, Text, useTheme} from 'react-native-paper';
import {LAYOUT} from '../../../resources/styles/STYLESHEET';
import React, {useEffect, useState} from 'react';
import {ListContextSelectorComponent} from '../components/ListContextSelectorComponent';
import {ShoppingListsComponent} from '../components/ShoppingListsComponent';

export const ShoppingListsPage = () => {
  const theme = useTheme();
  const [listForFab, setListForFab] = useState(null);

  const styles = StyleSheet.create({
    fab: {},
  });

  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  return (
    <View
      style={{
        ...LAYOUT.container,
        backgroundColor: theme.colors.background,
        height: '100%',
        flexDirection: 'column',
      }}>
      <Text variant={'headlineLarge'} style={{marginBottom: 10}}>
        Shopping lists
      </Text>
      <ListContextSelectorComponent />
      <ShoppingListsComponent onListRecieved={setListForFab} />
      {listForFab ? (
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'pencil'}
          fabStyle={styles.fab}
          actions={[
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed remind'),
            },
            {
              icon: 'trash-can',
              label: 'Delete',
              onPress: () => console.log('Pressed delete'),
            },
            {
              icon: 'radiobox-marked',
              label: 'Add new items',
              onPress: () => console.log('Pressed record'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
};
