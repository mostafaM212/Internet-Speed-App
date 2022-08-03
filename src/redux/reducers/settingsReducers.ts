import {
  SET_MAIN_COLOR,
  SET_ICON_COLOR,
  SET_ALL_SETTINGS,
} from '../actions/settingsActions';
export type IntialState = {
  mainColor?: string;
  iconColor?: string;
};

const insitalState: IntialState = {
  mainColor: 'rgb(125,50,24)',
  iconColor: '#fff',
};

const settingsReducer = (
  state: IntialState = insitalState,
  action: object,
): IntialState => {
  console.log(state, action);
  switch (action.type) {
    case SET_MAIN_COLOR:
      return {
        ...state,
        mainColor: action.mainColor,
      };
      break;
    case SET_ICON_COLOR:
      return {
        ...state,
        iconColor: action.iconColor,
      };
      break;
    case SET_ALL_SETTINGS:
      return {
        ...state,
        iconColor: action.iconColor,
        mainColor: action.mainColor,
      };
      break;
    default:
      return state;
      break;
  }
};

export default settingsReducer;
