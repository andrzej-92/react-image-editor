
const initialState = 1;

export default function counter(state = initialState, action : any) {

  switch (action.type) {

    case 'COUNTER_INCREMENT':

      return state + action.payload;

    default:
      return state;
  }
}
