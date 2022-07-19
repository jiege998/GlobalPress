import {createSlice} from '@reduxjs/toolkit';
export const collapsedSlice = createSlice({
 name: 'siderState', // 命名空间，在调用action的时候会默认的设置为action的前缀
 // 初始值
 initialState: {
    siderState: false,
  },
 // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
 reducers: {
  changeCollapsed(state,{payload}){
   state.siderState=payload.collapsed
  }
}
});
// 导出actions
export const { changeCollapsed } = collapsedSlice.actions;
// // 内置了thunk插件，可以直接处理异步请求
// export const asyncIncrement = (payload) => (dispatch) => {
//  setTimeout(() => {
//  dispatch(increment(payload));
//   }, 2000);
// };
export default collapsedSlice.reducer; // 导出reducer，在创建store时使用到