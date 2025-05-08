import {  Form, Input } from 'antd';
import MainButton from '../button/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery } from "@tanstack/react-query";
import AccountDetailsSkeleton from '../skleton/account-details-skeleton';

function Address() {
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
    
    const postAddress = async (values) => {
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
        
    
    console.log(dataMe)
    if(loading1) {
        return <AccountDetailsSkeleton/>
    }
  return (
    <>
        <h2 className='text-[16px] leading-[16px] font-[500] text-[#3D3D3D] mb-[10px]'>Billing Address</h2>
        <h3 className='text-[14px] leading-[15px] font-[400] text-[#727272] mb-[30px]'>The following addresses will be used on the checkout page by default.</h3>
        <Form
            name="layout-multiple-horizontal"
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={(values) => postAddress(values)}
            className='gap-[30px] grid grid-cols-1 sm:grid-cols-2 '
            initialValues={{
                firstName: dataMe?.firstName,
                lastName: dataMe?.lastName,
                email: dataMe?.email,
                phone: dataMe?.phone,
                country: dataMe?.address?.country,
                town: dataMe?.address?.city,
                stateCode: dataMe?.address?.stateCode,
                state: dataMe?.address?.state,
                postalCode: dataMe?.address?.postalCode,
            }}
        >
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
                layout="vertical"
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
                label="Country / Region"
                name="country"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder='Select a country / region'/>
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="Town / City"
                name="town"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder='Select a town / city'/>
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="State Code"
                name="stateCode"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder='House number and street name'/>
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="Extra address"
                name="extra-address"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder='Appartment, suite, unit, etc. (optional)'/>
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="State"
                name="state"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder='Select a state...'/>
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="postalCode"
                name="postalCode"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder='Appartment, suite, unit, etc. (optional)'/>
            </Form.Item>
            <Form.Item
                layout="vertical"
                label="Email address"
                name="email"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Input placeholder='asliddinnorboyev@gmail.com'/>
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
            <button className='text-start'>
                <MainButton>Save Changes</MainButton>
            </button>
        </Form>
    </>
  )
};
export default Address;