import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import SpeedListScreen from '../screens/SpeedListScreen';

type RootStackParamList = {
  Home: undefined;
  Profile: {userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};
export type BottomNavigationProps = {
  mainColor: string;
  iconColor : string
}

export type BottomNavigationState = {};

class BottomNavigation extends React.Component<
  BottomNavigationProps,
  BottomNavigationState
> {
  constructor(props: BottomNavigationProps) {
    super(props);

    this.state = {};
  }

  public render(): React.ReactNode {
    const BottomNavigation = createMaterialBottomTabNavigator();
    return (
      <NavigationContainer>
        <BottomNavigation.Navigator
          initialRouteName="HomeScreen"
          barStyle={{backgroundColor: this.props.mainColor}}
          inactiveColor={'#cccc'}
          activeColor={this.props.iconColor}>
          <BottomNavigation.Screen
            component={SpeedListScreen}
            name="SpeedListScreen"
            options={{
              title: 'Recorded Speed',
              tabBarIcon: ({focused, color}) => {
                return (
                  <Icon
                    name="list"
                    size={focused ? 25 : 20}
                    color={color}
                  />
                );
              },
            }}
          />
          <BottomNavigation.Screen
            component={HomeScreen}
            name="HomeScreen"
            options={{
              title: 'Speed Tester',
              tabBarIcon: ({focused, color}) => {
                return (
                  <Icon
                    name="speedometer"
                    size={focused ? 25 : 20}
                    color={color}
                  />
                );
              },
            }}
          />
          <BottomNavigation.Screen
            component={SettingsScreen}
            name="SettingsScreen"
            options={{
              title: 'Settings',
              tabBarIcon: ({focused, color}) => {
                return (
                  <Icon
                    name="settings"
                    size={focused ? 25 : 20}
                    color={color}
                  />
                );
              },
            }}
          />
        </BottomNavigation.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps: Function = state => {
  return {
    mainColor: state.settings.mainColor,
    iconColor: state.settings.iconColor,
  };
};
export default connect(mapStateToProps)(BottomNavigation);
