// @ts-nocheck
import React, { useState,useEffect } from 'react'
import { Card, Col, Row, Avatar,List,Drawer  } from 'antd';
import './index.css'
import {useNavigate} from 'react-router-dom'
import { EditOutlined, EllipsisOutlined, PieChartOutlined,BarChartOutlined } from '@ant-design/icons';
import axios from '../../../components/tools/http';
const { Meta } = Card;
export default function Index() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [browseDate,setBrowseDate] = useState([])
  const [starData,setStarData] = useState([])
  const {region,username} = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
    axios.get(`/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`).then(res=>{
      if(res.data.length>0){
        setBrowseDate(res.data)
      }
    })
    axios.get(`/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6`).then(res=>{
      if(res.data.length>0){
        setStarData(res.data)
      }
    })
  },[])
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="site-card-wrapper">
      <Row gutter={80}>
        <Col span={8}>
          <Card title='用户最常浏览' tabBarExtraContent={<BarChartOutlined/>} bordered={true}>
            <List
              dataSource={browseDate}
              renderItem={(item) => (
                <List.Item key={item.id}>
                   <a  onClick={()=>navigate(`/home/news/preview/${item.id}`,{
                    state:{
                      row:item
                    }
                   })}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
          <List
              dataSource={starData}
              renderItem={(item) => (
                <List.Item key={item.id}>
                 <a  onClick={()=>navigate(`/home/news/preview/${item.id}`,{
                    state:{
                      row:item
                    }
                   })}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <PieChartOutlined key="setting" onClick={()=>showDrawer()}/>,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={region === ''?'全球':region}
              description={username}
            />
          </Card>
        </Col>
      </Row>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}
