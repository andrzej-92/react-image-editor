import * as React from "react"
import {Button} from 'react-toolbox'
import {STORAGE_ORIGINAL_IMAGE} from '../../constans'
let styles = require('./canvas.scss');

interface CanvasPropsInterface {
  width: number,
  height: number,
}

class Canvas extends React.Component<CanvasPropsInterface, any> {

  constructor(props: CanvasPropsInterface) {
    super(props);

    this.state = {
      image: localStorage.getItem(STORAGE_ORIGINAL_IMAGE),
      width: props.width,
      height: props.height
    };

  }

  componentDidMount() {

    if (!this.state.image) {
      return;
    }

    this.drawImage();
  }

  setImage = (reader: FileReader) => {

    localStorage.setItem(STORAGE_ORIGINAL_IMAGE, reader.result);

    this.setState({
      image: reader.result
    });

  };

  drawImage = () => {

    let canvas = document.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
    let context = canvas.getContext('2d');

    if (canvas && context) {
      let imageObject = new Image();

      imageObject.onload = () => {

        this.setState({
          width: imageObject.width,
          height: imageObject.height
        });

        context.drawImage(imageObject as HTMLImageElement, 0, 0);
      };

      imageObject.src = this.state.image;
    }
  };

  handleImageChange = (ev: any) => {
    let file = ev.target.files[0];

    if (!file) {
      return;
    }

    let fileReader: FileReader = new FileReader();

    fileReader.onload = () => {
      this.setImage(fileReader);
      this.drawImage();
    };

    fileReader.readAsDataURL(file);
  };

  resetImage = () => {
    this.setState({
      image: null
    });

    localStorage.removeItem(STORAGE_ORIGINAL_IMAGE);
  };

  render() {

    const {image, width, height} = this.state;

    return (
      <div className={styles.canvasWrapper}>
        <div className={styles.canvasContent}>
          {image ? (
            <div>
              <div>
                <Button className={styles.changeButton} onClick={this.resetImage}>&times;</Button>
              </div>
              <canvas id="image-canvas" width={width} height={height}/>
            </div>
          ) : (
            <div className={styles.fileLoaderWrapper}>
              <h3>Wybierz obraz z dysku</h3>
              <input type="file" name="file" onChange={this.handleImageChange}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Canvas;
