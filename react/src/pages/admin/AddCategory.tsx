import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { categoryRq } from '../../api/category';
import { ICategory } from '../../types/category';
interface IProps {
    onAdd: (category: ICategory) => void
}
interface IFormInput {
    _id: string,
    name: string,
}

const AddCategory = (props: IProps) => {
    // const { register, handleSubmit } = useForm<IFormInput>()
    // //register là hàm dể đăng ký các trường dữ liệu trong form
    // //handleSubmit là hàm dể xử lý khi submit form
    // const onHandleSubmit: SubmitHandler<IFormInput> = (data: IProduct) => {
    //     props.onAdd(data);
    // }
  

  
    const onFinish = (values: ICategory) => {
      
        

        props.onAdd(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

   

    // setFileList(newFileList);

   
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

               
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Category
                    </Button>
                </Form.Item>
            </Form>


            {/* <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
                <input type="text" {...register("name")} />
                <input type="number" {...register("price")} />
                <button type="submit">Add New Product</button>
            </form> */}
        </div>
    )
}

export default AddCategory