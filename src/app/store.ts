import createSagaMiddleware from "redux-saga";
import { reducers } from "./reducers/index";
import { sagas } from "./sagas/index";
import {createStore, applyMiddleware} from "redux";

let middlewares = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);


let middleware = applyMiddleware(...middlewares);

const store = createStore(reducers, middleware);

sagaMiddleware.run(sagas);


export { store };
