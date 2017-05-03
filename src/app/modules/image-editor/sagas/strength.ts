import { put } from "redux-saga/effects";
import { STRENGTH_CHANGED } from '../constans';
import { ImageEditorAction } from "../index";

export function * changeStrength(action: ImageEditorAction) {

  yield put({
    type: STRENGTH_CHANGED,
    payload: action.payload,
  });

}
