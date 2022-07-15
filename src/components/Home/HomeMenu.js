// @ts-nocheck
import React,{useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
import axios from 'axios';
import nprogress from 'nprogress';
import  'nprogress/nprogress.css';
  const { Sider} = Layout;
  const iconList = {
    "/home/rightList":<PlusCircleOutlined />,
    "/home/rightList/list":<PlusCircleOutlined />,
    "/home/roleList/update":<PlusCircleOutlined />,
    "/home/rightList/update":<PlusCircleOutlined />,
    "/home/news":<PlusCircleOutlined />,
    "/home/news/list":<PlusCircleOutlined />,
    "/home/news/add":<PlusCircleOutlined />,
    "/home/news/update/:id":<PlusCircleOutlined />,
    "/home/news/preview/:id":<PlusCircleOutlined />,
    "/home/news/draft":<PlusCircleOutlined />,
    "/home/news/category":<PlusCircleOutlined />,
    "/home/audit":<PlusCircleOutlined />,
    "/home/audit/audit":<PlusCircleOutlined />,
    "/home/audit/list":<PlusCircleOutlined />,
    "/home/publish":<PlusCircleOutlined />,
    "/home/publish/unpublished":<PlusCircleOutlined />,
    "/home/publish/published":<PlusCircleOutlined />,
    "/home/publish/sunset":<PlusCircleOutlined />,
    "/home/user":<PlusCircleOutlined />,
    "/home/user/list":<PlusCircleOutlined />,
    "/home/roleList/list":<PlusCircleOutlined />,
    "/home/authority/roleList":<PlusCircleOutlined />,
    "/home/authority/rightList":<PlusCircleOutlined />,
    "/home/homePage":<PlusCircleOutlined />,
    "/home/authority":<PlusCircleOutlined />,
  }
export default function HomeMenu() {
    const {role:{rights:{checked}}} = JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:5000/rights?_embed=children').then(
     res=>{
       if(res.status === 200){
         let newMenu = []
         let obj ={}
         res.data.forEach(item=>{
          if(item.pagepermisson === 1 && checked.indexOf(item.key) !== -1){
            obj={
              key:item.key,
              label:item.title,
              icon:iconList[item.key]
             }
            if(item.children.length>0){
               obj.children =[]
                 item.children.forEach(child=>{
                  if(child.pagepermisson === 1 && checked.indexOf(child.key) !== -1){
                    obj.children.push({
                      key:child.key,
                      label:child.title,
                      icon:iconList[child.key]
                    })
                  }
                 })
            }
            newMenu = [...newMenu,obj]
          }
         })
         setMenu(newMenu)
    }
  
   },[])
    const [collapsed] = useState(false)
    const [menu,setMenu] = useState([])
    const navigate = useNavigate()
    const openKeys = ['/home/'+useLocation().pathname.split('/')[2]]
    function onClickItem(e){
      const {key} =e
      nprogress.start()
      navigate(key)
      nprogress.done()
    }
  return (
    <Sider  trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: "flex", height: "920px", flexDirection: "column"}}>
        <div className="logo">全球新闻发布系统</div>
          <Menu
              theme="dark"
              mode="inline"
              style={{flex: 1, overflow: "auto"}}
              selectedKeys={[useLocation().pathname]}
              defaultOpenKeys={openKeys}
              onClick={onClickItem}
              items={menu}
          />
      </div>
    </Sider>
  )
}
