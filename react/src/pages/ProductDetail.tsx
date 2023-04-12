import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../types/products';
import { Image } from 'antd';
interface IProprs {
  products: IProduct[];
}
const ProductDetailPage = (props: IProprs) => {
  const { id } = useParams();
  console.log(props + id);
  const [product, setProduct] = useState<IProduct>(props.products.find(item => item._id === id)!);
  useEffect(() => {
    // fetch('http://localhost:8080/api/products/' + id)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    const prd = props.products.find(item => item._id === id);
    setProduct(prd)
  }, [props, id]);
  return (
    <div>
      <h1>Product Detail Page</h1>
      <div>
        <Image src={product?.image}/>
        <h2>{product?.name}</h2>
        <p>{product?.desc}</p>
        <p>{product?.price}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
