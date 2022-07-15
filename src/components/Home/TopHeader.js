// @ts-nocheck
import React,{useState } from 'react'
import { Layout,Dropdown, Menu, Space,Avatar  } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined 
  } from '@ant-design/icons';
import {useNavigate} from'react-router-dom'
const { Header} = Layout;
function TopHeader() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
  const onClick = ({ key }) => {
    if(key === '4'){
      localStorage.removeItem('token')
      localStorage.removeItem('router')
      navigate('/login')
    }
  }
  const {role:{roleName},username} = JSON.parse(localStorage.getItem('token'))
const menu = (
  <Menu
   onClick={onClick}
    items={[
      {
        key: '1',
        label: (
          roleName
        )
      },
      {
        key: '4',
        danger: true,
        label: '退出',
      },
    ]}
  />
);
  return (
    <Header
        className="site-layout-background"
        >
             {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed) ,
          })}
          <div style={{float:'right'}}>
            <span style={{margin:'0 5px'}}>欢迎<span style={{color:'blue',margin:'0 5px',fontSize:'16px'}}>{username}</span>回来</span>
            <Dropdown overlay={menu}>
                  <Space>
                     <Avatar style={{margin:'0 10px'}} size={50} icon={<UserOutlined />} />
                  </Space>
           </Dropdown>
          </div>
    </Header>
  )
}

export default TopHeader