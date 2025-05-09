import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardSkleton from "../skleton/card-skeleton";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Pagination } from "antd";
import { useState } from "react";

function BlogsAll() {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 12;
    
    const [searchParams] = useSearchParams()
    const postSearch  = searchParams.get('posts-search') || ""
    const fetchBlog = async () => {
      const res = await axios.get(`https://dummyjson.com/posts?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}`);
      const allProducts =  res.data.posts;
      
      const filtered = allProducts.filter(product =>  product.title.toLowerCase().includes(postSearch.toLowerCase()) );

      return filtered
    }
    const { data: blog, isLoading: loading} = useQuery({
      queryKey: ["blog", {postSearch, currentPage}],
      queryFn: fetchBlog,
    });

    function handleClick(id) {  
      navigate(`/posts/${id}`)
    }

    console.log(blog)
    if(loading) {
        return (
            <CardSkleton/>
        )
    }
  return (
    <div className="max-w-[1200px] mx-auto  py-[40px]  px-[40px]">
      <div className=" grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid gap-[30px] ">
          {blog?.map((item) => (
              <div key={item._id} className="border-[0.5px] border-[#A5A5A5]  rounded-[15px]">
                  <h2 onClick={() => handleClick(item.id)}  className="inline-block text-[20px] px-[20px] pt-[20px] font-[500] leading-[100%] mb-[20px] cursor-pointer hover:underline ">{item.title}</h2>
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
      </div>
      <div className="flex justify-center my-[40px]">
        <Pagination total={250} current={currentPage} pageSize={pageSize} onChange={(e) => setCurrentPage(e)}/>
      </div>
    </div>
  )
}

export default BlogsAll