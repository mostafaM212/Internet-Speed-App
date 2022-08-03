import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import SpeedListScreen from '../screens/SpeedListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAllSettings } from '../redux/actions/settingsActions';

export type BottomNavigationProps = {
  mainColor: string;
  iconColor: string;
};

export type BottomNavigationState = {};

class BottomNavigation extends React.Component<
  BottomNavigationProps,
  BottomNavigationState
> {
  constructor(props: BottomNavigationProps) {
    super(props);

    this.state = {};
  }
  async componentWillMount(): Promise<void> {
    const settings: string | null = await AsyncStorage.getItem('settings')
      .then(e => e)
      .catch(e => console.log(e));

    const transformedSettings: string = JSON.parse(settings);
    if (typeof settings !== 'string') {
      const initialSettings: IntialState = {
        mainColor: 'rgb(125,50,24)',
        iconColor: '#ffffff',
      };
      transformedSettings = JSON.stringify(initialSettings);
      await AsyncStorage.setItem('settings', transformedSettings);
    }
    console.log(transformedSettings , 'trans');
    this.props.setAllSettings(transformedSettings);
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
                  <Icon name="list" size={focused ? 25 : 20} color={color} />
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

const mapDispatchToProps = dispatch => {
  return {
    setAllSpeeds: (allSpeeds: Speed[]): void => {
      dispatch(setAllSpeeds(allSpeeds));
    },
    setAllSettings: (settings: IntialState) =>
      dispatch(setAllSettings(settings)),
  };
};
export default connect(mapStateToProps , mapDispatchToProps)(BottomNavigation);
