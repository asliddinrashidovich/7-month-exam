import { Skeleton } from 'antd';

const AccountDetailsSkeleton = () => {
    const dataArray = [0,0,0,0,0,0,0,0] 
    return (
       <div className='max-w-[1200px] mx-auto grid-cols-1 sm:grid-cols-2 grid gap-[30px]'>
            {dataArray.map((item, i) => (
                <div key={i} className='w-full'>
                    <Skeleton paragraph={{rows: 1}} className='my-[10px]'/>
                </div>
            ))}
       </div>
    )
}
export default AccountDetailsSkeleton;