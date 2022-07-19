import {createSlice} from '@reduxjs/toolkit';
export const paddingSlice = createSlice({
 name: 'padding', // 命名空间，在调用action的时候会默认的设置为action的前缀
 // 初始值
 initialState: {
    padding: false,
  },
 // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
 reducers: {
  changePadding(state,{payload}){
   state.padding=payload.padding
  }
}
});
// 导出actions
export const { changePadding } = paddingSlice.actions;
// // 内置了thunk插件，可以直接处理异步请求
// export const asyncIncrement = (payload) => (dispatch) => {
//  setTimeout(() => {
//  dispatch(increment(payload));
//   }, 2000);
// };
export default paddingSlice.reducer; // 导出reducer，在创建store时使用到