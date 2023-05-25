import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {STYLESHEET} from './resources/styles/STYLESHEET';
import {RegisterPage} from './modules/auth/pages/RegisterPage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginPage} from './modules/auth/pages/LoginPage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomePage} from './modules/home/pages/HomePage';
import {AccountSetup} from './modules/account/account/pages/AccountSetup';
import {
  BottomNavigation,
  DefaultTheme,
  PaperProvider,
  useTheme,
} from 'react-native-paper';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {SettingsPage} from './modules/settings/pages/SettingsPage';
import {PrepareShoppingListPage} from './modules/home/pages/PrepareShoppingListPage';
import {ShoppingListsPage} from './modules/shopping-lists/pages/ShoppingListsPage';

export const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();
  return (
    <Tab.Navigator
      barStyle={{backgroundColor: theme.colors.background}}
      screenOptions={({route, navigation}) => {
        return {
          headerShown: false,
        };
      }}>
      <Tab.Screen
        name={'Shopping list'}
        component={PrepareShoppingListPage}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon name={'plus'} color={theme.colors.tertiary} size={20} />
            );
          },
          tabBarLabel: 'New list',
        }}
      />
      <Tab.Screen
        name={'ShoppingLists'}
        component={ShoppingListsPage}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon name={'list-ul'} color={theme.colors.tertiary} size={20} />
            );
          },
          tabBarLabel: 'Shopping lists',
        }}
      />
      <Tab.Screen
        name={'AccountSetup'}
        component={AccountSetup}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon name={'cog'} color={theme.colors.tertiary} size={20} />
            );
          },
          tabBarLabel: 'Account setup',
        }}
      />
      <Tab.Screen
        name={'Settings'}
        component={SettingsPage}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon name={'cog'} color={theme.colors.tertiary} size={20} />
            );
          },
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
    </Stack.Navigator>
  );
};

function App(): JSX.Element {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  const stylesheet = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: STYLESHEET.colors.bg_light,
    },
  });

  return (
    <PaperProvider>
      <View style={stylesheet.container}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.secondary}
        />
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}

export default App;
