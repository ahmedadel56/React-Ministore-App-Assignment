import { SET_CURRENCY, GET_CURRENCY } from '../actionTypes';

const setCurrency = (currency) => ({
  type: SET_CURRENCY,
  payload: currency,
});

export  const getCurrency = (currencies) => ({
  type: GET_CURRENCY,
  payload: currencies,
});

export default setCurrency;
