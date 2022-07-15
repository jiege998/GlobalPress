// @ts-nocheck
import React from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";
import { Form, Input, Button,message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import './index.css'
import axios from '../../components/tools/http';
import {userRoot} from '../../components/tools/router'
function Index() {
  const navigate =useNavigate()
  const onFinish = (values) => {
    axios.get(`/users?username=${values.username}&password=${values.password}&roleState = true&_expand=role`).then(res=>{
      if(res.data.length === 0){
        message.error('请检查用户名及密码是否输入正确或请联系管理员开通权限')
      }else{
        localStorage.setItem('token',JSON.stringify(res.data[0]))
        navigate('/home')
      }
    })
    userRoot()
  }
  const particlesInit = async (main) => {
    await loadFull(main);
};

// //粒子被正确加载到画布中时，这个函数被调用
// const particlesLoaded = (container) => {
//     console.log("123", container);
// };
//粒子参数
const options = {
  "background": {
      "color": {
          "value": "#232741"
      },
      "position": "50% 50%",
      "repeat": "no-repeat",
      "size": "cover"
  },
  // 帧数，越低越卡,默认60
  "fpsLimit": 120,
  "fullScreen": {
      "zIndex": 1
  },
  "interactivity": {
      "events": {
          "onClick": {
              "enable": true,
              "mode": "push"
          },
          "onHover": {
              "enable": true,
              "mode": "slow"
          }
      },
      "modes": {
          "push": {
              //点击是添加1个粒子
              "quantity": 3,
          },
          "bubble": {
              "distance": 200,
              "duration": 2,
              "opacity": 0.8,
              "size": 20,
              "divs": {
                  "distance": 200,
                  "duration": 0.4,
                  "mix": false,
                  "selectors": []
              }
          },
          "grab": {
              "distance": 400
          },
          //击退
          "repulse": {
              "divs": {
                  //鼠标移动时排斥粒子的距离
                  "distance": 200,
                  //翻译是持续时间
                  "duration": 0.4,
                  "factor": 100,
                  "speed": 1,
                  "maxSpeed": 50,
                  "easing": "ease-out-quad",
                  "selectors": []
              }
          },
          //缓慢移动
          "slow": {
              //移动速度
              "factor": 2,
              //影响范围
              "radius": 200,
          },
          //吸引
          "attract": {
              "distance": 200,
              "duration": 0.4,
              "easing": "ease-out-quad",
              "factor": 3,
              "maxSpeed": 50,
              "speed": 1

          },
      }
  },
  //  粒子的参数
  "particles": {
      //粒子的颜色
      "color": {
          "value": "#ffffff"
      },
      //是否启动粒子碰撞
      "collisions": {
          "enable": true,
      },
      //粒子之间的线的参数
      "links": {
          "color": {
              "value": "#ffffff"
          },
          "distance": 150,
          "enable": true,
          "warp": true
      },
      "move": {
          "attract": {
              "rotate": {
                  "x": 600,
                  "y": 1200
              }
          },
          "enable": true,
          "outModes": {
              "bottom": "out",
              "left": "out",
              "right": "out",
              "top": "out"
          },
          "speed": 6,
          "warp": true
      },
      "number": {
          "density": {
              "enable": true
          },
          //初始粒子数
          "value": 40
      },
      //透明度
      "opacity": {
          "value": 0.5,
          "animation": {
              "speed": 3,
              "minimumValue": 0.1
          }
      },
      //大小
      "size": {
          "random": {
              "enable": true
          },
          "value": {
              "min": 1,
              "max": 3
          },
          "animation": {
              "speed": 20,
              "minimumValue": 0.1
          }
      }
  }
}
  return (
    <div className='content'>
      {/* loaded={particlesLoaded} */}
      <Particles
          id="tsparticles"
          init={particlesInit}
          options={options}
 />
      <div className='loginBox'>
        <div className='title'>全球新闻发布管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"  autoComplete="true" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              autoComplete="true"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Index