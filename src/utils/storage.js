export const saveCartProductsToLocalStorage = (products) => {
  localStorage.setItem('cartProducts', JSON.stringify(products));
};

export const getCartProductsFromLocalStorage = () => (localStorage.getItem('cartProducts')
  ? JSON.parse(localStorage.getItem('cartProducts'))
  : []);
