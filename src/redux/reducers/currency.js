import { SET_CURRENCY,GET_CURRENCY } from '../actionTypes';

const initialState = { currencies:[],current:{__typename: 'Currency', label: 'USD', symbol: '$'} };

const currency = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCY: {
      return {...state, current:action.payload};
    }
    case GET_CURRENCY:
      return {...state, currencies: action.payload}
    default: {
      return state;
    }
  }
};

export default currency;
