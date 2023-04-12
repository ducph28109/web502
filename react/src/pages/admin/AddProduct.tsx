import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form' //import useForm hook
import { IProduct } from '../../types/products'
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { categoryRq } from '../../api/category';
interface IProps {
    onAdd: (product: IProduct) => void
}
interface IFormInput {
    id: number,
    name: string,
    price: number,
    image: string,
    desc: string,
    categoryId: string
}
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const AddProductPage = (props: IProps) => {
    // const { register, handleSubmit } = useForm<IFormInput>()
    // //register là hàm dể đăng ký các trường dữ liệu trong form
    // //handleSubmit là hàm dể xử lý khi submit form
    // const onHandleSubmit: SubmitHandler<IFormInput> = (data: IProduct) => {
    //     props.onAdd(data);
    // }
    const [cate, setCate] = useState([])
    const getCate = async () => {
      const res = await categoryRq.getAllCate()
      setCate(res.data)
    }

    useEffect(() => {
      getCate()
    }, [])

    const onFinish = (values: any) => {
        const newProduct = {
            id: values.id,
            name: values.name,
            price: values.price,
            desc: values.desc,
            image: values.image.file.thumbUrl,
            categoryId: values.categoryId
        }
        console.log(values.image.file.thumbUrl);

        props.onAdd(newProduct);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // upload image
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    // setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
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

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your Image!' }]}
                >
                    <Upload
                        // action="http://localhost:3000/products"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal> */}
                </Form.Item>

                <Form.Item
                    label="Desc"
                    name="desc"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="CategoryId"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Select placeholder="please choose category" >
                      {cate?.map(cateOb => (
                        <Select.Option key={cateOb._id} value={cateOb._id}>{cateOb.name}</Select.Option>
                      ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
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

export default AddProductPage