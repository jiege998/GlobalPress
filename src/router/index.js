// @ts-nocheck
//路由表配置
import Login from '../pages/Login'
import Home from '../pages/Home'
import User from '../pages/Home/User'
import RoleList from '../pages/Home/authority/RoleList'
import RightList from '../pages/Home/authority/RightList'
import HomePage from '../pages/Home/HomePage'
import NotFind from '../components/Notfind'
import List from '../pages/Home/User/list'
import {Navigate} from 'react-router-dom'
import Authority from '../pages/Home/authority'
import News from '../pages/Home/News'
import NewsAdd from '../pages/Home/News/add'
import NewsPreview from '../pages/Home/News/preview'
import NewsUpdate from '../pages/Home/News/update'
import NewsDraft from '../pages/Home/News/draft'
import NewsCategory from '../pages/Home/News/category'
import NewsList from '../pages/Home/News/list'
import Audit from '../pages/Home/audit'
import Auditaudit from '../pages/Home/audit/audit'
import AuditList from '../pages/Home/audit/list'
import Publish from '../pages/Home/publish'
import Unpublished from '../pages/Home/publish/unpublished'
import Published from '../pages/Home/publish/published'
import Sunset from '../pages/Home/publish/sunset'
import React from 'react'
const LocalRouterMap =   JSON.parse(localStorage.getItem('router')) || []
const roots = LocalRouterMap.map(val=>{
    return val.key
})
const routes =  [
	{
		path:'/login',
		element:<Login/>,
        children:[
            {
                path:'*',
                element:<Navigate to="/login"/>
            }
        ]
	},
	{
		path:'/home',
		element:<Home/>,
        children:[
            {
                path:'user',
                element: roots.indexOf('/home/user')  !== -1?<User/>:<NotFind />,
                children:[
                    {
                        path:'list',
                        element: roots.indexOf('/home/user/list')  !== -1?<List/>:<NotFind />
                    },
                    {
                        path:'/home/user',
                        element:roots.indexOf('/home/user') !== -1?<Navigate to="/home/user/list"/>:<Navigate to={roots[0]}/>,
                    },
                    
                ]
            },
            {
                path:'authority',
                element: roots.indexOf('/home/authority') !== -1?<Authority />:<NotFind />,
                children:[
                    {
                        path:'roleList',
                        element: roots.indexOf('/home/authority/roleList') !== -1?<RoleList />:<NotFind />,
                    },
                    {
                        path:'rightList',
                        element: roots.indexOf('/home/authority/rightList') !== -1?<RightList />:<NotFind />,
                    },
                    {
                        path:'/home/authority',
                        element:roots.indexOf('/home/authority') !== -1?<Navigate to="/home/authority/roleList"/>:<Navigate to={roots[0]}/>,
                    }
                ]
            },    
            {
                path:'homePage',
                element: roots.indexOf('/home/homePage') !== -1?<HomePage />:<NotFind />,
            },
            {
              path:'news',
              element: roots.indexOf('/home/news') !== -1?<News />:<NotFind />,
              children:[
                {
                    path:'add',
                    element: roots.indexOf('/home/news/add') !== -1?<NewsAdd />:<NotFind />,
                },
                {
                    path:'update/:id',
                    element: roots.indexOf('/home/news/update/:id') !== -1?<NewsUpdate />:<NotFind />,
                },
                {
                    path:'preview/:id',
                    element: roots.indexOf('/home/news/preview/:id') !== -1?<NewsPreview />:<NotFind />,
                },
                {
                    path:'draft',
                    element: roots.indexOf('/home/news/draft') !== -1?<NewsDraft />:<NotFind />,
                },
                {
                    path:'category',
                    element: roots.indexOf('/home/news/category') !== -1?<NewsCategory />:<NotFind />,
                },
                {
                    path:'list',
                    element: roots.indexOf('/home/news/list') !== -1?<NewsList />:<NotFind />,
                },
              ]
            },
            {
                path:'audit',
                element: roots.indexOf('/home/audit') !== -1?<Audit />:<NotFind />,
                children:[
                  {
                      path:'audit',
                      element: roots.indexOf('/home/audit/audit') !== -1?<Auditaudit />:<NotFind />,
                  },
                  {
                      path:'list',
                      element: roots.indexOf('/home/audit/list') !== -1?<AuditList />:<NotFind />,
                  },
                ]
              },
              {
                path:'publish',
                element: roots.indexOf('/home/publish') !== -1?<Publish />:<NotFind />,
                children:[
                  {
                      path:'unpublished',
                      element: roots.indexOf('/home/publish/unpublished') !== -1?<Unpublished />:<NotFind />,
                  },
                  {
                      path:'published',
                      element: roots.indexOf('/home/publish/published') !== -1?<Published />:<NotFind />,
                  },
                  {
                    path:'sunset',
                    element: roots.indexOf('/home/publish/sunset') !== -1?<Sunset />:<NotFind />,
                },
                ]
              },
            {
                path:'/home',
                element:roots.indexOf('/home') !== -1?<Navigate to="/home"/>:<Navigate to={roots[0]}/>,
            }
        ]
	},
	{
		path:'/',
		element:<Navigate to="/login"/>
	},
    {
        path:'*',
		element:<NotFind />
    }
]
export default routes

