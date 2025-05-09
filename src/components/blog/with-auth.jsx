import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from "react-router-dom"
const { Search } = Input;


function WithauthCase() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [searchParams, setSearchParams] = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false);
  
      const showModal = () => {
        setIsModalOpen(true);
      };
  
      const handleOk = () => {
        setIsModalOpen(false);
      };
  
      const handleCancel = () => {
        setIsModalOpen(false);
      };
  
  const onSearch = (value, _e, info) => {
    console.log(info === null || info === void 0 ? void 0 : info.source, value);
    searchParams.set('posts-search', value)
    setSearchParams(searchParams)
  }
    // add posts
    const AddPost = async (values) => {
      const {title, body} = values
      try {
        const res = await axios.post(`https://dummyjson.com/posts/add`, {
          userId: user.id,
          title,
          body
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        console.log(res)
        setIsModalOpen(false)
        toast.success("Your New Post added successfully")
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong, Please try again');
      }
    };
  return (
    <div className="max-w-[1200px]  mx-auto  mt-[20px]  px-[40px]">
        <h1 className="text-[35px] mb-[15px] text-center font-[600]">My Feed</h1>
        <div className='text-center mb-[30px]'>
            <Space direction="vertical">
                <Search placeholder="Search..." onSearch={onSearch}  className='input-search' />
            </Space>
        </div>
        <div className='cursor-pointer'>
            <Tooltip title="New Post" placement="top" arrow>
                <Button
                shape="circle"
                icon={<PlusOutlined />}
                size='medium'
                onClick={showModal}
                style={{
                    border: '3px solid black',
                    color: 'black',
                    background: 'white',
                }}
                />
            </Tooltip>
            <Modal
              title="Add New Post."
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                  style={{ width: '100%'}}
                  initialValues={{
                      title: "",
                      body: ""
                  }}
                  onFinish={(values) => AddPost(values)}
                  autoComplete="off"
                  name="layout-multiple-horizontal"
                  layout="horizontal"
                >
                  <Form.Item
                    name="title"
                    layout="vertical"
                    label="Title"
                    style={{width: '100%'}} 
                    rules={[{ required: true, message: 'Please enter your post title!'}]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    className="h-[60px]"
                  >
                    <Input  placeholder='Title'/>
                  </Form.Item>
                  <Form.Item
                    name="body"
                    layout="vertical"
                    label="Body"
                    style={{width: '100%'}} 
                    rules={[{ required: true, message: 'Please enter your post description!'}]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 54 }}
                    className="h-[150px]"
                  >
                    <TextArea rows={4} placeholder="Description"  />
                  </Form.Item>
              
                  <Form.Item label={null}>
                    <Button 
                      onSubmit={AddPost}
                      htmlType="submit"
                      style={{
                        width: '100%',
                        backgroundColor: '#46A358',
                        color: 'white',
                        border: 'none',
                        padding: '16px 0',
                        marginBottom: '47px'
                      }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
            </Modal>
        </div>
    </div>
  )
}

export default WithauthCase