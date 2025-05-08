import { Link } from "react-router-dom"
import MainButton from "../../button/button"

function Trends() {
  return (
    <div className="max-w-[1200px] bg-[#FBFBFB] px-[30px] md:px-[40px] gap-[30px] flex-col lg:flex-row mx-auto flex py-[100px]">
      <div className="flex gap-[30px] flex-col items-center sm:flex-row">
        <img src="https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp" className='max-w-[300px] mx-auto sm:w-[auto]' alt="img1" />
        <div className='text-center sm:text-end'>
          <h2 className='text-[18px] font-[900] leading-[24px] text-[#3D3D3D] mb-[10px]'>Summer cactus
          & succulents</h2>
          <p className='text-[14px] font-[400] leading-[24px] text-[#727272] mb-[15px]'>We are an online plant shop offering a wide range of cheap and trendy plants</p>
          <Link to={`/shop/${123}`}>
            <MainButton>
              <div className='flex  gap-[5px]'>
                Find More
                <img src="/trends/Arrow - Right.svg" alt="" />
              </div>
            </MainButton>
          </Link>
        </div>
      </div>
      <div className="flex gap-[30px] flex-col items-center sm:flex-row">
        <img src="https://cdn.dummyjson.com/product-images/vehicle/charger-sxt-rwd/2.webp"  className='max-w-[300px] mx-auto sm:w-[auto]' alt="img1" />
        <div className='text-center sm:text-end'>
          <h2 className='text-[18px] font-[900] leading-[24px] text-[#3D3D3D] mb-[10px]'>Styling Trends
          & much more</h2>
          <p className='text-[14px] font-[400] leading-[24px] text-[#727272] mb-[15px]'>We are an online plant shop offering a wide range of cheap and trendy plants</p>
          <Link to={`/shop/${168}`}>
            <MainButton>
              <div className='flex  gap-[5px]'>
                Find More
                <img src="/trends/Arrow - Right.svg" alt="" />
              </div>
            </MainButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Trends