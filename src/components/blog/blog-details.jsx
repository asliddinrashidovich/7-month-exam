
import { IoEyeOutline } from "react-icons/io5"
import MainButton from "../button/button"
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai"
import { MdOutlineShare } from "react-icons/md";
import { Button, Tooltip } from "antd";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import BlogDetailsSkeleton from "../skleton/blog-details-skleton";
import ParagraphSkileton from "../skleton/paragraph-skeleton";

function BlogDetails() {
    
    const {id} = useParams()

    const fetchBlogDetails = async () => {
        const {data} = await axios.get(`https://dummyjson.com/posts/${id}`);
        return data
    };
    
    const { data: blogDetails, isLoading: loading1} = useQuery({
        queryKey: ["blogDetails", id],
        queryFn: fetchBlogDetails,
    });
    
    const fetchProfileCreated = async () => {
        const {data} = await axios.get(`https://dummyjson.com/users/${blogDetails.userId}`);
        return data
    };
    const { data: createdByProfile, isLoading: loading2} = useQuery({
        queryKey: ["createdByProfile", id],
        queryFn: fetchProfileCreated,
    });
    
    if(loading1, loading2) {
        return (
            <div className="max-w-[800px] mx-auto py-[40px] px-[40px]">
                <BlogDetailsSkeleton/>
                <ParagraphSkileton/>
            </div>
        )
    }
    console.log(createdByProfile)
    console.log(blogDetails)
  return (
    <div className="max-w-[800px] mx-auto py-[40px] px-[40px]">
        <div className="mb-[43px]">
            <Link to={'/'} className="font-[400] text-[#3D3D3D] text-[15px] leading-[16px]">Home</Link> / 
            <Link to={'/posts'} className="font-[400] text-[#3D3D3D] text-[15px] leading-[16px]"> Posts</Link> / 
            <span className="font-[700] text-[15px] text-[#3D3D3D] leading-[16px]"> Shop</span>
        </div>
        <div className="flex justify-between items-center mb-[30px]">
            <div className="flex gap-[20px] items-center">
                <div className="w-[70px] h-[70px] rounded-[50%] overflow-hidden">
                    <img src={createdByProfile?.image} alt="image" />
                </div>
                <div>
                    <h2 className="text-[18px] font-[700]">{createdByProfile?.firstName} {createdByProfile?.lastName}</h2>
                    <p className="text-[15px] font-[400]"> {createdByProfile?.email}</p>
                </div>
            </div>
            <div>
                <MainButton>Follow</MainButton>
            </div>
        </div>
        <h2 className="mb-[40px] text-[30px] font-[700]">{blogDetails?.title}</h2>
        <div className="text-[18px] font-[500] leading-[130%] mb-[20px]"  dangerouslySetInnerHTML={{ __html: blogDetails?.body }}/>
        <div className="flex items-center">
            <Tooltip title="Views" placement="top" arrow className="flex items-center">
                <Button  icon={<IoEyeOutline />}  size='large'  style={{
                    border: 'none',
                    color: 'black',
                    background: 'white',
                }}>
                    <span className="text-[18px] font-[500] leading-[100%]">{blogDetails?.views}</span>
                </Button>
            </Tooltip>
            <Tooltip title="Dislikes" placement="top" arrow className="flex items-center">
                <Button  icon={<AiOutlineDislike />}  size='large'  style={{
                    border: 'none',
                    color: 'black',
                    background: 'white',
                }}>
                    <span className="text-[18px] font-[500] leading-[100%]">{blogDetails?.reactions.dislikes}</span>
                </Button>
            </Tooltip>
            <Tooltip title="Likes" placement="top" arrow className="flex items-center">
                <Button  icon={<AiOutlineLike />}  size='large'  style={{
                    border: 'none',
                    color: 'black',
                    background: 'white',
                }}>
                    <span className="text-[18px] font-[500] leading-[100%]">{blogDetails?.reactions.likes}</span>
                </Button>
            </Tooltip>
            <Tooltip title="Share" placement="top" arrow className="flex items-center">
                <Button  icon={<MdOutlineShare />}  size='large'  style={{
                    border: 'none',
                    color: 'black',
                    background: 'white',
                }}>
                    <span className="text-[18px] font-[500] leading-[100%]">0</span>
                </Button>
            </Tooltip>
        </div>
    </div>
  )
}

export default BlogDetails