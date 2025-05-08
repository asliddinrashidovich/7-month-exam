import { Button, Form, Input, Upload } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UploadOutlined } from '@ant-design/icons';
import MainButton from '../button/button';
import { useQuery } from "@tanstack/react-query";
import AccountDetailsSkeleton from '../skleton/account-details-skeleton';



function AccountDetails() {
    const token = localStorage.getItem('token')
    
    const getAuth = async () => {
        const res = await axios.get(`https://dummyjson.com/auth/me`, {
            headers: {
                'Authorization': token
            }
        });
        return res.data;
    };
    const { data: dataMe, isLoading: loading1} = useQuery({
        queryKey: ["dummy-data"],
        queryFn: getAuth,
    });

  const postAccountData = async (values) => {
      const { lastName } = values;
      
      await axios.put(`https://dummyjson.com/users/${dataMe.id}`,{
        headers: { 'Content-Type': 'application/json' },
      }, {lastName: lastName})
      .then(() => {
        toast.success("Your account details has been updated!")
    }).catch(() => {
        toast.error("Something went wrong")
    })
  };

    

    if(loading1) {
        return <AccountDetailsSkeleton/>
    }
  return (
    <>
        <h2 className='text-[16px] leading-[16px] font-[500] text-[#3D3D3D] mb-[20px]'>Personal Information</h2>
        <Form
            initialValues={{
                firstName: dataMe?.firstName,
                lastName: dataMe?.lastName,
                email: dataMe?.email,
                phone: dataMe?.phone,
                username: dataMe?.username,
            }}
            name="layout-multiple-horizontal"
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={(values) => postAccountData(values)}
            className='gap-[30px] grid grid-cols-1 sm:grid-cols-2 '
        >
            <Form.Item
                layout="vertical"
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="Email address"
                name="email"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="Phone Number"
                name="phone"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder="Your phone number..." />
            </Form.Item>

            <Form.Item
                layout="vertical"
                label="Username"
                name="username"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder='Your username...'/>
            </Form.Item>

            <Form.Item
                layout="vertical"
                label="Profile photo"
                name="profilePhoto"
                rules={[{ required: false }]}
                labelCol={{ span: 14 }}
                wrapperCol={{ span: 24 }}
            >
                <Upload>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <button className='text-start'>
                <MainButton>Save Changes</MainButton>
            </button>
        </Form>
    </>
  )
};
export default AccountDetails;