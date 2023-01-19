import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { gql } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import client from './apollo';
import { setCategories } from './redux/actions/category';
import { getCurrencies } from './apollo/queries';
import Header from './components/Header/Header';
import CartPage from './components/CartPage/CartPage';
import CategoryPage from './components/CategoryPage/CategoryPage';
import ProductPage from './components/ProductPage/ProductPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrencies());

    client
      .query({
        query: gql`
        query {
          categories {
            name
          }
        }
      `,
      })
      .then((response) => {
        dispatch(setCategories(response.data.categories));
      }, []);
  });
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/:productId" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
