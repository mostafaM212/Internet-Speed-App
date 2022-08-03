import * as React from 'react';
import {Text, StyleSheet, LogBox, ActivityIndicator} from 'react-native';
import {
  measureConnectionSpeed,
  NetworkBandwidthTestResults,
} from 'react-native-network-bandwith-speed';
import DarkMode from '../helpers/DarkMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InternetSpeedDisplayer from '../components/HomeScreen/InternetSpeedDisplayer';
import ProgressBarComponent from '../components/HomeScreen/ProgressBarComponent';
import CustomButton from '../components/CustomButton';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import DownButtons from '../components/SettingsScreen/DownButtons';
import {SpeedType} from '../redux/actions/speedsActions';
import Speed from '../helpers/Speed';
import {setAllSpeeds} from '../redux/actions/speedsActions';
import { setAllSettings } from '../redux/actions/settingsActions';
import { IntialState } from '../redux/reducers/settingsReducers';
export type HomeScreenProps = {
  mainColor: string;
  iconColor: string;
};

export type HomeScreenState = {
  isConnected: boolean;
  speed: Speed;
  rato: number;
  dividedRato: number;
  connectionType: string;
  showActivityIndicator: boolean;
};

type Speed = {
  unit: string | undefined;
  speed: number | undefined;
};

export type StylesType = {
  container: object;
  container2?: object;
  container3?: object;
  container4?: object;
  title?: object;
  rato: number;
  dividedRato: number;
};

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  constructor(props: HomeScreenProps) {
    super(props);
  }
  state = {
    isConnected: false,
    speed: {},
    rato: 0,
    dividedRato: 0,
    connectionType: 'none',
    showActivityIndicator: false,
  };
  shouldComponentUpdate(
    nextProps: Readonly<HomeScreenProps>,
    nextState: Readonly<HomeScreenState>,
    nextContext: any,
  ): boolean {
    return NetInfo.fetch()
      .then(connection => {
        return nextState.isConnected !== connection.isConnected;
      })
      .catch(e => console.log(e));
  }

  getNetworkBandwidth = async (): Promise<void> => {
    let speed: Speed = {unit: '', speed: ''};
    try {
      const networkSpeed: NetworkBandwidthTestResults =
        await measureConnectionSpeed();
      //console.log(networkSpeed); // Network bandwidth speed
      speed = {
        unit: networkSpeed.metric,
        speed: networkSpeed.speed,
      };
      let dividedRato = 0;
      if (speed.speed < 10) {
        dividedRato = 10;
      } else if (speed.speed < 25) {
        dividedRato = 25;
      } else {
        dividedRato = 100;
      }
      //console.log(parseInt(speed.speed) / parseInt(dividedRato));
      this.setState({
        speed,
        rato: parseInt(speed.speed) / parseInt(dividedRato),
        dividedRato: dividedRato,
      });
    } catch (err) {
      console.log(err);
    }
  };
  checkInternetConnection = (): Promise<Void> => {
    NetInfo.fetch()
      .then(connection => {
        /*console.log('Connection type', connection.type);
        console.log('Is connected?', connection.isConnected);*/

        this.setState({
          isConnected: connection.isConnected,
          connectionType: connection.type,
        });
        return connection;
      })
      .catch(e => console.log(e));
  };
  onRefreshHandler = (): Promise => {
    this.setState({
      showActivityIndicator: true,
    });
    return Promise.all([
      this.checkInternetConnection(),
      this.getNetworkBandwidth(),
    ])
      .then(res => {
        this.setState({
          showActivityIndicator: false,
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          showActivityIndicator: false,
        });
      });
    this.forceUpdate();
  };
  componentDidMount =async (): Promise<void> => {
    Promise.all([this.checkInternetConnection(), this.getNetworkBandwidth()]);

    
  };
  componentWillMount(): void {
    AsyncStorage.getItem('speeds')
      .then((speeds: string | null) => {
        const formattedSpeeds: Speed[] = JSON.parse(speeds);

        this.props.setAllSpeeds(formattedSpeeds);
      })
      .catch(e => console.log(e));
  }
  public render() {
    LogBox.ignoreAllLogs(true);
    const currentSpeed: SpeedType = {
      speed: this.state.speed,
      connectionType: this.state.connectionType,
    };
    return (
      <DarkMode>
        <Text style={[styles.title, {color: this.props.iconColor}]}>
          Internet Speed Connection
        </Text>
        {!this.state.isConnected ? (
          <>
            <Text style={[styles.title, {color: this.props.iconColor}]}>
              No Internet
            </Text>
            <InternetSpeedDisplayer
              backgroundColor={this.props.mainColor}
              internetSpeed={undefined}
              internetSpeedUnit={'Mb'}
            />
          </>
        ) : (
          <React.Fragment>
            <InternetSpeedDisplayer
              backgroundColor={this.props.mainColor}
              internetSpeed={this.state.speed.speed}
              internetSpeedUnit={this.state.speed.unit}
            />
            <Text style={[styles.title, {color: this.props.iconColor}]}>
              {' '}
              Connection Type :{' '}
              <Text style={{color: 'green'}}>{this.state.connectionType}</Text>
            </Text>
            <ProgressBarComponent
              barColor={this.props.mainColor}
              minValue={0}
              maxValue={this.state.dividedRato}
              progress={this.state.rato}
            />
          </React.Fragment>
        )}
        {this.state.showActivityIndicator ? (
          <ActivityIndicator
            size={40}
            color={this.props.mainColor}
            style={{marginTop: 10}}
          />
        ) : (
          <React.Fragment>
            <CustomButton
              iconName="refresh"
              mainColor={this.props.mainColor}
              secondaryColor={'#0984a6'}
              text={'Refresh'}
              onPress={this.onRefreshHandler}
              iconColor={this.props.iconColor}
              style={styles.container4}
            />
            <DownButtons
              currentSpeed={
                new Speed(
                  this.state.connectionType,
                  this.state.speed.speed,
                  this.state.speed.unit,
                )
              }
            />
          </React.Fragment>
        )}
      </DarkMode>
    );
  }
}
const mapStateToProps = state => ({
  mainColor: state.settings.mainColor,
  iconColor: state.settings.iconColor,
});
const mapDispatchToProps = dispatch => {
  return {
    setAllSpeeds: (allSpeeds: Speed[]): void => {
      dispatch(setAllSpeeds(allSpeeds));
    },
    setAllSettings : (settings : IntialState) =>dispatch(setAllSettings(settings))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const styles: StylesType = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  title: {
    fontSize: 20,
    marginTop: 25,
    fontWeight: 'bold',
  },
  container4: {
    marginTop: 30,
  },
});
