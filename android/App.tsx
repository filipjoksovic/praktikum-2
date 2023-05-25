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

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => {
        return {
          headerShown: false,
          // tabBarIcon: props => {
          //   return <Icon name={'rocket'} color={'#900'} size={30} />;
          // },
          tabBarLabelStyle: {
            marginBottom: 5,
          },

          tabBarStyle: {
            height: 60,
          },
          tabBarLabel: () => {
            return null;
          },
        };
      }}>
      <Tab.Screen
        name={'Login'}
        component={LoginPage}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Icon name={'rocket'} color={'#900'} size={30} />;
          },
        }}
      />
      <Tab.Screen
        name={'Register'}
        component={RegisterPage}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Icon name={'rocket'} color={'#900'} size={30} />;
          },
        }}
      />
      <Tab.Screen
        name={'Home'}
        component={HomePage}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Icon name={'home'} color={'#900'} size={30} />;
          },
        }}
      />
      <Tab.Screen
        name={'AccountSetup'}
        component={AccountSetup}
        options={{
          tabBarIcon: ({color, size}) => {
            return <Icon name={'times'} color={'#900'} size={30} />;
          },
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
