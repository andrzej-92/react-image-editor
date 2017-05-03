import * as React from "react"
import {Slider} from "react-toolbox/lib/slider";
const style = require('./rangeSlider.scss');

interface RangeSliderPropsInterface {
  volume?: number,
  name?: string,
  onChange?: Function
  onDragStop?: Function
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

  handleChange = (value: number) => {

    this.setState({
      value: value
    });

    if (this.props.onChange) {
      this.props.onChange.call(this, value);
    }
  };

  handleDragStop = () => {
    if (this.props.onDragStop) {
      this.props.onDragStop.call(this);
    }
  };

  render() {

    return (
      <div>
        <table className={style.wrapper}>
          <tbody>
          <tr>
            <td className={style.sliderWrapper}>
              <Slider
                min={0}
                max={100}
                step={1}
                value={this.state.value}
                onChange={this.handleChange}
                onDragStop={this.handleDragStop}
              />
            </td>
            <td className={style.sliderValue}>
              {this.state.value}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default RangeSlider;
