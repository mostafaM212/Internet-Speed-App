import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SettingsBox from '../components/SettingsScreen/SettingsBox';
import DarkMode from '../helpers/DarkMode';
import { StylesType } from './HomeScreen';

export interface SettingsScreenProps {}

export interface SettingsScreenState {}

export default class SettingsScreen extends React.Component<
  SettingsScreenProps,
  SettingsScreenState
> {
  constructor(props: SettingsScreenProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <DarkMode>
        <Text style={styles.title}>Settings</Text>
        <SettingsBox />
      </DarkMode>
    );
  }
}

const styles: StylesType = StyleSheet.create({
  container: {},
  title: {
    fontSize : 25
  }
})