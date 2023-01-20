import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProductsByCategory } from '../../apollo/queries';
import Product from '../Product/Product';
import './CategoryPage.css';

export default function CategoryPage() {
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const [state, setState] = useState({
    products: [],
    currentCategoryName: selectedCategory,
  });

  useEffect(() => {
    async function getDate() {
      const response = await getProductsByCategory(selectedCategory);
      setState({ products: response.data.category.products });
    }
    getDate();
  }, [selectedCategory]);

  const { products } = state;

  return (
    <section className="category-page full-height">
      <div className="container">
        <h2 className="category-page__title">{selectedCategory}</h2>
        <div className="category-page__products">
          {products?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
