import { ChannelsInterface } from '..';
import { CHANNELS_CHANGED } from '../constans';

let initialState: ChannelsInterface = {
  red: true,
  green: true,
  blue: true,
};

export default function channels(state = initialState, action: any) {

  switch (action.type) {

    case CHANNELS_CHANGED:
      const { channel, value } = action.payload;

      let newState = state;
      newState[channel] = !state[channel];

      return newState;

    default:
      return state;
  }
}
