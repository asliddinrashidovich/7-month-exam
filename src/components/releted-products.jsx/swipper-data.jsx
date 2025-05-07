// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import MainButton from '../button/button';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addDataToShopping } from '../../reducers/shoppingSlice';
import PropTypes  from 'prop-types'

ReletedProductsData.propTypes  = {
    flowerReletedData: PropTypes.array.isRequired
}

export default function ReletedProductsData({flowerReletedData}) {
    const dispatch = useDispatch()
    
    function handleAddToCard(itemData) {
        toast.success('Added to you shopping card!')
        dispatch(addDataToShopping(itemData))
    }
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {flowerReletedData?.map(item => (
            <SwiperSlide key={item.id}>
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
            </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
