import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedCategory } from '../../redux/actions/category';
import CartButton from '../CartButton/CartButton';
import CurrencyButton from '../CurrencyButton/CurrencyButton';

import './Header.css';

function Header() {
  const handleSelectingCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          {categories?.map((category) => (
            <Link
              key={category.name}
              className={selectedCategory === category.name ? 'active' : null}
              onClick={() => handleSelectingCategory(category.name)}
              to="/"
            >
              {category.name}
            </Link>
          ))}
        </nav>
        <div className="header__logo">
          <img src="/images/logo.png" alt="logo" width="41px" height="41px" />
        </div>
        <div className="header__buttons">
          <CurrencyButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
