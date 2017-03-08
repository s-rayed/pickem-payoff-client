import { UPDATE_CHOICE, UPDATE_CHOICE_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case UPDATE_CHOICE:
      return { ...state, choiceMade: true };
    case UPDATE_CHOICE_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}