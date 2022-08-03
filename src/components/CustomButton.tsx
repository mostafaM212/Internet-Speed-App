import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StylesType } from '../screens/HomeScreen';


type Props = {
  onPress: () => void;
  mainColor: string;
  secondaryColor: string;
  text?: string | undefined;
  iconName: string | undefined;
  iconColor: string | null;
  style: StylesType;
};

export default function CustomButton({
  onPress,
  mainColor,
  secondaryColor,
  text,
  iconName,
  iconColor,
  style
}: Props): FC {
  const [background, setBackground] = useState<number>(new Animated.Value(0));
  
  let backgroundInterpolation: string = background.interpolate({
    inputRange: [0, 1],
    outputRange: [mainColor, secondaryColor],
  });

  const backgroundStyle: object = {
    backgroundColor: backgroundInterpolation,
    
  };
  const onPressHandler = (): void => {
    onPress();
    Animated.sequence([
      Animated.timing(background, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.delay(100),
      Animated.timing(background, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };
  return (
    <TouchableNativeFeedback onPress={onPressHandler}>
      <Animated.View style={[styles.container, backgroundStyle, style]}>
        {iconName !== undefined && (
          <Icon name={iconName} size={25} color={iconColor} />
        )}
        {typeof text !== undefined && (
          <Text style={[styles.text, {color: iconColor}]}>{text}</Text>
        )}
      </Animated.View>
    </TouchableNativeFeedback>
  );
}

let styles : object= StyleSheet.create({
  container: {
    width : '50%',
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent : 'center'
  },
  text: {
    
    marginLeft : 5
  },
});
