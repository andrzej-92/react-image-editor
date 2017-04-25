import * as React from "react"
let styles = require('./range-slider.scss');

interface RangeSliderPropsInterface {
  volume?: number
}

interface RangeSliderStateInterface {
  value?: number
}

class RangeSlider extends React.Component<RangeSliderPropsInterface, RangeSliderStateInterface> {

  constructor(props: RangeSliderPropsInterface) {
    super(props);

    this.state = {
      value: 0
    }
  }

  handleChange = (event: any) => {

    this.setState({
      value: event.target.value
    });

  };

  render() {

    return (
      <div>
        <input className={styles.rangeSlider}
               type="range"
               defaultValue={this.state.value.toString()}
               value={this.state.value.toString()}
               onChange={this.handleChange}
               min="0"
               max="255"
               step="1"
        />
        <input className={styles.rangeValue}
               type="number"
               min="0"
               max="255"
               step="1"
               defaultValue={this.state.value.toString()}
               onChange={this.handleChange}
               value={this.state.value.toString()}
        />
      </div>

    )
  }
}

export default RangeSlider;
