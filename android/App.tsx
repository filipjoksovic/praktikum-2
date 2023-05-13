import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {STYLESHEET} from './resources/styles/STYLESHEET';
import {RegisterPage} from './modules/auth/pages/RegisterPage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginPage} from './modules/auth/pages/LoginPage';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
    </Tab.Navigator>
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const stylesheet = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: STYLESHEET.colors.bg_light,
    },
  });

  return (
    <SafeAreaView style={stylesheet.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={STYLESHEET.colors.bg_light}
      />
      <NavigationContainer>
        {/*<LoginPage />*/}
        {/*<RegisterPage />*/}
        <TabNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
