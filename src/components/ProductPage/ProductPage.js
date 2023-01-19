import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import Price from '../Price/Price';
import { addProductToCart } from '../../redux/actions/cart';
import { getProductById } from '../../apollo/queries';
import './ProductPage.css';

export default function ProductPage() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    productId: window.location.pathname.split('/')[1],
    product: {},
    selectedAttributes: {},
    currentImageIndex: 0,
  });

  const {
    id, name, brand, gallery, prices, attributes, description, inStock,
  } = state.product;

  const changeCurrentImageIndex = (index) => {
    setState({ ...state, currentImageIndex: index });
  };

  const handleAttributeChange = (attName, itemValue) => {
    setState({
      ...state,
      selectedAttributes: {
        ...state.selectedAttributes,
        [attName]: itemValue,
      },
    });
  };

  const handleAddToCartButtonClick = () => {
    if (
      Object.keys(state.selectedAttributes).length !== attributes.length
    ) {
      alert('Please select attributes');
      return;
    }
    dispatch(addProductToCart(
      {
        name,
        id,
        gallery,
        prices,
        brand,
        attributes,
        selectedAttributes: state.selectedAttributes,
      },
      1,
    ));
  };

  useEffect(() => {
    async function getData() {
      const response = await getProductById(state.productId);
      setState({ product: response.data.product });
    }
    getData();
  }, [state.productId]);

  const { selectedAttributes } = state;

  /* eslint-disable */

  return !state.product?.name ? (
    <section>
      <p>Loading...</p>
    </section>
  ) : (
    <section className="product-page full-height">
      <div className="container">
        <div className="product-page__layout">
          <div className="product-page__gallery">
            {gallery.map((pic, index) => (
              <img
                key={pic}
                src={pic}
                alt={name}
                onClick={() => changeCurrentImageIndex(index)}
              />
            ))}
          </div>
          <div className="product-page__image">
            <img src={gallery[state.currentImageIndex]} alt={name} />
            {!inStock && (
              <div className="outofstock">
                <p>Out of stock</p>
              </div>
            )}
          </div>
          <div className="product-page__details">
            <h2 className="product-page__name">{name}</h2>
            <h3 className="product-page__brand">{brand}</h3>
            <div className="product-page__attributes">
              {attributes.map((att) => (
                <div key={att.id} className="attribute-row">
                  <p className="attribute-row__title">
                    {att.name}
                    :
                  </p>
                  <div className="attribute-row__values">
                    {att.items.map((item) => (
                      <button
                        type="button"
                        onClick={() => handleAttributeChange(att.name, item.value)}
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
            <div className="product-page__price">
              <p className="price-text">Price:</p>
              <Price prices={prices} />
            </div>
            <button
              type="button"
              className="product-page__button"
              disabled={!inStock}
              onClick={() => handleAddToCartButtonClick}
            >
              {inStock ? 'Add to cart' : 'Out of stock'}
            </button>
            <div className="product-page__description">
              {parse(description)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
