import {
  SET_SPEED,
  SET_All_SPEEDS,
  DELETE_SPEED,
} from '../actions/speedsActions';
import Speed from '../../helpers/Speed';
type InitialStateType = {
  speeds: Speed[];
};
type ActionType = {
  type: string;
  speed?: Speed;
  speeds?: Speed[];
};

const initialState: InitialStateType = {
  speeds: [],
};

export const speedsReducer = (
  state: InitialStateType = initialState,
  action: ActionType,
): InitialStateType => {
  switch (action.type) {
    case SET_SPEED:
      return {
        ...state,
        speeds: [action.speed, ...state.speeds],
      };
      break;
    case SET_All_SPEEDS:
      return {
        ...state,
        speeds: action.speeds,
      };
      break;
    case DELETE_SPEED:
      const elementIndex: number = state.findIndex(
        item => item.id === action.id,
      );
      return {
        ...state,
        speeds: state.speeds.splice(elementIndex, 1),
      };
      break;
    default:
      return state;
      break;
  }
};
