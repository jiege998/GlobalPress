// @ts-nocheck
import React,{useEffect,useState} from 'react'
import axios from '../../../../components/tools/http'
import { Table, Button, Popconfirm, message,notification} from 'antd';
import { useNavigate } from 'react-router-dom';
export default function Index() {
  const {username} =  JSON.parse(localStorage.getItem('token'))
  const [dataSource,setDataSource] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get(`/news?author=${username}&publishState=1&_expand=category`).then(res=>{
      setDataSource(res.data)
    })
  },[username])
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
      render:(title,row)=>{
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
            title={`确认发布该新闻吗?`}
            onConfirm={() => confirm(row)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary"  style={{ marginLeft: '10px' }}>发布</Button>
          </Popconfirm>
        </div>

      )
    }]
  const confirm = (row) => {
    setDataSource(dataSource.filter(item=>item.id !== row.id))
    axios.patch(`/news/${row.id}`,{
      publishState:2,
      publishTime:Date.now()
    }).then(res=>{
      if(res){
        notification.info({
          message: `发布成功`,
          description:
          `您可以到发布列表中进行查看`,
          placement:'bottomRight'
        });
      }
    })
  }
  const cancel = () => {
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
