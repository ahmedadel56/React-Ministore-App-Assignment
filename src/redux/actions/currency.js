import { SET_CURRENCY } from '../actionTypes';

const setCurrency = (currency) => ({
  type: SET_CURRENCY,
  payload: currency,
});

export default setCurrency;
