import instanse from './instanse';

const getAllCate = () => {
  return instanse.get('/categories');
};

const getOneCate = (id) => {
  return instanse.get('/categories/' + id);
};

const remove = (id) => {
  return instanse.delete('/categories/' + id);
};
const addCategory = (category) => {
  return instanse.post(
    '/categories/',
    category

  );
};
const updateCategory = (id, category) => {
  return instanse.patch('/categories/' + id, category);
};
export const categoryRq = { getAllCate, getOneCate,remove,addCategory,updateCategory };
