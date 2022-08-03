import { StylesType } from '../../../screens/HomeScreen';
import { StyleSheet , Dimensions} from 'react-native';


export const styles: StylesType = StyleSheet.create({
  container: {
    height: '98%',
    backgroundColor: '#fff',
    width: '33%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 2,
  },
  container2: {
    width: '92%',
    height: Dimensions.get('screen').height * 0.15,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container3: {
    width: 50,
    height: 50,
    backgroundColor: '#bc455d',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  container4: {
    width: '33%',
    height: '98%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
  },
  unit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'green',
  },
});