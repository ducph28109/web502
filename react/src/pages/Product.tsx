import React, { useEffect, useState } from 'react';
import { Space, Table, Image, Button } from 'antd';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

// interface IPrors {
//   products: IProduct[];
//   deletePro: (id: number) => void;
// }

const ProductManagementPage = (prors) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(
      prors.products.map((pro) => {
        return { ...pro, key: pro._id };
      })
    );
  }, [prors]);

  const deletePro = (id) => {
    // const confirm = window.confirm('Ban co chac khong !');
    // if (confirm) {
    //
    // }
    prors.onRemove(id);
  };
  // console.log(prors.products);
  // console.log(data.name);

  interface DataType {
    key: string;
    id: number;
    name: string;
    image: string;
    price: number;
    desc: string;
    categoryId: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image width={200} src={image} />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Category ',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (_:any, record: any) => <a href="">{record?.categoryId?.name}</a>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_:any, record: any) => <a href={"/products/"+record?._id}><button>View</button></a>
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default ProductManagementPage;
