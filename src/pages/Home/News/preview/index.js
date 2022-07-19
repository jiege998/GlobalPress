// @ts-nocheck
import React from 'react'
import moment from "moment";
import { useLocation,useNavigate } from 'react-router-dom';
import { PageHeader,Descriptions } from 'antd';
export default function Index() {
  let location = useLocation();
  const navigate =useNavigate()
  const {row} = location.state;
  return (
    <div>
          <PageHeader
              onBack={() => navigate(-1)}
              title={row.title}
              subTitle={row.category.value}
          />
          <Descriptions style={{margin:'60px 80px'}}>
              <Descriptions.Item label="创建者">{row.author}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{moment(row.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{row.publishTime !== 0?moment(row.publishTime).format('YYYY-MM-DD HH:mm:ss'):'暂无发布日期'}</Descriptions.Item>
              <Descriptions.Item label="区域">{row.region}</Descriptions.Item>
              <Descriptions.Item label="审核状态" contentStyle={row.auditState === 2?{color:'green'}:{color:'red'}}>{row.auditState === 1?'审核中':row.auditState === 2?'审核通过':row.auditState === 3?'审核未通过':'未审核'}</Descriptions.Item>
              <Descriptions.Item label="发布状态" contentStyle={row.publishState === 2?{color:'green'}:{color:'red'}}>{row.publishState === 1?'待发布':row.publishState === 2?'已上线':row.publishState === 3?'已下线':'未发布'}</Descriptions.Item>
              <Descriptions.Item label="访问数量" contentStyle={{color:'green'}}>{row.star}</Descriptions.Item>
              <Descriptions.Item label="点赞数量" contentStyle={{color:'green'}}>{row.star}</Descriptions.Item>
              <Descriptions.Item label="评论数量" contentStyle={{color:'green'}}>{row.view}</Descriptions.Item>
         </Descriptions>
         <span style={{margin:'60px 80px'}}>内容区：</span>
         <div style={{margin:'40px 180px',backgroundColor:'#eee',height:'300px',overflow:'auto'}} dangerouslySetInnerHTML={{
           __html:row.content
         }
         }>
         </div>
        
    </div>
  )
}
