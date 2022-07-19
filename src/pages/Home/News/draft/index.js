// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Table, Button, Popconfirm, message,notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  ColumnHeightOutlined
} from '@ant-design/icons';
import axios from '../../../../components/tools/http';
export default function Index() {
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const { username: author } = JSON.parse(localStorage.getItem('token'))
    axios.get(`/news?author=${author}&auditState=0&_expand=category`).then(res => {
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
      render: (title, row) => {
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
      render: (category) => category.title
    },
    {
      title: '操作',
      dataIndex: '',
      render: (row) => (
        <div>
          <Button type="primary" shape="circle" onClick={() => goEidtNews(row)} icon={<EditOutlined />} />

          <Button type="primary" shape="circle" icon={<ColumnHeightOutlined />} style={{ marginLeft: '10px' }} onClick={() => submitAudit(row.id)} />

          <Popconfirm
            title="确认删除该新闻吗?"
            onConfirm={() => confirm(row)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger style={{ marginLeft: '10px' }} />
          </Popconfirm>
        </div>

      )
    }]
  const confirm = (row) => {
    axios.delete(`/news/${row.id}`).then(res => {
      if (res.status === 200) {
        setDataSource(dataSource.filter(data => data.id !== row.id))
        message.success('删除成功');
      }
    }).catch(error => {
      message.error('删除失败' + error);
    })
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
  const goEidtNews = (row) => {
    navigate(`/home/news/update/${row.id}`, {
      state: {
        row,
        replace: true
      }
    })
  }
  const submitAudit = (id) => {
    axios.patch(`/news/${id}`, {
      auditState: 1
    }).then(res => {
      if (res.status === 200) {
        notification.info({
          message: `添加成功`,
          description:
          `您可以到审核列表中进行查看`,
          placement:'bottomRight'
        });
        message.success('提交审核成功')
        navigate('/home/audit/list')
      }
    }).catch(() => {
      message.error('提交审核失败')
    })
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={res => res.id} />;
    </div>
  )
}
