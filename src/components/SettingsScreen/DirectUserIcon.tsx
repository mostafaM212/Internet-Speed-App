import React from 'react'
import { Linking, TouchableNativeFeedback  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    name: string;
    color: string;
    link : string
}

const DirectUserIcon = (props: Props) => {
    return (
      <TouchableNativeFeedback
        onPress={(): void => {
          Linking.openURL(props.link);
        }}>
        <Icon name={props.name} color={props.color} size={30} />
      </TouchableNativeFeedback>
    );
}

export default DirectUserIcon
