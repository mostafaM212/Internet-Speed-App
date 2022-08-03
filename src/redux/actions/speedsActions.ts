import Speed from '../../helpers/Speed';
export const SET_SPEED: string = 'SET_SPEED';
export const SET_All_SPEEDS: string = 'SET_All_SPEEDS';
export const DELETE_SPEED: string = 'DELETE_SPEED';
export const GET_SPEEDS: string = 'GET_SPEEDS';

export type SpeedType = {
  speed: {
    speed: number;
    unit: string;
  };
  connectionType: string;
};

export const setSpeed =
  (speed: Speed): void =>
  (dispatch): void => {
    dispatch({
      type: SET_SPEED,
      speed: speed,
    });
  };

export const getSpeeds =
  (): void =>
  (dispatch): void => {
    dispatch({
      type: GET_SPEEDS,
    });
  };

export const setAllSpeeds =
  (speeds: Speed[]): void =>
      (dispatch): void => {
      
          dispatch({
              type: SET_All_SPEEDS,
              speeds : speeds
          })
        };
  
export const deleteSpeed: void = (id : string) => dispatch => {
      
    dispatch({
        type: DELETE_SPEED,
        speedId : id
    })
  }
