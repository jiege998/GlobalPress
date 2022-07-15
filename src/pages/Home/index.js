import React from 'react'
import {Outlet} from 'react-router-dom'
import HomeMenu from '../../components/Home/HomeMenu'
import TopHeader from '../../components/Home/TopHeader'
import {Layout} from 'antd';
import './index.css'
const {Content } = Layout;
function Index() {
        return (
            <Layout>
                <HomeMenu></HomeMenu>
                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            maxHeight:900,
                            overflow:'atuo'
                        }}
                        >
                         <Outlet />
                    </Content>
                </Layout>
            </Layout>
        )
}
export default Index