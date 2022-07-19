// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Popconfirm, message, Popover, Switch } from 'antd';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import {userRoot} from '../../../../components/tools/router'
import axios from '../../../../components/tools/http';
import './index.css'
export default function Index() {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    axios.get('/rights?_embed=children').then(res => {
      const list = res.data
      list.forEach((item, index) => {
        if (item.children.length === 0) {
          list[index].children = ''
        }
      })
      setDataSource(res.data)
      userRoot()
    })
  },[])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => <Tag color='yellow'>{key}</Tag>
    },
    {
      title: '操作',
      dataIndex: '',
      render: (row) => (
        <div>
          <Popover content={<div>
            <Switch checked={row.pagepermisson} onChange={()=>chagePagePermisson(row)}></Switch>
          </div>} title="配置项" trigger={row.pagepermisson === undefined ? "" : 'click'}>
            <Button type="ghost" shape="circle" disabled={row.pagepermisson === undefined} icon={<EditOutlined />} />
          </Popover>
          <Popconfirm
            title="确认删除该权限吗?"
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
  const chagePagePermisson = (row)=>{
    row.pagepermisson = row.pagepermisson === 1 ?  0 : 1
    if (row.rightId) {
      axios.patch(`/children/${row.id}`,{pagepermisson:row.pagepermisson}).then(res => {
        if (res.data.length>0) {
          message.success('修改成功');
          setDataSource([...dataSource])
        }
        else {
          message.error('修改失败');
        }
      }).catch(error => {
        message.error('修改失败' + error);
      })

    }
    else {
      axios.patch(`/rights/${row.id}`,{pagepermisson:row.pagepermisson}).then(res => {
        if (res.data.length>0) {
          message.success('修改成功');
          setDataSource([...dataSource])
        }
      }).catch(error => {
        message.error('修改失败' + error);
      })
    };
  }
  const confirm = (row) => {
    if (row.rightId) {
      let list = dataSource.filter(data => data.id === row.rightId)
      list[0].children = list[0].children.filter(data => data.id !== row.id)
      axios.delete(`/children/${row.id}`).then(res => {
        if (res.data.length>0) {
          setDataSource([...dataSource])
          message.success('删除成功');
        }
        else {
          message.error('删除失败');
        }
      }).catch(error => {
        message.error('删除失败' + error);
      })

    }
    else {
      axios.delete(`/rights/${row.id}`).then(res => {
        if (res.data.length>0) {
          setDataSource(dataSource.filter(data => data.id !== row.id))
          message.success('删除成功');
        }
      }).catch(error => {
        message.error('删除失败' + error);
      })
    };
  }
  const cancel = (e) => {
    message.error('取消');
  };
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={res=>res.id} />;
    </div>
  )
}
