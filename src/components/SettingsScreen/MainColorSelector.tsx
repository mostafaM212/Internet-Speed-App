import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {StylesType} from '../../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = {
  color: string;
    text: string;
  onPressHandler : Function<string>
};

const colors: string[] = [
  'rgb(125,50,24)',
  '#ffc3c4',
  '#ffd9a6',
  '#0c2a7f',
  '#087ebd',
  '#03defc',
  '#ffffff',
  '#a05943',
];
const MainColorSelector = (props: Props) => {
    
    
    const changeColorHandler = (color : string): void => {
        
        props.onPressHandler(color)
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.text}</Text>
      <View style={styles.container3}>
        {colors.map(
          (color, index): ReactNode => (
            <TouchableNativeFeedback onPress={():void=>{changeColorHandler(color)}} key={index}>
              <View style={[styles.container2, {backgroundColor: color}]}>
                {props.color === color && <Icon name="checkmark" size={35} />}
              </View>
            </TouchableNativeFeedback>
          ),
        )}
      </View>
    </View>
  );
};

export default MainColorSelector;

const styles: StylesType = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#cccc',
  },
  title: {
    fontSize: 15,
    marginVertical: 5,
    color : '#ccc'
  },
  container2: {
    width: 60,
    height: 60,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  container3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
