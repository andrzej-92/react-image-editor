import * as React from "react";
let styles = require('./sidebar.scss');
import RangeSlider from '../range-slider/RangeSlider';

class Sidebar extends React.Component<void, void> {

  render() {
    return (
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarContent}>
          <ul className={styles.navigation}>
            <li>
                <h4>
                  Red
                </h4>
                <RangeSlider volume={0} />
            </li>
            <li>
                <h4>
                  Green
                </h4>
                <RangeSlider volume={0} />
            </li>
            <li>
                <h4>Blue</h4>
                <RangeSlider volume={0} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
