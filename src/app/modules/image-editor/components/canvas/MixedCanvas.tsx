import * as React from "react"
import { connect } from 'react-redux'
import {
  STORAGE_ORIGINAL_IMAGE,
  STORAGE_FILTERED_IMAGE,
} from '../../constans'
import { store } from '../../../../store'
import { Unsubscribe } from "redux";

let styles = require('./canvas.scss');

class MixedCanvas extends React.Component<any, any> {

  private originalImageData: ImageData = null;
  private filteredImageData: ImageData = null;

  private unsubscribeStore: Unsubscribe = null;

  private width: number = 0;
  private height: number = 0;

  constructor(props: any) {
    super(props);

    this.state = {
      originalImage: localStorage.getItem(STORAGE_ORIGINAL_IMAGE),
      filteredImage: localStorage.getItem(STORAGE_FILTERED_IMAGE),
    };
  }

  imageExists = (): boolean => {
    return this.state.originalImage && this.state.filteredImage;
  };

  componentDidMount() {

    this.unsubscribeStore = store.subscribe(
      this.drawMixedImageCanvas
    );

    this.drawOriginalImage()
      .then(this.drawFilteredImage)
      .then(this.drawMixedImageCanvas);
  }

  componentWillUnmount() {
    if (this.unsubscribeStore) {
      this.unsubscribeStore();
    }
  }

  drawOriginalImage = () => {
    return new Promise((resolve) => {
      let canvas = document.getElementById('original-image-canvas') as HTMLCanvasElement;
      let context = canvas.getContext('2d');

      if (canvas && context) {
        let image = new Image();

        image.onload = () => {

          canvas.width = this.width = image.width;
          canvas.height = this.height = image.height;

          context.drawImage(image as HTMLImageElement, 0, 0);

          this.originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);

          resolve();
        };

        image.src = this.state.originalImage;
      }
    });
  };

  drawFilteredImage = () => {
    return new Promise(resolve => {
      let canvas = document.getElementById('filtered-image-canvas') as HTMLCanvasElement;
      let context = canvas.getContext('2d');

      if (canvas && context) {
        let image = new Image();

        image.onload = () => {

          canvas.width = image.width;
          canvas.height = image.height;

          context.drawImage(image as HTMLImageElement, 0, 0);
          this.filteredImageData = context.getImageData(0, 0, canvas.width, canvas.height);

          resolve();
        };

        image.src = this.state.filteredImage;
      }
    });
  };

  drawMixedImageCanvas = () => {

    let { strength } = this.props;
    let ratio = strength / 100;

    return new Promise(resolve => {

      let canvas = document.getElementById('mixed-image-canvas') as HTMLCanvasElement;
      let context = canvas.getContext('2d');

      if (canvas && context) {
        let image = new Image();

        image.onload = () => {

          canvas.width = image.width;
          canvas.height = image.height;

          let imageData = new ImageData(canvas.width, canvas.height);

          for (let i = 0; i < this.originalImageData.data.length; i+= 4) {
            imageData.data[i] = (this.originalImageData.data[i] * (1 - ratio)) + (this.filteredImageData.data[i] * ratio);
            imageData.data[i + 1] = (this.originalImageData.data[i + 1] * (1 - ratio)) + (this.filteredImageData.data[i + 1] * ratio);
            imageData.data[i + 2] = (this.originalImageData.data[i + 2] * (1 - ratio)) + (this.filteredImageData.data[i + 2] * ratio);
            imageData.data[i + 3] = 255;
          }

          context.putImageData(imageData, 0,0);
          resolve();
        };

        image.src = this.state.originalImage;
      }
    });
  };

  render() {
    return (
      <div className={styles.canvasWrapper}>
        <div className={styles.canvasContent}>
          {this.imageExists() ? (
            <div className={styles.mixedCanvasWrapper}>
              <canvas id="original-image-canvas" />
              <canvas id="filtered-image-canvas" />
              <canvas id="mixed-image-canvas" />
            </div>
          ) : (
            <div>
              <h3>Wybierz oryginalny obrazek a następnie odpowiedni filter aby zobaczyć rezultat</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  strength: state.strength
});

export default connect(mapStateToProps)(MixedCanvas);
