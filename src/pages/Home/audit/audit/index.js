// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Table, Button, Popconfirm, message,notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../components/tools/http';
import {CheckOutlined, CloseOutlined} from '@ant-design/icons'
export default function Index() {
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const {roleId,username,region} = JSON.parse(localStorage.getItem('token'))
    const roleObj = {
      '1':'superAdmin',
      '2':'admin',
      '3':'editor',
    }
    axios.get('/news?auditState=1&_expand=category').then(res => {
      if (res.status === 200) {
        setDataSource(roleObj[roleId] === 'superAdmin'?res.data:[...res.data.filter(
          val=>val.author === username)
          ,...res.data.filter(val=>val.region === region && val.roleId === 3)
        ])
      }
    })
  }, [])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title,row) => {
        return <Button onClick={() => goPreview(row)} style={{ borderStyle: 'none', outline: 'none', backgroundColor: 'transparent', color: 'blue', marginLeft: '-15px' }}>{title}</Button>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category,row) => row.title
    },
    {
      title: '操作',
      dataIndex: '',
      render: (row) => (
        <div>
          <Popconfirm
            title={`确认通过该新闻吗?`}
            onConfirm={() => confirm(row,'Y')}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary"  shape='circle' icon={<CheckOutlined />} style={{ marginRight: '10px' }}></Button>
          </Popconfirm>
          <Popconfirm
            title={`确认驳回该新闻吗?`}
            onConfirm={() => confirm(row,'N')}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" shape='circle' danger  icon={<CloseOutlined  />}></Button>
          </Popconfirm>
        </div>

      )
    }]
  const confirm = (row,state) => {
    setDataSource(dataSource.filter(item=>item.id !== row.id))
    if(state === 'Y' ){
        axios.patch(`/news/${row.id}`,{
          auditState:2,
          publishState:1
        }).then(res=>{
          if(res.status === 200){
            notification.info({
              message: `审核通过`,
              description:
              `您可以到发布列表中进行查看`,
              placement:'bottomRight'
            });
          }
        })
    }else{
      axios.patch(`/news/${row.id}`,{
        auditState:3,
        publishState:0
      }).then(res=>{
        if(res.status === 200){
          notification.info({
            message: `审核不通过`,
            description:
            `您可以到审核列表中进行查看`,
            placement:'bottomRight'
          });
        }
      })
    }
  }
  const cancel = (e) => {
    message.error('取消');
  };
  const goPreview = (row) => {
    navigate(`/home/news/preview/${row.id}`, {
      state: {
        row,
        replace: true
      }
    })
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={res => res.id} />;
    </div>
  )
}
