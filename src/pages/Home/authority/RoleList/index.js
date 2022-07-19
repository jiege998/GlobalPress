// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Table, Button, Popconfirm, message,Modal,Tree } from 'antd'
import axios from '../../../../components/tools/http'
import { UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons'
export default function Index() {
  const [dataSource, setDataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [roleId, setRoleId] = useState(0);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      dataIndex: '',
      render: (row) => (
        <div>
          <Button type="ghost" shape="circle"  icon={<UnorderedListOutlined />} onClick={()=>openModel(row)}/>
          <Popconfirm
            title="确认删除该角色吗?"
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
      axios.delete(`/roles/${row.id}`).then(res => {
        if (res.status === 200) {
          setDataSource(dataSource.filter(val=>val.id !== row.id))
          message.success('删除成功');
        }
        else {
          message.error('删除失败');
        }
      }).catch(error => {
        message.error('删除失败' + error);
      })
  }
  const cancel = (e) => {
    message.error('Click on No');
  };
  useEffect(() => {
    axios.get('/roles').then(res => {
      if (res.status === 200) {
        setDataSource(res.data)
      }
    })
    axios.get('/rights?_embed=children').then(res => {
      if (res.status === 200) {
        setTreeData(res.data)
      }
    })
  },[])
  const handleOk = () => {
    setIsModalVisible(false);
    dataSource.map(item=>{
      if(item.id === roleId){
        return item.rights = keyList
      }
      return item
    })
    setDataSource(dataSource)
    axios.patch(`/roles/${roleId}`,{
      rights:keyList
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const openModel=(row)=>{
    setIsModalVisible(true);
    setRoleId(row.id)
    setKeyList(row.rights)
    
  }
  const onCheck = (e)=>{
    setKeyList(e)
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}></Table>
      <Modal title="权限列表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Tree
          checkable
          checkStrictly={true}
          checkedKeys={keyList}
          onCheck={onCheck}
          treeData={treeData}
    />
      </Modal>
    </div>
  )
}
