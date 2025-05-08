import axios from "axios";
import MainButton from "../button/button"
import NotFound from "./not-found"
import { useQuery } from "@tanstack/react-query";
import AccountDetailsSkeleton from "../skleton/account-details-skeleton";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

function MyProducts() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    // get my products
    const getMyProducts = async () => {
        const res = await axios.get(`https://dummyjson.com/users/${user.id}/carts`);
        return res.data;
    };
    const { data: MyProducts, isLoading: loading1} = useQuery({
        queryKey: ["myproducts"],
        queryFn: getMyProducts,
    });

    // add product
    const AddProduct = async (values) => {
      const {title, price, quantity, image} = values
      await axios.post(`https://dummyjson.com/products/add`,{
        headers: { 'Content-Type': 'application/json' }
      }, {title, price, quantity, image}).then(() => {
        setIsModalOpen(false)
        toast.success("Your New Product added successfully")
      }).catch(() => {
        toast.error('Invalid credentals, plaese try again')
      })
  };
        
    
    console.log(user)
    if(loading1) {
        return <AccountDetailsSkeleton/>
    }
  return (
    <div className="flex lg:flex-row flex-col justify-between gap-[30px] ">
      <div className="w-full overflow-auto lg:w-[75%]">
        <table className="w-full">
          <thead>
              <tr className="border-b-[1px] border-[#46A358] pb-[11px] w-full mb-[11px]">
                  <th className="min-w-[300px] text-start font-[500] text-[16px] leading-[16px] pb-[11px] text-[#3D3D3D]">Products</th>
                  <th className="min-w-[100px] text-start font-[500] text-[16px] leading-[16px] pb-[11px] text-[#3D3D3D]">Price</th>
                  <th className="min-w-[100px] text-start font-[500] text-[16px] leading-[16px] pb-[11px] text-[#3D3D3D]">Quantity</th>
                  <th className=" text-start font-[500] text-[16px] leading-[16px] pb-[11px] text-[#3D3D3D]">Total</th>
              </tr>
          </thead>
          <tbody >
              {MyProducts?.carts && MyProducts?.carts[0]?.products?.map(item => (
                <tr key={item._id}>
                  <td className="flex items-center gap-[14px] mt-[10px]">
                      <div className="w-[70px] h-[70px] p-1 gap-[14px] overflow-hidden">
                          <img src={item.thumbnail} alt="i" className="w-full" />
                      </div>
                      <div>
                          <h2 className="text-[20px] font-[500] leading-[16px] text-[#3D3D3D] mb-[10px]">{item.title}</h2>
                          <div className="flex gap-[10px]">
                              <span className="font-[400] text-[15px] leading-[16px]">SKU: </span>
                              <span className="font-[600] text-[15px] leading-[16px]">{item.id}</span>
                          </div>
                      </div>
                  </td>
                  <td className="text-[20px] text-[#727272] font-[600] leading-[16px]">${item.price}</td>
                  <td className="text-start">
                    <span className="text-[18px] font-semibold">{item.quantity}</span>
                  </td>
                  <td className="text-[#46A358] text-[20px] leading-[16px] font-[700]">${((item.price * 1000) * item?.quantity) / 1000}</td>
              </tr>
              ))}
              {!MyProducts?.carts[0] && 
              <tr>
                  <td colSpan={5} className="text-[center]">
                      <NotFound>No data</NotFound>
                  </td>
              </tr>}
          </tbody>
        </table>
      </div>
      <div className="w-full  lg:w-[25%]">
        <button onClick={showModal} className="mb-[30px]">
          <MainButton>Add New Product</MainButton>
        </button>
        <Modal
          title="Enter your new product details."
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
              style={{ width: '100%'}}
              initialValues={{
                  title: "",
                  price: "",
                  quantity: "",
                  image: ""
              }}
              onFinish={(values) => AddProduct(values)}
              autoComplete="off"
              name="layout-multiple-horizontal"
              layout="horizontal"
            >
              <Form.Item
                name="title"
                layout="vertical"
                label="Title"
                style={{width: '100%'}} 
                rules={[{ required: true, message: 'Please enter your product title!'}]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="h-[60px]"
              >
                <Input  placeholder='product title'/>
              </Form.Item>
              <Form.Item
                name="price"
                layout="vertical"
                label="Price"
                style={{width: '100%'}} 
                rules={[{ required: true, message: 'Please enter your product price!'}]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="h-[60px]"
              >
                <Input  placeholder='product price'/>
              </Form.Item>
              <Form.Item
                name="quantity"
                layout="vertical"
                label="Quantity"
                style={{width: '100%'}} 
                rules={[{ required: true, message: 'Please enter your product quantity!'}]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="h-[60px]"
              >
                <Input  placeholder='product quantity'/>
              </Form.Item>
              <Form.Item
                name="image"
                layout="vertical"
                label="Image"
                style={{width: '100%'}} 
                rules={[{ required: true, message: 'Please enter your product image!'}]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="h-[60px]"
              >
                <Input  placeholder='product image url'/>
              </Form.Item>
          
              <Form.Item label={null}>
                <Button 
                  onSubmit={AddProduct}
                  htmlType="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#46A358',
                    color: 'white',
                    border: 'none',
                    padding: '16px 0',
                    marginBottom: '47px'
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
        </Modal>
        <h2 className="border-b-[1px] font-[700] text-[18px] leading-[16px] border-[#46A358] pb-[11px]">Cart Total</h2>
        <div className="flex justify-between items-center mb-[20px] mt-[15px]">
            <h2 className="text-[#3D3D3D] text-[15px] leading-[16px] font-[400] ">Total</h2>
            <h3 className="text-[#3D3D3D] text-[18px] leading-[16px] font-[500] ">${MyProducts?.carts[0]?.total}</h3>
        </div>
        <div className="flex justify-between items-center mb-[20px]">
            <h2 className="text-[#3D3D3D] text-[15px] leading-[16px] font-[400] ">Discounted Total</h2>
            <h3 className="text-[#3D3D3D] text-[18px] leading-[16px] font-[500] ">${MyProducts?.carts[0]?.discountedTotal}</h3>
        </div>
        <div className="flex justify-between items-center mb-[26px]">
            <h2 className="text-[#3D3D3D] text-[15px] leading-[16px] font-[400] ">Total Products</h2>
            <h3 className="text-[#3D3D3D] text-[18px] leading-[16px] font-[500] ">{MyProducts?.carts[0]?.totalProducts}</h3>
        </div>
        <div className="flex justify-between items-center mb-[26px]">
            <h2 className="text-[#3D3D3D] text-[15px] leading-[16px] font-[400] ">Total Quantity</h2>
            <h3 className="text-[#3D3D3D] text-[18px] leading-[16px] font-[500] ">{MyProducts?.carts[0]?.totalQuantity}</h3>
        </div>
      </div>
  </div>
  )
}

export default MyProducts