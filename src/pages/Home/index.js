// @ts-nocheck
import React from 'react'
import {Outlet} from 'react-router-dom'
import HomeMenu from '../../components/Home/HomeMenu'
import TopHeader from '../../components/Home/TopHeader'
import { Spin } from 'antd';
import {Layout} from 'antd';
import './index.css'
import { useSelector } from 'react-redux';
const {Content } = Layout;
function Index() {
    const {padding} = useSelector((state)=>state.padding)
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
                        <Spin spinning={padding}>
                          <Outlet />
                        </Spin>
                    </Content>
                </Layout>
            </Layout>
        )
}
export default Index