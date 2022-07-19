// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Table, Button, Popconfirm, message,notification,Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../components/tools/http';
export default function Index() {
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const { username: author } = JSON.parse(localStorage.getItem('token'))
    axios.get(`/news?author=${author}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      const list = res.data
      setDataSource(list)
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
      title: '审核状态',
      dataIndex: 'auditState',
      render: (state) =>state === 1?<Tag color="#2db7f5">审核中</Tag>:state === 2? <Tag color="#87d068">已通过</Tag>:  <Tag color="#f50">未通过</Tag>
    },
    {
      title: '操作',
      dataIndex: '',
      render: (row) => (
        <div>
          <Popconfirm
            title={`确认${row.auditState===2?'发布':row.auditState===1?'撤销':'修改'}该新闻吗?`}
            onConfirm={() => confirm(row)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary"  style={{ marginLeft: '10px' }}>{row.auditState===2?'发布':row.auditState===1?'撤销':'修改'}</Button>
          </Popconfirm>
        </div>

      )
    }]
  const confirm = (row) => {
    setDataSource(dataSource.filter(item=>item.id !== row.id))
    if(row.auditState === 1){
        axios.patch(`/news/${row.id}`,{
          auditState:0
        }).then(res=>{
          if(res.data.length>0){
            notification.info({
              message: `撤销成功`,
              description:
              `您可以到草稿箱列表中进行查看`,
              placement:'bottomRight'
            });
          }
        })
    }else if(row.auditState === 2){
      axios.patch(`/news/${row.id}`,{
        publishState:2,
        publishTime:Date.now()
      }).then(res=>{
        if(res){
          navigate('/home/publish/published')
          notification.info({
            message: `发布成功`,
            description:
            `您可以到发布列表中进行查看`,
            placement:'bottomRight'
          });
        }
      })
    }else{
      navigate(`/home/news/update/${row.id}`, {
        state: {
          row,
          replace: true
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
