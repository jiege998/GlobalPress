// @ts-nocheck
import React, { useState, useEffect,useRef,useContext } from 'react'
import { Table, Button, Popconfirm, message,Form,Input} from 'antd';
import axios from '../../../../components/tools/http';
import { DeleteOutlined} from '@ant-design/icons'
export default function Index() {
  const [dataSource, setDataSource] = useState([])
  const EditableContext = React.createContext(null);
  useEffect(() => {
    axios.get(`/categories`).then(res => {
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
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave,
      }),
    },
    {
      title: '操作',
      dataIndex: '',
      render: (row) => (
        <div>
          <Popconfirm
            title={`确认删除该栏目吗?`}
            onConfirm={() => confirm(row)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger shape='circle' icon={<DeleteOutlined/>}></Button>
          </Popconfirm>
        </div>

      )
    }]
  const confirm = (row) => {
    setDataSource(dataSource.filter(item=>item.id !== row.id))
        axios.delete(`/categories/${row.id}`).then(res=>{
          if(res.status === 200){
             message.success('删除成功')
          }
        })
  }
  const cancel = () => {
    message.error('取消');
  };
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };
  const handleSave = (row) => {
    setDataSource(dataSource.map(item=>{
      if(item.id === row.id){
        return {
          id:item.id,
          title:row.title,
          value:row.value
        }
      }
      return item
    }));
    axios.patch(`/categories/${row.id}`,{
      title:row.title,
      value:row.value
    })
  };
  return (
    <div>
      <Table
         dataSource={dataSource}
         columns={columns}
         pagination={{ pageSize: 5 }}
         rowKey={res => res.id}
         components={
         { body: {
            row: EditableRow,
            cell: EditableCell,
          }}
         }
          />;
    </div>
  )
}

