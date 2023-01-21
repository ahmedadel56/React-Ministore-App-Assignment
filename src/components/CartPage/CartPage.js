import React from 'react';
import { useSelector } from 'react-redux';
import {
  getCartProductsCount,
  getCartProductsTotalCost,
} from '../../redux/selectors';
import CartProduct from '../CartProduct/CartProduct';
import './CartPage.css';

export default function CartPage() {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const cartProductsCount = useSelector((state) => getCartProductsCount(state));
  const cartProductsTotalCost = useSelector((state) => getCartProductsTotalCost(state));
  const currentCurrencySymbol = useSelector((state) => state.currency.current.symbol);

  return (
    <section className="cart-page full-height">
      <div className="container">
        <h2 className="cart-page__title">Cart</h2>
        <div className="cart-page__products">
          {cartProducts.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))}
        </div>
        <div className="cart-page__total">
          <div className="tax">
            <p>Tax 21%:</p>
            <p>
              {currentCurrencySymbol}
              {((cartProductsTotalCost * 21) / 100).toFixed(2)}
            </p>
          </div>
          <div className="quantity">
            <p>Quantity:</p>
            <p>{cartProductsCount}</p>
          </div>
          <div className="total">
            <p>Total:</p>
            <p>
              {currentCurrencySymbol}
              {cartProductsTotalCost}
            </p>
          </div>
          <button type="button" className="cart-page__total-button">order</button>
        </div>
      </div>
    </section>
  );
}
