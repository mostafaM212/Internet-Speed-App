/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {type PropsWithChildren} from 'react';
import {StylesType} from './screens/HomeScreen';
import {StyleSheet} from 'react-native';
import BottomNavigation from './navigation/BottomNavigation';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxThunk from 'redux-thunk';
import settingsReducer, {IntialState} from './redux/reducers/settingsReducers';
import {speedsReducer} from './redux/reducers/speedsReduser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Speed from './helpers/Speed';
import {setAllSpeeds} from './redux/actions/speedsActions';
import {setAllSettings} from './redux/actions/settingsActions';

class App extends React.Component {
  constructor() {
    super();
  }
  async componentDidMount(): Promise<void> {
    
  }

  render(): React.ReactNode {
    const mainReducer = combineReducers({
      settings: settingsReducer,
      speeds: speedsReducer,
    });
    const store = createStore(mainReducer, applyMiddleware(reduxThunk));
    return (
      <Provider store={store}>
        <BottomNavigation />
      </Provider>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setAllSettings: (settings: IntialState): void => {
      dispatch(setAllSettings(settings));
    },
  };
};
const mapStateToProps = state => {
  return {
    settings: state.settings,
  };
};
export default (App);

const style: StylesType = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
