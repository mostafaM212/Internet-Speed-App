import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {StylesType} from '../../screens/HomeScreen';
import {connect} from 'react-redux';
import MainColorSelector from './MainColorSelector';
import {
  SET_MAIN_COLOR,
  SET_ICON_COLOR,
} from '../../redux/actions/settingsActions';
import { IntialState } from '../../redux/reducers/settingsReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = {
  mainColor: string;
  iconColor: string;
  setMainColor: Function<string>;
  setIconColor: Function<string>;
};

type State = {};

class SettingsBox extends Component<Props, State> {
  state = {};

  setMainColorSelector = async (color): Promise<void> => {
    this.props.setMainColor(color);
    const transformedSettings = JSON.stringify({
      mainColor: color,
      iconColor: this.props.iconColor,
    });
    await AsyncStorage.setItem('settings', transformedSettings);
  };
  setIconColorSelector = async (color): Promise<void> => {
      this.props.setIconColor(color);
      const transformedSettings = JSON.stringify({
        iconColor: color,
        mainColor: this.props.mainColor,
      });
      await AsyncStorage.setItem('settings', transformedSettings);
  };
  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.mainColor}]}>
        <MainColorSelector
          onPressHandler={(color): void => {
            this.setMainColorSelector(color);
          }}
          color={this.props.mainColor}
          text={'Main Color'}
        />
        <MainColorSelector
          onPressHandler={(color): void => {
            this.setIconColorSelector(color);
          }}
          color={this.props.iconColor}
          text={'Text Color'}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  mainColor: state.settings.mainColor,
  iconColor: state.settings.iconColor,
});
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    setMainColor: (mainColor: string) =>
      dispatch({type: SET_MAIN_COLOR, mainColor: mainColor}),
    setIconColor: (iconColor: string) =>
      dispatch({type: SET_ICON_COLOR, iconColor: iconColor}),
    setAllSettings: ({iconColor, mainColor}: IntialState) =>
      dispatch({iconColor, mainColor}),
  };
};
const styles: StylesType = StyleSheet.create({
  container: {
    width: '90%',
    height: '80%',
    marginTop: 25,
    opacity: 0.75,
    borderRadius: 15,
    elevation: 5,
    padding: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBox);
