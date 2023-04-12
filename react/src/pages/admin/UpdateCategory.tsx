import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Image, Input, Select, Upload, UploadFile } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import { IProduct } from '../../types/products';
import { PlusOutlined } from '@ant-design/icons';
import { categoryRq } from '../../api/category';
import { ICategory } from '../../types/category';
interface IProps {
    categories: ICategory[],
    onUpdate: (id, category: ICategory) => void
}
const UpdateCategoryPage = (props: IProps) => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [Category, setCategory] = useState<ICategory>() // khởi tạo biến state product có kiểu dữ liệu là IProduct
    useEffect(() => { // khi props thay đổi thì sẽ chạy useEffect này
        const currentCategory = props.categories.find((category: ICategory) => category._id == id)
        // tìm trong mảng props.products có phần tử nào có id trùng với id trên url không
        setCategory(currentCategory) // nếu có thì set lại giá trị cho biến product
    }, [props])
    useEffect(() => { // khi biến product thay đổi thì sẽ chạy useEffect này
        setFields() // gọi hàm setFields để set lại giá trị cho các input
    }, [Category])
    console.log(Category);
    
    const [form] = Form.useForm();
    // khởi tạo một instance của Form và gán vào biến form
    // Instance của form là một đối tượng được tạo ra bởi Ant Design để thực hiện các chức năng của form trong React
    
    const setFields = () => {// hàm này để set lại giá trị cho các input
        form.setFieldsValue({ // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
          
            name: Category?.name,
          
        })
    }

    const onFinish = (values: any) => {
    
        props.onUpdate(id, values);
        navigate('/admin/category')
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
  };
  
    return (
        <div>
            <Form
                form={form}
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
                        Update Product
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default UpdateCategoryPage