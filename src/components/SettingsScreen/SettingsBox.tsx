import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Text,
  Linking,
} from 'react-native';
import {StylesType} from '../../screens/HomeScreen';
import {connect} from 'react-redux';
import MainColorSelector from './MainColorSelector';
import {
  SET_MAIN_COLOR,
  SET_ICON_COLOR,
} from '../../redux/actions/settingsActions';
import {IntialState} from '../../redux/reducers/settingsReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

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
  handleFeedback: Promise = async (): void => {
    await Linking.openURL('https://github.com/mostafaM212?tab=repositories');
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
        <TouchableNativeFeedback onPress={this.handleFeedback}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="construct" color={this.props.iconColor} size={30} />
              <Text style={styles.title}>FeedBack</Text>
            </View>
            <Icon name="send" color={this.props.iconColor} size={30} />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.container3}>
          <Text style={styles.title}>Contact us</Text>
          <View style={styles.container4}>
            <TouchableNativeFeedback
              onPress={(): void => {
                Linking.openURL('https://facebook.com/Prophet.lov/');
              }}>
              <Icon
                name="logo-facebook"
                color={this.props.iconColor}
                size={30}
                onPress={(): void => {
                  Linking.openURL('https://facebook.com/Prophet.lov/');
                }}
              />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <Icon
                name="logo-google"
                color={this.props.iconColor}
                size={30}
                onPress={(): void => {
                  Linking.openURL(
                    'https://mail.google.com/mail/u/0/#inbox/FMfcgzGqPpZTqwTwKsvXKWStJDLszBSK',
                  );
                }}
              />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <Icon
                name="logo-twitter"
                color={this.props.iconColor}
                size={30}
                onPress={(): void => {
                  Linking.openURL('https://twitter.com/home');
                }}
              />
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <Icon
                name="logo-linkedin"
                color={this.props.iconColor}
                size={30}
                onPress={(): void => {
                  Linking.openURL('https://www.linkedin.com/feed/');
                }}
              />
            </TouchableNativeFeedback>
          </View>
        </View>
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
  container2: {
    width: '100%',
    flexDirection: 'row',
    height: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#cccc',
    borderBottomWidth: 2,
    padding: 20,
  },
  container3: {
    width: '100%',
    height: '15%',
    justifyContent: 'space-between',
  },
  title: {fontSize: 20, marginLeft: 10},
  container4: {
    flexDirection: 'row',
    width: '100%',
    justifyContent : 'space-around'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBox);
