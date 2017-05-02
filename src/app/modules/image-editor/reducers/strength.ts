import { STRENGTH_CHANGED } from '../constans';

const initialState = 0;

export default function strength(state = initialState, action : any) {

  switch (action.type) {

    case STRENGTH_CHANGED:
      return action.payload;

    default:
      return state;
  }
}
