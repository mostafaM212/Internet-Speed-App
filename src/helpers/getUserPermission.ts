

import {request} from 'react-native-permissions';

//...
export const requestPermission = async (permission) => {
  await request(
    permission,
    {
      title: 'Get Read External Storage Access',
      message: 'get read external storage access for detecting screenshots',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
};