// @ts-nocheck
import React, { useState,useEffect,useRef } from 'react'
import { PageHeader, Steps, Button, message, Form, Input, Select,notification } from 'antd'
import {useNavigate,useLocation} from 'react-router-dom'
import './index.css'
import axios from '../../../../components/tools/http'
import WangEditor from '../../../../components/news/wangEditor'
const { Step } = Steps
const { Option } = Select

export default function Index() {
  const navigate = useNavigate()
  const newsRef = useRef(null)
  const location = useLocation();
  const {row} = location.state;
  const user = JSON.parse(localStorage.getItem('token'))
  const [categoriesList,setCategoriesList] = useState([])
  const [formInfo,setFormInfo] = useState({})
  const [htmlInfo,setHtmlInfo] = useState('')
  useEffect(()=>{
    axios.get('/categories').then(res=>{
    if(res.data.length>0){
       setCategoriesList(res.data)
    }
      newsRef&&newsRef.current.setFieldsValue({
        title:row.title,
        categoryId:row.categoryId
      })
    })
  },[row])

  const [current, setCurrent] = useState(0);
  const next = () => {
    if(current === 0){
      newsRef.current.validateFields().then(res=>{
        setFormInfo(res)
        setCurrent(current + 1);
      }).catch(()=>{
        setCurrent(current)
      })
    }else{
      if(htmlInfo === '' || htmlInfo.trim() === <p></p>){
        message.error('新闻内容不能为空或点击空白保存新闻内容')
      }else{
        setCurrent(current+1)
      }
    }
  
  };
  const steps = [
    {
      title: '基本信息',
      describe: '新闻标题，新闻分类',
    },
    {
      title: '新闻内容',
      describe: '新闻字体内容',
    },
    {
      title: '新闻提交',
      describe: '保存草稿或者提交审核',
    },
  ];
  const prev = () => {
    setCurrent(current - 1);
  };
  const htmlData = (res)=>{
    setHtmlInfo(res)
  }
  const handleSave =(state)=>{
    axios.patch(`/news/${row.id}`,{
     ...formInfo,
     content:htmlInfo,
     auditState:state,
    }).then(res=>{
      if(res.data.length>0){
        if(state === 0){
          navigate('/home/news/draft')
        }
        else{
          navigate('/home/news/list')
        }
      }
      notification.info({
        message: `更新成功`,
        description:
        `您可以到${state === 0?'草稿箱':'审核列表'}中进行查看`,
        placement:'bottomRight'
      });
    })
  }
  return (
    <div>
      <PageHeader
       onBack={() => navigate(-1)}
        className="site-page-header"
        title="更新新闻"
      />
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} description={item.describe} />
        ))}
      </Steps>
      <div className="steps-content" style={current ===0?{display:'block'}:{display:'none'}} >
        <Form
          name="basic"
          ref={newsRef}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="新闻标题"
            name="title"
            style={{textAlign:'left'}}
            rules={[
              {
                required: true,
                message: '请填写新闻标题',
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="新闻分类"
            style={{textAlign:'left'}}
            name="categoryId"
            rules={[
              {
                required: true,
                message: '请选择新闻分类',
              },
            ]}
          >
            <Select>
              {
                categoriesList.map(val=>{
                  return <Option value={val.id} key={val.id}>{val.title}</Option>
                })
              }
              </Select>
          </Form.Item>
        </Form>
      </div>
      <div className="steps-content" style={current ===1?{display:'block'}:{display:'none'}}>
             <WangEditor htmlData={htmlData} content={row.content}/>
      </div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
            type={current === steps.length - 1 ? 'primary' : ''}
          >
            上一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <span>
            <Button onClick={() =>handleSave(0)} style={{ marginRight: '7px' }}>
              保存草稿箱
            </Button>
            <Button onClick={() =>handleSave(1)}>
              提交审核
            </Button>
          </span>
        )}
      </div>

    </div>
  )
}

