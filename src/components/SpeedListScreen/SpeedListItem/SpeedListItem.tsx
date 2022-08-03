import React from 'react';
import {View, Text, TouchableNativeFeedback, Alert} from 'react-native';
import Speed from '../../../helpers/Speed';
import {styles} from './speedListItem';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  speedItem: Speed;
  mainColor: string;
  iconColor: string;
  deleteSpeedHandler: Function;
};

const SpeedListItem = (props: Props) => {
  console.log(props.speedItem.getFormattedSpeed, 'item');
  return (
    <View style={[styles.container2, {backgroundColor: props.mainColor}]}>
      <View style={styles.container4}>
        <Text style={{fontSize: 20, color: props.iconColor}}>
          {props.speedItem.connectionType}
        </Text>
        <Icon name="wifi" size={35} color={props.iconColor} />
      </View>
      <View style={styles.container}>
        <Text style={[styles.title, {color: props.mainColor}]}>
          {props.speedItem.speed.toFixed(2)}
          <Text style={styles.unit}>{props.speedItem.unit}</Text>
        </Text>
        <Icon name="speedometer" size={35} color={props.mainColor} />
      </View>
      <View style={styles.container4}>
        <TouchableNativeFeedback
          onPress={(): void => {
            Alert.alert('Delete', 'Do you want to delete that item ?', [
              {
                text: 'cancel',
                onPress: (): void => {},
              },
              {
                text: 'delete',
                onPress: (): void => {
                  props.deleteSpeedHandler(props.speedItem.id);
                  },
                  
              },
            ]);
          }}>
          <View style={styles.container3}>
            <Icon name="trash" color={props.iconColor} size={35} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default SpeedListItem;
