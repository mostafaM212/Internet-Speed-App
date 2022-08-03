import React , {FunctionComponent} from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { StylesType } from '../../screens/HomeScreen';


type Props = {
  minValue: number;
  maxValue: number;
  progress: number;
  barColor: string;
};

const ProgressBarComponent : FunctionComponent<Props> = (props) => {
  return (
    <React.Fragment>
      <ProgressBar
        color={props.barColor}
        style={styles.container2}
        progress={props.progress}
      />
      <View style={styles.container3}>
        <Text>{`${props.minValue}Mb`}</Text>
        <Text>{`${Math.floor(props.maxValue / 2)}Mb`}</Text>
        <Text>{`${props.maxValue}Mb`}</Text>
      </View>
    </React.Fragment>
  );
};

export default ProgressBarComponent;
const styles: StylesType = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  container3: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  container2: {
    height: 15,
    width: Dimensions.get('screen').width * 0.8,
    borderRadius: 5,
    marginTop: 45,
  },
});