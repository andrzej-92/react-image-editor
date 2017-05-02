import { put } from "redux-saga/effects";
import { FILTER_CHANGED } from '../constans';

export function * changeFilter(action: any) {

  yield put({
    type: FILTER_CHANGED,
    filter: action.payload,
  });

}
