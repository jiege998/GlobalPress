// @ts-nocheck
import React,{useState,useEffect} from 'react'
import moment from "moment";
import { useLocation,useNavigate } from 'react-router-dom';
import { PageHeader,Descriptions, message } from 'antd';
import {
    HeartOutlined,
  } from "@ant-design/icons";
import axios from '../../../components/tools/http';
export default function Index() {
  let location = useLocation();
  const [state,setState] = useState(false)
  const navigate =useNavigate()
  const {row} = location.state;
  const [rowList,setRowList] = useState({})
  useEffect(()=>{
    axios.get(`news/${row.id}?_expand=category&_expand=role`).then(res=>{
      setRowList({
        ...res.data,
        view:res.data.view+1
    })
    return res.data
    }).then(res=>{
      axios.patch(`/news/${row.id}`,{
        view:res.view+1
    })
    })
},[])
  const star = ()=>{
    if(!state){
        setState(true)
    }
    else{
        message.error('你已经点赞')
    }
    axios.get(`news/${row.id}?_expand=category&_expand=role`).then(res=>{
      setRowList({
        ...res.data,
        star:res.data.star+1
    })
    return res.data
    }).then(res=>{
      axios.patch(`/news/${row.id}`,{
        view:res.star+1
    })
    })
  }
  return (
    <div>
          <PageHeader
              onBack={() => navigate(-1)}
              title={rowList.title}
              extra={<HeartOutlined style={state?{color:'red'}:{}} onClick={()=>star()}/>}
              subTitle={rowList?.category?.value}
          />
          <Descriptions style={{margin:'60px 80px'}}>
              <Descriptions.Item label="创建者">{rowList.author}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{moment(rowList.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{rowList.publishTime !== 0?moment(rowList.publishTime).format('YYYY-MM-DD HH:mm:ss'):'暂无发布日期'}</Descriptions.Item>
              <Descriptions.Item label="区域">{rowList.region}</Descriptions.Item>
              <Descriptions.Item label="访问数量" contentStyle={{color:'green'}}>{rowList.view}</Descriptions.Item>
              <Descriptions.Item label="点赞数量" contentStyle={{color:'green'}}>{rowList.star}</Descriptions.Item>
              <Descriptions.Item label="评论数量" contentStyle={{color:'green'}}>{rowList.star}</Descriptions.Item>
         </Descriptions>
         <span style={{margin:'60px 80px'}}>内容区：</span>
         <div style={{margin:'40px 180px',backgroundColor:'#eee',overflow:'auto'}} dangerouslySetInnerHTML={{
           __html:rowList.content
         }
         }>
         </div>
        
    </div>
  )
}
