import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {Link, useNavigate, useParams } from "react-router-dom";
import {MainButton, ProductDetailsSkeleton} from "../components"
import { FaRegHeart } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addDataToShopping, decreaseCountFromShopping, increaseCountFromShopping } from "../reducers/shoppingSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button, Form, Image, Input, Modal, Rate, Tabs } from "antd";
import { format } from 'date-fns';
import ReletedProductsData from "../components/releted-products.jsx/swipper-data";
import { MdDelete, MdEdit } from "react-icons/md";

const onChange = key => {
    console.log(key);
};


function ProductDetailsPage() {
    const {id} = useParams()
    const [main_img, setMainImg] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
      
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

     
    const showModal2 = () => {
        setIsModalOpen2(true);
    };
    const handleOk2 = async () => {
        try {
            const res = await axios.put(`https://dummyjson.com/products/${id}`)
            
            console.log(res)
            setIsModalOpen2(false)
            toast.success("Your Product Deleted successfully")
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong, Please try again');
        }
        navigate('/')
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

 

    const fetchFlower = async () => {
      const {data} = await axios.get(`https://dummyjson.com/products/${id}`)
      setMainImg(data.thumbnail)
      return data;
    };
    const { data: flowersData, isLoading: loading1 } = useQuery({
      queryKey: ["flower_details", id],
      queryFn: () => fetchFlower(),
    });

    const reletedData = async () => {
        const {data} = await axios.get(`https://dummyjson.com/products/category/${flowersData?.category}`)
        return data;
    };
    const { data: flowerReletedData, isLoading: loading2 } = useQuery({
        queryKey: ["flowersReleted", flowersData?.category],
        queryFn: () => reletedData(),
    });

    function handleBuyNow(itemData) {
      navigate('/product-card')
      dispatch(addDataToShopping(itemData))
    }
    function handleAdd(itemData) {
      toast.success('Added to you shopping card!')
      dispatch(addDataToShopping(itemData))
    }
    
    // edit data
    const EditProduct = async (values) => {
        const {title, image, quantity, price} = values
        try {
            const res = await axios.put(`https://dummyjson.com/products/${id}`, {
                title,
                image,
                quantity,
                price
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            console.log(res)
            setIsModalOpen(false)
            toast.success("Your Product Edided successfully")
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong, Please try again');
        }
    };

    const items = [
        {
            key: '1',
            label: 'Product Description',
            children: flowersData?.description,
        },
        {
            key: '2',
            label: `Reviews (${flowersData?.reviews?.length})`,
            children: flowersData?.reviews?.map(item => (
                <div key={item?.reviewerEmail} className="mb-[20px]">
                    <h3 className="text-lg font-bold">{item?.reviewerName}</h3>
                    <p className="text-gray-700 text-sm mb-2">{format(new Date(item?.date), 'EEE dd MMM yyyy')}</p>
                    <p className="text-gray-700">
                        {item?.reviewerEmail}
                    </p>
                </div>
            )),
        }
    ];
    console.log(flowerReletedData)

    if(loading1 && loading2) {
        return <ProductDetailsSkeleton/>
    }
    return (
        <div className="pt-9 px-5 md:px-10">
            <div className="max-w-[1200px] mx-auto">
            <div className="mb-[43px]">
                <Link to={'/'} className="font-[400] text-[#3D3D3D] text-[15px] leading-[16px]">Home</Link> / 
                <span className="font-[700] text-[15px] text-[#3D3D3D] leading-[16px]"> Shop</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[52px] items-start justify-between">
                <div className="flex gap-[29px] ">
                <div className="flex flex-col gap-[16px]">
                    {flowersData?.images?.map(item => (
                    <div onClick={() => setMainImg(item)} key={item} className="min-w-[50px] min-h-[50px] max-w-[100px] w-full h-full cursor-pointer bg-[#f1f1f1] flex items-center justify-center border-[#46A358] border-[1px] overflow-hidden max-h-[100px]">
                        <img src={item} className="w-full object-cover" alt="detailed image" />
                    </div>
                    ))}
                </div>
                <div className="p-[20px] w-full max-w-[444px] max-h-[444px] flex overflow-hidden justify-center items-center">
                    <Image src={main_img} alt="main img" />
                </div>
                </div>
                <div>
                <div className="flex justify-between pb-[20px] border-b-[2px] border-[#46A358] rounded-[2px]"> 
                    <div>
                        <h2 className="text-[#3D3D3D] text-[28px] font-[700] leading-[100%] mb-[21px] ">{flowersData?.title}</h2>
                        <h3 className="text-[#46A358] text-[22px] font-[700] leading-[16px]">${flowersData?.price}</h3>
                    </div>
                    <div className="flex items-center gap-[10px]">
                    <div className="min-w-[140px]">
                        <Rate />
                    </div>
                    <h2><span>{flowersData?.reviews?.length}</span> Customer Review</h2>
                    </div>
                </div>
                <div>
                    <h3 className="text-[#3D3D3D] text-[20px] font-[500] leading-[16px] mt-[15px] mb-[10px]" >Short Description:</h3>
                    <p className="text-[#727272] text-[15px] font-[400] leading-[24px] mb-[24px]">{flowersData?.description}</p>
                    <h3 className="text-[#3D3D3D] text-[20px] font-[500] leading-[16px] mt-[15px] mb-[10px]" >Size:</h3>
                    <div className="flex gap-[10px] mb-[23px]">
                    <button className="flex justify-center items-center w-[28px] h-[28px] text-[#727272] font-[700] text-[18px] leading-[16px] border-[1px] border-[#727272] rounded-full cursor-pointer hover:text-[#46A358] hover:border-[#46A358]">
                        S
                    </button>
                    <button className="flex justify-center items-center w-[28px] h-[28px] text-[#727272] font-[700] text-[18px] leading-[16px] border-[1px] border-[#727272] rounded-full cursor-pointer hover:text-[#46A358] hover:border-[#46A358]">
                        M
                    </button>
                    <button className="flex justify-center items-center w-[28px] h-[28px] text-[#727272] font-[700] text-[18px] leading-[16px] border-[1px] border-[#727272] rounded-full cursor-pointer hover:text-[#46A358] hover:border-[#46A358]">
                        L
                    </button>
                    <button className="flex justify-center items-center w-[28px] h-[28px] text-[#727272] font-[700] text-[18px] leading-[16px] border-[1px] border-[#727272] rounded-full cursor-pointer hover:text-[#46A358] hover:border-[#46A358]">
                        XL
                    </button>
                    </div>
                    <div className="flex gap-[26px] items-center mb-[26px]">
                    <div className="flex gap-[23px] items-center">
                        <button onClick={() => dispatch(decreaseCountFromShopping(flowersData))} className="flex justify-center items-center bg-[#46A358] w-[35px] h-[35px] text-[#fff] rounded-full cursor-pointer">
                        <span className="text-[30px] translate-y-[-3px]">
                            -
                        </span>
                        </button>
                        <span>0</span>
                        <button onClick={() => dispatch(increaseCountFromShopping(flowersData))} className="flex justify-center items-center bg-[#46A358] w-[35px] h-[35px] text-[#fff] rounded-full cursor-pointer">
                        <span className="text-[30px] translate-y-[-3px]">
                            +
                        </span>
                        </button>
                    </div>
                    <div className="flex gap-[10px] ">
                        <MainButton >
                            <button onClick={() => handleBuyNow(flowersData)}>
                                Buy NOW
                            </button>
                        </MainButton>
                        <button onClick={() => handleAdd(flowersData)} className="font-[700] text-[14px] leading-[20px] border-[1px] border-[#46A358] rounded-[6px] px-[20px] uppercase text-[#46A358] cursor-pointer py-[11px]">Add to cart</button>
                        <button className="font-[700] text-[20px] leading-[20px] border-[1px] border-[#46A358] rounded-[6px] p-[10px] uppercase text-[#46A358] cursor-pointer ">
                            <FaRegHeart />
                        </button>
                        <button onClick={showModal} className="font-[700] text-[20px] leading-[20px] border-[1px] border-[#46A358] rounded-[6px] p-[10px] uppercase text-[#46A358] cursor-pointer ">
                            <MdEdit />
                        </button>
                        <Modal
                            title="Edit product"
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
                                onFinish={(values) => EditProduct(values)}
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
                                    onSubmit={EditProduct}
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
                        <button onClick={showModal2} className="font-[700] text-[20px] leading-[20px] border-[1px] border-[red] rounded-[6px] p-[10px] uppercase text-[red] cursor-pointer ">
                            <MdDelete />
                        </button>
                        <Modal title="❗Do you want to Delete this product?" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
                            <p className="text-[15px] font-[500]">Please make sure, bacause this action cannot be undone!</p>
                        </Modal>
                    </div>
                    </div>
                    <div>
                        <div>

                        </div>
                        <div className="flex gap-[10px] mb-[10px]">
                            <span className="font-[400] text-[15px] leading-[16px]">SKU: </span>
                            <span className="font-[600] text-[15px] leading-[16px]"> {flowersData?.sku}</span>
                        </div>
                        <div className="flex gap-[10px] mb-[10px]">
                            <span className="font-[400] text-[15px] leading-[16px]">Categories: </span>
                            <span className="font-[600] text-[15px] leading-[16px] uppercase"> {flowersData?.category}</span>
                        </div>
                        <div className="flex gap-[10px] mb-[28px]">
                            <span className="font-[400] text-[15px] leading-[16px]">Tags: </span>
                            <span className="font-[600] text-[15px] leading-[16px] "> {flowersData?.tags?.map(it => (it + ',  '))}</span>
                        </div>
                        <div className="flex gap-[17px] items-center" >
                            <h2 className="font-[500] text-[20px] leading-[16px] text-[#3D3D3D] cursor-pointer">Share this products: </h2>
                            <FaFacebookF className="cursor-pointer"/>
                            <FaTwitter  className="cursor-pointer"/>
                            <FaLinkedinIn  className="cursor-pointer"/>
                            <CiMail className="cursor-pointer"/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="my-[100px]">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="custom-tabs text-[18px] font-[500] leading-[130%] mb-[20px]"/>
            </div>
            <div className="my-[128px]">
                <h2 className="text-[#46A358] text-[17px] font-[700] leading-[16px] mb-[12px]">You may be interested in</h2>
                <hr />
                <ReletedProductsData flowerReletedData={flowerReletedData?.products}/>
            </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage

