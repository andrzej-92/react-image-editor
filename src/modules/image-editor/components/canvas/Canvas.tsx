import * as React from "react";
let styles = require('./canvas.scss');

interface CanvasPropsInterface {
  width: number,
  height: number
}

class Canvas extends React.Component<CanvasPropsInterface, {}> {


  constructor(props: CanvasPropsInterface) {
    super(props);

    this.state = {
      image: null
    };
  }

  render() {

    const { width, height } = this.props;

    return (
      <div className={styles.canvasWrapper}>
        <div className={styles.canvasContent}>
          <canvas width={width} height={height}>

          </canvas>
        </div>
      </div>
    );
  }
}

export default Canvas;
