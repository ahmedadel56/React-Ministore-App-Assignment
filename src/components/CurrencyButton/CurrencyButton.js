import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setCurrency from '../../redux/actions/currency';
import './CurrencyButton.css';

export default function CurrencyButton() {
  const currencyButtonRef = useRef();
  const dispatch = useDispatch();
  const [currencyMenuIsOpen, setcurrencyMenuIsOpen] = useState(false);
  const currentCurrency = useSelector((state) => state.currency.current);
  const currencies = useSelector((state) => state.currency.currencies) || [];
  const toggleCurrencyMenuIsOpen = () => {
    setcurrencyMenuIsOpen(!currencyMenuIsOpen);
  };

  const handleSetCurrency = (currency) => {
    dispatch(setCurrency(currency));
  };
  /* eslint-disable */
  return (
    <div
      ref={currencyButtonRef}
      className="currency-button"
      onClick={toggleCurrencyMenuIsOpen}
    >
      <div className="icon currency-button__symbol">
        {currentCurrency.symbol}
      </div>
      {currencyMenuIsOpen ? (
        <img
          src="/images/arrow-up.svg"
          alt="arrow-up"
          width="8px"
          height="4px"
        />
      ) : (
        <img
          src="/images/arrow-down.svg"
          alt="arrow-down"
          width="8px"
          height="4px"
        />
      )}

      <div className={`currency-button__menu ${!currencyMenuIsOpen && 'hidden'}`}>
        {currencies.map((currency) => (
          <button
            type='button'
            className="currency-button__option"
            key={currency.label}
            onClick={() => handleSetCurrency(currency)}
          >
            <span>{currency.symbol}</span>
            {currency.label}
          </button>
        ))}
      </div>
    </div>
  );
}
