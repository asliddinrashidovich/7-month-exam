import axios from "axios"
import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { Slider } from "@mui/material";
import MainButton from "../../button/button";

function Categoryies() {
    const [value, setValue] = useState([0, 1000]);
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    // const dispatch = useDispatch()


    //  useSearchparams

    //   sort by category
    const [searchParams, setSearchParams] = useSearchParams()
    const categoryBy  = searchParams.get('category') || 'house-plants'
    
    const updateParams = (categorytype) => {
        searchParams.set('category', categorytype)
        setSearchParams(searchParams)
        // handleClose()
    }

    // // sort by type
    // const typeSort  = searchParams.get('type') || 'all-plants'
    
    // const updateTypeSort = (sortType) => {
    //     searchParams.set('type', sortType)
    //     setSearchParams(searchParams)
    // }
    
    // // sort by sort
    // const sortBy  = searchParams.get('sort') || 'default-sorting'
    
    // const updateSortBy = (sort) => {
    //     setAge(sort);
    //     searchParams.set('sort', sort)
    //     setSearchParams(searchParams)
    // }
    
    // filter by amount
    // const rangeMin  = searchParams.get('range_min') || 0
    // const rangeMax  = searchParams.get('range_max') || 1000
    
    const handleSliderFilter = () => {
        searchParams.set('range_min', value[0])
        searchParams.set('range_max', value[1])
        setSearchParams(searchParams)
        // handleClose()
    }

     // getting APIs
    const fetchCategory = async () => {
      const res = await axios.get(`https://green-shop-backend.onrender.com/api/flower/category?access_token=6506e8bd6ec24be5de357927`);
      return res.data;
    };
    const fetchDiscount = async () => {
      const res = await axios.get(`https://green-shop-backend.onrender.com/api/features/discount?access_token=6506e8bd6ec24be5de357927`);
      return res.data;
    };
    // const fetchFlowersByCategory = async ({categoryBy, typeSort, sortBy, rangeMin, rangeMax}) => {
    //   const res = await axios.get(`https://green-shop-backend.onrender.com/api/flower/category/${categoryBy}?access_token=6506e8bd6ec24be5de357927&type=${typeSort}&sort=${sortBy}&range_min=${rangeMin}&range_max=${rangeMax}`);
    //   return res.data;
    // };

    const { data: categoryData, isLoading: loading1} = useQuery({
      queryKey: ["category"],
      queryFn: fetchCategory,
    });
    const { data: discountData, isLoading: loading2 } = useQuery({
      queryKey: ["discount"],
      queryFn: fetchDiscount,
    });
    // const { data: flowersData , isLoading: loading3} = useQuery({
    //   queryKey: ["flowers", {categoryBy, typeSort, sortBy, rangeMin, rangeMax}],
    //   queryFn: () => fetchFlowersByCategory({categoryBy, typeSort, sortBy, rangeMin, rangeMax}),
    // });

    const handleChangeSlider = (event, newValue) => {
        setValue(newValue);
    };
    // console.log(flowersData)

  return (
    <div className="py-[14px] px-[20px] hidden lg:flex md:flex-col w-[310px]">
        <h2 className="font-[700] text-[18px] leading-[16px] mb-[7px]">Categories</h2>
        <div className="px-[12px] mb-[36px]">
        {!loading1 && categoryData?.data.map((item) => (
            <div key={item.title} onClick={() => updateParams(item.route_path)} className="flex text-[#46A358] justify-between w-full cursor-pointer group">
            <p className={`font-[700] text-[15px] leading-[40px] ${categoryBy == item.route_path ? 'text-[#46A358]' : 'text-[#3D3D3D] '}  group-hover:text-[#46A358] transition-all duration-[.3s]` }>{item.title}</p>
            <p className={`font-[700] text-[15px] leading-[40px] ${categoryBy == item.route_path ? 'text-[#46A358]' : 'text-[#3D3D3D] '} group-hover:text-[#46A358] transition-all duration-[.3s]`}>({item.count})</p>
            </div>
        ))}
        {loading1 && (
            <Skeleton paragraph={{rows: 10}}/>
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