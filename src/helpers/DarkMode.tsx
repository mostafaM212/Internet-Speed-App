import React, {useEffect, useState} from 'react';
import {StyleSheet, View, useColorScheme, Animated} from 'react-native';
import {StylesType} from '../screens/HomeScreen';
import FunctionComponent from 'react';

type Props = {
  children: React.ReactNode;
  style: object;
};

export type BackgroundStyle = {
  backgroundColor: string;
  color: string;
  opacity?: string;
};

const DarkMode = (props: Props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    useColorScheme() === 'dark',
  );
  const [opacityAnimation, setOpacityAnimation] = useState<number>(
    new Animated.Value(0),
  );
  const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
    backgroundColor: isDarkMode ? '#0e4d68' : '#cccc',
    color: isDarkMode ? '#0e4d68' : '#cccc',
    opacity: opacityAnimation,
  });
  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Animated.View style={[styles.container, backgroundStyle, props.style]}>
      {props.children}
    </Animated.View>
  );
};

const styles: StylesType = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
});
export default DarkMode;
