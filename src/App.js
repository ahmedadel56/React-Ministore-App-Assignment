import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { gql } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import client from './apollo';
import { setCategories } from './redux/actions/category';
import { getCurrencies } from './apollo/queries';
import Header from './components/Header/Header';

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
    </BrowserRouter>
  );
}

export default App;
