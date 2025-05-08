import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Skeleton } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

function TrackOrder() {
  const now = new Date()
  const dataArray = [0,0,0,0,0,0,0,0,0,0] 
  const [activeOrder, setActiveOrder] = useState(null);
  const queryClient = useQueryClient();
  const showModal = (orderItem) => {
    setActiveOrder(orderItem);
  };

  
  const getOrders = async () => {
    const res = await axios.get(`https://dummyjson.com/carts?limit=10`);
    return res.data;
    };

    async function handleDelete(id) {
        setActiveOrder(null)
        await axios.delete(`https://dummyjson.com/carts/${id}`).then(() => {
            toast.success('Order deleted successfully')
        }).catch(() => {
            toast.error("Something went wrong, PLease Try again")
        })
        queryClient.invalidateQueries(["order"]);
    }
  
  const { data: orderData, isLoading: loading} = useQuery({
    queryKey: ["order"],
    queryFn: getOrders,
  });
  console.log(orderData)

  if(loading) {
    return (
        <>
            {dataArray.map((item, i) => (
                <div key={i} className="py-[20px]">
                    <Skeleton active paragraph={{ rows: 2 }} />
                </div>
            ))}
        </>
    )
  }
  return (
    <>
      <h2 className="text-[20px] font-[700] text-[#3D3D3D] mb-[20px]">Track your Orders</h2>
      {orderData?.carts?.map(item => (
         <div key={item._id} className="flex justify-between mb-[40px]">
            <div>
                <h3 className="text-[14px] font-[400] leading-[16px] text-[#727272] mb-[7px]">Order Number</h3>
                <h3 className="text-[15px] font-[700] leading-[16px] text-[#3D3D3D]">{item.id.toString().slice(item.id.length-14, item.id.length)}</h3>
            </div>
            <div>
                <h3 className="text-[14px] font-[400] leading-[16px] text-[#727272] mb-[7px]">Date</h3>
                <h3 className="text-[15px] font-[700] leading-[16px] text-[#3D3D3D]">{now.toString().slice(0, 16)}</h3>
            </div>
            <div>
                <h3 className="text-[14px] font-[400] leading-[16px] text-[#727272] mb-[7px]">Total</h3>
                <h3 className="text-[15px] font-[700] leading-[16px] text-[#3D3D3D]">${(item?.total)}</h3>
            </div>
            <div>
                <h3 className="text-[14px] font-[400] leading-[16px] text-[#727272] mb-[7px]">Payment Method</h3>
                <h3 onClick={() => showModal(item)} className="text-[15px] font-[700] leading-[16px] text-[#46A358] cursor-pointer">Get Details</h3>
                <Modal
                    title="Detailed Order"
                    open={!!activeOrder}
                    onOk={() => handleDelete(activeOrder.id)}
                    okButtonProps={{className: 'delete_btn'}}
                    okText={'delete'}
                    onCancel={() => setActiveOrder(null)}
                    mask={false}
                    >
                {activeOrder && (
                    <>
                    <hr className="mb-[20px] border-[#46A358]" />
                    <div className="flex justify-between mb-[40px]">
                        <div>
                        <h3 className="text-[14px] font-[400] leading-[16px] text-[#727272] mb-[7px]">Order Number</h3>
                        <h3 className="text-[15px] font-[700] leading-[16px] text-[#3D3D3D]">
                            {activeOrder.id.toString().slice(activeOrder.id.length - 14)}
                        </h3>
                        </div>
                        <div>
                        <h3 className="text-[14px] font-[400] leading-[16px] text-[#727272] mb-[7px]">Date</h3>
                        <h3 className="text-[15px] font-[700] leading-[16px] text-[#3D3D3D]">
                            {now.toString().slice(0, 16)}
                        </h3>
                        </div>
                        <div>
                        <h3 className="text-[14px] font-[400] leading-[16px] text-[#727272] mb-[7px]">Total</h3>
                        <h3 className="text-[15px] font-[700] leading-[16px] text-[#3D3D3D]">
                            ${activeOrder?.total}
                        </h3>
                        </div>
                        <div>
                        <h3 className="text-[14px] font-[400] leading-[16px] text-[#727272] mb-[7px]">Payment Method</h3>
                        <h3 className="text-[15px] font-[700] leading-[16px] text-[#3D3D3D]">Cash on delivery</h3>
                        </div>
                    </div>

                    <h2 className="text-[17px] font-[700] leading-[16px] mb-[12px] text-[#3D3D3D]">Order Details</h2>
                    <table className="w-full mb-[30px]">
                        <thead>
                        <tr className="border-b-[1px] border-[#46A358] pb-[11px] w-full mb-[11px]">
                            <th className="min-w-[100px] text-start font-[500] text-[16px] leading-[16px] pb-[11px] text-[#3D3D3D]">Products</th>
                            <th className="min-w-[40px] text-end font-[500] text-[16px] leading-[16px] pb-[11px] text-[#3D3D3D]">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {activeOrder?.products?.map(itemData => (
                            <tr key={itemData.id}>
                                <td className="flex items-center gap-[14px] mt-[10px]">
                                    <div className="w-[70px] h-[70px] p-1 gap-[14px] overflow-hidden">
                                    <img src={itemData?.thumbnail} alt="img" className="w-full" />
                                    </div>
                                    <div>
                                    <h2 className="text-[16px] font-[500] leading-[16px] text-[#3D3D3D] mb-[10px]">{itemData?.title}</h2>
                                    <div className="flex gap-[10px]">
                                        <span className="font-[400] text-[14px] leading-[16px]">SKU: </span>
                                        <span className="font-[600] text-[14px] leading-[16px]">{itemData?.id}</span>
                                    </div>
                                    </div>
                                    <h2 className="flex ">(x {itemData?.quantity})</h2>
                                </td>
                                <td className="text-[#46A358] text-[16px] text-end leading-[16px] font-[700]">
                                    ${(itemData?.price * 100000 * itemData?.quantity)/100000}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mb-[26px]">
                        <h2 className="text-[#3D3D3D] text-[15px] leading-[16px] font-[500] ">Total Quantity</h2>
                        <h3 className="text-[#3D3D3D] text-[18px] leading-[16px] font-[500] ">{activeOrder?.totalQuantity}</h3>
                    </div>
                    <div className="flex justify-between items-center mb-[26px]">
                        <h2 className="text-[#3D3D3D] text-[15px] leading-[16px] font-[500] ">Total Products</h2>
                        <h3 className="text-[#3D3D3D] text-[18px] leading-[16px] font-[500] ">{activeOrder?.totalProducts}</h3>
                    </div>

                    <div className="flex justify-between items-center mb-[30px]">
                        <h2 className="text-[#3D3D3D] text-[16px] leading-[16px] font-[500] ">Total</h2>
                        <div className="flex flex-col gap-[10px]">
                        <h3
                            className={` text-[18px] leading-[16px] font-[700]  text-[#46A358]`}
                        >
                            ${activeOrder?.total}
                        </h3>
                        </div>
                    </div>

                    <hr className="mb-[10px] border-[#46A358]" />
                    </>
                )}
                </Modal>
            </div>
        </div>
      ))}
    </>
  )
}

export default TrackOrder