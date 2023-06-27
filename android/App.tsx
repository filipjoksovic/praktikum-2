import React, {useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {STYLESHEET} from './resources/styles/STYLESHEET';
import {RegisterPage} from './modules/auth/pages/RegisterPage';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {LoginPage} from './modules/auth/pages/LoginPage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HomePage} from './modules/home/pages/HomePage';
import {
  DefaultTheme,
  PaperProvider,
  Snackbar,
  Text,
  useTheme,
} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {SettingsPage} from './modules/settings/pages/SettingsPage';
import {PrepareShoppingListPage} from './modules/home/pages/PrepareShoppingListPage';
import {ShoppingListsPage} from './modules/shopping-lists/pages/ShoppingListsPage';
import {FamilyPage} from './modules/family/pages/FamilyPage';
import {SnackBarStore} from './modules/shared/state/SnackBarStore';
import {
  scheme_purple_dark,
  scheme_purple_light,
} from './resources/styles/colorSchemes';
import {enGB, registerTranslation} from 'react-native-paper-dates';
import {LoaderStore} from './modules/shared/state/LoaderStore';
import {localization} from './resources/localization';
import {AuthService} from './services/AuthService';
import {CreateOrJoinFamily} from './modules/settings/components/CreateOrJoinFamily';
import {User} from './models/User';

export const TabNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const usr = await AuthService.getUser();
    setUser(usr);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, []),
  );

  return (
    <Tab.Navigator
      barStyle={{backgroundColor: theme.colors.background}}
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}>
      <Tab.Screen
        name={'Shopping list'}
        component={PrepareShoppingListPage}
        options={{
          tabBarIcon: () => {
            return (
              <Icon name={'plus'} color={theme.colors.tertiary} size={20} />
            );
          },
          tabBarLabel: localization.GLOBAL.NEW_LIST_LABEL,
        }}
      />
      <Tab.Screen
        name={'ShoppingLists'}
        component={ShoppingListsPage}
        options={{
          tabBarIcon: () => {
            return (
              <Icon name={'list-ul'} color={theme.colors.tertiary} size={20} />
            );
          },
          tabBarLabel: localization.GLOBAL.SHOPPING_LISTS,
        }}
      />

      {user && user.familyId && (
        <Tab.Screen
          name={'Family'}
          component={FamilyPage}
          options={{
            tabBarIcon: () => {
              return (
                <Icon
                  name={'user-friends'}
                  color={theme.colors.tertiary}
                  size={20}
                />
              );
            },
            tabBarLabel: localization.GLOBAL.FAMILY_LABEL,
          }}
        />
      )}

      {user && !user.familyId && (
        <Tab.Screen
          name={'CreateOrJoin'}
          component={CreateOrJoinFamily}
          options={{
            tabBarIcon: () => {
              return (
                <Icon
                  name={'user-friends'}
                  color={theme.colors.tertiary}
                  size={20}
                />
              );
            },
            tabBarLabel: localization.GLOBAL.FAMILY_LABEL,
          }}
        />
      )}

      <Tab.Screen
        name={'Settings'}
        component={SettingsPage}
        options={{
          tabBarIcon: () => {
            return (
              <Icon name={'cog'} color={theme.colors.tertiary} size={20} />
            );
          },
          tabBarLabel: localization.GLOBAL.SETTINGS_LABEL,
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

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const SnackbarState = SnackBarStore.useState();
  const loaderState = LoaderStore.useState();
  localization.setLanguage('si');

  const stylesheet = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: STYLESHEET.colors.bg_light,
    },
  });
  const theme = {
    ...DefaultTheme,
    colors: isDarkMode ? scheme_purple_dark : scheme_purple_light,
  };
  registerTranslation('en', enGB);

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          ...stylesheet.container,
          backgroundColor: theme.colors.background,
        }}>
        <StatusBar
          barStyle={isDarkMode ? 'dark-content' : 'light-content'}
          backgroundColor={theme.colors.tertiary}
        />
        <NavigationContainer>
          {loaderState.isLoading && (
            <View style={{paddingTop: 20}}>
              <ActivityIndicator
                animating={true}
                color={theme.colors.primary}
                size={'large'}
              />
              <Text style={{textAlign: 'center', marginTop: 10}}>
                {loaderState.text}
              </Text>
            </View>
          )}
          <StackNavigation />
        </NavigationContainer>
      </View>
      <Snackbar
        visible={SnackbarState.isOpen}
        onDismiss={() => {}}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => {
            SnackBarStore.update(s => {
              return {...s, isOpen: false};
            });
          },
        }}>
        {SnackbarState.text}
      </Snackbar>
    </PaperProvider>
  );
}

export default App;
