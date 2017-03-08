import { GET_DATA, GET_DATA_ERROR } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_DATA:
      return { ...state, data: action.payload };
    case GET_DATA_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}