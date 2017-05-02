import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { changeFilter } from './filters';
import { changeChannels } from './channels';
import { FILTER_CHANGE, CHANNELS_WILL_CHANGE } from '../constans';

export default [
  fork(takeLatest, FILTER_CHANGE, changeFilter),
  fork(takeLatest, CHANNELS_WILL_CHANGE, changeChannels),
];
