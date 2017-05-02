import { BLOCK_SIZE_CHANGED } from '../constans';

const initialState = 3;

export default function blockSize(state = initialState, action : any) {

  switch (action.type) {
    case BLOCK_SIZE_CHANGED:
      return action.payload;

    default:
      return state;
  }
}
