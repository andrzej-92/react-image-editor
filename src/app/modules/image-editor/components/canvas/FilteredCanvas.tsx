import * as React from "react"
import { connect } from 'react-redux'
import {
  STORAGE_ORIGINAL_IMAGE,
  STORAGE_FILTERED_IMAGE,
  FILTER_NONE,
  FILTER_MEDIANA,
  FILTER_MINIMUM,
  FILTER_MAKSIMUM,
  FILTER_REVERSE
} from '../../constans'
import { store } from '../../../../store';
import { Unsubscribe } from "redux";
import * as classNames from 'classnames'
const styles = require('./canvas.scss');

class FilteredCanvas extends React.Component<any, any> {

  private unsubscribe: Unsubscribe = null;
  private canvas: HTMLCanvasElement = null;

  constructor(props: any) {
    super(props);

    this.state = {
      image: localStorage.getItem(STORAGE_ORIGINAL_IMAGE),
      width: props.width,
      height: props.height,
      isFiltering: false
    };
  }

  componentDidMount() {

    if (!this.state.image) {
      return;
    }

    this.drawImage();

    if (null == this.unsubscribe) {
      this.unsubscribe = store.subscribe(() => {
        this.drawImage();
      });
    }
  }

  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  drawImage = () => {

    let canvas  = this.canvas = document.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
    let context = canvas.getContext('2d');
    let imageObject = new Image();

    imageObject.onload = () => {

      canvas.width = imageObject.width;
      canvas.height = imageObject.height;

      context.clearRect(0,0,  canvas.width, canvas.height);
      context.drawImage(imageObject as HTMLImageElement, 0, 0);

      let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      let arrayData = this.prepareRGBArray(canvas, imageData);
      let { filter } = this.props;

      switch (filter) {
        case FILTER_MAKSIMUM:
          this.maximumFilter(context, arrayData, imageData);
          break;

        case FILTER_MINIMUM:
          this.minimumFilter(context, arrayData, imageData);
          break;

        case FILTER_MEDIANA:
          this.medianaFilter(context, arrayData, imageData);
          break;

        case FILTER_REVERSE:
          this.reverseColorsFilter(context, arrayData, imageData);
          break;

        case FILTER_NONE:
        default:
          // do nothing
          break;
      }

      localStorage.setItem(STORAGE_FILTERED_IMAGE, canvas.toDataURL());
    };

    imageObject.src = this.state.image;
  };

  prepareRGBArray = (canvas: HTMLCanvasElement, imageData: ImageData) => {

      let maxX = canvas.width;
      let maxY = canvas.height;
      let cols = [];
      let rows = [];
      let k = 0;

      for (let y = 0; y < maxY; y++) {
        for (let x = 0; x < maxX; x++) {
          cols.push({
            red: imageData.data[k],
            green: imageData.data[k + 1],
            blue: imageData.data[k + 2],
          });

          k += 4;
        }

        rows.push(cols);
        cols = [];
      }

      return rows;
  };

  reverseColorsFilter = (context: CanvasRenderingContext2D, RGBImageData: any[], imageData: ImageData) => {

    let k: number = 0;
    let { channels } = this.props;

    RGBImageData.forEach((column:any) => {
      column.forEach((pixel:any) => {

        if (channels.red) {
          imageData.data[k] = 255 - pixel.red;
        }

        if (channels.green) {
          imageData.data[k + 1] = 255 - pixel.green;
        }

        if (channels.blue) {
          imageData.data[k + 2] = 255 - pixel.blue;
        }

        imageData.data[k + 3] = 255;
        k += 4;
      });
    });

    context.putImageData(imageData, 0, 0);
  };

  minimumFilter = (context: CanvasRenderingContext2D, RGBImageData: any[], imageData: ImageData) => {

    let k: number = 0;
    let { channels } = this.props;

    RGBImageData.forEach((column:any, i: number) => {
      column.forEach((pixel:any, j:number) => {

        if (channels.red) {
          imageData.data[k] = this.getMinimumValue(RGBImageData, i, j, "red");
        }

        if (channels.green) {
          imageData.data[k + 1] = this.getMinimumValue(RGBImageData, i, j, "green");
        }

        if (channels.blue) {
          imageData.data[k + 2] = this.getMinimumValue(RGBImageData, i, j, "blue");
        }

        imageData.data[k + 3] = 255;
        k += 4;
      });
    });

    context.putImageData(imageData, 0, 0);
  };

  maximumFilter = (context: CanvasRenderingContext2D, RGBImageData: any[], imageData: ImageData) => {

    let k: number = 0;
    let { channels } = this.props;

    RGBImageData.forEach((column:any, i: number) => {
      column.forEach((pixel:any, j:number) => {

        if (channels.red) {
          imageData.data[k] = this.getMaximumValue(RGBImageData, i, j, "red");
        }

        if (channels.green) {
          imageData.data[k + 1] = this.getMaximumValue(RGBImageData, i, j, "green");
        }

        if (channels.blue) {
          imageData.data[k + 2] = this.getMaximumValue(RGBImageData, i, j, "blue");
        }

        imageData.data[k + 3] = 255;
        k += 4;
      });
    });

    context.putImageData(imageData, 0, 0);
  };

  medianaFilter = (context: CanvasRenderingContext2D, RGBImageData: any[], imageData: ImageData) => {

    let k: number = 0;
    let { channels } = this.props;

    RGBImageData.forEach((column:any, i: number) => {
      column.forEach((pixel:any, j:number) => {

        if (channels.red) {
          imageData.data[k] = this.getMediumValue(RGBImageData, i, j, "red");
        }

        if (channels.green) {
          imageData.data[k + 1] = this.getMediumValue(RGBImageData, i, j, "green");
        }

        if (channels.blue) {
          imageData.data[k + 2] = this.getMediumValue(RGBImageData, i, j, "blue");
        }

        imageData.data[k + 3] = 255;
        k += 4;
      });
    });

    context.putImageData(imageData, 0, 0);
  };

  getAllowedValues = (arr: any[], i: number, j:number) => {
    let blockSize = this.getBlockSize();
    let allowedValues: number[] = [];
    let offset = 0;

    switch (blockSize) {
      case 3:
        offset = 1;
        break;

      case 5:
        offset = 2;
        break;

      case 7:
        offset = 3;
        break;

      case 9:
        offset = 4;
        break;

      default:
        break;
    }

    let n = i - offset;
    let m = j - offset;

    for(let k = n; k <= i + offset; k++) {
      for(let l = m; l <= j + offset; l++) {
        try {
          if (arr[k][l]) {
            allowedValues.push(arr[k][l]);
          }
        } catch (e) {
          // out of index
        }
      }
    }

    return allowedValues;
  };

  getMinimumValue = (arr: any[], i: number, j:number, channel: string):number => {

    let min:number = 255;
    let allowedValues = this.getAllowedValues(arr, i, j);

    if (allowedValues.length) {
      allowedValues.forEach((item: any) => {
        if (min > item[channel]) {
          min = item[channel];
        }
      });
    }

    return min;
  };

  getMaximumValue = (arr: any[], i: number, j:number, channel: string):number => {

    let max:number = 0;
    let allowedValues = this.getAllowedValues(arr, i, j);

    if (allowedValues.length) {
      allowedValues.forEach((item: any) => {
        if (max < item[channel]) {
          max = item[channel];
        }
      });
    }

    return max;
  };

  getMediumValue = (arr: any[], i: number, j:number, channel: string):number => {

    let allowedValues = this.getAllowedValues(arr, i, j);
    let channelValues = [];

    if (allowedValues.length) {
      channelValues = allowedValues.map((item:any) => {
        return item[channel];
      })
    }

    channelValues = channelValues.sort((a, b) => {
      return a - b;
    });

    let mediumIndex = Math.floor(channelValues.length / 2);

    if (channelValues.length % 2 == 0) {
      return Math.floor((channelValues[mediumIndex] + channelValues[mediumIndex + 1]) / 2);
    } else {
      return channelValues[mediumIndex + 1]
    }
  };

  getBlockSize = ():number => {
    let { blockSize } = this.props;

    return blockSize;
  };

  downloadCanvas = (e:any) => {
    let date = (new Date()).toUTCString();

    e.target.href = this.canvas.toDataURL();
    e.target.download = `filtered-image-${date}.png`;
  };

  render() {

    let {image, width, height} = this.state;
    let canvasClasses = classNames({
      'loading': this.state.isFiltering
    });
    return (
      <div className={styles.canvasWrapper}>
        <div className={styles.canvasContent}>
          {image ? (
            <div>
              <div>
                <a className={styles.downloadButton} onClick={this.downloadCanvas}>Zapisz</a>
              </div>
              <canvas className={canvasClasses} id="image-canvas" width={width} height={height}/>
            </div>
          ) : (
            <div>
              <h3 className={styles.chooseImage}>Wybierz oryginalny obrazek aby zobaczyć przefiltrowany</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  filter: state.filter,
  channels: state.channels,
  blockSize: state.blockSize
});

export default connect(mapStateToProps)(FilteredCanvas);
