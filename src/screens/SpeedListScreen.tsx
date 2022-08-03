import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import {connect} from 'react-redux';
import {SpeedType, setAllSpeeds} from '../redux/actions/speedsActions';
import DarkMode from '../helpers/DarkMode';
import {StylesType} from './HomeScreen';
import SpeedListItem from '../components/SpeedListScreen/SpeedListItem/SpeedListItem';
import Speed from '../helpers/Speed';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  speeds: Speed[];
};

type State = {};

class SpeedListScreen extends Component<Props, State> {
  state = {};

  render() {
    const mainColor: string = this.props.settings.mainColor;

    const deleteSpeedHandler: Promise = async (itemId: string): void => {
      const newSpeeds: Speed[] = this.props.speeds.filter((item, index) => {
        return item.id !== itemId;
      });
      this.props.setAllSpeeds(newSpeeds);

      const transformedSpeeds: string = JSON.stringify(newSpeeds);
        await AsyncStorage.setItem('speeds', transformedSpeeds).then((r):void => {
          ToastAndroid.show('The Item is removed Successfully!',2000)
      }).catch(e =>console.log(e));
    };
    return (
      <DarkMode>
        <Text style={styles.title}>All Mesured Speeds</Text>
        <ScrollView style={styles.container}>
          {this.props.speeds.map((speed: Speed, index: number) => (
            <SpeedListItem
              mainColor={this.props.settings.mainColor}
              iconColor={this.props.settings.iconColor}
              speedItem={speed}
              key={speed.id}
              deleteSpeedHandler={deleteSpeedHandler}
            />
          ))}
        </ScrollView>
      </DarkMode>
    );
  }
}
const mapStateToProps = state => {
  return {
    speeds: state.speeds.speeds,
    settings: state.settings,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setAllSpeeds: (speeds: Speed[]) => dispatch(setAllSpeeds(speeds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeedListScreen);

const styles: StylesType = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
  },
});
