import {IntialState} from '../reducers/settingsReducers';
export const SET_MAIN_COLOR: string = 'SET_MAIN_COLOR';
export const SET_ICON_COLOR: string = 'SET_ICON_COLOR';
export const SET_ALL_SETTINGS: string = 'SET_ALL_SETTINGS';
export const GET_SETTINGS: string = 'GET_SETTINGS';

export const setMainColor =
  (mainColor: string): void =>
  dispatch => {
    dispatch({
      type: SET_MAIN_COLOR,
      mainColor: mainColor,
    });
  };

export const setIconColor =
  (iconColor: string): void =>
  dispatch => {
    dispatch({
      type: SET_ICON_COLOR,
      iconColor: iconColor,
    });
  };

export const getSettings = (): void => dispatch => {
  dispatch({
    type: GET_SETTINGS,
  });
};

export const setAllSettings =
  ({mainColor, iconColor}: IntialState): void =>
      dispatch => {
      console.log({mainColor, iconColor} , 'actions');
    dispatch({
      type: SET_ALL_SETTINGS,
      mainColor: mainColor,
      iconColor: iconColor,
    });
  };
