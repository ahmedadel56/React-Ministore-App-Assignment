import React, { useState } from 'react';

export default function ProductImages({ images }) {
  const [state, setState] = useState({ currentImageIndex: 0 });

  const { currentImageIndex } = state;

  const handleImageChange = (direction) => {
    if (direction === 1) {
      if (currentImageIndex < images.length - 1) {
        setState({
          ...state,
          currentImageIndex: currentImageIndex + 1,
        });
      } else {
        setState({ ...state, currentImageIndex: 0 });
      }
    } else if (direction === -1) {
      if (currentImageIndex > 0) {
        setState({
          ...state,
          currentImageIndex: currentImageIndex - 1,
        });
      } else {
        setState({
          ...state,
          currentImageIndex: images.length - 1,
        });
      }
    }
  };
  return (
    <div className="product-images">
      <img
        className="product-images__img"
        src={images[currentImageIndex]}
        alt="product"
      />
      {images.length > 1 && (
      <div className="product-images__buttons">
        <button type="button" onClick={() => handleImageChange(1)}>
          <img src="/images/caret-left.png" alt="left" />
        </button>
        <button type="button" onClick={() => handleImageChange(-1)}>
          <img src="/images/caret-right.png" alt="left" />
        </button>
      </div>
      )}
    </div>
  );
}
