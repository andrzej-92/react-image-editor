import { FILTER_NONE, FILTER_CHANGED } from '../constans';

const initialState = FILTER_NONE;

export default function filter(state = initialState, action : any) {

  switch (action.type) {
    case FILTER_CHANGED:
      return action.filter;

    default:
      return state;
  }
}
