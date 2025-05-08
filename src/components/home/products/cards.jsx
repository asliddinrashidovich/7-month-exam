import { Box, Button, Modal, Slider } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import MainButton from "../../button/button";
import toast from "react-hot-toast";
import { addDataToShopping } from "../../../reducers/shoppingSlice";
import { useQuery } from "@tanstack/react-query";
import FlowersCards from "../../skleton/flowers-card";
import { Space, Input } from "antd";
const { Search } = Input;

function ProductCards() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [value, setValue] = useState([0, 1000]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    
    // useSearchparams
    
    // sort by category
    const categoryBy  = searchParams.get('category') || 'beauty'
    
    const updateParams = (categorytype) => {
        searchParams.set('category', categorytype)
        setSearchParams(searchParams)
        handleClose()
    }

    // sort by type
    const typeSort  = searchParams.get('type') || 'all-plants'
    
    const updateTypeSort = (sortType) => {
        searchParams.set('type', sortType)
        setSearchParams(searchParams)
    }
    
    
    // filter by amount
    // const rangeMin  = searchParams.get('range_min') || 0
    // const rangeMax  = searchParams.get('range_max') || 1000
    
    const handleSliderFilter = () => {
        searchParams.set('range_min', value[0])
        searchParams.set('range_max', value[1])
        setSearchParams(searchParams)
        handleClose()
    }
    
    // search 
    const searchProducts  = searchParams.get('products-search')

    const onSearch = (value, _e, info) => {
      console.log(info === null || info === void 0 ? void 0 : info.source, value);
      searchParams.set('products-search', value)
      setSearchParams(searchParams)
    }
    // getting APIs
    const fetchCategory = async () => {
        const res = await axios.get(`https://dummyjson.com/products/categories`);
        return res.data;
    };
    const dataDummy = async () => {
        const res = await axios.get(`https://dummyjson.com/products/category/${categoryBy}`);
        const allProducts = res.data.products;

        const filtered = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchProducts.toLowerCase())
        );
        console.log(allProducts, searchProducts)

        return { products: filtered };
    };

    const { data: categoryData} = useQuery({
        queryKey: ["category"],
        queryFn: fetchCategory,
    });
    const { data: productsData, isLoading: loading3} = useQuery({
        queryKey: ["dummy-data", categoryBy, searchProducts],
        queryFn: dataDummy,
    });
    

    function handleAddToCard(itemData) {
        toast.success('Added to you shopping card!')
        dispatch(addDataToShopping(itemData))
    }

    const handleChangeSlider = (event, newValue) => {
        setValue(newValue);
    };
    console.log(productsData)
  return (
    <div className="w-full lg:w-[70%]">
        <div className="flex justify-between items-center mb-[35px]">
            <div className="flex gap-[15px] md:gap-[35px]">
                <h3 onClick={() => updateTypeSort('all-plants')} className={`text-[14px] md:text-[16px] ${typeSort == 'all-plants' ? 'text-[#46A358] border-b-[1px] border-[#46A358] pb-[5px]' : 'text-[#3D3D3D] pb-[5px]'}  font-[700] cursor-pointer leading-[16px]`}>All Plants</h3>
                <h3 onClick={() => updateTypeSort('new-arrivals')} className={`text-[14px] md:text-[16px] ${typeSort == 'new-arrivals' ? 'text-[#46A358] border-b-[1px] border-[#46A358] pb-[5px]' : 'text-[#3D3D3D] pb-[5px]'}  font-[700] cursor-pointer leading-[16px]`}>New Arrivals</h3>
                <h3 onClick={() => updateTypeSort('sale')} className={`text-[14px] md:text-[16px] ${typeSort == 'sale' ? 'text-[#46A358] border-b-[1px] border-[#46A358] pb-[5px]' : 'text-[#3D3D3D] pb-[5px]'}  font-[700] cursor-pointer leading-[16px]`}>Sale</h3>
            </div>
            <div>
                <Space direction="vertical">
                    <Search placeholder="Search..." onSearch={onSearch} style={{width: 200}}  className='input-search' />
                </Space>
            </div>
            <div className="flex lg:hidden cursor-pointer">
                <Button onClick={handleOpen}>
                <img src="/flowers/modal_change.svg" alt="change modal" />
                </Button>
                <Modal className="w-full h-full py-[20px] px-[30px] overflow-auto flex justify-center items-center" open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{backgroundColor: '#fff', height: 'auto', marginTop: '20px',  borderRadius: '15px', maxWidth: '500px', width: '100%', padding:'30px'}}>
                    <h2 className="font-[700] text-[18px] leading-[16px] mb-[7px]">Categories</h2>
                    <div className="px-[12px] mb-[36px]">
                        {categoryData && categoryData?.map((item) => (
                            <div key={item.title} onClick={() => updateParams(item.slug)} className="flex text-[#46A358] justify-between w-full cursor-pointer group">
                                <p className={`font-[700] text-[15px] leading-[40px] ${categoryBy == item.slug ? 'text-[#46A358]' : 'text-[#3D3D3D] '}  group-hover:text-[#46A358] transition-all duration-[.3s]` }>{item.name}</p>
                                <p className={`font-[700] text-[15px] leading-[40px] ${categoryBy == item.slug ? 'text-[#46A358]' : 'text-[#3D3D3D] '} group-hover:text-[#46A358] transition-all duration-[.3s]`}>(0)</p>
                            </div>
                        ))}
                    </div>
                    <h2 className="font-[700] text-[18px] leading-[16px] mb-[7px]">Price Range</h2>
                    <div className="px-[12px] mb-[46px]">
                    <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    max={1000}
                    style={{color: '#46A358'}}
                    />
                        <h2 className="font-[700] text-[15px] leading-[16px] mb-[16px]">Price: <span className="text-[#46A358]">${value[0]} - ${value[1]}</span></h2>
                        <button onClick={handleSliderFilter} className="inline-block">
                            <MainButton>Filter</MainButton>
                        </button>
                    </div>
                </Box>
                </Modal>
            </div>
        </div>
        {!loading3 && <div className="grid grid-cols-2 md:grid-cols-3 gap-[33px]">
        {productsData?.products?.map((item) => (
            <div key={item.title}>
            <div className="flex group overflow-hidden justify-center relative w-full h-[300px] items-center bg-[#FBFBFB] mb-3">
                <img src={item.images[0]} alt="main image" />
                <div className="hidden gap-[20px] group-hover:flex items-center absolute bottom-[10px]">
                    <img onClick={() => handleAddToCard(item)} className="cursor-pointer" src="/navbar/shop_icon.svg" alt="shop" />
                    <img className="cursor-pointer" src="/flowers/like.svg" alt="like" />
                    <Link to={`/shop/${item.id}`}>
                        <img className="cursor-pointer" src="/navbar/search_icon.svg" alt="search" />
                    </Link>
                </div>
                {item.discount && <div className={`absolute left-0 top-[20px]`}>
                    <MainButton >13% OFF</MainButton>
                </div>}
            </div>
            <Link to={`/shop/${item.id}`} className="text-[16px] hover:underline  font-[400] leading-[16px] text-[#3D3D3D] mb-[6px]">{item.title}</Link>
            <h2 className="text-[18px] font-[700] leading-[16px] text-[#46A358] mb-[6px]">${item.price} <span className="font-[400] line-through text-[#A5A5A5]"> {item.discount && '$'}{item.discount &&  item.discount_price}</span></h2>
            </div>
        ))}
        </div>}
        {loading3 && <FlowersCards/>}
        <div className="w-full flex justify-center pt-[100px] ">
        {!productsData?.products?.length && (
            <div className="text-center gap-[10px]">
            <img src="/flowers/no_data.svg" alt="no data" />
            <p>Data is empty.</p>
            </div>
        )}
        </div>
    </div>
  )
}

export default ProductCards