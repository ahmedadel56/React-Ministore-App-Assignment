import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getCartProductsCount,
  getCartProductsTotalCost,
} from '../../redux/selectors';
import CartProduct from '../CartProduct/CartProduct';

import './CartButton.css';

export default function CartButton() {
  const [cartMenuIsOpen, setCartMenuIsOpen] = useState(false);
  const toggleCartMenu = () => {
    setCartMenuIsOpen(!cartMenuIsOpen);
    document.body.style.overflow = !cartMenuIsOpen
      ? 'hidden'
      : 'auto';
  };

  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const currentCurrencySymbol = useSelector((state) => state.currency.symbol);

  const cartProductsCount = useSelector((state) => getCartProductsCount(state));
  const cartProductsTotalCost = useSelector((state) => getCartProductsTotalCost(state));

  return (
    <>
      <div className="cart-button">
        <button type="button" onClick={toggleCartMenu}>
          <img src="/images/empty-cart.svg" alt="cart" className="icon" />
          {cartProductsCount > 0 && (
          <span className="icon cart-button__badge">
            {cartProductsCount}
          </span>
          )}
        </button>
      </div>
      <div
        className={`cart-button__overlay ${
          !cartMenuIsOpen && 'hidden'
        }`}
      >
        <div className="cart-button__menu">
          <div className="menu__header">
            <p>
              My Bag,
              {' '}
              <span>
                {cartProductsCount}
                {' '}
                items
              </span>
            </p>
          </div>
          <div className="menu__products">
            {cartProducts.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
          <div className="menu__total">
            <p>Total</p>
            <p>
              {currentCurrencySymbol}
              {cartProductsTotalCost}
            </p>
          </div>
          <div className="menu__buttons">
            <Link
              onClick={toggleCartMenu}
              className="bag-button"
              to="./cart"
            >
              view bag
            </Link>
            <Link
              onClick={toggleCartMenu}
              className="checkout-button"
              to="./cart"
            >
              checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
