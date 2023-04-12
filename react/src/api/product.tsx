import instanse from './instanse';

const getAllProduct = () => {
  return instanse.get('/products?_expand');
};
const deleteProduct = (id) => {
  return instanse.delete('/products/' + id);
};
const addProduct = (product) => {
  return instanse.post(
    '/products',
    product

  );
};
const updateProduct = (id, product) => {
  return instanse.patch('/products/' + id, product);
};
export { getAllProduct, deleteProduct, addProduct, updateProduct };
