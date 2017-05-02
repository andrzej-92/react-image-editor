import { put } from "redux-saga/effects";
import { CHANNELS_CHANGED } from '../constans';

export function * changeChannels(action: any) {

  yield put({
    type: CHANNELS_CHANGED,
    payload: action.payload,
  });

}
