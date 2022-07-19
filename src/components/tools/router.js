// @ts-nocheck
import axios from './http';
export const userRoot = () => {
    let filterRoute = []
    let LocalRouterMap = {
        "/home/news": 'News',
        "/home/news/list": 'NewsList',
        "/home/news/add": 'NewsAdd',
        "/home/news/update/:id": 'NewsUpdate',
        "/home/news/preview/:id": 'NewsPreview',
        "/home/news/draft": 'NewsDraft',
        "/home/news/category": 'NewsCategory',
        "/home/audit": 'Audit',
        "/home/audit/audit": 'Auditaudit',
        "/home/audit/list": 'AuditList',
        "/home/publish": 'Publish',
        "/home/publish/unpublished": 'Unpublished',
        "/home/publish/published": 'Published',
        "/home/publish/sunset": 'Sunset',
        "/home/user": 'User',
        "/home/user/list": 'List',
        "/home/authority/roleList": 'RoleList',
        "/home/authority/rightList": 'RightList',
        "/home/homePage": 'Home',
        "/home/authority": 'Authority',
    }
    Promise.all([
        axios.get('/rights'),
        axios.get('/children'),
    ]).then(res => {
        const { role: { rights: { checked } } } = JSON.parse(localStorage.getItem('token'))
        filterRoute = [...res[0].data, ...res[1].data]
        filterRoute = filterRoute.filter(val => {
            if (LocalRouterMap[val.key] !== undefined && (val.pagepermisson === 1 || val.routepermisson === 1) && checked.indexOf(val.key) !== -1 ) {
                return true
            }
            return false
        })
        localStorage.setItem('router', JSON.stringify(filterRoute))
    })
}
