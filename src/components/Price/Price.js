import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Price({ prices }) {
  const [state, setState] = useState({
    price: {
      amount: 0,
      currency: {
        symbol: '$',
        label: 'USD',
      },
    },
  });

  const currentCurrency = useSelector((state) => state.currency.current);

  useEffect(() => {
    const price = prices.find(
      (price) => price.currency.label === currentCurrency.label,
    );
    setState({ price });
  }, [currentCurrency.label]);

  const { currency, amount } = state.price;

  return (
    <p className="price">
      <span>{currency.symbol}</span>
      {' '}
      {amount.toFixed(2)}
    </p>
  );
}
