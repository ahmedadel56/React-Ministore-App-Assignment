import React from 'react';
import { useDispatch } from 'react-redux';
import Price from '../Price/Price';
import ProductImages from '../ProductImages/ProductImages';

import {
  increaseCartProductAmount,
  decreaseCartProductAmount,
  removeProductFromCart,
} from '../../redux/actions/cart';
import './CartProduct.css';

export default function CartProduct({ product }) {
  const dispatch = useDispatch();
  const {
    id,
    product: {
      name, brand, prices, attributes, gallery, selectedAttributes,
    },
    amount,
  } = product;

  return (
    <div className="cart-product">
      <div className="product-details">
        <h3 className="product-details__name">{name}</h3>
        <p className="product-details__brand">{brand}</p>
        <Price prices={prices} />
        <div className="product-attributes">
          {attributes.map((att) => (
            <div key={att.id} className="product-attributes__row">
              <p className="product-attributes__row-name">
                {att.name}
                :
              </p>
              <div className="product-attributes__row-values">
                {att.items.map((item) => (

                  <button
                    type="button"
                    disabled
                    className={`${att.type === 'text' ? 'box' : ''} ${
                      selectedAttributes[att.name] === item.value
                        ? 'active'
                        : ''
                    }`}
                    key={item.id}
                  >
                    {att.type === 'swatch' && (
                    <div
                      className="attribute-swatch"
                      style={{
                        backgroundColor: item.value,
                        boxShadow: '0 0 10px rgba(0, 0, 0,0.1)',
                      }}
                    />
                    )}

                    {att.type === 'swatch' ? null : item.value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="product-quantity">
        <button type="button" onClick={() => dispatch(increaseCartProductAmount(id))}>
          <img
            src="/images/plus-square-small.svg"
            alt="increase product amount"
          />
        </button>
        <p>{amount}</p>
        <button
          type="button"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeProductFromCart(id));
            } else {
              dispatch(decreaseCartProductAmount(id));
            }
          }}
        >
          <img
            src="/images/minus-square-small.svg"
            alt="increase product amount"
          />
        </button>
      </div>
      <ProductImages images={gallery} />
    </div>
  );
}
