import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import axios from "axios";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { IoEyeOutline } from "react-icons/io5"
import NotFound from "./not-found";

function MyPosts() {
  const user = JSON.parse(localStorage.getItem('user'))

  const fetchMyPost = async () => {
    const res = await axios.get(`https://dummyjson.com/users/${user.id}/posts`);
    return res.data;
  }
  const { data: posts, isLoading: loading} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchMyPost,
  });
  console.log(posts)
  if(loading) {
    return <Skeleton paragraph={{rows: 10}} className='my-[20px]'/>
  }
  return (
    <div >
      <h2 className="text-[20px] mb-[20px] font-[500]">My posts</h2>
      <div className="flex flex-col gap-[30px] ">
          {posts?.posts && posts?.posts?.map((item) => (
              <div key={item._id} className="border-[0.5px] border-[#A5A5A5]  rounded-[15px]">
                  <h2  className="inline-block text-[20px] px-[20px] pt-[20px] font-[500] leading-[100%] mb-[20px] cursor-pointer hover:underline ">{item.title}</h2>
                  <p className="text-[14px] px-[20px] pb-[20px]  font-[400] leading-[140%] line-clamp-4">{item.body}</p>
                  <hr className="border-[#A5A5A5] mt-[10px]"/>
                  <div className="flex px-[30px] py-[20px] justify-between">
                    <div className="flex gap-[4px] items-center cursor-pointer hover:text-[#46A358]">
                      <IoEyeOutline />
                      <h2>{item.views}</h2>
                    </div>
                    <div className="flex gap-[4px] items-center cursor-pointer hover:text-[#46A358]">
                      <AiOutlineDislike />
                      <h2>{item.reactions.dislikes}</h2>
                    </div>
                    <div className="flex gap-[4px] items-center cursor-pointer hover:text-[#46A358]">
                      <AiOutlineLike />
                      <h2>{item.reactions.likes}</h2>
                    </div>
                  </div>
              </div>
          ))}
          {!posts?.posts.length && (
            <NotFound>No Posts</NotFound>
          )}
      </div>
    </div>
  )
}

export default MyPosts