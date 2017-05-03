import * as React from "react"
import {connect} from 'react-redux'
import {Switch, RadioGroup, RadioButton} from 'react-toolbox'
import RangeSlider from '../range-slider/RangeSlider'
import {changeStrength, changeFilter, changeChannels, changeBlockSize} from '../../actions'
import {store} from '../../../../store'
import {
  FILTER_NONE,
  FILTER_MINIMUM,
  FILTER_MAKSIMUM,
  FILTER_MEDIANA,
  FILTER_REVERSE
} from '../../constans';

let styles = require('./sidebar.scss');

class Sidebar extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      filter: FILTER_NONE,
      blockSize: 3,
      strength: 0,
      channels: props.channels
    }
  }

  componentWillMount() {
    store.subscribe(() => {
      const state: any = store.getState();

      this.setState({
        channels: state.channels
      });
    });
  }

  isMixedTabActive = ():boolean => {
    let { index } = this.props;
    return index == 2;
  };

  isOriginalTabActive = ():boolean => {
    let { index } = this.props;
    return index == 0;
  };

  handleChannelsChange = (channel: string, value: boolean) => {

    const { dispatch } = this.props;

    dispatch(changeChannels(channel, value));
  };

  handleFilterChange = (value: string) => {

    this.setState({
      filter: value
    });

    const {dispatch} = this.props;

    dispatch(changeFilter({
      name: value
    }));
  };

  handleBlockSizeChange = (value: string) => {

    this.setState({
      blockSize: value
    });

    const {dispatch} = this.props;

    dispatch(changeBlockSize(parseInt(value)));
  };

  handleStrengtValueChange = (value: number) => {

    this.setState({
      strength: value
    });

  };

  dispatchStrengthChange = () => {
    const {dispatch} = this.props;

    dispatch(changeStrength(this.state.strength));
  };

  activeFilterSection = () => (
    <div>
      <h4>Aktywny filter</h4>
      <div>
        <RadioGroup name='filter' value={this.state.filter} onChange={this.handleFilterChange}>
          <RadioButton label='Off' value={FILTER_NONE}/>
          <RadioButton label='Minimalny' value={FILTER_MINIMUM}/>
          <RadioButton label='Maksymalny' value={FILTER_MAKSIMUM}/>
          <RadioButton label='Medianowy' value={FILTER_MEDIANA}/>
          <RadioButton label='Negatyw' value={FILTER_REVERSE}/>
        </RadioGroup>
      </div>
    </div>
  );

  blockSizeSection = () => (
    <div>
      <h4>Wielkość bloku</h4>
      <div>
        <RadioGroup name='filter' value={this.state.blockSize.toString()} onChange={this.handleBlockSizeChange}>
          <RadioButton label='3x3' value="3"/>
          <RadioButton label='5x5' value="5"/>
          <RadioButton label='7x7' value="7"/>
          <RadioButton label='9x9' value="9"/>
        </RadioGroup>
      </div>
    </div>
  );

  channelsSection = () => {
    let { channels } = this.props;
    return (
      <div>
        <h4>Kanały</h4>
        <div>
          <Switch
            checked={channels.red}
            label="RED"
            onChange={this.handleChannelsChange.bind(this, 'red')}
          />
        </div>
        <div>
          <Switch
            checked={channels.green}
            label="GREEN"
            onChange={this.handleChannelsChange.bind(this, 'green')}
          />
        </div>
        <div>
          <Switch
            checked={channels.blue}
            label="BLUE"
            onChange={this.handleChannelsChange.bind(this, 'blue')}
          />
        </div>
      </div>
    );
  };

  navigationSection = () => {

    if (this.isMixedTabActive()) {
      return (
        <div>
          <h4>Krycie</h4>
          <RangeSlider
            volume={0}
            onChange={this.handleStrengtValueChange}
            onDragStop={this.dispatchStrengthChange}
          />
        </div>
      );
    }

    return (
      <div>
        {this.activeFilterSection()}
        {this.blockSizeSection()}
        {this.channelsSection()}
      </div>
    )
  };

  render() {

    return (
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarContent}>
          <div className={styles.navigation}>
            {this.isOriginalTabActive()
              ? (
                <div>
                  <h4>Po wybraniu obrazu przejdź do filtrów</h4>
                </div>
              ) : (
                <div>
                  {this.navigationSection()}
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  channels: state.channels
});

export default connect(mapStateToProps)(Sidebar);
