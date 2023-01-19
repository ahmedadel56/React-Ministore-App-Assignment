import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Price from '../Price/Price';
import { addProductToCart } from '../../redux/actions/cart';
import './Product.css';

export default function Product({ product }) {
  const dispatch = useDispatch();
  const {
    inStock, id, name, brand, gallery, prices, attributes,
  } = product;

  const handleAddToCartButtonClick = () => {
    const selectedAttributes = {};
    attributes.forEach((att) => {
      selectedAttributes[att.name] = att.items[0].value;
    });
    dispatch(addProductToCart(
      {
        name, id, gallery, prices, brand, attributes, selectedAttributes,
      },
      1,
    ));
  };

  return (
    <div className={`product ${!inStock && 'outofstock'}`}>
      <Link to={`/${id}`}>
        <div className="image-container">
          <img className="product__image" src={gallery[0]} alt={name} />
          {!inStock && (
          <div className="outofstock">
            <p>Out of stock</p>
          </div>
          )}
        </div>
      </Link>
      <p className="product__name">
        {brand}
        {' '}
        {name}
      </p>
      <Price prices={prices} />
      {inStock && (
      <button
        type="button"
        className="product__button"
        onClick={() => handleAddToCartButtonClick}
      >
        <div className="product__button-icon icon">
          <img
            src="/images/empty-cart-white.svg"
            alt="add to cart"
            className="icon"
          />
        </div>
      </button>
      )}
    </div>
  );
}
