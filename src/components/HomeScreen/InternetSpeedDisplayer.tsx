import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import {StylesType} from '../../screens/HomeScreen';
import {IntialState} from '../../redux/reducers/settingsReducers';
import {connect} from 'react-redux';

type Props = {
  backgroundColor: string;
  internetSpeed: number | undefined;
  internetSpeedUnit: string | undefined;
  iconColor: string;
};

type State = {
  opacityAnimation: number;
  speedAnimation: number;
};

type OpacityStyle = {
  opacity: number;
};

class InternetSpeedDisplayer extends Component<Props, State> {
  state = {
    opacityAnimation: new Animated.Value(0),
    speedAnimation: new Animated.Value(0),
  };

  startAnimation = (): void => {
    Animated.sequence([
      Animated.timing(this.state.opacityAnimation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }),
      Animated.delay(10000),
      Animated.timing(this.state.opacityAnimation, {
        toValue: 0.5,
        duration: 5000,
        useNativeDriver: false,
      }),
      Animated.delay(10000),
      Animated.timing(this.state.opacityAnimation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  componentDidMount(): void {
    this.startAnimation();
  }
    render() {
      console.log(this.props);
    let opacityStyle: OpacityStyle = {
      opacity: this.state.opacityAnimation,
      backgroundColor: this.props.backgroundColor,
    };
    return (
      <Animated.View style={[styles.container, opacityStyle]}>
        <Animated.Text style={[styles.title, {color: this.props.iconColor}]}>
          {typeof this.props.internetSpeed == 'undefined'
            ? 'No internet'
            : this.props.internetSpeed.toFixed(3)}
        </Animated.Text>
        <Text style={{color : this.props.iconColor}}>{this.props.internetSpeedUnit}</Text>
      </Animated.View>
    );
  }
}
const mapStateToProps: IntialState = (state: IntialState) => {
  return {
    iconColor: state.settings.iconColor,
  };
};
export default connect(mapStateToProps)(InternetSpeedDisplayer);

const styles: StylesType = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').width * 0.8,
    borderRadius: (Dimensions.get('screen').width * 0.8) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  title: {
    fontSize: 45,
  },
});
