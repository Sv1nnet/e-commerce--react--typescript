import { Reducer } from 'redux';
import { TState } from './types';

const initialState: TState = {
  cart: {
    products: [],
    total: 0,
  },
};

const rootReducer: Reducer<TState> = (state = initialState, action) => {
  switch (action.type) {
    case 'any':
      return state;
    default:
      return state;
  }
};

export default rootReducer;
