// @ts-nocheck
import React, { forwardRef,useState,useEffect } from 'react'
import {Form,Input,Select} from 'antd'
 const {Option} = Select
 const  userForm = forwardRef((prpos,ref)=> {
  useEffect(()=>{
      setIsDisable(prpos.isUpdateVisible)
  },[prpos.isUpdateVisible])
    const layout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 16,
        }
      };
      const [isDisable,setIsDisable ]= useState(false)
      const {region,roleId} = JSON.parse(localStorage.getItem('token'))
  return (
    <div>
         <Form {...layout} name="nest-messages" ref={ref}>
          <Form.Item
            name='username'
            label="用户名"
            rules={[
              {
                required: true,
                message:'用户名是必须的'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='password'
            label="密码"
            rules={[
              {
                required: true,
                message:'密码是必须的'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='region'
            label="区域"
            rules={isDisable?[]:[
              {
                required: true,
                message:'区域是必须的'
              },
            ]}
          >
            <Select  disabled={isDisable}>
              {
                prpos.treeData.map(item=>{
                  return <Option value={item.value} key={item.id} disabled={roleId === 1?false:item.title !== region}>{item.title}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            name='roleId'
            label="角色"
            rules={[
              {
                required: true,
                message:'角色是必须的'
              },
            ]}
          >
            <Select onChange={value=>{
              if(value === 1 ){
                setIsDisable(true)
                ref.current.setFieldsValue({
                  region:""
                })
              }
              else{
                setIsDisable(false)
              }
            }}>
              {
                prpos?.roleList.map(item=>{
                  return <Option value={item.id} key={item.id} disabled={roleId === 1?false:roleId === 2?item.roleType !== 3:true}>{item.roleName}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
    </div>
  )
})
export default userForm
