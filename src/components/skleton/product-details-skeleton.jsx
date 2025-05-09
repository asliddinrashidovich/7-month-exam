import { Skeleton } from 'antd';

const ProductDetailsSkeleton = () => {
    return (
      <>
        <div className='max-w-[1200px] mx-auto grid-cols-1 sm:grid-cols-2 grid gap-[30px] px-[20px] lg:px-10 my-[100px]'>
            <div>
                <Skeleton.Image style={{width: '500px' }} active  className='skeleton-img2'/>
            </div>
            <div>
                <Skeleton paragraph={{ rows: 3 }} avatar/> 
                <Skeleton paragraph={{ rows: 7 }} /> 
            </div>
        </div>
        <div className='max-w-[1200px] mx-auto px-[20px] lg:px-10 my-[100px]'>
            <Skeleton paragraph={{ rows: 10 }} /> 
        </div>
      </>
    )
}
export default ProductDetailsSkeleton;