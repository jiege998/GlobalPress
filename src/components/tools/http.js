import axios from "axios";
import store from '../../store'
import {changePadding} from '../../store/features/paddingSlice'
axios.defaults.baseURL ='http://localhost:5000'
axios.interceptors.request.use(config=>{
    store.dispatch(changePadding({padding:true}))
    return config
})
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    store.dispatch(changePadding({padding:false}))
    return response;
  }, function (error) {
    // 对响应错误做点什么
    store.dispatch(changePadding({padding:false}))
    return Promise.reject(error);
  });
export default axios
