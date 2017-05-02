import { combineReducers } from "redux";
import counter from './counter';
import editorReducers  from '../modules/image-editor/reducers';

export const reducers = combineReducers(Object.assign({
  counter: counter,
}, editorReducers));
