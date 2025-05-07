import axios from "axios"
import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Slider } from "@mui/material";
import MainButton from "../../button/button";

function Categoryies() {
    const [value, setValue] = useState([0, 1000]);
    const [searchParams, setSearchParams] = useSearchParams()
    
    //  useSearchparams

    //   sort by category
    const categoryBy  = searchParams.get('category') || 'house-plants'
    
    const updateParams = (categorytype) => {
        searchParams.set('category', categorytype)
        setSearchParams(searchParams)
    }

    //  filter by range value
    const handleSliderFilter = () => {
        searchParams.set('range_min', value[0])
        searchParams.set('range_max', value[1])
        setSearchParams(searchParams)
    }
    const handleChangeSlider = (event, newValue) => {
        setValue(newValue);
    };
    
     // getting APIs
    const fetchCategory = async () => {
      const {data} = await axios.get(`https://dummyjson.com/products/categories`);
      return data;
    };
    const fetchDiscount = async () => {
      const {data} = await axios.get(`https://green-shop-backend.onrender.com/api/features/discount?access_token=6506e8bd6ec24be5de357927`);
      return data;
    };
    
    const { data: categoryData, isLoading: loading1} = useQuery({
      queryKey: ["category"],
      queryFn: fetchCategory,
    });
    const { data: discountData, isLoading: loading2 } = useQuery({
      queryKey: ["discount"],
      queryFn: fetchDiscount,
    });
  return (
    <div className="py-[14px] px-[20px] hidden lg:flex md:flex-col w-[310px]">
        <h2 className="font-[700] text-[18px] leading-[16px] mb-[7px]">Categories</h2>
            <div className="px-[12px] mb-[36px]">
            {!loading1 && categoryData?.map((item) => (
                <div key={item.slug} onClick={() => updateParams(item.slug)} className="flex text-[#46A358] justify-between w-full cursor-pointer group">
                    <p className={`font-[700] text-[15px] leading-[40px] ${categoryBy == item.slug ? 'text-[#46A358]' : 'text-[#3D3D3D] '}  group-hover:text-[#46A358] transition-all duration-[.3s]` }>{item.name}</p>
                    <p className={`font-[700] text-[15px] leading-[40px] ${categoryBy == item.slug ? 'text-[#46A358]' : 'text-[#3D3D3D] '} group-hover:text-[#46A358] transition-all duration-[.3s]`}></p>
                </div>
            ))}
            {loading1 && (
                <Skeleton paragraph={{rows: 20}}/>
            )}
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
                <button onClick={handleSliderFilter}>
                    <MainButton>Filter</MainButton>
                </button>
            </div>
            {!loading2 && <div className="pt-[22px] text-center bg-linear-to-br from-[#46A3581A] to-[#46A35808]">
                <h2 className="font-[400] text-[51px] leading-[65px] text-[#46A358] mb-[11px]">Super Sale</h2>
                <h2 className="font-[700] text-[23px] leading-[16px] text-[#3D3D3D] mb-[5px]">UP TO {discountData?.data?.discoount_up_to}% OFF</h2>
                <img src={discountData?.data?.poster_image_url} alt="image" />
            </div>}
            {loading2 && <Skeleton.Image />}
    </div>
  )
}

export default Categoryies