// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Popconfirm, message, Modal, Switch } from 'antd'
import axios from '../../../../components/tools/http'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import UserForm from '../../../../components/user/userForm'
export default function Index() {
  const [dataSource, setDataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const addForm = useRef(null)
  const updateForm = useRef(null)
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        {
          text:'全球',
          value:'全球'
        },
        ...treeData.map(val=>{
          return {
            text:val.title,
            value:val.value
          }
        })
       
      ],
      onFilter: (value, record) => {
        if(record.region === ''){
         return  value.indexOf('全球') === 0
        }
        else{
          return   record.region.indexOf(value) === 0
        }
      },
      render: (region) => {
        return region ? <b>{region}</b> : <b>全球</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role.roleName
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (status, item) => {
        return <Switch checked={status} onChange={(e) => handelChange(e, item)} disabled={item.default}></Switch>
      }
    },
    {
      title: '操作',
      dataIndex: '',
      render: (row) => (
        <div>
          <Button type="ghost" shape="circle" icon={<EditOutlined />} onClick={() => openModel(row)} disabled={row.default} />
          <Popconfirm
            title="确认删除该角色吗?"
            onConfirm={() => confirm(row)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger style={{ marginLeft: '10px' }} disabled={row.default} />
          </Popconfirm>
        </div>
      )
    }]
  useEffect(() => {
    const {roleId,username,region} = JSON.parse(localStorage.getItem('token'))
    const roleObj = {
      '1':'superAdmin',
      '2':'admin',
      '3':'editor',
    }
    axios.get('/users?_expand=role').then(res => {
      if (res.status === 200) {
        setDataSource(roleObj[roleId] === 'superAdmin'?res.data:[...res.data.filter(
          val=>val.username === username)
          ,...res.data.filter(val=>val.region === region && val.roleId === 3)
        ])
      }
    })
    axios.get('/regions').then(res => {
      if (res.status === 200) {
        setTreeData(res.data)
      }
    })
    axios.get('/roles').then(res => {
      if (res.status === 200) {
        setRoleList(res.data)
      }
    })
  }, [])
  const confirm = (row) => {
    axios.delete(`/users/${row.id}`).then(res => {
      if (res.status === 200) {
        setDataSource(dataSource.filter(val => val.id !== row.id))
        message.success('删除成功');
      }
    }).catch(error => {
      message.error('删除失败' + error);
    })
  }
  const cancel = () => {
    message.error('用户点击取消');
  };
  const handleOk = () => {
    addForm?.current.validateFields().then(value => {
      value.roleId = Number(value.roleId)
      setIsModalVisible(false);
      axios.post(`/users`, {
        ...value,
        roleState: true,
        default: false
      }).then(res => {
        setDataSource([...dataSource, {
          ...res.data,
          role: roleList.filter(item => item.id === value.roleId)[0]
        }])
        addForm?.current.resetFields()
      })

    }).catch(error => {
      message.error('添加失败' + error)
    })
  };

  const handleCancel = () => {
    addForm?.current.resetFields()
    setIsModalVisible(false);
    
  };
  const openModel = (row) => {
    setCurrent(row)
    setIsUpdate(true);
    setTimeout(() => {
      if(row.roleId === 1){
         setIsUpdateVisible(true)
      }else{
        setIsUpdateVisible(false)
      }
      updateForm&&updateForm.current.setFieldsValue(row)
    }, 0);
  }
  const addUser = () => {
    setIsModalVisible(true)
  }
  const handelChange = (e, item) => {
    item.roleState = e
    setDataSource([...dataSource])
    axios.patch(`/users/${item.id}`, {
      roleState: e
    })
  }
  const updataUserOk = () => {
    updateForm?.current.validateFields().then(value => {
      value.roleId = Number(value.roleId)
      setIsUpdate(false);
      setIsUpdateVisible(!isUpdateVisible)   
      axios.patch(`/users/${current.id}`, {
        ...value,
      }).then(res => {
        if(res.status === 200){
          setDataSource(dataSource.map(item=>{
            if(item.id === current?.id){
                return {
                  ...item,
                  ...value,
                  role: roleList.filter(item => item.id === current.roleId)[0]
                }
            }
            return item
          }))
          message.success('更新成功')
        }
      }).catch(error => {
        message.error('更新失败' + error)
      })
    })
  }
  const updataUserCancel = () => {
    setIsUpdateVisible(!isUpdateVisible)
    setIsUpdate(false);
  };
  return (
    <div>
      <Button type='primary' icon={<PlusOutlined />} style={{ marginBottom: '20px' }} onClick={addUser}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} pagination={{ pageSize: 5 }}></Table>
      <Modal title="用户添加" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <UserForm ref={addForm}
          treeData={treeData} roleList={roleList}></UserForm>
      </Modal>
      <Modal title="更新用户" visible={isUpdate} onOk={updataUserOk} onCancel={updataUserCancel}>
        <UserForm ref={updateForm}
          treeData={treeData} roleList={roleList} isUpdateVisible={isUpdateVisible}></UserForm>
      </Modal>
    </div>
  )
}

