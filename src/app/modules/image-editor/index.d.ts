import { Action } from "redux";

export interface FilterInterface {
  name: string
}

export interface ChannelsInterface {
  red: boolean,
  green: boolean,
  blue: boolean,
  [key: string]: boolean;
}

export interface ImageEditorAction extends Action {
  payload: any
}

export interface RGBPixelInterface {
  red: number,
  green: number,
  blue: number,
  [key: string]: number;
}
