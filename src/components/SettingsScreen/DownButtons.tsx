import React, {ReactNode} from 'react';
import {View, StyleSheet, CameraRoll, ToastAndroid} from 'react-native';
import {Text} from 'react-native-paper';
import {StylesType} from '../../screens/HomeScreen';
import CustomButton from '../CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {captureScreen} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {PERMISSIONS, check} from 'react-native-permissions';
import {requestPermission} from '../../helpers/getUserPermission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SpeedType, setSpeed} from '../../redux/actions/speedsActions';
import Speed from '../../helpers/Speed';

type Props = {
  currentSpeed: Speed;
};

const DownButtons = (props: Props): ReactNode => {
  const {mainColor, iconColor} = useSelector(state => state.settings);
  const {speeds} = useSelector(state => state.speeds);

  const dispatch = useDispatch();
  const takeScreenShotHandler: Promise<void> = async () => {
    var path = RNFS.DownloadDirectoryPath + '/SpeedTest';
    await RNFS.mkdir(path);

    const data = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    if (data === 'denied') {
      requestPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    } else if (data === 'granted') {
      await captureScreen({
        format: 'jpg',
        quality: 0.8,
      }).then(
        (uri: string) => {
          var filename = uri.substring(uri.lastIndexOf('/') + 1);
          RNFS.moveFile(uri, path + `/${filename}`)
            .then((): void => {
              ToastAndroid.show('The Photo has been saved Successfully', 2000);
            })
            .catch(e => console.log(e));
        },
        error => console.error('Oops, snapshot failed', error),
      );
    } else {
      console.log('error');
    }

    console.log(data);
    /**/
  };

  const onSaveValueHandler: Promise = async (): void => {
    const allSpeeds: Speed[] = [props.currentSpeed, ...speeds];
    const transformedData: string = JSON.stringify(allSpeeds);

    await AsyncStorage.setItem('speeds', transformedData).then(res => {
      ToastAndroid.show('The Speed has been saved Successfully', 1000);
      dispatch(setSpeed(props.currentSpeed));
    }).catch(e =>console.log(e));
  };
  return (
    <View style={styles.container}>
      <CustomButton
        iconColor={iconColor}
        iconName={'camera'}
        mainColor={mainColor}
        secondaryColor={'green'}
        style={{width: '40%'}}
        onPress={takeScreenShotHandler}
      />
      <CustomButton
        iconColor={iconColor}
        iconName={'save'}
        mainColor={mainColor}
        secondaryColor={'green'}
        style={{width: '40%'}}
        onPress={onSaveValueHandler}
      />
    </View>
  );
};

export default DownButtons;

const styles: StylesType = StyleSheet.create({
  container: {
    width: '70%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
