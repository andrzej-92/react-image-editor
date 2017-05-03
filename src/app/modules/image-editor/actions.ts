import {
  FILTER_CHANGE,
  STRENGTH_WILL_CHANGE,
  CHANNELS_WILL_CHANGE,
  BLOCK_SIZE_CHANGED
} from './constans';
import {
  FilterInterface,
  ImageEditorAction
} from '.';

export function changeFilter(filter: FilterInterface): ImageEditorAction {
  return {
    type: FILTER_CHANGE,
    payload: filter.name
  }
}

export function changeBlockSize(size: number): ImageEditorAction {
  return {
    type: BLOCK_SIZE_CHANGED,
    payload: size
  }
}

export function changeStrength(value: number): ImageEditorAction {
  return {
    type: STRENGTH_WILL_CHANGE,
    payload: value
  }
}

export function changeChannels(channel: string, value: boolean) {
  return {
    type: CHANNELS_WILL_CHANGE,
    payload: {
      channel: channel,
      value: value
    }
  }
}
