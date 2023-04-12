// import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/Product';
import React, { useEffect, useState } from 'react';
import ProductDetailPage from './pages/ProductDetail';
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from './api/product';
import Dashboard from './pages/admin/Dashboard';
import ProductManagementPage from './pages/admin/ProductManagement';
import AddProductPage from './pages/admin/AddProduct';
import UpdateProductPage from './pages/admin/UpdateProduct';
import WebsiteLayout from './pages/layouts/WebsiteLayout';
import AdminLayout from './pages/layouts/AdminLayout';
import Login from './LogIn';
import Register from './Register';
import axios from 'axios';
import CategoryManager from './pages/admin/CategoryManager';
import { categoryRq } from './api/category';
import AddCategory from './pages/admin/AddCategory';
import UpdateCategoryPage from './pages/admin/UpdateCategory';

function App() {
  const [products, setProduct] = useState([]);
  const [categories, setCategory] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    categoryRq.getAllCate().then(({ data }) => setCategory(data));
    getAllProduct().then(({ data }) => setProduct(data.data));
  }, []);
  const onHandleRemove = async (id) => {

    await deleteProduct(id)
      .then(() => {
        getAllProduct().then(({ data }) => setProduct(data));
        navigate('/admin/products');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };

  const onHandleRemoveCate = async (id) => {

    await categoryRq.remove(id)
      .then(() => {
        categoryRq.getAllCate().then(({ data }) => setCategory(data));
        navigate('/admin/category');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };


  const onHandleAdd = (product) => {
    addProduct(product)
      .then(() => {
        setProduct([...products, product]), navigate('/admin/products');
      })
      .catch(({ response }) => alert(response.data.message));
  };

  const addCategory = (category) => {
    categoryRq.addCategory(category)
      .then(() => {
        setCategory([...categories, category]), navigate('/admin/category');
      })
      .catch(({ response }) => alert(response.data.message));
  };
  const onHandleUpdate = (id, product) => {
    updateProduct(id, product)
      .then(() => {
        setProduct(products.map((item) => (item._id === id ? product : item))),
          navigate('/admin/products');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };

  const  updateCategory= (id, category) => {
    categoryRq.updateCategory(id, category)
      .then(() => {
        setCategory(categories.map((item) => (item._id === id ? category : item))),
          navigate('/admin/category');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  const onHandSignUp = (user) => {
    axios
      .post('http://localhost:8080/api/signup', user)
      .then(() => {
        navigate('/admin/login');
      })
      .catch(({ response }) => {
        setErr(response.data.message);
        // toast.error(response.data.message)
        console.log(response.data.message);
      });
  };
  const onHandLogin = (user) => {
    axios
      .post('http://localhost:8080/api/signin', user)
      .then((response) => {
        const token = response.data.accessToken;
        console.log(token);
        localStorage.setItem('token', JSON.stringify(token));
        navigate('/admin/products');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  return (
    <div className="App">
      <Routes>
        {/* -------------------------------------HOME-------------------------------------------- */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products">
            <Route
              index
              element={
                <ProductPage products={products} onRemove={onHandleRemove} />
              }
            ></Route>
            <Route
              path=":id"
              element={<ProductDetailPage products={products} />}
            ></Route>
          </Route>
        </Route>

        {/* -------------------------------------ADMIN-------------------------------------------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="register"
            element={<Register err={err} signUp={onHandSignUp} />}
          ></Route>
          <Route
            path="login"
            element={<Login login={onHandLogin} err={err} />}
          ></Route>
          <Route path="products">
            <Route
              index
              element={
                <ProductManagementPage
                  products={products}
                  onRemove={onHandleRemove}
                />
              }
            />
            <Route
              path=":id/update"
              element={
                <UpdateProductPage
                  products={products}
                  onUpdate={onHandleUpdate}
                />
              }
            />
            <Route
              path="add"
              element={<AddProductPage onAdd={onHandleAdd} />}
            />
          </Route>
          <Route
            path="category"
            
          >
            <Route
            index
            element={<CategoryManager onRemoveCate={onHandleRemoveCate} data={categories} />}
            />
            <Route
              path=":id/update"
              element={
                <UpdateCategoryPage
                categories={categories}
                  onUpdate={updateCategory}
                />
              }
            />
            <Route
              path="add"
              element={<AddCategory onAdd={addCategory} />}
            />
          </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
